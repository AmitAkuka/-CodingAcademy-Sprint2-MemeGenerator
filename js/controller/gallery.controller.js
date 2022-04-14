'use strict';

console.log('Gallery controller Working!');
let gFilterBy = null;

function renderGallery() {
    let imgs = getImgs();
    let strHTML = '';
    strHTML = imgs.map((img) => {
        if (gFilterBy) {
            if (!img.keywords[0].includes(gFilterBy) && !img.keywords[1].includes(gFilterBy)) return;
        }
        return `<img id="${img.id}" src="images/${img.id}.jpg" onclick="onSelectImg(this.id)">`;
    })
    document.querySelector('.images-container').innerHTML = strHTML.join('');
}

function onSelectImg(imgId) {
    setImg(imgId);
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'flex';
    addListeners();
    renderMeme();
}

function onFilterInput(filterBy) {
    gFilterBy = filterBy.toLowerCase();
    renderGallery();
}