/*!                                                              
 * Pritesh Chandra
 * Research Project
 * Yamana Lab, Waseda University
 * 2015-02-07
 *
 * Click website links with JS using Leap Motion
 * 
 * License: Creative Commons (CC) license 
 */

// Use for testing only; Display frame data on webpage
//window.output = $('#output');
//window.outputgesture = $('#outputgesture');

window.cursor = $('#cursor');
var controllerOptions = {enableGestures: true};
var outputgestureContent = "";
Leap.loop(controllerOptions, 
{
	frame: function(frame){
		var hand = frame.hands[0];
	  
		
		
		// Use for testing only; 
		//outputgestureContent = frame.gesture.type;
		//outputgesture.html(outputgestureContent);
		
		if(frame.valid && frame.gestures.length > 0)
		{
			frame.gestures.forEach(function(gesture)
			{
				if (gesture.type)
				{	
					outputgestureContent = gesture.type;
				}
				
				// Use for testing only; Display gesture type on browser console
				//console.log(gesture.type);
			});
		}
		
		// Use for testing only; 
		//outputgesture.html(outputgestureContent);
		//if (outputgestureContent)
		//{
		//	console.log(outputgestureContent);
		//}
		
		var URLlink = "";
		var URLTarget = "";

		if (hand)
		{
			var screenPosition = hand.screenPosition(hand.palmPosition);
			
			// Use for testing only; 
			//var outputContent = "";
			//var outputgestureContent = "";
			
			cursor.hide();
			var el = document.elementFromPoint(
				hand.screenPosition()[0],
				hand.screenPosition()[1]
			);
			cursor.show();		

			cursor.css({
				left: screenPosition[0] + 'px',
				top:  screenPosition[1] + 'px'
			});

			if (el){
				// Use for testing only; 
				//outputContent += '<br>Topmost element: '+ el.tagName + ' #' + el.id +  ' .' + el.className + ' LINK: ' + el.href;
				//outputgestureContent = frame.gesture.type;
				
				if (!!el.href && el.href != "")
				{
					URLlink = el.href;
					if (el.target)
					{
						URLTarget = el.target;
					}else{
						URLTarget = "";
					}
				}
			}
		
			// Using for testing only; 
			// console.log(outputgestureContent + " " + URLlink + " " + URLTarget);
			// output.html(outputContent);
			// console.log(outputContent);
			// outputgesture.html(outputgestureContent);
			// var dot = Leap.vec3.dot(hand.direction, hand.indexFinger.direction);
			// console.assert(!isNaN(dot));
			// out.innerHTML = dot.toPrecision(2);
		}
		
		if ((outputgestureContent == "keyTap") && (URLlink))
		{
			outputgestureContent = "";
			
			cursor.css({
				left: '10px',
				top:  '10px'
			});

			//location.href = URLlink;
			if (URLTarget != "")
			{
				window.open(URLlink,   URLTarget);
			}else{
				window.open(URLlink, "_self");
			}	
			
		}
	}
}).use('screenPosition', 
{
	scale: 0.70
});
