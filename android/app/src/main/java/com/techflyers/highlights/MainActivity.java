package com.techflyers.highlights;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "MainActivity";
    public static Bridge staticBridge = null; // Static reference for the bridge

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        staticBridge = this.bridge; // Store the bridge instance

        // Initialize plugins here if needed, e.g.:
        // registerPlugin(MyPlugin.class);

        // Handle the intent that started the activity
        handleSendIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        // Handle intents received while the activity is running
        setIntent(intent);
        handleSendIntent(intent);
    }

    private void handleSendIntent(Intent intent) {
        String action = intent.getAction();
        String type = intent.getType();

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
                if (sharedText != null) {
                    Log.d(TAG, "Received shared text: " + sharedText);
                    copyToClipboardAndNotify(sharedText); // Use the combined method
                } else {
                    Log.w(TAG, "Received ACTION_SEND intent with null text.");
                }
            } else {
                 Log.w(TAG, "Received ACTION_SEND intent with unsupported type: " + type);
            }
        }
    }

    private void copyToClipboardAndNotify(String text) {
        ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard != null) {
            ClipData clip = ClipData.newPlainText("Shared Content", text);
            clipboard.setPrimaryClip(clip);
            Log.i(TAG, "Copied shared text to clipboard.");

            // Notify the WebView
            if (staticBridge != null && staticBridge.getWebView() != null) {
                 // Ensure bridge and webview are ready before sending event
                JSObject ret = new JSObject();
                ret.put("sharedText", text);
                // Convert JSObject to String before sending
                staticBridge.triggerWindowJSEvent("sharedTextReceived", ret.toString());
                Log.i(TAG, "Sent sharedTextReceived event to WebView with data: " + ret.toString());
            } else {
                Log.e(TAG, "Bridge or WebView is null, cannot send event to WebView. Event might be sent later if bridge initializes.");
                // Consider queuing the event if the bridge isn't ready yet, though often it should be by this point.
            }
        } else {
             Log.e(TAG, "ClipboardManager is null.");
        }
    }
}
