//Data from Server
var data=[
	{	"location":"S1",
		"state":"active",
		"utilization":{
		"gold":25,"silver":20,"bronze":10},
		"stateData":{
		"label":"Down-Time:","start":"00:00","end":"00:00"}
	},
	{
		"location":"S2",
		"state":"scheduled",
		"utilization":{
			"gold":35,"silver":20,"bronze":15},
		"stateData":{
			"label":"Scheduled-Time:","start":"02:00","end":"12:00"}
	},
	{
		"location":"S3-N1",
		"state":"down",
		"utilization":{
			"gold":0,"silver":0,"bronze":0},
		"stateData":{
			"label":"Down-Time:","start":"02:00","end":"12:00"}
	},
	{
		"location":"S1-N1",
		"state":"active",
		"utilization":{
			"gold":15,"silver":23,"bronze":52},
		"stateData":{
			"label":"Down-Time:","start":"00:00","end":"00:00"}
	},
	{
		"location":"S1-N2",
		"state":"active",
		"utilization":{
			"gold":56,"silver":24,"bronze":20},
		"stateData":{
			"label":"Down-Time:","start":"00:00","end":"00:00"}
	},
	{
		"location":"S2-N1",
		"state":"active",
		"utilization":{
			"gold":46,"silver":14,"bronze":20},
		"stateData":{
			"label":"Down-Time:","start":"00:00","end":"00:00"}
	},
	{
		"location":"S2-N2",
		"state":"scheduled",
		"utilization":{
			"gold":52,"silver":16,"bronze":15},
		"stateData":{
			"label":"Scheduled-Time:","start":"12:00","end":"23:00"}
	},
	{
		"location":"S3",
		"state":"scheduled",
		"utilization":{
			"gold":45,"silver":12,"bronze":23},
		"stateData":{
			"label":"Scheduled-Time:","start":"05:00","end":"23:00"}
	},
	{
		"location":"S3-N2",
		"state":"active",
		"utilization":{
			"gold":46,"silver":14,"bronze":20},
		"stateData":{
			"label":"Down-Time:","start":"00:00","end":"00:00"}
	},
	{
		"location":"S3-N3",
		"state":"active",
		"utilization":{
			"gold":46,"silver":14,"bronze":20},
		"stateData":{
			"label":"Down-Time:","start":"00:00","end":"00:00"}
	},
]

function placeData(data){
	data.forEach(function (d){
		var _id=d.location;
		$('#'+_id).find('circle').attr('class',d.state);
		createTooltip(d);
	});
}
function createTooltip(data){
	var _mainClass="statusTip";
	var _tableClass="locationData";
	var _utilClass="utilizationProgress";
	var _seg="segment";
	jQuery('<div/>', {
    id: 'toolTip'+data.location,
    class:_mainClass
	}).appendTo('body');

	var _tableData="<table class="+_tableClass+">"+"<tbody>"+
					"<tr></tr>"+
					"<tr><td>"+
					"Current Utilization:"+
					"</td>"+
					"<td><div class="+_utilClass+">"+
					"<div id='goldSegment' class='segment' style='width:"+
					data.utilization.gold+"%"+
					"'>"+data.utilization.gold+"%"+"</div>"+
					"<div id='silverSegment' class='segment' style='width:"+
					data.utilization.silver+"%"+
					"'>"+data.utilization.silver+"%"+"</div>"+
					"<div id='bronzeSegment' class='segment' style='width:"+
					data.utilization.bronze+"%"+
					"'>"+data.utilization.bronze+"%"+"</div>"+
					"</div></td></tr>"+
					"<tr><td>"+data.stateData.label+"</td>"+
					"<td>"+data.stateData.start+" to "+data.stateData.end+"</td></tr>"
					"</tbody></table>";
	$('#toolTip'+data.location).html(_tableData);		
}
