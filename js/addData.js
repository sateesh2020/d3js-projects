var data=[
	{
		"location":"S1",
		"state":"active",
		"utilization":{
				"gold":25,
				"silver":20,
				"bronze":10
		},
		"state-data":
				{
					"down-time":{
						"start":"00:00",
						"end":"00:00"
					}
				}
	},
	{
		"location":"S2",
		"state":"scheduled",
		"utilization":{
				"gold":35,
				"silver":20,
				"bronze":15
		},
		"state-data":
				{
					"scheduled-time":{
						"start":"02:00",
						"end":"12:00"
					}
				}
	},
	{
		"location":"S3",
		"state":"down",
		"utilization":{
				"gold":0,
				"silver":0,
				"bronze":0
		},
		"state-data":
				{
					"down-time":{
						"start":"02:00",
						"end":"12:00"
					}
				}
	}
]

var mouseX;
var mouseY;
$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
}); 

$(function () {
        $('.node').hover(function () {
            $('#toolTipData').show();
            $('#toolTipData').css({'top':mouseY,'left':mouseX}).show();
        }, function () {
            $('#toolTipData').hide();
        });
    });


function placeData(data){

	data.forEach(function (d){
		
	});
}