/* your javascript goes here */

$(document).ready(initiateApp);

function getPictures(){
	var pictures = JSON.parse(localStorage.getItem('pictures'));
	if (!pictures) {
		pictures = [
			'images/landscape-1.jpg',
			'images/landscape-10.jpg',
			'images/landscape-11.jpg',
			'images/landscape-13.jpg',
			'images/landscape-15.jpg',
			'images/landscape-17.jpg',
			'images/landscape-18.jpg',
			'images/landscape-19.jpg',
			'images/landscape-2.jpg',
			'images/landscape-3.jpg',
			'images/landscape-8.jpg',
			'images/landscape-9.jpg',
			'images/pexels-photo-132037.jpeg',
			'images/pretty.jpg',
		];
	}
	return pictures;
}

function initiateApp(){
	/*advanced: add jquery sortable call here to make the gallery able to be sorted
		//on change, rebuild the images array into the new order
	*/
	var pictures = getPictures();
	$('#gallery').sortable({
		stop: rebuildArray,
		// revert: true,
	});
	makeGallery(pictures);
	addModalCloseHandler();
	$('#reset').on('click', restoreArray);
}
function restoreArray(){
	localStorage.clear();
	$('.imageGallery').remove();
	makeGallery(getPictures());
}
function rebuildArray(imageArray){
	var images = $('.imageGallery');
	imageArray = []
	for(var i = 0; i < images.length; i++){
		imageArray.push(images[i].innerText);
	}
	localStorage.setItem('pictures', JSON.stringify(imageArray));
}

function makeGallery(imageArray){
	//use loops and jquery dom creation to make the html structure inside the #gallery section

	//create a loop to go through the images in the imageArray
		//create the elements needed for each picture, store the elements in variable
	for (var i = 0; i < imageArray.length; i++) {
		var figure = $("<figure>", {
			class: 'imageGallery col-xs-12 col-sm-6 col-md-4',
			style: `background-image:url(${imageArray[i]})`,
		});
		var figCaption = $("<figcaption>",{
			text: imageArray[i]
		});

		figure.append(figCaption);
		figure.on('click', displayImage);
		figure.appendTo("#gallery");
	}

		//attach a click handler to the figure you create.  call the "displayImage" function.

		//append the element to the #gallery section

	// side note: make sure to remove the hard coded html in the index.html when you are done!

}

function addModalCloseHandler(){
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
	$('.modal-body > img').click(function(){
		$('#galleryModal').modal('hide');
	});
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
}

function displayImage(){
	//find the url of the image by grabbing the background-image source, store it in a variable
	//grab the direct url of the image by getting rid of the other pieces you don't need

	var imagePath = event.target.innerText;

	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
	// pexels-photo-132037
	//take a look at the lastIndexOf method

	//splitting with regex
	var imageTitle = imagePath.split(/\/|\./)[1];

	//change the modal-title text to the name you found above
	$('.modal-title').text(imageTitle);
	//change the src of the image in the modal to the url of the image that was clicked on
	$('.modal-body > img').attr("src", imagePath);

	//show the modal with JS.  Check for more info here:
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
	$('#galleryModal').modal('show');
}
