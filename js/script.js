let images = null;
var images_default = new Array(
    { item: { url: '/images/foto_1.jpg', title: 'Festival de música Rock - The Platers', description: 'Componentes del grupo de música The Platers' } },
    { item: { url: '/images/foto_2.jpg', title: 'Festival de música Rock - The Dream', description: 'Componentes del grupo de música The Dream' } },
    { item: { url: '/images/foto_3.jpg', title: 'Festival de música Rock - Forty-Seven', description: 'Componentes del grupo de música Forty-Seven' } }
);
const images_key = 'images_location';

let loadImagesFromLocalStorage = function () {
    try {
        images_from_localstorage = localStorage.getItem(images_key);
        if (images_from_localstorage != null) {
            images = JSON.parse(images_from_localstorage);
        } else {
            images = images_default;
        }
    } catch (error) {
        alert("Error loading image locations: " + error);
    }
};

let mobile;
let sliderContainer = document.getElementById('slides_container');
let updateSlides = function (mobile) {
    sliderContainer.innerHTML = "";
    loadSlides(mobile /*getEffect()*/);
}

let initializeSlides = function () {
    // load the images of my photoalbum
    loadImagesFromLocalStorage();
    if (images == null) {
        // Use the default
        images = images_default;
    }
};

let loadSlides = function (mobile, effect = null) {
    try {
        // Create the divs for the photo carousel,
        let item_ = '';
        if (effect == null && mobile === false) {
            for (let i = 0; i < images.length; i++) {
                if (i === 0) {
                    item_ += '<div ';
                    item_ += 'class="carousel-item active"';
                    item_ += ' data-bs-interval="10000"';
                    item_ += '>';
                    item_ += '<div class="row"';
                    item_ += '>';
                } else if (i % 3 === 0) {
                    item_ += '<div ';
                    item_ += 'class="carousel-item"';
                    item_ += ' data-bs-interval="10000"';
                    item_ += '>';
                    item_ += '<div class="row"';
                    item_ += '>';
                }
                item_ += '<div class="col">';
                item_ += '<img src="' + images[i].item.url + '" alt="" class="' + effect + ' d-block w-100 p-1 size">';
                item_ += '</div>';


                if (i === 2 || i % 3 === 2) {
                    item_ += '</div>';

                    item_ += '</div>';
                }
            }
            sliderContainer.innerHTML = item_;
        } else if (effect == null && mobile === true) {
            for (let i = 0; i < images.length; i++) {
                if (i === 0) {
                    item_ += '<div ';
                    item_ += 'class="carousel-item active"';
                    item_ += ' data-bs-interval="4000"';
                    item_ += '>';
                } else {
                    item_ += '<div ';
                    item_ += 'class="carousel-item"';
                    item_ += ' data-bs-interval="4000"';
                    item_ += '>';
                }
                item_ += '<img src="' + images[i].item.url + '" alt="" class="' + effect + ' d-block w-100 p-1 size center">';
                item_ += '</div>';
            }
            sliderContainer.innerHTML = item_;
        }
    } catch (error) {
        alert(error);
    }
}

let saveImagesToLocalStorage = function () {
    localStorage.setItem(images_key, JSON.stringify(images));
}



// Put event listeners into place
window.addEventListener("DOMContentLoaded", function (e) {

    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))) {
        // we are from not a mobile or tablet
        mobile = false;
        const movil = document.getElementById('movil');

        movil.classList.add('no-visible');

    } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        // we are from a mobile or tablet
        // console.log('movil');
        mobile = true;

        const noMovil = document.getElementById('no-movil');

        noMovil.classList.add('no-visible');
    }

    // Initialize carousel
    initializeSlides();
    updateSlides(mobile);

    // Grab elements, create settings, etc.
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var confirmPhoto = document.getElementById('confirmPhoto');
    var mediaConfig = { video: true };
    var errBack = function (e) {
        console.log('An error has occurred!', e)
    };

    if (mobile === false) {
        // Put video listeners into place
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
                //video.src = window.URL.createObjectURL(stream);
                video.srcObject = stream;
                video.play();
            });
        }

        /* Legacy code below! */
        else if (navigator.getUserMedia) { // Standard
            navigator.getUserMedia(mediaConfig, function (stream) {
                video.src = stream;
                video.play();
            }, errBack);
        } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(mediaConfig, function (stream) {
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, errBack);
        } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
            navigator.mozGetUserMedia(mediaConfig, function (stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
    }

    // Declare init HTML elements
    if (mobile) {
        const camera = document.querySelector('#camera');
    }
    const photo = document.querySelector('#photo');
    const open = document.querySelector('#open');

    // Event to active input type file
    // Trigger photo take
    open.addEventListener('click', function () {
        if (mobile) {
            camera.click();
        }

        context.drawImage(video, 0, 0, 640, 480);
        canvas.classList.remove('no-visible');
        canvas.classList.add('canvas');
        video.classList.add('no-visible');

        // request confirmation to save photo
        confirmPhoto.classList.remove('no-visible');
        if (mobile === false) {
            document.getElementById('botonRetry').classList.remove('no-visible');
            document.getElementById('retry').addEventListener('click', function () {
                location.reload();
            })
        }
        open.classList.add('no-visible');

        // save canvas image as data url jpeg format quality 0.8
        var dataURL = canvas.toDataURL('image/jpeg', 0.8);

        // set photo image src to dataURL so it can be saved as an image
        photo.src = dataURL;

        // document.getElementById('confirmPhoto').addEventListener('click', function () {

        // ask about title and description
        /* document.getElementById('titleDescrip').classList.remove('no-visible');
        confirmPhoto.classList.add('no-visible'); */

        document.getElementById('save').addEventListener('click', function (event) {
            event.preventDefault();

            let title = document.getElementById('title').value;
            if (title.length === 0) {
                alert('No has escrito nada en el Título');
                return;
            }
            let description = document.getElementById('description').value;
            if (description.length === 0) {
                alert('No has escrito nada en la Descripción');
                return;
            }

            let save = {
                'item': {
                    'url': photo.getAttribute('src'),
                    'title': document.getElementById('title').value,
                    'description': document.getElementById('description').value
                }
            }
            images.unshift(save);

            saveImagesToLocalStorage();
            updateSlides(mobile);
            location.reload();
        })
        // });
    });

    if (mobile) {
        try {
            // Event on change content type file
            camera.addEventListener('change', function (e) {
                // Create url object and show Photo from BLOB Object.
                photo.src = URL.createObjectURL(e.target.files[0]);

                // Create Http Request Instance.
                const xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) console.log(xhttp.responseText);
                };
                // Create Data Form Instance.
                const formData = new FormData();
                // Add blob object into instance.
                formData.append("photo", e.target.files[0]);
                // Open and send data to endpoint /upload
                xhttp.open('POST', window.location.href + 'upload', true);
                xhttp.send(formData);
            });
        } catch (error) {
            alert(error);
        }
    }
}, false);
