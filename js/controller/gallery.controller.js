'use strict';

console.log('Gallery controller Working!');

function renderGallery() {
    let imgs = getImgs();
    let strHTML = '';
    strHTML = imgs.map((img) => {
        return `<img id="${img.id}" src="images/${img.id}.jpg" onclick="onSelectImg(this.id)">`;
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('');
}

function onSelectImg(imgId) {
    setImg(imgId);
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'flex';
    addListeners();
    renderMeme();
}