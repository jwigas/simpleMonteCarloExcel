
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 50, bottom: 30, left: 50},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

    
// Adds the svg canvas
var svg = d3.select("#Plot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data

function MonteCarloExponential(xMin,xMax,yMin,yMax,numOfSamples){
    var i;
    radius = xMax - xMin;
    var samples=[];
    var outside=[];
    for (i=0; i<numOfSamples; i++){
      randomX = xMin + Math.random()*(xMax-xMin);
      randomY = yMin + Math.random()*(yMax-yMin);
      if(randomY<Math.exp(randomX)){
        samples.push([randomX,randomY])
        //console.log(samples) //uncomment to cek the output
      }
      else{
        outside.push([randomX,randomY])
      }
    }
    return [samples,outside];
}

function AreaOfFunctionMC(xMin,xMax,yMin,yMax,ratio){
  Area = (xMax-xMin)*(yMax-yMin)*ratio
  return Area;
}

xMin = 0
xMax = 5
yMin = 0
yMax = 200

numOfSamples = 10000
data = MonteCarloExponential(xMin,xMax,yMin,yMax,numOfSamples)

console.log(data[0])

console.log("counted: ",data[0].length," total samples: ",numOfSamples," Ratio: ",ratio = data[0].length/numOfSamples) 
console.log("area under exponential(x) is :", AreaOfFunctionMC(xMin,xMax,yMin,yMax,ratio))
console.log("While the analytics result is : ",Math.exp(5)-1)

//Printed in html
document.getElementById("Values")
    .innerHTML= "counted: " + data[0].length + " total samples: " + numOfSamples + " Ratio: " + ratio + "</br>"
                +"area of quarter cirle is :" + AreaOfFunctionMC(xMin,xMax,yMin,yMax,ratio) + "</br>"
                + "While the analytics result is : " + (Math.exp(5)-1);


    // Scale the range of the data
    x.domain([0,d3.max(data[0], function(d) { return d[0]; })+1]);
    y.domain([0, d3.max(data[0], function(d) { return d[1]; })+1]);


    // Add the scatterplot
    svg.selectAll("dot")
        .data(data[0])
      .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d[0]); })
        .attr("cy", function(d) { return y(d[1]); })
        .attr("fill","steelblue");

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data[1])
      .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d[0]); })
        .attr("cy", function(d) { return y(d[1]); })
        .attr("fill", "red");  

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
