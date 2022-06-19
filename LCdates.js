document.getElementById("date1").addEventListener("change", function () {
    startDate = this.value;
    var dateEntered = new Date(startDate);
    // console.log(startDate); //e.g. 2015-11-13
    // console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
});
document.getElementById("date2").addEventListener("change", function () {
    endDate = this.value;
    var dateEntered = new Date(endDate);
    // console.log(endDate); //e.g. 2015-11-13
    // console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
});

function lowerbound(date, Datearray) {
    //console.log(Datearray);
    //console.log(date);
    for (let x in Datearray) {
        // console.log(Datearray[x]);
        if (compare_date(date, Datearray[x]) == -1) {
            if (x >= Datearray.length) {
                alert("Invalid date range: Lowerbound too high!");
                return -1;
            }
        }
        else if (compare_date(date, Datearray[x]) == 1)
            return x;
        else {
            return x;
        }
    }
}

function upperbound(Datearray, date) {
    for (let x in Datearray) {
        // console.log(Datearray[x]);
        if (compare_date(date, Datearray[x]) == -1) {
            if (x >= Datearray.length) {
                return x;
            }
        }//okay
        else if (compare_date(date, Datearray[x]) == 1)
            if (x == 0) {//no bigger than any in Datearray
                alert("Invalid date range: Upperbound too low!");
                return -1;
            }
            else {
                return x;
            }
    }
}


function compare_date(string1, string2) {
    //console.log(string1, string2)
    year1 = parseInt(string1.slice(0, 4));
    year2 = parseInt(string2.slice(0, 4));
    month1 = parseInt(string1.slice(5, 7));
    month2 = parseInt(string2.slice(5, 7));
    day1 = parseInt(string1.slice(8,));
    day2 = parseInt(string2.slice(8,));
    if (year1 > year2)
        return -1;
    else if (year1 < year2)
        return 1;
    else if (year1 == year2)
        if (month1 > month2)
            return -1;
        else if (month1 < month2)
            return 1;
        else if (month1 == month2)
            if (day1 > day2)
                return -1;
            else if (day1 < day2)
                return 1;
            else if (day1 == day2)
                return 0;
}

function getDates() {
    console.log("This is getDates");
    //can deal with invalid date range

    console.log(startDate); //e.g. 2015-11-13
    console.log(endDate);
    // console.log(finalObj);
    links = tolinks(finalObj, startDate, endDate); //return links
    graph["nodes"] = nodes;
    graph["links"] = links;
    // console.log(graph.links);
    console.log("here is getdates new graph");
    console.log(graph);
    draw(graph);
    //function combine links and nodes
    //return finish json
}