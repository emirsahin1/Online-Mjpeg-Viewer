const rotateLeftButton = document.querySelector('#r_left');
const rotateRightButton = document.querySelector('#r_right');
const videoElement = document.querySelector('#video');
const stopButton = document.querySelector('#stop');
const urlField = document.querySelector('#url');
const zoomRange = document.querySelector('#zoom-range');
const zoomSlider = document.querySelector('#zoom-slider');
const panSliderY = document.querySelector('#pan-sliderY');
const panSliderX = document.querySelector('#pan-sliderX');
const hideControlsButton = document.querySelector('#hide-controls');
const controls = document.querySelector('#controls');


let rotationAngle = localStorage.getItem('rotation') || 0;
let isStreaming = false;

let zoomValue = localStorage.getItem('zoom') || 1;
zoomSlider.value = zoomValue;

let panPositionY = localStorage.getItem('panPositionY') || 50;
panSliderY.value = panPositionY;

let panPositionX = localStorage.getItem('panPositionX') || 50;
panSliderX.value = panPositionX;

// Get the URL input element
const urlInput = document.getElementById('url');

// Load the saved URL value, if it exists
const savedUrl = localStorage.getItem('url');

if (savedUrl) {
  urlInput.value = savedUrl;
  videoElement.src = savedUrl;
  isStreaming = true;
  stopButton.textContent = 'Stop';
}

rotationAngle = localStorage.getItem('rotation') || 0;


updateTransformStyle()

// Save the URL value whenever it changes
urlInput.addEventListener('input', (event) => {
  const url = event.target.value;
  localStorage.setItem('url', url);
});

// Rotate the video left or right
rotateLeftButton.addEventListener('click', () => {
  rotationAngle = (rotationAngle - 90) % 360;
  updateTransformStyle();
  localStorage.setItem('rotation', rotationAngle);
});

rotateRightButton.addEventListener('click', () => {
  rotationAngle = (rotationAngle + 90) % 360;
  updateTransformStyle();
  localStorage.setItem('rotation', rotationAngle);
});

// Start or stop the video
stopButton.addEventListener('click', () => {
    // Stop the video
    if(isStreaming) {
        isStreaming = false;
        stopButton.textContent = 'Start';
        videoElement.src = '';
    }
    else{
        isStreaming = true;
        stopButton.textContent = 'Stop';
        videoElement.src = urlField.value;
    }
});
  
// Update the zoom value and save it to local storage
zoomSlider.addEventListener('input', () => {
    zoomValue = zoomSlider.value;
    localStorage.setItem('zoom', zoomValue);
    updatePanPositionY()
});
  

// Update the pan position and save it to local storage
function updatePanPositionY() {
  panPositionY = panSliderY.value;
  updateTransformStyle();
  localStorage.setItem('panPositionY', panPositionY);
}
panSliderY.addEventListener('input', updatePanPositionY);


// Update the pan position and save it to local storage
function updatePanPositionX() {
    panPositionX = panSliderX.value;
    updateTransformStyle();
    localStorage.setItem('panPositionX', panPositionX);
  }
  panSliderX.addEventListener('input', updatePanPositionX);


// Update the transform style of the video element
function updateTransformStyle() {
  videoElement.style.transform = `rotate(${rotationAngle}deg) scale(${zoomValue}) translateY(${panPositionY - 50}%) translateX(${panPositionX - 50}%)`;
}


hideControlsButton.addEventListener('click', () => {
    controls.classList.toggle('hidden');
    hideControlsButton.textContent = controls.classList.contains('hidden') ? 'Show Controls' : 'Hide Controls';
});