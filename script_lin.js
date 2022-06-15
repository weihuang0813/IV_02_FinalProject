//try
var data1 = {};
var data2 = {};
//3711 9910
var finalObj = {};
var startDate = "";
var endDate = "";
var graph = {};
var nodes = [];
async function load(url1, url2, url3) {
    try {
        data1 = await (await fetch(url1)).json();
        data2 = await (await fetch(url2)).json();
        nodes = await (await fetch(url3)).json();
        //console.log(data1);
    } catch (e) {
        // console.log('error occurs while fetching json from url');
    }
    for (let x in data1) {
        finalObj[x] = data1[x];
    }
    for (let x in data2) {
        finalObj[x] = data2[x];
    }
    //console.log(finalObj);


}

url1 = "https://raw.githubusercontent.com/morristlc/related_50/main/all_related1.json";
url2 = "https://raw.githubusercontent.com/morristlc/related_50/main/all_related2.json";
url3 = "https://raw.githubusercontent.com/morristlc/related_50/main/nodes50_1.json";
load(url1, url2, url3).then(function () {

    //default 
    startDate = "2020-01-01";
    endDate = "2021-12-31";
    //deal with finalObj to json links 
    var links = tolinks(finalObj, startDate, endDate);

    if (links == null){
        alert("No valid links. Program stopped")
    }
    //function combine links and nodes
    //return finish json
    graph = nodes;
    graph["links"] = links;
    // console.log("here is combined links and nodes to graph");
    // console.log(graph);

    // here draw
    draw(graph);
    // var svg = d3.select("svg"),
    //     width = +svg.attr("width"),
    //     height = +svg.attr("height");
    // console.log("here is svg")
    // console.log(width);

    // console.log("here before simulation");
    // console.log(graph)
    // console.log(graph.nodes);
    // console.log(graph.links);

    // console.log("typeof graph.links");
    // console.log(typeof (graph.links));

    // // 設定顏色
    // var color = d3.scaleOrdinal(d3.schemeCategory20);

    // var dots = d3.select('.forceElement')
    //     .append('g')
    //     .selectAll('circle')
    //     .data(graph.nodes)
    //     .enter()
    //     .append('circle')
    //     .attr('cx', 250)
    //     .attr('cy', 150)
    //     .attr('r', 15)
    //     .style('fill', function (d) { return color(d.group); })
    //     .style('opacity', 0.4)
    //     .style('cursor', 'pointer')
    //     .call(d3.drag()
    //         .on("start", dragstarted)
    //         .on("drag", dragged)
    //         .on("end", dragended))

    // var link = d3.select('.forceElement')
    //     .append("g")
    //     // .attr("class", "links")
    //     .selectAll("line")
    //     .data(graph.links)
    //     .enter().append("line")
    //     .attr("stroke-width", function (d) { return Math.sqrt(d.value); })
    //     .style("stroke", 'black');

    // var simulation = d3.forceSimulation(graph.nodes)
    //     // 設定節點連結的引力 
    //     .force("link", d3.forceLink().id(function (d) { return d.id; }))
    //     //
    //     // .force("x", d3.forceX().strength(0.5).x(d => d.group))
    //     // .force("y", d3.forceY().strength(0.1).y(150))
    //     // 節點間的電荷力
    //     .force("charge", d3.forceManyBody().strength(-10))
    //     //中心點的引力
    //     .force("center", d3.forceCenter(width / 2, height / 2))
    //     // 節點間的斥力
    //     .force('collision', d3.forceCollide().radius(d => 4).iterations(1))
    //     .on('tick', ticked);

    // // 設定 ticked 方法
    // function ticked(d) {
    //     link.attr("x1", function (d) {
    //         // console.log("inside link");
    //         // console.log(d.source.x);
    //         // undefined
    //         return d.source.x;
    //     })
    //         .attr("y1", function (d) { return d.source.y; })
    //         .attr("x2", function (d) { return d.target.x; })
    //         .attr("y2", function (d) { return d.target.y; });

    //     dots.attr("cx", d => d.x)
    //         .attr("cy", d => d.y);

    //     // console.log("inside function ticked");
    //     // console.log(link);
    // }

    // // hover
    // dots.on('mouseover', mouseover)
    //     .on('mouseleave', mouseleave)

    // function mouseover(event, d) {
    //     console.log(d)
    //     d3.select(this)
    //         .attr('stroke', 'blue')
    //         .attr('stroke-width', '3px')
    //         .attr('opacity', 0.7)
    //         .style('cursor', 'pointer')

    //     var x = d3.event.x,
    //         y = d3.event.y;

    //     // tooltips.show(d);

    //     tooltips.style('top', y);
    //     tooltips.style('left', x);
    //     tooltips.style("visibility", "visible");

    //     //let pt = d3.pointer(event, this)
    //     // tooltips.style('opacity', 1)
    //     //     .style('left', pt[0] + 10 + 'px')
    //     //     .style('top', pt[1] + 'px')
    //     //     .html(`半徑：${d.r}`)
    // }

    // function mouseleave(event, d) {
    //     d3.select(this)
    //         .attr('stroke', 'none')
    //         .attr('stroke-width', '0')
    //         .attr('opacity', 0.3)

    //     tooltips.style('opacity', 0)
    // }

    // // 拖曳開始
    // function dragstarted(event, d) {
    //     // console.log(d)
    //     d3.select(this)
    //         .style('fill-opacity', 0.6)
    //     d.fx = d.x;
    //     d.fy = d.y;
    //     simulation.alphaTarget(.03).restart();
    // }
    // // 拖曳期間
    // function dragged(event, d) {
    //     d.fx = event.x;
    //     d.fy = event.y;
    // }
    // // 拖曳結束
    // function dragended(event, d) {
    //     simulation.alphaTarget(.03);
    //     d3.select(this)
    //         .style('fill-opacity', 0.3)
    //     d.fx = null;
    //     d.fy = null;
    // }

    // // 綁定拖曳事件
    // dots.call(d3.drag()
    //     .on("start", dragstarted)
    //     .on("drag", dragged)
    //     .on("end", dragended));




});

