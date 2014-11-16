var nodes=[
    {
     "id":"nodeOne",
     "type":"node"
     },
     {
     "id":"nodeTwo",
     "type":"node"
     },
     {
     "id":"nodeThree",
     "type":"node"
     },
     {
     "id":"nodeFour",
     "type":"node"
     },
     {
     "id":"nodeFive",
     "type":"node"
     }
]

var nodePoints=[
	{
		"noOfNodes":2,
		"positions":{
			"x":{
				"p0":30,
				"p1":70
			},
			"y":{
				"p0":50,
				"p1":50
			}
		}
	},
	{
		"noOfNodes":3,
		"positions":{
			"x":{
				"p0":30,
				"p1":70,
				"p2":30
			},
			"y":{
				"p0":30,
				"p1":30,
				"p2":70
			}
		}
	},
	{
		"noOfNodes":4,
		"positions":{
			"x":{
				"p0":20,
				"p1":70,
				"p2":30,
				"p3":70
			},
			"y":{
				"p0":20,
				"p1":20,
				"p2":70,
				"p3":70
			}
		}
	},
	{
		"noOfNodes":5,
		"positions":{
			"x":{
				"p0":30,
				"p1":70,
				"p2":50,
				"p3":30,
				"p4":70
			},
			"y":{
				"p0":30,
				"p1":30,
				"p2":50,
				"p3":70,
				"p4":70
			}
		}
	}
]
var svgns = "http://www.w3.org/2000/svg";
var jsonData = generatePositions(nodes);
	drawNetworkDiagram(jsonData);
// var jqhr = $.getJSON("json/networkDetails.json", function() {
// }).done(function(data) {
// 	var jsonData = generatePositions(data);
// 	drawNetworkDiagram(jsonData);
// }).fail(function(error) {
// 	console.log(error.status + "Failure Occured while getting JSON data");
// });

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generatePositions(Nodes) {
	var data = {nodes:[]};
	var noOfNodes = Nodes.length;
	var _tempX=getPositions(noOfNodes,'x');
	var _tempY=getPositions(noOfNodes,'y');
	console.log(_tempX);
	console.log("---------------")
	console.log(_tempY);
	var width = $('.networkTopology').width();
	var height = $('.networkTopology').height();
	var xPositions = [];
	var yPositions = [];
	for (var i = 0; i < noOfNodes; i++) {
		var point="p"+i;
		var xPosition = Math.floor((width*_tempX.point)/100)-10;
		xPositions.push(xPosition);
	}
	for (var i = 0; i < noOfNodes; i++) {
		var point="p"+i;
		var yPosition = Math.floor((height*_tempY.point)/100)-10;
		yPositions.push(yPosition);
	}
	
	for(var i=0; i<xPositions.length;i++){
		Nodes[i].positions = {x:xPositions[i],y:yPositions[i]};
	}
	data.nodes = Nodes;
	//console.log(data.positions);	
	return data;
	
}
function drawNetworkDiagram(jsonData) {	
	$(jsonData.nodes).each(function(i, nodeData) {
		if (nodeData.type == "site") {
			var xPosition = nodeData.positions.x;
			var yPosition = nodeData.positions.y;
			drawSite(xPosition, yPosition);
		} else if (nodeData.type == "node") {
			var xPosition = nodeData.positions.x;
			var yPosition = nodeData.positions.y;
			drawNode(xPosition, yPosition);
		}
	});
	
	
}

function drawSite(xPos, yPos) {
	var site = document.createElementNS(svgns, 'rect');
	site.setAttribute('x', xPos);
	site.setAttribute('y', yPos);
	site.setAttribute('height', '20');
	site.setAttribute('width', '20');
	site.setAttribute('fill', '#FF9900');
	$('#locations').append(site);

}
function drawNode(xPos, yPos) {
	var node = document.createElementNS(svgns, "circle");
	node.setAttribute("cx", xPos);
	node.setAttribute("cy", yPos);
	node.setAttribute("r", 10);
	node.setAttribute("fill", "#0099FF");
	$('#locations').append(node);
}

function getPositions(totalNodes,axistype){
	var nodeDetails;
	var _axis=axistype;
	for(var i=0;i<nodePoints.length;i++){
		if(nodePoints[i].noOfNodes==totalNodes){
			if(axistype=='x'){
				nodeDetails=nodePoints[i].positions.x;
			}else if(axistype=='y'){
				nodeDetails=nodePoints[i].positions.y;
			}else{
				nodeDetails=[];
			}			
		}
	}
	return nodeDetails;
}