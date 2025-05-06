import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Clipboard } from '@capacitor/clipboard';

// Component to render the HTML file in an iframe and handle communication
function HtmlRenderer() {
  const iframeRef = useRef(null);
  // --- Use the remote Netlify URL ---
  const iframeSrc = "https://highlights360-web.onrender.com/";
  const expectedIframeOrigin = new URL(iframeSrc).origin; // Dynamically get origin from URL
  // Styles to hide iframe
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        overflow: auto;
      }
      
      html,
      body,
      div,
      iframe {
        margin: 0;
        padding: 0;
        height: 100%;
        border: none;
      }
      
      iframe {
        display: block;
        width: 100%;
        border: none;
        overflow-y: auto;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  // Effect to set up message listener, native event listener, and send parent origin
  useEffect(() => {
    // Listener for messages FROM the iframe
    const handleIframeMessage = async (event) => {
      // --- Security Check: Verify sender's origin ---
      if (event.origin !== expectedIframeOrigin) {
        console.warn(`[Iframe Message] Rejected from unexpected origin: ${event.origin}. Expected: ${expectedIframeOrigin}`);
        return;
      }

      // Ensure the message source is the iframe's content window
      if (event.source !== iframeRef.current?.contentWindow) {
        console.warn("[Iframe Message] Received from correct origin but unexpected source:", event.source);
        return;
      }

      const message = event.data;
      console.log("[Iframe Message] Received:", message);

      // Handle clipboard read request from iframe
      if (message.type === 'requestClipboardRead') {
        console.log("[Iframe Message] Handling requestClipboardRead");
        try {
          // Still attempt to read, might work in non-share scenarios
          const { value } = await Clipboard.read();
          console.log("[Iframe Message] Clipboard.read() successful, value:", value);
          iframeRef.current?.contentWindow.postMessage({
            type: 'clipboardReadResult',
            data: value || ''
          }, expectedIframeOrigin); // --- Target specific origin ---
        } catch (error) {
          console.error('[Iframe Message] Failed to read clipboard via Clipboard.read():', error);
          iframeRef.current?.contentWindow.postMessage({
            type: 'clipboardReadResult',
            error: 'Failed to read clipboard' // Keep error generic for iframe
          }, expectedIframeOrigin); // --- Target specific origin ---
        }
      }
      // Handle file download request from iframe
      else if (message.type === 'requestFileDownload' && message.payload) {
        console.log("[Iframe Message] Handling requestFileDownload");
        const { filename, base64Data } = message.payload;
        if (!filename || !base64Data) {
          console.error('[Iframe Message] Invalid download request payload:', message.payload);
           iframeRef.current?.contentWindow.postMessage({
             type: 'fileDownloadResult',
             success: false,
             error: 'Invalid payload'
           }, expectedIframeOrigin);
          return;
        }

        try {
          const pureBase64 = base64Data.startsWith('data:') ? base64Data.split(',')[1] : base64Data;
          const result = await Filesystem.writeFile({
            path: filename,
            data: pureBase64,
            directory: Directory.Documents, // Using Documents directory
          });

          console.log('[Iframe Message] File written successfully via Capacitor:', result.uri);
          iframeRef.current?.contentWindow.postMessage({
            type: 'fileDownloadResult',
            success: true,
            uri: result.uri
          }, expectedIframeOrigin);
          alert(`File saved to Documents: ${filename}`); // Consider a less intrusive notification

        } catch (error) {
          console.error('[Iframe Message] Error writing file via Capacitor:', error);
           iframeRef.current?.contentWindow.postMessage({
            type: 'fileDownloadResult',
            success: false,
            error: `Capacitor Filesystem error: ${error.message}`
          }, expectedIframeOrigin);
          alert(`Error saving file: ${error.message}`); // Consider a less intrusive notification
        }
      }
    };

    // Listener for events FROM the native Capacitor layer
    const handleNativeEvent = (event) => {
      console.log("[Native Event] Received:", event);
      if (event.type === 'sharedTextReceived' && event.detail?.sharedText) {
        const sharedText = event.detail.sharedText;
        console.log("[Native Event] Received shared text:", sharedText);
        // Send the received text directly to the iframe
        if (iframeRef.current?.contentWindow) {
           console.log("[Native Event] Forwarding shared text to iframe");
           iframeRef.current.contentWindow.postMessage({
             type: 'clipboardReadResult', // Re-use the same type iframe expects
             data: sharedText
           }, expectedIframeOrigin);
        } else {
            console.warn("[Native Event] Iframe not ready to receive shared text.");
        }
      }
    };

    // Add listeners
    window.addEventListener('message', handleIframeMessage);
    window.addEventListener('sharedTextReceived', handleNativeEvent); // Listen for the custom native event

    // --- Send parent origin to iframe once it loads ---
    const sendOriginToIframe = () => {
        if (iframeRef.current?.contentWindow) {
            console.log(`Sending parent origin (${window.location.origin}) to iframe (${expectedIframeOrigin})`);
            iframeRef.current.contentWindow.postMessage({
                type: 'parentOrigin',
                origin: window.location.origin // Send the actual origin of the container
            }, expectedIframeOrigin); // Target the specific iframe origin
        } else {
            console.warn("Iframe content window not ready to receive parent origin.");
        }
    };

    const iframeElement = iframeRef.current;
    if (iframeElement) {
        iframeElement.addEventListener('load', sendOriginToIframe);
    }


    // Cleanup listeners on component unmount
    return () => {
      console.log("Cleaning up listeners");
      window.removeEventListener('message', handleIframeMessage);
      window.removeEventListener('sharedTextReceived', handleNativeEvent);
      if (iframeElement) {
          iframeElement.removeEventListener('load', sendOriginToIframe);
      }
    };
  }, [expectedIframeOrigin]); // Dependency array

  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <iframe
        ref={iframeRef}
        src={iframeSrc} // Use the remote URL
        title="Embedded HTML Content"
        style={{ flexGrow: 1, border: 'none', width: '100%' }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      >
        Your browser does not support iframes.
      </iframe>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HtmlRenderer />
  </React.StrictMode>
);

console.log("React root created, rendering HtmlRenderer with remote iframe communication.");
