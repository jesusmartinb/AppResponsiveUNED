let images = null;
let images_default = new Array(
    { item: { url: '/images/foto_1.jpg', title: 'Festival de música Rock - The Platers', description: 'Componentes del grupo de música The Platers' } },
    { item: { url: '/images/foto_2.jpg', title: 'Festival de música Rock - The Dream', description: 'Componentes del grupo de música The Dream' } },
    { item: { url: '/images/foto_3.jpg', title: 'Festival de música Rock - Forty-Seven', description: 'Componentes del grupo de música Forty-Seven' } }
);
const images_key = 'images_location';
let index;
let cycling = true;

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

let effect = 'nones';

let mobile;
let sliderContainer = document.getElementById('slides_container');
let sliderContainer2 = document.getElementById('slides_container_2');
let updateSlides = function (mobile, effect) {
    sliderContainer.innerHTML = "";
    loadSlides(mobile, effect);
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
        if (effect === null && mobile === false) {
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
        } else if (effect === null && mobile === true) {
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
        } else if (effect === 'nones' || effect === 'img-rounded' || effect === 'img-circle' || effect === 'thumbnail') {
            for (let i = 0; i < images.length; i++) {
                item_ += '<div ';
                if (i === 0) {
                    item_ += 'class="carousel-item active"';
                    item_ += ' data-bs-interval="4000"';
                } else {
                    item_ += 'class="carousel-item"';
                    item_ += ' data-bs-interval="4000"';
                }
                item_ += '>';
                item_ += '<img src="' + images[i].item.url + '" alt="" class="' + effect + ' d-block w-100" data-index="' + i + '">';
                item_ += '<div class="container">';
                item_ += '<div class="carousel-caption">';
                item_ += '<h5>' + images[i].item.title + '</h5>';
                item_ += '<p class="lead">' + images[i].item.description + '</p>';
                /* item_ += '<div class="center-block"><h3>';
                item_ += '<a onclick="app.editImage(' + i + ');"><span class="glyphicon glyphicon glyphicon-pencil"></span>&nbsp;';
                item_ += '<a onclick="app.deleteImage(' + i + ');"><span class="glyphicon glyphicon glyphicon-trash"></span>';
                item_ += '</div></h3>';
                item_ += '</div>'; */
                item_ += '</div>';
                item_ += '</div>';
                item_ += '</div>';
                //alert(item_);
            }

            sliderContainer2.innerHTML = item_;
        }
    } catch (error) {
        alert(error);
    }
}

let saveImagesToLocalStorage = function () {
    localStorage.setItem(images_key, JSON.stringify(images));
}

let editImage = function (index) {
    let img = images[index];
    document.getElementById('edittitle').value = img.item.title;
    document.getElementById('editdescription').value = img.item.description;
    document.getElementById('editimage').setAttribute('src', img.item.url);
    document.getElementById('image_modyfing').setAttribute('value', index);
}

let modifyImage = function () {
    try {
        let it = {
            'item': {
                'url': document.getElementById('editimage').getAttribute('src'),
                'title': document.getElementById('edittitle').value,
                'description': document.getElementById('editdescription').value
            }
        }

        let index = document.getElementById('image_modyfing').getAttribute('value');
        console.log(index);
        images[index] = it;

        saveImagesToLocalStorage();
        console.log(mobile);
        updateSlides(mobile, 'nones');
    } catch (error) {
        alert(error);
    }


}

// stop/start carousel
let stopStartCarousel = function (cycling, index) {
    let myCarousel = document.getElementById("carouselExampleCaptions");

    let carousel = bootstrap.Carousel.getInstance(myCarousel);
    let carouselItems = document.querySelectorAll('.carousel-item');

    if (cycling === true) {
        carousel.pause();
        cycling = false;
        for (let i = 0; i < carouselItems.length; i++) {
            console.log(index);
            carouselItems[i].classList.remove('active');
            if (i == index) {
                carouselItems[i].classList.add('active');
                console.log(carouselItems[i]);
            }
        }
    } else {
        carousel.cycle();
        cycling = true;
        for (let i = 0; i < carouselItems.length; i++) {
            console.log(index);
            carouselItems[i].classList.remove('active');
            if (i == index) {
                carouselItems[i].classList.add('active');
                console.log(carouselItems[i]);
            }
        }
    }

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

    // change to container imagenes
    let imagenes = document.getElementById('images');
    imagenes.addEventListener('click', function (event) {
        event.preventDefault();

        document.getElementById('fotografia').classList.add('no-visible');
        document.getElementById('imagenes').classList.remove('no-visible');

        document.getElementById('foto').classList.remove('activ');
        imagenes.classList.add('activ');

        // Initialize carousel
        initializeSlides();
        updateSlides(mobile, effect);

        document.getElementById('editInformation').addEventListener('click', function () {
            document.getElementById('edit').classList.remove('no-visible');

            let index = document.querySelector('.active img').getAttribute('data-index');
            console.log(index);
            editImage(index);
            cycling = true;
            stopStartCarousel(cycling, index);

            document.getElementById('editsave').addEventListener('click', function () {
                modifyImage();
                document.getElementById('edit').classList.add('no-visible');
                cycling = false;
                stopStartCarousel(cycling, index);
                //cycling = true;

            });

        });

    })

}, false);
