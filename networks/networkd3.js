var mouseX;
var mouseY;
$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
}); 

function drawNetworkTopology(links){
    //Actual logic
    var nodes = {};
    var width = 400,
        height = 400;
    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    var topology = d3.select(".networkTopology")
      .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("pointer-events", "all")
      .append('svg:g')
        .call(d3.behavior.zoom().scaleExtent([1, 5]).on("zoom", redraw))
      .append('svg:g');

    topology.append('svg:rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'white');

    function redraw() {
      topology.attr("transform",
          "translate(" + d3.event.translate + ")"
          + " scale(" + d3.event.scale + ")");
    }

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(50)
        .charge(-1000)
        .on("tick", tick)
        .start();

   /* var svg = d3.select('.networkTopology').append("svg")
        .attr("class","networkSVG")
        .attr("width", width)
        .attr("height", height)
        .call(d3.behavior.zoom().on("zoom", redraw));*/

    var link = topology.selectAll(".link")
        .data(force.links())
        .enter().append("line");

    var node = topology.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .on('dblclick', connectedNodes);

    node.append("circle")
        .attr("r", 8)
        .attr("class","circle");

    node.append("text")
        .attr("x", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });

    function tick() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; })
          .attr("id", function(d) { return d.source.name+'to'+d.target.name} )
          .attr("class",function(d){ return d.type;});
      node
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .attr("id",function(d){ return d.name});
    }

    //Toggle stores whether the highlighting is on
    var toggle = 0;
    //Create an array logging what is connected to what
    var linkedByIndex = {};
    for (i = 0; i < nodes.length; i++) {
        linkedByIndex[i + "," + i] = 1;
    };
    links.forEach(function (d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });
    //This function looks up whether a pair are neighbours
    function neighboring(a, b) {
        return linkedByIndex[a.index + "," + b.index];
    }

    function connectedNodes() {
        if (toggle == 0) {
            //Reduce the opacity of all but the neighbouring nodes
            d = d3.select(this).node().__data__;
            node.style("opacity", function (o) {
                return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
            });
            link.style("opacity", function (o) {
                return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
            });
            //Reduce the op
            toggle = 1;
        } else {
            //Put them back to opacity=1
            node.style("opacity", 1);
            link.style("opacity", 1);
            toggle = 0;
        }
    }
}