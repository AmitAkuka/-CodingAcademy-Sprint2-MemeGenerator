'use strict';

console.log('Meme service Working!');

const SAVED_MEME_KEY = 'SavedMemes';
let gImgs = [{ id: 1, url: 'images/1.jpg', keywords: ['funny', 'akward'] },
    { id: 2, url: 'images/2.jpg', keywords: ['animal', 'funny'] },
    { id: 3, url: 'images/3.jpg', keywords: ['animal', 'funny'] },
    { id: 4, url: 'images/4.jpg', keywords: ['animal', 'cat'] },
    { id: 5, url: 'images/5.jpg', keywords: ['funny', 'happy'] },
    { id: 6, url: 'images/6.jpg', keywords: ['funny', 'akward'] },
    { id: 7, url: 'images/7.jpg', keywords: ['funny', 'bad'] },
    { id: 8, url: 'images/8.jpg', keywords: ['funny', 'akward'] },
    { id: 9, url: 'images/9.jpg', keywords: ['funny', 'happy'] },
    { id: 10, url: 'images/10.jpg', keywords: ['funny', 'bad'] },
    { id: 11, url: 'images/11.jpg', keywords: ['akward', 'sad'] },
    { id: 12, url: 'images/12.jpg', keywords: ['bad', 'sad'] },
    { id: 13, url: 'images/13.jpg', keywords: ['akward', 'happy'] },
    { id: 14, url: 'images/14.jpg', keywords: ['funny', 'sad'] },
    { id: 15, url: 'images/15.jpg', keywords: ['funny', 'akward'] },
    { id: 16, url: 'images/16.jpg', keywords: ['funny', 'akward'] },
    { id: 17, url: 'images/17.jpg', keywords: ['bad', 'sad'] },
    { id: 18, url: 'images/18.jpg', keywords: ['funny', 'akward'] },
    { id: 19, url: 'images/19.jpg', keywords: ['akward', 'happy'] },
    { id: 20, url: 'images/20.jpg', keywords: ['akward', 'funny'] },
    { id: 21, url: 'images/21.jpg', keywords: ['happy', 'funny'] },
    { id: 22, url: 'images/22.jpg', keywords: ['funny', 'akward'] },
    { id: 23, url: 'images/23.jpg', keywords: ['funny', 'animal'] },
    { id: 24, url: 'images/24.jpg', keywords: ['funny', 'akward'] },
];
let gStickers = ['sticker1', 'sticker2', 'sticker3', 'sticker4', 'sticker5',
    'sticker6', 'sticker7', 'sticker8', 'sticker9', 'sticker10'
];
let gStickersAmout = 4;
let gStickersStartIdx = 0;
let gSavedMemes = [];
let gMeme = null;
let gGrabbedLine = null;

function setLineTxt(txt) {
    let lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].txt = txt;
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
        isClearSelectedLine: false,
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
    return loadFromStorage(SAVED_MEME_KEY);
}

function loadSavedMemesAmout() {
    let elMemesAmout = document.querySelector('.saved-memes-amout');
    let savedMemes = getSavedMemes();
    if (!savedMemes) {
        elMemesAmout.innerText = 0;
    } else {
        let gSavedMemes = savedMemes;
        elMemesAmout.innerText = gSavedMemes.length;
    }
}

function getStickers() {
    let idxStart = gStickersStartIdx * gStickersAmout;
    let stickers = gStickers.slice(idxStart, idxStart + gStickersAmout);
    return stickers;
}

function updateStickersStartIdx(isLeftClick) {
    if ((gStickersStartIdx - 1 < 0) && isLeftClick ||
        (gStickersStartIdx >= Math.floor((gStickers.length - 1) / gStickersAmout)) && !isLeftClick) return;
    gStickersStartIdx = (isLeftClick) ? gStickersStartIdx - 1 : gStickersStartIdx + 1;
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

function isLineClicked(clickedPos, ctx) {
    gGrabbedLine = gMeme.lines.find((line, idx) => {
        //old way
        // const distance = Math.sqrt((line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2);
        // if (distance <= line.size) {
        //     //update selectedlineidx
        //     meme.selectedLineIdx = idx;
        //     return true;
        // }
        let metrics = ctx.measureText(line.txt);
        let txtWidth = metrics.width;
        let lineAlignPos = 0;
        if (line.align === 'left' && !line.isSticker) lineAlignPos = txtWidth / 2;
        else if (line.align === 'right' && !line.isSticker) lineAlignPos = -txtWidth / 2;
        //Checking if line is sticker, sticker and lines x radius are calculated differently.
        let isInXRadius = (line.isSticker) ? clickedPos.x >= line.pos.x && clickedPos.x <= line.pos.x + line.size :
            clickedPos.x >= line.pos.x - (txtWidth / 2) + lineAlignPos - 8 && clickedPos.x <= line.pos.x + (txtWidth / 2) + lineAlignPos + 8;
        if (isInXRadius && clickedPos.y >= line.pos.y - line.size && clickedPos.y <= line.pos.y + line.size - (line.size / 1.5)) {
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