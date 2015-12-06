var trafficData=[
	{traffic:13,label:"S1-N1", color:"#D500F9"},
	{traffic:5,label:"S1-N2", color:"#F50057"},
	{traffic:7,label:"S2-N1", color:"#651FFF"},
	{traffic:25,label:"S2-N2", color:"#FF3D00"},
	{traffic:20,label:"S3-N1", color:"#00B0FF"},
	{traffic:15,label:"S3-N2", color:"#14E715"},
	{traffic:15,label:"S3-N3", color:"#FF9100"}
];

var svg = d3.select("#pieChart").append("svg").attr("width",250).attr("height",250);

svg.append("g").attr("id","trafficChart");

Donut3D.draw("trafficChart", getData(), 125, 125, 120, 90, 30, 0.4);

	
function changeData(){
	Donut3D.transition("trafficChart", getData(), 130, 100, 30, 0.4);
}

function getData(){
	return trafficData.map(function(d){ 
		return {label:d.label, value:d.traffic, color:d.color};});
}