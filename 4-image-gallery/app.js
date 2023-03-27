const images = document.querySelectorAll(".image img");
const prevImage = document.querySelector(".prev");
const nextImage = document.querySelector(".next");
const closeGallery = document.querySelector(".close");
const galleryImg = document.querySelector(".gallery_inner img");
const gallery = document.querySelector(".gallery");

let currentIndex = 0;

function showPrevImage() {
    if (currentIndex > 0) {
        currentIndex -= 1;
    } else {
        currentIndex = images.length - 1;
    }
    galleryImg.src = images[currentIndex].src;
}

function showNextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex += 1;
    } else {
        currentIndex = 0;
    }
    galleryImg.src = images[currentIndex].src;
}

images.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentIndex = index;
        galleryImg.src = images[currentIndex].src;
        gallery.classList.add("show_gallery");
    })
})

closeGallery.addEventListener("click", () => {
    gallery.classList.remove("show_gallery");
})

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27 && gallery.classList.contains("show_gallery")) {
        gallery.classList.remove("show_gallery");
    }
})

prevImage.addEventListener("click", () => {
    showPrevImage();
})

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37 && gallery.classList.contains("show_gallery")) {
        showPrevImage();
    }
})

nextImage.addEventListener("click", () => {
    showNextImage();
})

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 39 && gallery.classList.contains("show_gallery")) {
        showNextImage();
    }
})