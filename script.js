//Chart2

stock_list = ["1101", "1102", "1216", "1301", "1303", "1326", "1402", "1590", "2002", "2105", "2207", "2303", "2308", "2317", "2327", "2330", "2357",
              "2379", "2382", "2395", "2408", "2412", "2454", "2474", "2633", "2801", "2880", "2881", "2882", "2884", "2885", "2886", "2887", "2891", 
              "2892", "2912", "3008", "3034", "3045", "3711", "4904", "4938", "5871", "5876", "5880", "6415", "6505", "6669", "8046", "9910"]
var w = 1000,
    h = 800;

var circleWidth = 20;

var palette = {
  "lightgray": "#819090",
  "gray": "#708284",
  "mediumgray": "#536870",
  "darkgray": "#475B62",

  "darkblue": "#0A2933",
  "darkerblue": "#042029",

  "white": "#FFFFFF",
  "paleryellow": "#FCF4DC",
  "paleyellow": "#EAE3CB",
  "yellow": "#A57706",
  "orange": "#BD3613",
  "red": "#D11C24",
  "pink": "#C61C6F",
  "purple": "#595AB7",
  "blue": "#2176C7",
  "green": "#259286",
  "yellowgreen": "#738A05"
}
d3.csv("dataset/stock.csv", function(data){
  var nodes = [
    { name: 'TWII', beta : 1, diff_value: 1}
  ]
  dataset = data;
  console.log(dataset);
  const results = dataset.filter(element => {
    if (Object.values(element)[52]>= "2022-03-05" && Object.values(element)[52]<= "2022-06-04") {
      return true;
    }
    return false;
  });
  console.log(results[60]["1101"]-results[0]["1101"]);
  
  for (var i = 0, len = stock_list.length; i < len; i++) {
    // a = 10 * ( results[results.length-1][stock_list[i]]-results[0][stock_list[i]]);
    b = regression(results,stock_list[i]);
    nodes.push({name : stock_list[i], beta:b});
    // console.log(stock_list[i]," 差異 =",a);
    console.log(stock_list[i],"=",b);
  }

  var myChart5 = d3.select('.chart5').append('svg')
    .attr("id","wei_svg")
    .attr('width', w)
    .attr('height', h)
    .style('background', palette.paleryellow)
  
  var force = d3.layout.force()
    .nodes(nodes)
    .gravity(0.3)
    .charge(-1000)
    .size([w, h])


  var node = myChart5.selectAll('circle')
    .data(nodes).enter()
    .append('g')
    .call(force.drag)

  node.append('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', function(d, i) {
      return Math.abs(d.beta)*25;
    })
    .attr('fill', function(d, i) {
      if(d.name =="TWII"){return palette.darkgray;}
      else if (d.beta >=0) { return palette.pink; }
      else { return palette.blue; }
    })
    .style("opacity", function(d, i) {
      if(d.name =="TWII"){}
      else if (d.beta >=0) { return d.beta; }
      else { return -d.beta; }
    })

  node.append('text')
    .text(function(d) { return d.name; })
    .attr('text-anchor', function (d, i) {
      if (i > 0) { return 'beginning' }
      else { return 'end'}
    })
    .attr('font-size', function (d, i) {
      if (i > 0) { return '1em'; }
      else { return '1.2em'; }
    })
    .attr('fill', function(d, i) {
      if (i > 0) { return palette.mediumgray }
      else { return palette.yellowgreen }
    })
    .attr('x', function (d, i) {
      if (i > 0) { return circleWidth + 5; }
      else { return circleWidth - 12; }
    })
    .attr('y', function (d, i) {
      if (i > 0) { return circleWidth; }
      else { return circleWidth + 2;}
    })

  force.on('tick', function(e) {
    node.attr('transform', function(d, i) {
      return 'translate('+ d.x +', '+ d.y +')';
    })
  })

  force.start();
})
function getDates() {
  var nodes = [
    { name: 'TWII', beta : 1}
  ]
  d3.select("#wei_svg").remove();
  start = document.getElementById('date1').value;
  end = document.getElementById('date2').value;
  d3.csv("dataset/stock.csv", function(data){
    dataset = data;
    console.log(dataset);
    const results = dataset.filter(element => {
      if (Object.values(element)[52]>= start && Object.values(element)[52]<= end) {
        return true;
      }
      return false;
    });
    console.log(results);
    
    for (var i = 0, len = stock_list.length; i < len; i++) {
      b = regression(results,stock_list[i]);
      nodes.push({name : stock_list[i], beta:b});
      console.log(stock_list[i],"=",b);
    }
  
    var myChart5 = d3.select('.chart5').append('svg')
      .attr("id","wei_svg")
      .attr('width', w)
      .attr('height', h)
      .style('background', palette.paleryellow)
  
    var force = d3.layout.force()
      .nodes(nodes)
      .gravity(0.3)
      .charge(-1000)
      .size([w, h])
  
  
    var node = myChart5.selectAll('circle')
      .data(nodes).enter()
      .append('g')
      .call(force.drag)
  
    node.append('circle')
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .attr('r', function(d, i) {
        return Math.abs(d.beta)*25;
      })
      .attr('fill', function(d, i) {
        if(d.name =="TWII"){return palette.darkgray;}
        else if (d.beta >=0) { return palette.pink; }
        else { return palette.blue; }
      })
      .style("opacity", function(d, i) {
        if(d.name =="TWII"){}
        else if (d.beta >=0) { return d.beta; }
        else { return -d.beta; }
      })
  
    node.append('text')
      .text(function(d) { return d.name; })
      .attr('text-anchor', function (d, i) {
        if (i > 0) { return 'beginning' }
        else { return 'end'}
      })
      .attr('font-size', function (d, i) {
        if (i > 0) { return '1em'; }
        else { return '1.2em'; }
      })
      .attr('fill', function(d, i) {
        if (i > 0) { return palette.mediumgray }
        else { return palette.yellowgreen }
      })
      .attr('x', function (d, i) {
        if (i > 0) { return circleWidth + 5; }
        else { return circleWidth - 12; }
      })
      .attr('y', function (d, i) {
        if (i > 0) { return circleWidth; }
        else { return circleWidth + 2;}
      })
  
    force.on('tick', function(e) {
      node.attr('transform', function(d, i) {
        return 'translate('+ d.x +', '+ d.y +')';
      })
    })
  
    force.start();
  })
}
function regression(data,stock_num) {
  var sum_x = 0, sum_y = 0
    , sum_xy = 0, sum_xx = 0
    , count = 0
    , m, b;
  if (data.length === 0) {
    throw new Error('Empty data');
  }

  // calculate sums
  for (var i = 0, len = data.length; i < len; i++) {
    var point = data[i];
    Stock_Index = parseFloat(point[stock_num]);
    TWII = parseFloat(point['^TWII']);
    sum_x += Stock_Index;
    sum_y += TWII;
    sum_xx += Stock_Index * Stock_Index;
    sum_xy += Stock_Index * TWII;
    count++;
  }

  // calculate slope (m) and y-intercept (b) for f(x) = m * x + b
  m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  return m;
  
}

