package main

import (
	"context"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cloudwatch"
	"github.com/aws/aws-sdk-go/service/lambda"

	"github.com/aws/aws-lambda-go/events"
	runtime "github.com/aws/aws-lambda-go/lambda"
)

type Response events.APIGatewayProxyResponse

type LambdaFunctionInfo struct {
	Name                   string
	InitMemory             int64
	Timeout                int64
	LastInvocationTime     string
	LastInvocationDuration float64
	FunctionError          bool
	RunTimeoutError        bool
}

func GetFunctions() ([]string, error) {
	sess, _ := session.NewSession(&aws.Config{
		Region: aws.String("eu-north-1")},
	)

	svc := lambda.New(sess)

	var funcs []string

	var nextMarker *string
	for {
		input := &lambda.ListFunctionsInput{
			Marker: nextMarker,
		}
		resp, err := svc.ListFunctions(input)
		if err != nil {
			fmt.Println(err)
			return funcs, err
		}

		for _, function := range resp.Functions {
			funcs = append(funcs, *(function.FunctionName))
		}

		if resp.NextMarker == nil {
			break
		}

		nextMarker = resp.NextMarker
	}

	return funcs, nil
}

func RetrieveLambdaFunctionInfo(funcName string) (*LambdaFunctionInfo, error) {

	info := &LambdaFunctionInfo{
		Name: funcName,
	}

	sess, _ := session.NewSession(&aws.Config{
		Region: aws.String("eu-north-1")},
	)

	// get lambda configuration info
	lambdaClient := lambda.New(sess)

	result, err := lambdaClient.GetFunction(&lambda.GetFunctionInput{
		FunctionName: aws.String(funcName),
	})

	if err != nil {
		fmt.Println("Failed to get function: ", err)
		return nil, err
	}

	info.InitMemory = *result.Configuration.MemorySize
	info.Timeout = *result.Configuration.Timeout

	cw := cloudwatch.New(sess)

	startTime := time.Now().Add(-24 * time.Hour)
	endTime := time.Now()

	metricData, err := cw.GetMetricData(&cloudwatch.GetMetricDataInput{
		MetricDataQueries: []*cloudwatch.MetricDataQuery{
			{
				Id: aws.String("m1"),
				MetricStat: &cloudwatch.MetricStat{
					Metric: &cloudwatch.Metric{
						Namespace:  aws.String("AWS/Lambda"),
						MetricName: aws.String("Invocations"),
						Dimensions: []*cloudwatch.Dimension{
							{
								Name:  aws.String("FunctionName"),
								Value: aws.String(funcName),
							},
						},
					},
					Period: aws.Int64(60),
					Stat:   aws.String("Maximum"),
				},
				ReturnData: aws.Bool(true),
			},
			{
				Id: aws.String("m2"),
				MetricStat: &cloudwatch.MetricStat{
					Metric: &cloudwatch.Metric{
						Namespace:  aws.String("AWS/Lambda"),
						MetricName: aws.String("Errors"),
						Dimensions: []*cloudwatch.Dimension{
							{
								Name:  aws.String("FunctionName"),
								Value: aws.String(funcName),
							},
						},
					},
					Period: aws.Int64(60),
					Stat:   aws.String("Maximum"),
				},
				ReturnData: aws.Bool(true),
			},
			{
				Id: aws.String("m3"),
				MetricStat: &cloudwatch.MetricStat{
					Metric: &cloudwatch.Metric{
						Namespace:  aws.String("AWS/Lambda"),
						MetricName: aws.String("Duration"),
						Dimensions: []*cloudwatch.Dimension{
							{
								Name:  aws.String("FunctionName"),
								Value: aws.String(funcName),
							},
						},
					},
					Period: aws.Int64(60),
					Stat:   aws.String("Maximum"),
				},
				ReturnData: aws.Bool(true),
			},
		},
		StartTime: &startTime,
		EndTime:   &endTime,
	})

	if err != nil {
		fmt.Println("Failed to get metric data", err)
		return info, err
	}

	invocationTimestamps := metricData.MetricDataResults[0].Timestamps
	if len(invocationTimestamps) > 0 {
		info.LastInvocationTime = invocationTimestamps[0].String()
	}

	durations := metricData.MetricDataResults[2].Values
	if len(durations) > 0 {
		info.LastInvocationDuration = *(durations[0]) / 1000
		if info.LastInvocationDuration > (float64)(info.Timeout+1) {
			info.RunTimeoutError = true
		}
	}

	errorTimestamps := metricData.MetricDataResults[1].Timestamps
	errorValues := metricData.MetricDataResults[1].Values
	if len(errorValues) > 0 && int(*errorValues[0]) > 0 {
		lastError := errorTimestamps[0]
		lastInvocation := metricData.MetricDataResults[0].Timestamps[0]
		funcError := (*lastError == *lastInvocation) || lastError.After(*lastInvocation)
		if funcError {
			info.FunctionError = true
		}
	}

	return info, nil
}

func Handler(ctx context.Context) ([]*LambdaFunctionInfo, error) {
	funcs, err := GetFunctions()
	if err != nil {
		fmt.Println(err)
	}

	var results []*LambdaFunctionInfo

	for _, func_name := range funcs {
		info, err := RetrieveLambdaFunctionInfo(func_name)
		if err != nil {
			continue
		}
		results = append(results, info)
	}

	return results, nil
}

func main() {
	runtime.Start(Handler)
}
