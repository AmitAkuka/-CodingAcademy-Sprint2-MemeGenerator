'use strict';

console.log('Meme service Working!');

const SAVED_MEME_KEY = 'SavedMemes';
let gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] }
];
let gSavedMemes = [];
let gMeme = null;

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
            txt: 'Enter your text here...',
            size: 30,
            align: 'center',
            color: 'black',
            strokeColor: 'black',
            fontFamily: 'impact',
            newPosition: 0
        }],
        stickers: []
    }
}

function setTxtSize(isIncrease) {
    let meme = getgMeme();
    let lineIdx = meme.selectedLineIdx;
    meme.lines[lineIdx].size = (isIncrease) ? meme.lines[lineIdx].size + 5 : meme.lines[lineIdx].size - 5;
}

function setTxtAlign(value) {
    let meme = getgMeme();
    let lineIdx = meme.selectedLineIdx;
    let memeAlign;
    if (value === 0) {
        memeAlign = 'center';
    } else if (value === 1) {
        memeAlign = 'left';
    } else {
        memeAlign = 'right';
    }
    meme.lines[lineIdx].align = memeAlign;
}

function setSticker(stickerId) {
    let meme = getgMeme();
    let stickerIdx = meme.stickers;
    if (stickerIdx === 3) return;
    meme.stickers.push({ id: stickerId });
}

function setTxtColor(color) {
    let meme = getgMeme();
    let lineIdx = meme.selectedLineIdx;
    meme.lines[lineIdx].color = color;
}

function setStrokeColor(color) {
    let meme = getgMeme();
    let lineIdx = meme.selectedLineIdx;
    meme.lines[lineIdx].strokeColor = color;
}

function setNewLine() {
    let meme = getgMeme();
    //limited to 3 text inputs
    if (meme.lines.length === 3) return;
    meme.lines.push({
        txt: 'Enter your text here...',
        size: 30,
        align: 'center',
        color: 'black',
        strokeColor: 'black',
        fontFamily: 'impact',
        newPosition: 0
    })
    meme.selectedLineIdx = meme.lines.length - 1;
}

function setSwitchLine() {
    let meme = getgMeme();
    if (!meme.lines.length) return;
    (meme.selectedLineIdx >= meme.lines.length - 1) ? meme.selectedLineIdx = 0: meme.selectedLineIdx += 1;
    return meme.selectedLineIdx;
}

function setNewFont(font) {
    let meme = getgMeme();
    if (!meme.lines.length) return;
    let lineIdx = meme.selectedLineIdx;
    meme.lines[lineIdx].fontFamily = font;
}

function setNewPos(isDown) {
    let meme = getgMeme();
    if (!meme.lines.length) return;
    let lineIdx = meme.selectedLineIdx;
    meme.lines[lineIdx].newPosition = (isDown) ? meme.lines[lineIdx].newPosition += 5 : meme.lines[lineIdx].newPosition -= 5;
}

function deleteLine() {
    let meme = getgMeme();
    if (!meme.lines.length) return;
    let lineIdx = meme.selectedLineIdx;
    meme.lines.splice(lineIdx, 1);
}

function saveMeme() {
    const data = gElCanvas.toDataURL();
    gSavedMemes.push(data);
    saveToStorage(SAVED_MEME_KEY, data);
}


function getSavedMemes() {
    return gSavedMemes;
}

function getgMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}



// function getMemeById(memeId) {
//     let memeImg = gImgs.find((img) => {
//             if (img.id.toString() === memeId) return img;
//         })
//         //update gMeme on the new selected img

//     console.log(gMeme);
//     return gMeme;
// }