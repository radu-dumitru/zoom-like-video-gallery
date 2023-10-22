function findBestFit(containerWidth, containerHeight, videoCount, aspectRatio) {
    let best = { area: 0, cols: 0, rows: 0, width: 0, height: 0 };
    const startCols = videoCount;

    for (let cols = startCols; cols > 0; cols -= 1) {
        const rows = Math.ceil(videoCount / cols);
        const hScale = containerWidth / (cols * aspectRatio);
        const vScale = containerHeight / rows;
        
        let width;
        let height;
        
        if (hScale <= vScale) {
            width = containerWidth / cols;
            height = width / aspectRatio;
        } else {
            height = containerHeight / rows;
            width = height * aspectRatio;
        }

        const area = width * height;
        if (area > best.area) {
            best = { area, width, height, rows, cols };
        }
    }
    return best;
}

function calculateLayout() {
    const containerWidth = parseInt(document.getElementById('widthInput').value);
    const containerHeight = parseInt(document.getElementById('heightInput').value);

    const container = document.getElementById('container');
    container.setAttribute('style',`width:${containerWidth}px`);
    container.setAttribute('style',`height:${containerHeight}px`);

    console.log(containerWidth, containerHeight);

    const videoElements = document.querySelectorAll('video');
    const videoCount = videoElements.length;

    let highestSizeVideo = null;
    let highestSize = 0;

    videoElements.forEach(video => {
    if (video.videoWidth && video.videoHeight) {
        const size = video.videoWidth * video.videoHeight;

        if (size > highestSize) {
            highestSize = size;
            highestSizeVideo = video;
        }
    }
    });

    const aspectRatio = highestSizeVideo.videoWidth / highestSizeVideo.videoHeight;
    const result = findBestFit(containerWidth, containerHeight, videoCount, aspectRatio);

    console.log(result);

    container.style.setProperty('--width', result.width + 'px');
    container.style.setProperty('--height', result.height + 'px');
    container.style.setProperty('--cols', result.cols + '');
}
