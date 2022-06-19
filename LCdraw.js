/* 
    Graph takes Data file which includes links and nodes
 */

function draw(graph) {

    console.log("here before simulation");
    // console.log(graph)
    // console.log(graph.nodes);
    console.log(graph.links);

    // console.log("typeof graph.links");
    // console.log(typeof (graph.links));

    // 設定顏色
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    // var data = graph.nodes;

    // var link = d3.select('.forceElement')
    var link = svg
        .append('g')
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value) / 10; })
        //.attr("stroke-width", 0.1)
        .style("stroke", 'black');

    // var dots = d3.select('.forceElement')
    var dots = svg
        .append('g')
        .selectAll('circle')
        .data(graph.nodes)
        .enter()
        .append('circle')
        .attr('cx', 250)
        .attr('cy', 150)
        .attr('r', 15)
        .style('fill', function (d) { return color(d.group); })
        .style('opacity', 0.8)
        .style('cursor', 'pointer')


    var simulation = d3.forceSimulation(graph.nodes)
        // 設定節點連結的引力 
        .force("link", d3.forceLink().strength(0.1).id(function (d) { return d.id; }))
        //
        // .force("x", d3.forceX().strength(0.1).x(d => d.group))
        // // // .force("y", d3.forceY().strength(0.1).y(150))
        // .force("y", d3.forceY().strength(0.1).y(d => d.group))
        // 節點間的電荷力
        .force("charge", d3.forceManyBody().strength(-350))
        //中心點的引力
        .force("center", d3.forceCenter(width / 2, height / 2))
        // 節點間的斥力
        // .force('collision', d3.forceCollide().radius(d => 4).iterations(1))
        .force('collision', d3.forceCollide().strength(10).radius(1).iterations(1))
        // .force('collision', d3.forceCollide().radius(function(d) {
        //     return d.radius
        //   }).iterations(1))
        .on('tick', ticked);

    // Create a drag handler and append it to the node object instead
    var drag_handler = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    drag_handler(dots);

    var lables = dots.append("text")
        .text(function (d) {
            return d.id;
        })
        .attr('x', 6)
        .attr('y', 3);

    dots.append("title")
        .text(function (d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation
        .force("link")
        .links(graph.links);

    // 設定 ticked 方法
    function ticked(d) {
        link.attr("x1", function (d) {
            // console.log("inside link");
            // console.log(d.source.x);
            // undefined
            return d.source.x;
        })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        dots.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        // console.log("inside function ticked");
        // console.log(link);
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    

}
