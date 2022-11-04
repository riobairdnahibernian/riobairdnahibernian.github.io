

var colors = ["#fee201","#a4df53","#390052"]
var width = 500
var height = width
var radius = width / 2.2
var dotRadius = width * .01
var fields=
	[
	  {radius: 0.1 * radius, label:"gut", tier:1},
	  {radius: 0.2 * radius, label:"mind", tier:1},
	  {radius: 0.3 * radius, label:"heart", tier:1},
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


svg.append("text")
	.text("")
	.attr("x", `${width / 2}`)
	.attr("y", 35)
	.attr("class","tier_label");


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
	// .attr("data-bs-toggle","tooltip")
	// .attr("data-bs-placement","top")
	// .attr("data-bs-title", function(d,i){
	// 	return d['label'];
	// })
	.attr("class", function(d,i){
		return "tier_"+d["tier"]
	});	  




const fieldTick = field.selectAll("g")
	.data(d => {
        d.range = [1,2,3,4,5,6,7,8,9,10,11]
        return d.range.map(t => ({time: 1, field: d}));
      })
    .join("g")
	.attr("class", "field-tick")
	.attr("transform", (d, i) => {
		// const angle = i / d.field.range.length * 2 * Math.PI - Math.PI / 2;
		const angle = (i+1) / 12 * 2 * Math.PI - Math.PI / 2;
		return `translate(${Math.cos(angle) * d.field.radius},${Math.sin(angle) * d.field.radius})`;
	})
	.style("transition", "transform 500ms ease");


const fieldCircle = fieldTick.append("circle")
	.attr("r", dotRadius)
	.attr("fill", "white")
	.attr("opacity",0)
    .style("transition", "transform 500ms ease");


// Making a line Generator
var LineGenerator = d3.line();
var points = [
    [`${width / 2}`,40],
    [`${width / 2}`,35]
];

var pathOfLine = LineGenerator(points);


const arrow = d3.arrow1()
	.id("my-arrow")
    .attr("fill", "white")
    .attr("stroke", "white");



svg.append('path')
	.attr("fill","none")
	.attr("stroke","#ffffff")
	.attr("stroke-width",.75)
	.attr("marker-end", "url(#my-arrow)")
    .attr('d', pathOfLine);

svg.call(arrow);

var activeTier = 0

field.on("click", function(event,d){
	// sets the active tier to the current tier

	let removeCls = ["tier-icon-1","tier-icon-2","tier-icon-3"]
	let addCls = "tier-icon-"+d["tier"]
	
	activeTier = d["tier"]

	let h_child = 2*activeTier-2
	let p_child = 2*activeTier-1

	$(".tier-icon").removeClass("d-none")
	$(".tier-icon").removeClass(removeCls).addClass(addCls)

	$("#tier_text h3, #tier_text p").addClass("d-none")

	$("#tier_text :eq("+h_child+")").removeClass("d-none")
	$("#tier_text :eq("+p_child+")").removeClass("d-none")

	// people icons
	$(".tier-graphics").addClass("tier-graphics-"+activeTier)

})



field.on("mouseover", function(event,d){

	let currTier = d["tier"]
	// remove all highlights - resets everything

	d3.selectAll(".tier_1").style("opacity", "40%"); 
	d3.selectAll(".tier_2").style("opacity", "40%");
	d3.selectAll(".tier_3").style("opacity", "40%");// all big circles at 40% opacity
	d3.select(this).selectAll(".field-tick").selectAll("circle").style("opacity", "0%"); // all small circles hidden
	d3.select(".tier_label").text("") // all label text hidden
	
	let points = [
	    [`${width / 2}`,40],
	    [`${width / 2}`,35]
	];
	d3.select("path")
		.attr('d',LineGenerator(points)) // path hidden

	// people icons
	$(".tier-graphics").removeClass(["tier-graphics-1","tier-graphics-2","tier-graphics-3"])
	$(".tier-graphics").addClass("tier-graphics-"+currTier)
	
	// highlight only current items



	d3.selectAll(".tier_"+currTier).style("opacity", "100%");
	d3.select(this).selectAll(".field-tick").selectAll("circle").style("opacity", "100%");

	d3.select(".tier_label").text(d["label"])

	d3.select("path")
		.attr('d',LineGenerator([[`${width / 2}`,`${height / 2}`-d["radius"]],[`${width / 2}`,40]]))
		
	// tier-icons
	let removeCls = ["tier-icon-1","tier-icon-2","tier-icon-3"]
	let addCls = "tier-icon-"+currTier
		
	let t = d["tier"]
	let h_child = 2*t-2
	let p_child = 2*t-1


	$(".tier-icon").removeClass("d-none")
	$(".tier-icon").removeClass(removeCls).addClass(addCls)

	$("#tier_text h3, #tier_text p").addClass("d-none")

	$("#tier_text :eq("+h_child+")").removeClass("d-none")
	$("#tier_text :eq("+p_child+")").removeClass("d-none")
	// end tier icons

	
	

}).on("mouseout",function(event,d){
	// remove all highlights - resets everything
	d3.selectAll(".tier_1").style("opacity", "40%"); 
	d3.selectAll(".tier_2").style("opacity", "40%");
	d3.selectAll(".tier_3").style("opacity", "40%");// all big circles at 40% opacity
	d3.select(this).selectAll(".field-tick").selectAll("circle").style("opacity", "0%"); // all small circles hidden
	d3.select(".tier_label").text("") // all label text hidden
	
	let points = [
	    [`${width / 2}`,40],
	    [`${width / 2}`,35]
	];
	d3.select("path")
		.attr('d',LineGenerator(points)) // path hidden

	// highlight only active items
	
	// people icons
	$(".tier-graphics").removeClass(["tier-graphics-1","tier-graphics-2","tier-graphics-3"])
	// $(".tier-graphics").removeClass()
	$(".tier-graphics").addClass("tier-graphics-"+activeTier)

	d3.selectAll(".tier_"+activeTier).style("opacity", "100%");

	let removeCls = ["tier-icon-1","tier-icon-2","tier-icon-3"]
	let addCls = "tier-icon-"+activeTier
	
	let h_child = 2*activeTier-2
	let p_child = 2*activeTier-1


	$(".tier-icon").removeClass("d-none")
	$(".tier-icon").removeClass(removeCls).addClass(addCls)

	$("#tier_text h3, #tier_text p").addClass("d-none")

	// a bit of a hack to remove some weird behavior where
	// tier 3 doesn't get its classes removed. 
	if(activeTier>0){
		$("#tier_text :eq("+h_child+")").removeClass("d-none")
		$("#tier_text :eq("+p_child+")").removeClass("d-none")
	}
	


})


