var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

//try
var data1 = {};
var data2 = {};
var finalObj = {};
var startDate = "";
var endDate = "";
var graph = {};
var nodes = [];

load_url().then(function () {

    //default 
    startDate = "2020-01-01";
    endDate = "2021-03-31";
    //deal with finalObj to json links 
    var links = tolinks(finalObj, startDate, endDate);

    if (links == null) {
        alert("No valid links. Program stopped")
        return 0;
    }
    //function combine links and nodes
    //return finish json
    graph = nodes;
    graph["links"] = links;
    // console.log("here is combined links and nodes to graph");
    // console.log(graph);

    // here draw
    draw(graph);

});



