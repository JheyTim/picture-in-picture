// These ids connect the JavaScript to the video and START button in index.html.
const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Flow: choose a sharing source -> play its stream -> click START for picture-in-picture.
async function selectMediaStream() {
  try {
    // Ask the browser to let the user choose a screen, window, or tab to share.
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    // A live MediaStream goes in srcObject, rather than a video file URL in src.
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      // Wait for the stream's metadata (such as video dimensions) before playback.
      videoElement.play();
    };
  } catch (error) {
    // This also runs if the user cancels the picker or denies screen sharing.
    console.error('Whoops, error here:', error);
  }
}

button.addEventListener('click', async () => {
  // Prevent repeated clicks while the browser opens the floating video window.
  button.disabled = true;

  // The selected stream must be ready. Keep this request in the click handler
  // because opening picture-in-picture requires a user action.
  await videoElement.requestPictureInPicture();

  // Re-enable after a successful request. If it rejects, this line is skipped;
  // a future error-handling improvement could use finally to always reset it.
  button.disabled = false;
});

// Attempt to show the sharing picker as soon as the script loads.
selectMediaStream();
