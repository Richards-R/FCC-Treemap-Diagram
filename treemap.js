let w = 1000
let h = 500

let data
let dataArr = []
let movieCateg
let movieName
let movieSales

let valueArr = []
let fullArr = []

let minVal
let maxVal

let treeBoard = d3.select('#treeBoard')
let legend = d3.select('#legend')
let tooltip = d3.select('#tooltip')

let xScale
let yScale

let URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"

let colorArr = ["#ff7f00", "#984ea3", "#ffff33", "#4daf4a", "#377eb8", "#e41a1c", "#a65628"]
console.log(colorArr.length)

async function foo() {
const response = await fetch(URL)
 data = await response.json();
createTiles();
}

foo();

let svg = d3.select('svg')


d3.select("#legend")  
.attr("width", (colorArr.length*75))
.attr("height", 25)
.attr("margin", 0)

d3.select("#treeBoard")
.attr("width", w)
.attr("height", h)
.attr("margin", 0)

let createTiles = () =>{


let hierarchy = d3.hierarchy(data, (node) => node.children)
                  .sum((node)=>node.value)
                  .sort((node1, node2)=>node2.value - node1.value)


let createTreeMap = d3.treemap()
                      .size([w, h])

createTreeMap(hierarchy)

console.log(hierarchy.leaves())

let movieTiles = hierarchy.leaves()
console.log(movieTiles)

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

let block = treeBoard.selectAll('g')
.data(movieTiles)
.join('g')
.attr('transform',(d)=>'translate('+ d.x0 + ', ' + d.y0 +')')

block.append('rect')
     .attr('class', 'tile')
     .attr('fill', ((d)=> (
          d.data.category === "Action" ? colorArr[0] :
          d.data.category === "Drama" ? colorArr[1] :
          d.data.category === "Adventure" ? colorArr[2] :
          d.data.category === "Family" ? colorArr[3] :
          d.data.category === "Animation" ? colorArr[4] :
          d.data.category === "Comedy" ? colorArr[5] : colorArr[6]))
          )
      .attr('width', (d)=>(d.x1-d.x0))
      .attr('height', (d)=>(d.y1-d.y0))
      .attr('data-value', (d)=>(d.data.value))
      .attr('data-name', (d)=>(d.data.name))
      .attr('data-category', (d)=>(d.data.category))
      .on('mouseover', (event, d) => {
      
       tooltip.style('visibility', 'visible')
              .style('left', event.pageX + 20 + 'px')
              .style('top', event.pageY - 28 + 'px')
        
              let revenue = d.data.value
              let name = d.data.name
              let category = d.data.category
       
    
          tooltip.html(name+'<br>(' + category +') $' + revenue)
          tooltip.attr('data-value', (revenue))
          })

      .on('mouseout', (event, d) => {
       tooltip.style('visibility', 'hidden')
      })

  block.append('text')
      .text((d)=> d.data.name)
      .attr('x', 5)
      .attr('y', 20)

  
let legendBlock = legend.selectAll('g')
      .data(colorArr)
      .join('g')
      .attr('transform',(d, i)=> 'translate(' + 75*i + ',0)')

      legendBlock.append('rect')
      .attr('fill', (d)=>(d))
      .attr('class', 'legend-item')
      .attr('width', '75px')
      .attr('height', '20px')

    legendBlock.append('text')
      .data(movieCateg)
      .text((d)=> d)
      .attr('x', 5)
      .attr('y', 13)





}
