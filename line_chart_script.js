/* DATA PREPROCESSING FUNCTIONS */
function convertDate(date){
    if(typeof(date)==="string"){
	return new Date(date);
    }else{
	y = date.getFullYear();
	m = date.getMonth()+1;
	d = date.getDate();
	return y + '-' + m + '-' + d;
    }
}

function isDigit(c){
    diff = c - '0';
    if(0 <= diff && diff < 10){return true;}
    else{return false;}
}

function transformStock(stock){
    let stock_num = 0;
    let w = 1
    
    for(let i=stock.length-1;i>=0;i--){
	if(isDigit(stock[i])){
	    stock_num += (stock[i]-'0') * w
	    w *= 10
	}
    }
    //console.log(stock, "->", stock_num);
    return stock_num;
}

function stockFormat(stock_str){
    let n = stock_str.length;
    let format_code = 0;
    let count_num = 0;
    for(let i=0;i<n;i++){
	if(isDigit(stock_str[i])){
	    count_num += 1;
	}
    }

    if(count_num === n){
	//only num format
	format_code = 1;
    }else if(count_num === 0){
	//only char
	format_code = 2;
    }else if(stock_str[n-3]==='.' && stock_str[n-2]==='T' && stock_str[n-1]==='W'){
	//.TW form
	format_code = 3;
    }else{
	console.log("none of the form");
    }
    return format_code;
}

function convertStock(stock){
  if(stockFormat(stock)===1){
    return stock + ".TW";
  }else{
    return stock;
  }
}


function transformDatas(datas){
    if(datas.length===0){
	console.log("No data to transform.");
	return [];
    }

    let data_cols = Object.keys(datas[1]);

    let transformed_datas = [];
    for(let i in data_cols){
	if(data_cols[i]!=='date'){
	    let stock_num = data_cols[i];
            transformed_datas.push({stock_index:stock_num});
	}
    }
    for(let i=0;i<datas.length;i++){
	let data = datas[i];
	date = data["date"];
	delete data["date"];

	let j = 0;
	for(let d in data){
            transformed_datas[j][date] = data[d];
	    j += 1;
	}    
	data["date"] = date;
    }
    return transformed_datas;
}


function convertDatas(datas, dateConvertFunc, stockConvertFunc){
    if(datas.length===0){
	console.log("No data to convert.");
	return [];
    }

    let converted_datas = [];
    for(let i=0;i<datas.length;i++){
	let data = datas[i];
	date = data["Date"];
	date = dateConvertFunc(date);
	date = dateConvertFunc(date);
	delete data[""];
	delete data["Symbols"];
	delete data["Date"];

	converted_datas.push({date:date});
	
	for(let d in data){
	    price = Number(data[d]);
	    stock_num = stockConvertFunc(d).toString();
            converted_datas[i][stock_num] = price;
	} 
	data["Date"] = date;
    }
    return converted_datas;
}

function dateFilter(datas, date_range, dateConvertFunc){
    let start_date = date_range[0];
    let end_date = date_range[1];

    let filtered_datas = [];
    for(let i=0;i<datas.length;i++){
	let date = dateConvertFunc(datas[i]["date"]);
	if(start_date <= date && date <= end_date){
	    filtered_datas.push(datas[i]);
	}
    }
    return filtered_datas;
}

function stockFilter(datas, stock_index, stockConvertFunc){
    let filtered_datas = [];

    for(let i=0;i<datas.length;i++){
	let stock = stockConvertFunc(datas[i]["stock_index"]);
        let stock_cmp = (element) => element === stock;
	if(stock_index.some(stock_cmp)){
	    filtered_datas.push(datas[i]);
	}
    }
    return filtered_datas;
}

/* DATA PREPROCESSING END */



