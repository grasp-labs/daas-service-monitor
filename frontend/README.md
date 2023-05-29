# DAAS-Service-Monitor
![Daas service monitor](https://user-images.githubusercontent.com/120393053/234086718-64b702a0-0c4f-4364-a81d-a7ba06998806.jpg)

## About 

This project is about monitoring runtime of different servers and services to give general overview to end users to see which services are failed and which services are successfully running in the differnt time intervals with provided information such as: 

<li>
 Services name <br>
 <li>
 Initmemory(G) <br>
 <li>
Timeout(s) <br>
<li>
Last Invocation Time <br>
<li>
Duration(s) <br>
<li>
Success <br>
<li>
Error

Based on this information, users can see which servers are running, what is their initial memory in Gigabyte, when they are timed out calculated in seconds, when they are called for the last time and for how long (Duration). If they are running seccessfully or failing; and if they are failed, which type of error exists. Based on this information, users can do some calculations for different purpuses such as costs of servers based on Initial memory for example. 

### Technologies used <hr>

The information is structured in the format of tabulator tabel. 

For more information, please check out the section about [Tabulator Table](https://tabulator.info/)  

## Local Run 

### Getting Started with Create React App. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <hr>

 `React` which is `Javascript` library is used for Front-end applications. 


In order to run the project locally, We use following instructions : <br>
<li>
 Open vscode <br>
 <li>
 Open the Daas-service-monitor project in vscode <br> 
<li>
 In the terminal write:  
 
 `npm start` 

 It will start the development server in [http://localhost:3000](http://localhost:3000). You can view it in your browser. Make sure you are giving the correct path (The specified front-end project path) in terminal.
  

## Testing 

For testing react applications, we use `jest` and `react testing library` libraries Which we import in our test files. <br>
The steps for testing react projects are following:

  - Create test folder inside the project folder.
  - Create a new test file inside that folder with the .test.js/.test.jsx suffix.
  - Write the test code inside the file.
  - Save the test file.
  - Open a new terminal and write `npm test`.
  
Test files will look like something like this: 

``` javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Main/Login';

describe('Login component', () => {
  test('Login button exists', () => {
    render(...
```
This is a test file for testing login Page. Usually, we have one test file per each conmponent in our project. <br>

After all the tests are passed, we can start development of the code. 

For more information, please check out [Testing in React](https://testing-library.com/docs/react-testing-library/example-intro/).


## Development

In order to start development in this project, we do the followings in a terminal in vscode:

``` bash
1  cd my-app
2  npm install 
3  npm start
```
pointing to above code snippet; first, we navigate to our app/project with `cd` command (line 1) and then we install all the dependencies needed with `npm install` (line2 ) in the project folder and finally we start development server with `npm start` (line 3) in terminal.

For react projects, we make components, which are basically our functions. Then we export them and import them in other components. The best practice for react projects is to have multiple components and to have leaner components as much as possible and the goal is to make them reusable.

For more information, please check out [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn react, please check out [React documentation](https://reactjs.org/).


## My Tasks
In this project, my goal was to make the existing daas-service-monitor app pretier. The tasks I did in this project was to:

- 1. Sort success filed in the tabulator table to show the failed servers at top of the table.
-  2. Add loading indicator/snipper in order to show the user to wait until data is fetched and rendered in the browser.
-  3. Add auto refresh which refreshes the web page based on defined time interval. 
-  4. Add security layer to this application by adding login page and authentication aspect. The user needs to first login in order to see the home page. 
-  5. Add testing for login and home page to make sure that the actual result is the same as expected result. 


## Deployment 

In order to deploy the project, we use these steps. 

First we need to make sure that our project works functionally and all the testing are passed. We use TDD aproach which is test driven development which means we write tests before we develope the code.

After everything is completed, the code will be hosted in github and if everything is confirmed, the code will be merged to main and then it will update the servers in AWS and our project will be deployed. 

In order for deployment in react applications, we use `npm run build` which builds the app to the `build` folder for production. 

For more information, please check out [deployment](https://facebook.github.io/create-react-app/docs/deployment).


