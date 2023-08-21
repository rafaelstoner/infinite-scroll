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
        console.log('error', error);

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
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('Window.InnerHeight', window.innerHeight);
        console.log('window.srollY', window.scrollY);
        console.log('window.innerHeigt + window.scroll Y', window.innerHeight + window.scrollY);
        console.log('body.offsetHeight', document.body.offsetHeight);
        console.log('')
        console.log('Scrolled');
    }
});


//On loading
getPhotos();