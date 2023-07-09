let w = 1000
let h = 600

let data
let dataArr = []
let movieCateg
let movieName
let movieSales

let valueArr = []
let fullArr = []

let minVal
let maxVal


let xScale
let yScale

let URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"


async function foo() {
const response = await fetch(URL)
 data = await response.json();
createTiles();
}

foo();

let svg = d3.select('svg')

d3.select("#treeBoard")
.attr("width", w)
.attr("height", h)
.attr("margin", 0)

let createTiles = () =>{

dataArr = data.children;
console.log(dataArr)

movieCateg = data.children.map((key) => key.name);
console.log(movieCateg)

movieName = dataArr[0].children[0].name
console.log(movieName)

movieSales = dataArr[0].children[0].value
console.log(movieSales)

for (let i=0; i<movieCateg.length; i++){
  for (let j=0; j<dataArr[i].children.length; j++){
  fullArr.push(dataArr[i].children[j])
}}

for (let i=0; i<fullArr.length; i++){
  valueArr.push(Number(fullArr[i].value))
}
console.log(fullArr)
console.log(valueArr)
console.log(typeof valueArr[0])

minVal =d3.min(valueArr)
maxVal = d3.max(valueArr)
console.log(minVal)
console.log(maxVal)

xScale = d3.scaleLinear()
  .domain([minVal, maxVal])
  .range([0, w]);

yScale = d3.scaleLinear()
  .domain([minVal, maxVal])
  .range([0, h]);

svg.selectAll('rect')
.data(fullArr)
.join('rect')
.attr('class', 'tile')
.attr('width', (d)=>(Math.sqrt(xScale(d.value))))
.attr('height', (d)=>(Math.sqrt(yScale(d.value))))
.attr('data-value', (d)=>(d.value))
.attr('data-name', (d)=>(d.name))
.attr('data-category', (d)=>(d.category))
.attr('fill', "orange")



}