// document.getElementById("date1").addEventListener("change", function () {
//     startDate = this.value;
//     var dateEntered = new Date(startDate);
//     // console.log(startDate); //e.g. 2015-11-13
//     // console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
// });
// document.getElementById("date2").addEventListener("change", function () {
//     endDate = this.value;
//     var dateEntered = new Date(endDate);
//     // console.log(endDate); //e.g. 2015-11-13
//     // console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
// });

//okay
function tolinks(finalObj, startDate, endDate) {
    // console.log("Test tolinks");
    var links = [];
    stock_id = ['2330', '2454', '2317', '2308', '2303', '2881', '1301', '1303', '2882', '2002', '2412', '2891', '3711', '2886', '1216', '2884', '3008', '2885', '3034', '1326', '2357', '1101', '5871', '2379',
        '2382', '2327', '2892', '5880', '6415', '2207', '2880', '3045', '2887', '6505', '2912', '5876', '4938', '1590', '2395', '2474', '1402', '1102', '2801', '9910', '4904', '2105', '6669', '8046', '2408', '2633']

    //access every 1225
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var lower_index = 0;
    var upper_index = 0;
    var temp = {};
    while (count1 < 50) {
        if ((count1 + 1) < 50)
            count2 = count1 + 1;
        else if ((count1 + 1) == 50)
            break;
        while (count2 < 50) {
            var string = "";
            string = stock_id[count1] + '-' + stock_id[count2];

            //access single pare in 1225
            //find lower bound
            lower_index = lowerbound(finalObj[string][0].date_lower, startDate);
            // console.log("test lower_index");
            // console.log(lower_index);
            // console.log(startDate);

            //find upper bound
            upper_index = upperbound(finalObj[string][0].date_upper, endDate);

            if (lower_index == -1 || upper_index == -1){
                return null;
            }

            //compute single link
            var sum = 0;
            for (elem in finalObj[string][0].related_rate) {
                sum += finalObj[string][0].related_rate[elem];
            }
            if (sum <= 0) {
                sum = sum * -1;
            }
            sum = Math.round(sum);
            //append to links
            var oneLink = [];
            oneLink = { "source": stock_id[count1], "target": stock_id[count2], "value": sum };
            // console.log(oneLink);
            links.push(oneLink);

            count2 += 1;
            count3 += 1;
        }
        count1 += 1;
    }

    return links;
}

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

    //console.log(startDate); //e.g. 2015-11-13
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

