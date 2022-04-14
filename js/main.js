'use strict';
console.log('MainJS Working!');


function onInit() {
    console.log('Init');
    renderGallery();
    loadSavedMemesAmout();
    // renderMeme(); now render only when user selected img.
}

function addListeners() {
    document.querySelector('#color-input').addEventListener('input', function() {
        onChangeColor(this.value);
    });
    document.querySelector('#stroke-color-input').addEventListener('input', function() {
        onChangeStrokeColor(this.value);
    });
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderMeme();
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function toggleMenu() {
    var elNavContainer = document.querySelector('.main-nav-container');
    elNavContainer.classList.toggle('open');
}