/*TEST*/
function drawTags(svg, keys, color, x, y){
// Add one dot in the legend for each name.
var size = 20
svg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("y", y)
    .attr("x", function(d,i){ return x + i*(size+50)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("y", y + size*0.6)
    .attr("x", function(d,i){ return x + i*(size+50) + (size+25)/2}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/index-chart
function IndexChart(data, {
  canvas_id,
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value for series
  defined = undefined, // for gaps in data
  curve = d3.curveLinear, // how to interpolate between points
  marginTop = 20, // top margin, in pixels
  marginRight = 40, // right margin, in pixels
  marginBottom = 80, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 1000, // outer width, in pixels
  height = 500, // outer height, in pixels
  xType = d3.scaleUtc, // the x-scale type
  xDomain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  xFormat, // a format specifier string for the x-axis
  yType = d3.scaleLinear, // the y-scale type
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  yFormat = "", // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  zDomain, // array of z-values
  formatDate = "%b %-d, %Y", // format specifier string for dates (in the title)
  colors = d3.schemeTableau10, // array of categorical colors
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);
  if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  const D = d3.map(data, defined);

  // Compute default x- and z-domains, and unique the z-domain.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (zDomain === undefined) zDomain = Z;
  zDomain = new d3.InternSet(zDomain);

  // Omit any data not present in the z-domain.
  const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));
  const Xs = d3.sort(I.filter(i => D[i]).map(i => X[i])); // for bisection later

  // Compute default y-domain.
  if (yDomain === undefined) {
    const adjust = 0.05;
    const rup = I => d3.max(I, i => Y[i]); // / d3.min(I, i => Y[i]);
    const rlow = I => d3.min(I, i => Y[i]);
    const upper = d3.max(d3.rollup(I, rup, i => Z[i]).values()) + adjust;
    const lower = d3.min(d3.rollup(I, rlow, i => Z[i]).values()) - adjust;
    yDomain = [lower, upper];
  }

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange).interpolate(d3.interpolateRound);
  const yScale = yType(yDomain, yRange);
  const color = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80, xFormat).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(null, yFormat);

  // Construct formats.
  formatDate = xScale.tickFormat(null, formatDate);

  // Construct a line generator.
  const line = d3.line()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y((i, _, I) => yScale(Y[i])); // / Y[I[0]]));

  const svg = d3.select(canvas_id).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .on("touchstart", event => event.preventDefault())
      .on("pointermove", pointermoved);

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call(g => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("stroke-opacity", d => d === 1 ? null : 0.2)
          .attr("x2", width - marginLeft - marginRight))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  drawTags(svg, zDomain, color, marginLeft, height-marginLeft-10);

  const rule = svg.append("g");

  rule.append("line")
      .attr("y1", marginTop)
      .attr("y2", height - marginBottom - 15)
      .attr("stroke", "currentColor");

  const ruleLabel = rule.append("text")
      .attr("y", height - marginBottom - 15)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .attr("dy", "1em");

  const serie = svg.append("g")
    .selectAll("g")
    .data(d3.group(I, i => Z[i]))
    .join("g");

  serie.append("path")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke", ([z]) => color(z))
      .attr("d", ([, I]) => line(I));

  serie.append("text")
      .attr("font-weight", "bold")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("x", ([, I]) => xScale(X[I[I.length - 1]]))
      .attr("y", ([, I]) => yScale(Y[I[I.length - 1]])) // / Y[I[0]]))
      .attr("dx", 3)
      .attr("dy", "0.35em")
      .text(([z]) => z)
    .clone(true)
      .attr("fill", ([z]) => color(z))
      .attr("stroke", null);



  function update(date) {
    date = Xs[d3.bisectCenter(Xs, date)];
    rule.attr("transform", `translate(${xScale(date)},0)`);
    ruleLabel.text(formatDate(date));
    serie.attr("transform", ([, I]) => {
      const i = I[d3.bisector(i => X[i]).center(I, date)];
      return `translate(0, 0)`;//${yScale(1) - yScale(Y[i] / Y[I[0]])})`;
    });
    svg.property("value", date).dispatch("input", {bubbles: true}); // for viewof
  }

  function pointermoved(event) {
    update(xScale.invert(d3.pointer(event)[0]));
  }

  //update(xDomain[0]);

  return Object.assign(svg.node(), {scales: {color}, update});
}

function drawChart(datas){
    chart = IndexChart(datas, {
	  canvas_id: "#my_canvas",
	  x: d => d.date,
	  y: d => d.price,
	  z: d => d.stock,
	  yLabel: "Close Price",
   })

	d3.select(chart)
	  .on("pointerenter", () => d3.select(chart).interrupt())
	  .transition()
	  .ease(d3.easeCubicOut)
	  .duration(2000)
	  .tween("date", () => {
	       const i = d3.interpolateDate(...d3.extent(datas, d => d.date).reverse());
	       return t => chart.update(i(t));
          });
    return chart;
}

/*DRAW END*/