function draw(graph) {
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    // 設定顏色
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var dots = d3.select('.forceElement')
        .append('g')
        .selectAll('circle')
        .data(graph.nodes)
        .enter()
        .append('circle')
        .attr('cx', 250)
        .attr('cy', 150)
        .attr('r', 15)
        .style('fill', function (d) { return color(d.group); })
        .style('opacity', 0.4)
        .style('cursor', 'pointer')
        // .call(d3.drag()
        //     .on("start", dragstarted)
        //     .on("drag", dragged)
        //     .on("end", dragended))

    var link = d3.select('.forceElement')
        .append("g")
        // .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function (d) { 
            console.log(d);
            return Math.sqrt(d.value); })
        .style("stroke", 'black');

    var simulation = d3.forceSimulation(graph.nodes)
        // 設定節點連結的引力 
        .force("link", d3.forceLink().id(function (d) { return d.id; }))
        //
        // .force("x", d3.forceX().strength(0.5).x(d => d.group))
        // .force("y", d3.forceY().strength(0.1).y(150))
        // 節點間的電荷力
        .force("charge", d3.forceManyBody().strength(-10))
        //中心點的引力
        .force("center", d3.forceCenter(width / 2, height / 2))
        // 節點間的斥力
        .force('collision', d3.forceCollide().radius(d => 4).iterations(1))
        .on('tick', function () {
            link.attr("x1", function (d) {
                // console.log("inside link");
                // console.log(d.source);
                // undefined
                // return d.source.x;
            })
                // .attr("y1", function (d) { return d.source.y; })
                // .attr("x2", function (d) { return d.target.x; })
                // .attr("y2", function (d) { return d.target.y; });

            dots.attr("cx", function (d) { 
                    console.log(d);
                    return d.x; })
                .attr("cy", function (d) { return d.y; });

            // console.log("inside function ticked");
            // console.log(link);
        });

    // 設定 ticked 方法

//     // hover
//     dots.on('mouseover', mouseover)
//         .on('mouseleave', mouseleave)

//     function mouseover(event, d) {
//         console.log(d)
//         d3.select(this)
//             .attr('stroke', 'blue')
//             .attr('stroke-width', '3px')
//             .attr('opacity', 0.7)
//             .style('cursor', 'pointer')

//         var x = d3.event.x,
//             y = d3.event.y;

//         // tooltips.show(d);

//         // tooltips.style('top', y);
//         // tooltips.style('left', x);
//         // tooltips.style("visibility", "visible");

//         //let pt = d3.pointer(event, this)
//         // tooltips.style('opacity', 1)
//         //     .style('left', pt[0] + 10 + 'px')
//         //     .style('top', pt[1] + 'px')
//         //     .html(`半徑：${d.r}`)
//     }

//     function mouseleave(event, d) {
//         d3.select(this)
//             .attr('stroke', 'none')
//             .attr('stroke-width', '0')
//             .attr('opacity', 0.3)

//         // tooltips.style('opacity', 0)
//     }

//     // 拖曳開始
//     function dragstarted(event, d) {
//         // console.log(d)
//         d3.select(this)
//             .style('fill-opacity', 0.6)
//         d.fx = d.x;
//         d.fy = d.y;
//         simulation.alphaTarget(.03).restart();
//     }
//     // 拖曳期間
//     function dragged(event, d) {
//         d.fx = event.x;
//         d.fy = event.y;
//     }
//     // 拖曳結束
//     function dragended(event, d) {
//         simulation.alphaTarget(.03);
//         d3.select(this)
//             .style('fill-opacity', 0.3)
//         d.fx = null;
//         d.fy = null;
//     }

//     // 綁定拖曳事件
//     dots.call(d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended));
}
