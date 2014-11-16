var trafficData=[
	{traffic:13,label:"Node1", color:"#D500F9"},
	{traffic:5,label:"Node2", color:"#F50057"},
	{traffic:7,label:"Node3", color:"#651FFF"},
	{traffic:25,label:"Node4", color:"#FF3D00"},
	{traffic:20,label:"Node5", color:"#00B0FF"},
	{traffic:15,label:"Node6", color:"#14E715"},
	{traffic:15,label:"Node7", color:"#FF9100"}
];

var svg = d3.select("#pieChart").append("svg").attr("width",300).attr("height",300);

svg.append("g").attr("id","trafficChart");

Donut3D.draw("trafficChart", getData(), 150, 150, 130, 100, 30, 0.4);

	
function changeData(){
	Donut3D.transition("trafficChart", getData(), 130, 100, 30, 0.4);
}

function getData(){
	return trafficData.map(function(d){ 
		return {label:d.label, value:d.traffic, color:d.color};});
}