/* MAIN FUNCTIONS */
function deepCopy(inputObject){
  // Return the value if inputObject is not an Object data
  // Need to notice typeof null is 'object'
  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject;
  }

  // Create an array or object to hold the values
  const outputObject = Array.isArray(inputObject) ? [] : {};

  // Recursively deep copy for nested objects, including arrays
  for (let key in inputObject) {
    const value = inputObject[key];
    outputObject[key] = deepCopy(value);
  }

  return outputObject;
}

function getStockDatas(data, date){
    reformed_data = {stock: data["stock_index"], price: data[date], date: new Date(date)};
    return reformed_data;
}
function finalDatas(datas){
    let data_cols = Object.keys(datas[1]);

    final_datas = [];
    for(let i=0;i<datas.length;i++){
    	for(let j=0;j<data_cols.length;j++){
	    if(data_cols[j]!=='stock_index'){
		flatten_data = getStockDatas(datas[i], data_cols[j]);
		final_datas.push(flatten_data);
	    }
        }
    }
    return final_datas;
}
function Main(datas, dates, stocks, dateConvertFunc, stockConvertFunc){

    //convert start date and end date
    date_index = [dateConvertFunc(dates[0]), dateConvertFunc(dates[1])];
    //convert chosen stock indexes
    stock_index = [];
    for(let i=0;i<stocks.length;i++){
    	stock_index.push(stockConvertFunc(stocks[i]));
    }
    console.log("Chosen Stock: ", stock_index);

    //Filter the datas
    filter_date_datas = dateFilter(date_stock_datas, date_index, dateConvertFunc);
    	
    stock_date_datas = transformDatas(filter_date_datas);
    
    filter_stock_datas = stockFilter(stock_date_datas, stock_index, stockConvertFunc);
    console.log("Chosen Datas:\n", filter_stock_datas);

    final_datas = finalDatas(filter_stock_datas);
    console.log("final:", final_datas);
    return final_datas;

}

function getDates(){
    console.log("line chart getDates()");
}

let src_url = "https://raw.githubusercontent.com/weihuang0813/IV_02_FinalProject/main/dataset/stock.csv"

d3.csv(src_url,function(datas){
    console.log("Origin Datas:\n", datas);

    const user_input_listener = document.getElementById("create_chart");
    const sdate_listener = document.getElementById("date1");
    const edate_listener = document.getElementById("date2");
    const stock_listener = document.getElementById("stocks");
    const stock_input_listener = document.getElementById("input_stocks");
    const stock_delete_listener = document.getElementById("delete_stocks");
    const dateConvertFunc = convertDate; 
    const stockConvertFunc = convertStock;

    let draw_count = 0;
    let user_input_count = 0;
    let s_date = "2020/1/1";
    let e_date = "2020/12/31";
    let stocks = []//'2330','2454','2317','2308','2303','2881','1301','1303','2882','2002','2412','2891','3711','2886','1216','2884','3008','2885','3034','1326','2357','1101','5871','2379','2382','2327','2892','5880','6415','2207','2880','3045','2887','6505','2912','5876','4938','1590','2395','2474','1402','1102','2801','9910','4904','2105','6669','8046','2408','2633']


    //Convert datas to my own format. (Return the formatted datas.)
    date_stock_datas = convertDatas(datas, dateConvertFunc, stockConvertFunc);
    console.log("converted datas\n", date_stock_datas);

    stock_input_listener.addEventListener("click", function(){
	stocks.push(stock_listener.value);
	document.getElementById("stock_list").innerHTML = "Stock List: "+ stocks;
    })
    stock_delete_listener.addEventListener("click", function(){
	stocks.pop();
	document.getElementById("stock_list").innerHTML = "Stock List: "+ stocks;
    })

    let tmp = undefined;
    user_input_listener.addEventListener("click", function(){
        s_date = sdate_listener.value;
        e_date = edate_listener.value;
        if(s_date.length===0 || e_date.length===0 || stocks.length<2){
            console.log("line_chart_script: missing information");
                console.log("Time info: ", s_date, "~", e_date);
            console.log("stocks: ", stocks);
        }else{
            /*Need to check user input.*/
            console.log("Time range: ", s_date, "~", e_date);
            input_datas = deepCopy(date_stock_datas);
            draw_datas = Main(input_datas, [s_date, e_date], stocks, dateConvertFunc, stockConvertFunc);
            console.log(draw_datas.stock);
            if(draw_datas.length!==0){
                if(draw_count){tmp.remove();}
                tmp = drawChart(draw_datas);
                    draw_count += 1;
            }
	}
    });


});
