var nodes=[
    {"id":"S1","type":"site"},
    {"id":"S2","type":"site"},
    {"id":"S3","type":"site"},
    {"id":"S4","type":"site"},
    {"id":"S5","type":"site"}
]
var links=[
	{"source":"S1","target":"S2","stroke":"dashed"},
	{"source":"S1","target":"S3","stroke":"dashed"},
	{"source":"S1","target":"S4","stroke":"none"},
	{"source":"S2","target":"S4","stroke":"none"},
	{"source":"S3","target":"S4","stroke":"none"},
	{"source":"S2","target":"S5","stroke":"none"}
]
var _nodePoints=[
	{"noOfNodes":2,"positions":{"x":{"p0":30,"p1":70},
								"y":{"p0":50,"p1":50}}},
	{"noOfNodes":3,"positions":{"x":{"p0":30,"p1":70,"p2":60},
								"y":{"p0":30,"p1":30,"p2":80}}},
	{"noOfNodes":4,"positions":{"x":{"p0":20,"p1":70,"p2":30,"p3":70},
								"y":{"p0":20,"p1":20,"p2":70,"p3":70}}},
	{"noOfNodes":5,"positions":{"x":{"p0":10,"p1":90,"p2":70,"p3":20,"p4":80},
								"y":{"p0":15,"p1":25,"p2":55,"p3":70,"p4":85}}}
]


var svgns = "http://www.w3.org/2000/svg";


var jsonData = generatePositions(nodes);
	drawNetworkDiagram(jsonData);
	makeLinks(links);
function getPositions(totalNodes,axistype){
	var nodeDetails;
	var _axis=axistype;
	for(var i=0;i<_nodePoints.length;i++){
		if(_nodePoints[i].noOfNodes==totalNodes){
			if(axistype=='x'){
				nodeDetails=_nodePoints[i].positions.x;
			}else if(axistype=='y'){
				nodeDetails=_nodePoints[i].positions.y;
			}else{
				nodeDetails=[];
			}			
		}
	}
	return nodeDetails;
}
function generatePositions(Nodes) {
	var data = {nodes:[]};
	var noOfNodes = Nodes.length;
	var _tempX=getPositions(noOfNodes,'x');
	var _tempY=getPositions(noOfNodes,'y');
	var _width = $('.networkTopology').width();
	var _height = $('.networkTopology').height();
	var xPositions = [];
	var yPositions = [];
	for (var i = 0; i < noOfNodes; i++) {
		var point="p"+i;
		var xPosition = Math.floor((_width*_tempX[point])/100)-10;
		xPositions.push(xPosition);
	}
	for (var i = 0; i < noOfNodes; i++) {
		var point="p"+i;
		var yPosition = Math.floor((_height*_tempY[point])/100)-10;
		yPositions.push(yPosition);
	}
	
	for(var i=0; i<xPositions.length;i++){
		Nodes[i].positions = {x:xPositions[i],y:yPositions[i]};
	}
	data.nodes = Nodes;
	return data;
}

function drawNetworkDiagram(jsonData) {
	var _xPosition=0;
	var _yPosition=0;
	var _id="id";
	$(jsonData.nodes).each(function(i, nodeData) {
		if (nodeData.type == "site") {
			_xPosition = nodeData.positions.x;
			_yPosition = nodeData.positions.y;
			_id=nodeData.id;
			drawSite(_xPosition, _yPosition,_id);
		} else if (nodeData.type == "node") {
			_xPosition = nodeData.positions.x;
			_yPosition = nodeData.positions.y;
			_id=nodeData.id;
			drawNode(_xPosition, _yPosition,_id);
		}
	});
}

function drawSite(xPos, yPos,id) {
	var site = document.createElementNS(svgns, 'rect');
	site.setAttribute('x', xPos);
	site.setAttribute('y', yPos);
	site.setAttribute('id', id);
	site.setAttribute('height', '20');
	site.setAttribute('width', '20');
	site.setAttribute('fill', '#FF9900');
	$('#locations').append(site);
}
function drawNode(xPos, yPos,id) {
	var node = document.createElementNS(svgns, "circle");
	node.setAttribute("cx", xPos);
	node.setAttribute("cy", yPos);
	node.setAttribute('id', id);
	node.setAttribute("r", 10);
	node.setAttribute("fill", "#0099FF");
	$('#locations').append(node);
}

function makeLinks(links){
	var _linkSrtX=0,_linkSrtY=0,_linkEndX=0,_linkEndY=0,_linkType='none',_linkId="";
	for(var i=0;i<links.length;i++){
		var element=$('#'+links[i].source)
			if(jQuery.type(element.attr('x'))!== "undefined"){
				_linkSrtX=parseInt($('#'+links[i].source).attr('x'))+10;
				_linkSrtY=parseInt($('#'+links[i].source).attr('y'))+10;
				_linkEndX=parseInt($('#'+links[i].target).attr('x'))+10;
				_linkEndY=parseInt($('#'+links[i].target).attr('y'))+10;
				_linkType=links[i].stroke;
				_linkId=links[i].source+"to"+links[i].target;
				drawlinks(_linkSrtX,_linkSrtY,_linkEndX,_linkEndY,_linkType,_linkId);
			}
	}
}

function drawlinks(sX,sY,eX,eY,stroke,id){
	var _pathValue='M'+sX+','+sY+'L'+eX+','+eY;
	console.log(_pathValue);
	var path = document.createElementNS(svgns, "path");
	path.setAttribute("d", _pathValue);
	path.setAttribute("stroke-width", "3");
	path.setAttribute('stroke',"#09F");
	path.setAttribute('id',id);
		if(stroke=='dashed'){
			path.setAttribute('stroke-dasharray',"5,5");
		}
	$('#connections').append(path);
}
