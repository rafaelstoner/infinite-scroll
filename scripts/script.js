import { unsplashApiKey } from '../config.js';
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${count}`;
let photosArray = [];
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let totalImages = 0;
let imagesLoaded = 0;
let allImagesLoaded = false;

function trackLoadedImages() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        allImagesLoaded = true;
        loader.hidden = true;
    }

}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);

        photosArray = await response.json();

        displayPhotos(photosArray);
    }

    catch (error) {
        console.log('error', error);

    }
}



function displayPhotos(photos) {
    totalImages = photos.length;
    imagesLoaded = 0;
    photos.forEach(photo => {
        const link = document.createElement('a');

        setAttribute (link, {
            'href' : photo.links.html,
            'target' : '_blank',
        }); 

        const image = document.createElement('img');
        setAttribute(image, {
            'src' : photo.urls.regular,
            'title' : photo.alt_description,
            'alt' : photo.alt_description,

        });


        image.addEventListener('load', trackLoadedImages );
        link.appendChild(image);
        imageContainer.appendChild(link);
    });
}

function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && allImagesLoaded) {
        allImagesLoaded = false;
        getPhotos();
 
    }
});


//On loading
getPhotos();