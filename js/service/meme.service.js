'use strict';

console.log('Meme service Working!');

const SAVED_MEME_KEY = 'SavedMemes';
let gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'akward'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal', 'funny'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animal', 'funny'] },
    { id: 4, url: 'img/4.jpg', keywords: ['animal', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'akward'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'bad'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'akward'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'bad'] },
    { id: 11, url: 'img/11.jpg', keywords: ['akward', 'sad'] },
    { id: 12, url: 'img/12.jpg', keywords: ['bad', 'sad'] },
    { id: 13, url: 'img/13.jpg', keywords: ['akward', 'happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'sad'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'akward'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'akward'] }
];
let gSavedMemes = [];
let gMeme = null;
let gGrabbedLine = null;

function setLineTxt(txt) {
    let meme = getgMeme();
    let lineIdx = meme.selectedLineIdx;
    meme.lines[lineIdx].txt = txt;
}

function setImg(imgId) {
    let memeImg = gImgs.find((img) => {
        if (img.id.toString() === imgId) return img;
    })
    updategMeme(memeImg);
}


function updategMeme(memeImg) {
    gMeme = {
        selectedImgId: memeImg.id,
        selectedLineIdx: 0,
        lines: [{
            isSticker: false,
            txt: 'Enter your text here...',
            size: 30,
            align: 'center',
            color: 'black',
            strokeColor: 'black',
            fontFamily: 'impact',
            pos: null,
            isDragged: false
        }],
    }
}

function setTxtSize(isIncrease) {
    if (!gMeme.lines.length) return;
    let lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].size = (isIncrease) ? gMeme.lines[lineIdx].size + 5 : gMeme.lines[lineIdx].size - 5;
}

function setTxtAlign(value) {
    let lineIdx = gMeme.selectedLineIdx;
    if (!gMeme.lines.length || gMeme.lines[lineIdx].isSticker) return;
    let memeAlign;
    if (value === 0) {
        memeAlign = 'center';
    } else if (value === 1) {
        memeAlign = 'left';
    } else {
        memeAlign = 'right';
    }
    gMeme.lines[lineIdx].align = memeAlign;
}


function setTxtColor(color) {
    let lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].color = color;
}

function setStrokeColor(color) {
    let lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].strokeColor = color;
}

function setSticker(id) {
    if (gMeme.lines.length === 3) return;
    gMeme.lines.push({
        isSticker: true,
        stickerId: id,
        size: 50,
        pos: null,
        isDragged: false
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function setNewLine() {
    //limited to 3 text inputs
    if (gMeme.lines.length === 3) return;
    gMeme.lines.push({
        isSticker: false,
        txt: 'Enter your text here...',
        size: 30,
        align: 'center',
        color: 'black',
        strokeColor: 'black',
        fontFamily: 'impact',
        pos: null,
        isDragged: false
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function setSwitchLine() {
    if (!gMeme.lines.length) return;
    (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? gMeme.selectedLineIdx = 0: gMeme.selectedLineIdx += 1;
    return gMeme.selectedLineIdx;
}

function setNewFont(font) {
    if (!gMeme.lines.length) return;
    let lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].fontFamily = font;
}

function setNewPos(isDown) {
    if (!gMeme.lines.length) return;
    let lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].pos.y = (isDown) ? gMeme.lines[lineIdx].pos.y += 5 : gMeme.lines[lineIdx].pos.y -= 5;
}

function deleteLine() {
    if (!gMeme.lines.length) return;
    let lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
}

function deleteSavedMemes() {
    let savedMemes = getSavedMemes();
    savedMemes.length = 0;
    saveToStorage(SAVED_MEME_KEY, savedMemes);
}

function saveMeme() {
    const data = gElCanvas.toDataURL();
    gSavedMemes.push(data);
    saveToStorage(SAVED_MEME_KEY, gSavedMemes);
}


function getSavedMemes() {
    gSavedMemes = loadFromStorage(SAVED_MEME_KEY);
    return gSavedMemes;
}

function loadSavedMemesAmout() {
    getSavedMemes();
    let savedMemes = gSavedMemes;
    document.querySelector('.saved-memes-amout').innerText = savedMemes.length;
}

function getgMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getGrabbedLine() {
    return gGrabbedLine;
}

function isLineClicked(clickedPos) {
    gGrabbedLine = gMeme.lines.find((line, idx) => {
        //old way
        // const distance = Math.sqrt((line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2);
        // if (distance <= line.size) {
        //     //update selectedlineidx
        //     meme.selectedLineIdx = idx;
        //     return true;
        // }
        if (clickedPos.x >= line.pos.x - line.size * 4.5 && clickedPos.x <= line.pos.x + line.size * 5 && clickedPos.y >= line.pos.y - line.size / 2 && clickedPos.y <= line.pos.y + line.size * 1.2) {
            gMeme.selectedLineIdx = idx;
            return true;
        }
    });
    //checking if grabbed is not falsy;
    return (gGrabbedLine);
}

function setLineDrag(isDrag) {
    gGrabbedLine.isDragged = isDrag;
}

function moveLine(dx, dy) {
    gGrabbedLine.pos.x += dx;
    gGrabbedLine.pos.y += dy;
}