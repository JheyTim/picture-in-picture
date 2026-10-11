# Picture in Picture

A small HTML, CSS, and JavaScript project that displays a shared screen, window, or browser tab in a floating picture-in-picture video window.

## How to use it

The intended flow is:

1. Open the page. The script attempts to display the browser's sharing picker.
2. If the picker opens, choose a screen, window, or tab and allow sharing.
3. Wait for the selected stream to load, then click **START**.
4. Use the browser's floating video window while working in other windows.
5. Close the floating window to leave picture-in-picture. Use the browser's **Stop sharing** control to end screen capture as well.

## Project files

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Defines the hidden video element, START button, favicon, and stylesheet/script links. |
| [script.js](script.js) | Requests screen capture, plays the stream, and handles the picture-in-picture button. |
| [style.css](style.css) | Centers the button and defines its font, gradient, shadows, and hover/pressed effects. |
| [pip_logo.png](pip_logo.png) | Browser tab favicon. |

The page loads the Barlow font from Google Fonts. If it cannot load, the button uses a sans-serif fallback.

## How the code works

1. `document.getElementById()` finds the video and button using their HTML ids.
2. `selectMediaStream()` calls `navigator.mediaDevices.getDisplayMedia()` to request a capture source.
3. The returned live stream is assigned to `videoElement.srcObject`.
4. The `loadedmetadata` handler calls `play()` once the video's metadata is available. The video remains hidden on the page.
5. Clicking **START** disables the button and calls `requestPictureInPicture()` on that video.
6. After a successful request, the button is enabled again.