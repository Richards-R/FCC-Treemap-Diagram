let w = 1000
let h = 600

let data
let dataArr = []
let movieCateg
let movieName
let movieSales

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

dataArr = data.children[0].children
console.log(dataArr)

movieCateg = dataArr[0].category
console.log(movieCateg)

movieName = dataArr[0].name
console.log(movieName)

movieSales = dataArr[0].value
console.log(movieSales)

svg.selectAll('rect')
.data(dataArr)
.join('rect')
.attr('width', 50)
.attr('height', 40)

.attr('fill', "orange")



}
