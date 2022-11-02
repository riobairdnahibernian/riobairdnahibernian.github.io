var colors = ["#fee201","#a4df53","#390052"]
var width = 500
var height = width
var radius = width / 2.2
var dotRadius = width * .01
var fields=
	[
	  {radius: 0.1 * radius, label:"gut", tier:1},
	  {radius: 0.2 * radius, label:"heart", tier:1},
	  {radius: 0.3 * radius, label:"mind", tier:1},
	  {radius: 0.4 * radius, label:"match", tier:2},
	  {radius: 0.5 * radius, label:"connect", tier:2},
	  {radius: 0.6 * radius, label:"bond", tier:2},
	  {radius: 0.7 * radius, label:"live", tier:3},
	  {radius: 0.8 * radius, label:"learn", tier:3},
	  {radius: 0.9 * radius, label:"work", tier:3}
	]
const svg = d3.select("svg")
	.attr("viewBox", [0, 0, width, height])
	.attr("text-anchor", "middle")
	.style("display", "block")
	.style("font", "500 14px var(--sans-serif)");

const field = svg.append("g")
	.attr("transform", `translate(${width / 2},${height / 2})`)
	.selectAll("g")
	.data(fields)
	.join("g")
	.lower();

field.append("circle")
	.attr("fill", function(d,i){
		let idx = Math.floor(i/3)
		return colors[idx]
	})
	.attr("opacity",0.4)
	.attr("stroke", function(d,i){
		let idx = Math.floor(i/3)
		// return colors[idx]
		return "#fff"
	})
	.attr("stroke-width", 1)
	.attr("r", function(d,i){
		return d.radius
	})
	.attr("data-bs-toggle","tooltip")
	.attr("data-bs-placement","top")
	.attr("data-bs-title", function(d,i){
		return d['label'];
	})
	.attr("class", function(d,i){
		return "tier_"+d["tier"]
	});	  




const fieldTick = field.selectAll("g")
	.data(d => {
        d.range = [1,2,3,4,5,6,7,8,9,10,11,12]
        return d.range.map(t => ({time: 1, field: d}));
      })
    .join("g")
	.attr("class", "field-tick")
	.attr("transform", (d, i) => {
		// const angle = i / d.field.range.length * 2 * Math.PI - Math.PI / 2;
		const angle = i / 12 * 2 * Math.PI - Math.PI / 2;
		return `translate(${Math.cos(angle) * d.field.radius},${Math.sin(angle) * d.field.radius})`;
	})
	.style("transition", "transform 500ms ease");


const fieldCircle = fieldTick.append("circle")
	.attr("r", dotRadius)
	.attr("fill", "white")
	.attr("opacity",0)
    .style("transition", "transform 500ms ease");









field.on("mouseover", function(event,d){
	_class = ".tier_"+d["tier"]
	d3.selectAll(_class).style("opacity", "100%");
	d3.select(this).selectAll(".field-tick").selectAll("circle").style("opacity", "100%");

	// d3.select(this).selectAll(".field-tick").selectAll("circle") // little circles
	// update the position of the field ticks by rotating using interval 
	// fieldFocus.attr("transform", d => `rotate(${(d.index / d.range.length + d.cycle) * 360})`);
	
	/*
	let ticker = d3.select(this).selectAll(".field-tick")
	let count = 0

	let update = function(e){

		const angle = count / 144 * 2 * Math.PI - Math.PI / 2;
		ticker.attr("transform", `translate(${Math.cos(angle) * d.radius},${Math.sin(angle) * d.radius})`)

		count++
		
		if (count > 144){
			console.log("stop")
			timer.stop()
		}
                
	}
	
	var timer = d3.interval(update, 100 );
	*/


}).on("mouseout",function(event,d){
	// d3.select(this).selectAll("circle").style("opacity", "40%");
	_class = ".tier_"+d["tier"]
	d3.selectAll(_class).style("opacity", "40%");
	d3.select(this).selectAll(".field-tick").selectAll("circle").style("opacity", "0%");
})