function drawNetworkTopology(links){
    //Actual logic
    var nodes = {};
    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    var width = 500,
        height = 500;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(100)
        .charge(-1000)
        .on("tick", tick)
        .start();

    var svg = d3.select('.networkTopology').append("svg")
        .attr("class","networkSVG")
        .attr("width", width)
        .attr("height", height);
    var link = svg.selectAll(".link")
        .data(force.links())
        .enter().append("line");

    var node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

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
          .attr("class",function(d){ return d.type;});
      node
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .attr("id",function(d){ return d.name});
    }
}