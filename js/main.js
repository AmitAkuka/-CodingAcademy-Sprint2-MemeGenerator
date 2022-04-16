'use strict';
console.log('MainJS Working!');
let gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInit() {
    console.log('Init');
    renderGallery();
    loadSavedMemesAmout();
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    document.querySelector('#color-input').addEventListener('input', function() {
        onChangeColor(this.value);
    });
    document.querySelector('#stroke-color-input').addEventListener('input', function() {
        onChangeStrokeColor(this.value);
    });
    window.addEventListener('resize', () => {
        resizeCanvas();
        onClearSelectedLine();
        //onClear already rendermeme.
        // renderMeme();
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isLineClicked(pos, gCtx)) {
        onClearSelectedLine();
        return;
    }
    setLineDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
    renderMeme(); //We want to mark new line when user click once
}

function onMove(ev) {
    const line = getGrabbedLine();
    if (!line || !line.isDragged) return;
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveLine(dx, dy);
    gStartPos = pos;
    renderMeme();
}

function onUp() {
    if (!getGrabbedLine()) return;
    setLineDrag(false);
    document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos;
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