var nodes=[
    {
    "id":"SiteOne",
     "type":"site"
     },
     {
     "id":"SiteTwo",
     "type":"site"
     },
     {
     "id":"SiteThree",
     "type":"site"
     },
     {
    "id":"SiteFour",
     "type":"site"
     },
     {
     "id":"SiteFive",
     "type":"site"
     },
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
     },
     {
     "id":"nodeSix",
     "type":"node"
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
	var _randx = [];
	var _randy = [];
	for(var i = 0; i < noOfNodes; i++){
		_randx.push(getRandom(0,noOfNodes)/10);
		_randy.push(getRandom(0,noOfNodes)/10);
	}
	var width = $('.networkTopology').width();
	var height = $('.networkTopology').height();
	var xPositions = [];
	var yPositions = [];
	for (var i = 0; i < noOfNodes; i++) {
		var xPosition = Math.floor((Math.random() * (width-40)) + 10);
		xPositions.push(xPosition);
	}
	for (var i = 0; i < noOfNodes; i++) {
		var yPosition = Math.floor((Math.random() * (height-40)) + 10);
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
