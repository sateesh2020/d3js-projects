var mouseX;
var mouseY;
$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
}); 

function drawNetworkTopology(links){
    //Actual logic
    var nodes = {};
    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    console.log(links);
    var width = 1024,
        height = 650;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(50)
        .charge(-1000)
        .on("tick", tick)
        .start();

    var fisheye = d3.fisheye.circular()
                    .radius(200)
                    .distortion(2);

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
        .attr("class", "node");

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

      function mouseover() {
         var _element=d3.select(this);
         var _elementId=_element.attr('id');
         $('#toolTip'+_elementId).show();
           $('#toolTip'+_elementId).css({'top':mouseY,'left':mouseX}).show();
       /* d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 16);*/
      }

      function mouseout() {
        var _element=d3.select(this);
        var _elementId=_element.attr('id');
        $('#toolTip'+_elementId).hide();
      }

      svg.on("mousemove", function() {
          fisheye.focus(d3.mouse(this));

          node.each(function(d) { d.fisheye = fisheye(d); })
              .attr("transform", function(d) { return "translate(" + d.fisheye.x + "," + d.fisheye.y + ")"; })
              .attr("r", function(d) { return d.fisheye.z * 4.5; });

          link.attr("x1", function(d) { return d.source.fisheye.x; })
              .attr("y1", function(d) { return d.source.fisheye.y; })
              .attr("x2", function(d) { return d.target.fisheye.x; })
              .attr("y2", function(d) { return d.target.fisheye.y; });
        });
}