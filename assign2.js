var tags = [];
var tagString = "";
var num = 1;
var imageArray = [];
var loader = new Image();
loader.id = "loader";
loader.src = "loader.gif";

function addTag() 
{
	tagField = document.getElementById('tagDiv');
    tagField.innerHTML += '<div id = newTagDiv' + num + '><input type="text" id="tag'+num+'"/>' + "   "
	+ '<input type = "button" value = "-"  onClick = "removeTag(this)";>' + '<br /></div>';
    num++;
}

function removeTag(tagNum)
{
	tagDiv.removeChild(tagNum.parentNode);
}

function getTags() 
{
	tagString = "";
	tags[0] = document.getElementById('tag').value;
	for(j=1;j<num;j++)
		{
		input = document.getElementById('tag'+j).value;
		tags[j] = input;
		}
	for(i=0;i<num;i++)
		{
		tagString += tags[i] + ",";
		}
}


function getImages() 
{

	$(function () {
	$("#innerDiv")
	.css({
    "margin": "0 auto",
	})
});

getTags();
	
	if(tagString == ",")
	{
		tagString = "";
		document.getElementById("innerDiv").innerHTML = "No Tags Entered";
		document.getElementById('mainDisplay').innerHTML = "";
	}

	else
	{
		newScript = document.createElement('script');
		request = "https://www.flickr.com/services/rest/?";
		request += "method=flickr.photos.search";
		request += "&per_page=20";
		request += "&api_key=d1208025cbf1c9e894f7cc45d7dd4884";
		request += "&tags=" + tagString ;
		request += "&tag_mode=all";
		request += "&format=json";
		newScript.setAttribute('src', request);
		document.getElementsByTagName('head')[0].appendChild(newScript);
		$('#innerDiv').html(loader);

	}

}

function jsonFlickrApi(images)
{
   newStr ="<ul id = 'thumbnails'>";
   for (i = 0; i < images.photos.photo.length; i++ )
   {       
       url = "http://farm" + images.photos.photo[i].farm;
       url += ".static.flickr.com/";
       url += images.photos.photo[i].server+ "/";
       url += images.photos.photo[i].id+ "_";
       url += images.photos.photo[i].secret;
	 
	   thumburl = url + "_s.jpg" ;
	   main_url = url + "_b.jpg" ;
	   imageArray[i] = main_url;
	   newStr += " <li><img id = 'image"+i+"' src = " + thumburl + " onclick = get_li()></li>";     
    }
	if(newStr == "<ul id = 'thumbnails'>")
	{
	newStr +="</ul>";
	document.getElementById('mainDisplay').innerHTML = "No Results Found";
	document.getElementById('innerDiv').innerHTML = "";
	}
	
	else{
	newStr +="</ul>";
	document.getElementById('innerDiv').innerHTML = newStr;
	  centering();
   }
   	
  
}

$(document).ready(function() { //move caroussel using onscreen buttons

    $('#moveleft').click(function() {

        $('#innerDiv').animate({
        'marginLeft' : "+=95px" 
        });
    });
    
    $('#moveright').click(function() {
        $('#innerDiv').animate({
        'marginLeft' : "-=95px" 
        });
    });

    
});

$(document).keydown(function(e) { //move caroussel using arrows
    switch (e.which) {
    case 37:
        $('#innerDiv').animate({
        'marginLeft' : "+=95px" 
        }); 
        break;
    case 39:
        $('#innerDiv').animate({
        'marginLeft' : "-=95px" 
        }); 
        break;
    }
})


function centering() //only centers first image
{
	
	innerLeftOffset = document.getElementById("image0").offsetLeft;
	halfOuterW = document.getElementById("outerDiv").offsetWidth / 2;
	halfImageW = document.getElementById("image0").offsetWidth / 2;
	outerLeftOffset = halfOuterW - halfImageW; 
	leftPos = outerLeftOffset - innerLeftOffset;
	document.getElementById("innerDiv").style.left = leftPos + "px";
}


function displayImage()
{
	var tags_li = document.getElementsByTagName('li');
	var nr_li = tags_li.length;		

	for ( var i = 0; i < nr_li; i++ ) (function(i)
	{ 
		tags_li[i].onclick = function() 
		{
			var imageSrc = imageArray[i];
			document.getElementById('mainDisplay').innerHTML = "<img src="+imageSrc+">";
			return false;
		}	
	})(i)

}
			



