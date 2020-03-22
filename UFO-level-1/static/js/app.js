// from data.js
var tableData = data;

// Get the reference to the table body
var tbody = d3.select("tbody");

// console.log the data on the table body
console.log(tableData);

// create an array with the name of the column on the table data
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];

// loop trought the arrat for the data provide and append the data to the table
// First Step: create a function to load data
function uploadData() {
    tableData.forEach(aliens => {
        var row = tbody.append("tr")
        columns.forEach(column => {
            if(column =="city" || column =="state" || column =="country"){
                row.append("td").text(aliens[column].toUpperCase())
            }
            else row.append("td").text(aliens[column]) 
        })
    })
}

// Second step: load the data, use the function previously create
uploadData()

// third step: establish the reference between the element in the html and the load data on the table. Include the Multiple Search Categories 
var inputDate = d3.select("#datetime");
var inputCity = d3.select("#city");
var inputState = d3.select("#state");
var inputCountry = d3.select("#country");
var inputShape = d3.select("#shape");

// Fourth step: work on the filter buttons
// get the reference to the html filter button "Filter Table" --> <button id="filter-btn" type="button" class="btn btn-default">
var filterButton = d3.select("#filter-btn")
// get the reference to the html filter button "Reset Tabel" ---> <button id="reset-btn" type="reset" class="btn btn-default">
var resetButton = d3.select("#reset-btn")

// Fifth step: create the connection with the selection button to filter the data by "datetime", "city", "state", "country", "shape"
function filterData() {

    // set up the website and prevent it to refresh
    d3.event.preventDefault();

    // extract the input selected for all the columns "datetime", "city", "state", "country", "shape"
    var DateValue = inputDate.property("value");
    var CityValue = inputCity.property("value");
    var StateValue = inputState.property("value");
    var CountryValue = inputCountry.property("value");
    var ShapeValue = inputShape.property("value");

    // apply the conditions to the data filtered and assign to the variable  "datetime", "city", "state", "country", "shape"
    var filteredData = tableData.filter(function(recorded){
        return (
            (recorded.datetime === DateValue ||DateValue =="") &&
            (recorded.city === CityValue ||CityValue =="") &&
            (recorded.state === StateValue ||StateValue =="") &&
            (recorded.country === CountryValue ||CountryValue =="") &&
            (recorded.shape === ShapeValue ||ShapeValue =="")
        )
    })

    // print the filtered data to the console
    console.log(filteredData)

    // refresh the table to append with the new data filtered
    tbody.text("")

    // update the table with the new data filtered
    filteredData.forEach(aliens =>{
        var row = tbody.append("tr")
        columns.forEach(column => {
            if(column =="city" || column =="state" || column =="country"){
                row.append("td").text(aliens[column].toUpperCase())
                }
                else row.append("td").text(aliens[column]) 
        })
    })
}

//six step: add an event to handle the click button for filtere the table for a given input (request for the user)
filterButton.on("click", filterData)

//seven step:  add the function to reset the table
function resetData(){
    tbody.text("")
    loadData()
}

// eight step: add an event to handle the reset button and return the table to the original data
resetButton.on("click",resetData)

//end of app.js