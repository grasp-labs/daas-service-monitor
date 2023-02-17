var fieldEl = document.getElementById("sort-field");
var dirEl = document.getElementById("sort-direction");

//Build Tabulator
var table = new Tabulator("#example-table", {
    height:"311px",
    layout:"fitColumns",
    columns:[
        {title:"Name", field:"name", width:200},
        {title:"Progress", field:"progress", hozAlign:"right", headerSortTristate:true},
        {title:"Gender", field:"gender", sorter:"string"},
        {title:"Rating", field:"rating",  hozAlign:"center", width:100},
        {title:"Favourite Color", field:"col", sorter:function(a,b){
            return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
        }},
        {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
        {title:"Driver", field:"car", hozAlign:"center", sorter:"boolean"},
    ],
});

//Trigger sort when "Trigger Sort" button is clicked
document.getElementById("sort-trigger").addEventListener("click", function(){
   table.setSort(fieldEl.options[fieldEl.selectedIndex].value, dirEl.options[dirEl.selectedIndex].value);
});