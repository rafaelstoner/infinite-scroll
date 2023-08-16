import { unsplashApiKey } from '../config.js';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${count}`;
let photosArray = [];
const imageContainer = document.getElementById('image-container');


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);

        photosArray = await response.json();

        displayPhotos(photosArray);
    }
    catch (error) {

    }
}



function displayPhotos(photos) {
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


        link.appendChild(image);
        imageContainer.appendChild(link);
    });
}

function setAttribute(element, attributes) {
    for (key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

}

//On loading
getPhotos();