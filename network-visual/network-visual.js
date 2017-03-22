/**
 * @module nv
 */

var nv = {
    VERSION: '1.0.0',
    DEBUG: false,
    global: (function () {
        return this;
    }).call(null)
};


// check for D3 Plugin
if (typeof d3 === 'undefined') {
    throw new Error('Require D3 Plugin');
}

// prepare for cross browser
(function () {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (context) {
            var f = this;
            return function () {
                return f.apply(context, arguments);
            };
        };
    }
})();

(function () {
    this.nv = function () {
        this.topology  = null;
        var defaults = {
            width: 600,
            height: 400,
            element: 'body',
            links: [],
            nodes: []
        };
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        } else {
            this.options = defaults;
        }
        visualizeTopology(this);
    };


    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function visualizeTopology(self) {
        this.topology = d3.select(self.options.element)
            .append("svg:svg")
            .attr("width", self.options.width)
            .attr("height", self.options.height)
            .attr("pointer-events", "all")
            .call(d3.zoom().scaleExtent([1, 5]).on("zoom", redraw));
    }
    function redraw() {
      this.topology.attr("transform", d3.event.transform);
    }
})();