let canvas = document.getElementById("puzzleCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();
let tiles = [];
let selectedTileIndex = null;
let tileWidth, tileHeight;
let startTime;
let timerInterval;
let movesNum;

canvas.addEventListener('click', handleTileClick, false);

function selectGrid(cols, rows) {
    // Highlight selected grid size
    document.querySelectorAll('#options button').forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    window.selectedGrid = {cols, rows};
}

function selectImage(src) {
    // Highlight selected image
    document.querySelectorAll('#images img').forEach(img => img.classList.remove('selected'));
    
    // If the source is one of the thumbnails, highlight it
    const thumbnail = Array.from(document.querySelectorAll('#images img')).find(img => img.src === src);
    if (thumbnail) {
        thumbnail.classList.add('selected');
    }

    // Set the selected image source and display it
    window.selectedImageSrc = src;
    document.getElementById('main-image').src = src;
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const userImageSrc = e.target.result; // base64 encoded string of the image
        // Now use userImageSrc as the source for the game image
        // For example, you might set it as the src of an img element or use it in your game logic
        selectImage(userImageSrc);
    };
    reader.readAsDataURL(file);
}

function startGame() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("images").style.display = "none";
    document.getElementById("main-image").style.display = "none";
    document.getElementById("puzzleCanvas").style.display = "block";
    document.getElementById("timer").style.display = "block";
    document.getElementById("moves").style.display = "block";

    const gridSize = window.selectedGrid || {cols: 6, rows: 3};

    canvas.width = 960;
    canvas.height = 480;

    movesNum = 0;
    document.getElementById('moves').textContent = `Moves: ${movesNum}`;

    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);

    img.src = window.selectedImageSrc || 'image1.jpg'; 
    img.onload = function() {
        initializeTiles(gridSize);
    };
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTimeInMilliseconds = currentTime - startTime;
    const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
    const minutes = Math.floor(elapsedTimeInSeconds / 60);
    const seconds = elapsedTimeInSeconds % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function initializeTiles(gridSize) {

    tileWidth = (canvas.width - (gridSize.cols + 1) * 3) / gridSize.cols; // Initialize them here
    tileHeight = (canvas.height - (gridSize.rows + 1) * 3) / gridSize.rows; // Initialize them here

    for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
            tiles.push({srcRow: row, srcCol: col, destRow: row, destCol: col}); // Include destRow and destCol here
        }
    }
    
    tiles.forEach(tile => {
        const randomIndex = Math.floor(Math.random() * tiles.length);
        [tile.destRow, tiles[randomIndex].destRow] = [tiles[randomIndex].destRow, tile.destRow];
        [tile.destCol, tiles[randomIndex].destCol] = [tiles[randomIndex].destCol, tile.destCol];
    });

    drawTiles();
}

function drawTiles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tiles.forEach((tile, index) => {
        let srcX = (tile.srcCol * tileWidth) * (img.width / canvas.width);
        let srcY = (tile.srcRow * tileHeight) * (img.height / canvas.height);
        let srcWidth = tileWidth * (img.width / canvas.width);
        let srcHeight = tileHeight * (img.height / canvas.height);

        let destX = tile.destCol * (tileWidth + 3) + 3;
        let destY = tile.destRow * (tileHeight + 3) + 3;

        ctx.globalAlpha = (index === selectedTileIndex) ? 0.5 : 1.0;
        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, destX, destY, tileWidth, tileHeight);
    });
}

function handleTileClick(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    let clickedTileIndex = getTileIndex(x, y, tileWidth, tileHeight);
    let refTileIndex = sourceTileIndex(x, y, tileWidth, tileHeight);
    
    if (clickedTileIndex !== refTileIndex) {
        if (selectedTileIndex === null) {
            selectedTileIndex = clickedTileIndex;
        }
        else if (selectedTileIndex === clickedTileIndex) {
            selectedTileIndex = null;
        }
        else {
            swapTiles(selectedTileIndex, clickedTileIndex);
            selectedTileIndex = null;
        }
        drawTiles();
    }
    drawTiles();
    if (puzzleComplete()) {
        console.log('Puzzle is complete!');
        clearInterval(timerInterval);
        victoryAnnounce();
    }
}

function puzzleComplete() {
    return tiles.every((tile) => {
        return tile.srcCol === tile.destCol && tile.srcRow === tile.destRow;
    });
}

function victoryAnnounce() {
    canvas.removeEventListener('click', handleTileClick, false);
    
    // Clear the canvas and draw the full image without boundaries
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("timer").style.display = "none";
    document.getElementById("moves").style.display = "none";
    ctx.drawImage(img, 0, 0, img.width, img.height, 6, 3, canvas.width - 6, canvas.height - 3);

    currentTime = new Date();
    elapsedTimeInMilliseconds = currentTime - startTime;
    elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
    let elapsedTimeInMins = Math.floor(elapsedTimeInSeconds / 60);
    let remainingTimeInSecs = elapsedTimeInSeconds - elapsedTimeInMins * 60;
    document.getElementById('timetaken').textContent = `Time Taken: ${elapsedTimeInMins} M & ${remainingTimeInSecs} S`;
    document.getElementById('timetaken').classList.remove('hidden');

    document.getElementById('totalmoves').textContent = `Total Moves: ${movesNum}`;
    document.getElementById('totalmoves').classList.remove('hidden');
    
    document.getElementById('victoryMessage').classList.remove('hidden');

    setTimeout(function() {
        document.getElementById('playAgainButton').classList.remove('hidden');
    }, 2000);
}

function restartGame() {
    // Implement the logic to restart the game
    // For example, you might reload the page
    location.reload();
    document.getElementById('playAgainButton').classList.add('hidden');
    document.getElementById('victoryMessage').classList.add('hidden');
}

function getTileIndex(x, y, tileWidth, tileHeight) {
    let col = Math.floor(x / (tileWidth + 3));
    let row = Math.floor(y / (tileHeight + 3));
    return tiles.findIndex(tile => tile.destCol === col && tile.destRow === row); // Find the tile with the matching destCol and destRow
}

function sourceTileIndex(x, y, tileWidth, tileHeight) {
    let col = Math.floor(x / (tileWidth + 3));
    let row = Math.floor(y / (tileHeight + 3));
    return tiles.findIndex(tile => tile.srcCol === col && tile.srcRow === row); // Find the tile with the matching destCol and destRow
}

function swapTiles(index1, index2) {
    const temp = {destRow: tiles[index1].destRow, destCol: tiles[index1].destCol};
    tiles[index1].destRow = tiles[index2].destRow;
    tiles[index1].destCol = tiles[index2].destCol;
    tiles[index2].destRow = temp.destRow;
    tiles[index2].destCol = temp.destCol;
    movesNum++;
    document.getElementById('moves').textContent = `Moves: ${movesNum}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
