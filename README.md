# Highlights 360 - YouTube Video Summarizer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered tool to extract summaries, mind maps, and insights from YouTube videos[cite: 1].

**Tags:** YouTube, AI-Powered, Summarization, Mind Maps, Google Gemini, Client-Side [cite: 1]

![App Screenshot Placeholder] ## Overview

Highlights 360 is a specialized web application designed to help users extract valuable insights from YouTube videos without watching them in their entirety[cite: 10]. It leverages AI technology (primarily Google's Gemini) to analyze video transcripts and generate different types of content[cite: 10]:

* **Summaries:** Concise, well-structured overviews of the video content[cite: 10].
* **Mind Maps:** Hierarchical representations of concepts and their relationships[cite: 10].
* **Transcripts:** Full text of the video with optional timestamps[cite: 10].
* **Follow-up Insights:** AI-generated answers to specific questions about the content[cite: 10].

The application runs entirely in the browser, using external APIs for transcript retrieval and AI processing[cite: 11]. This architecture ensures user privacy while providing powerful functionality[cite: 11].

## Features

* **Video Summaries:** Convert lengthy YouTube videos into concise, structured summaries with key points highlighted[cite: 2].
* **Mind Maps:** Generate hierarchical mind maps that visually organize the content and concepts from videos[cite: 3].
* **Timestamped Transcripts:** Access full video transcripts with clickable timestamps for easy navigation[cite: 4].
* **Follow-up Q&A:** Ask specific questions about the video content and receive AI-generated answers[cite: 5].
* **Dark/Light Theme:** Toggle between dark and light themes for comfortable viewing[cite: 6].
* **Export Capabilities:** Save summaries, mind maps, and transcripts as JPG images or copy to clipboard[cite: 6].
* **Customizable Settings:** Configure AI models, API keys, prompt templates, and transcript preferences[cite: 8].
* **Responsive Design:** Works seamlessly across desktop and mobile devices with adaptive layouts[cite: 9].

## Requirements

To use all features of Highlights 360, you'll need[cite: 12]:

* **Gemini API Key:** For AI-powered summary and mind map generation.
* **RapidAPI Key:** For accessing YouTube transcripts.
* **Modern Web Browser:** Chrome, Firefox, Safari, or Edge recommended.
* **Internet Connection:** Required for API calls and YouTube video loading.

*Note:* While the application requires API keys for full functionality, it does not store or transmit your keys beyond the necessary API requests[cite: 12]. All keys are stored locally in your browser's localStorage[cite: 12].

## Setup & Configuration

1.  **Get API Keys:**
    * **Gemini API Key:**
        * Visit the [Google AI Studio](https://aistudio.google.com/)[cite: 13].
        * Create or sign in to your Google account[cite: 13].
        * Navigate to the "API keys" section and create a new API key[cite: 13].
    * **RapidAPI Key:**
        * Sign up at [RapidAPI](https://rapidapi.com/)[cite: 13].
        * Subscribe to the "YouTube Transcript" API[cite: 13].
        * Copy your RapidAPI key from the dashboard[cite: 13].
2.  **Configure the Application:**
    * Click the settings icon (⚙️) in the bottom right corner[cite: 13].
    * Enter your Gemini API Key and RapidAPI Key[cite: 13].
    * Select your preferred Gemini model (or click "Refresh Models")[cite: 13].
    * Optionally, configure fallback models, maximum video duration, and transcript settings[cite: 13].
    * Customize prompt templates if desired[cite: 13].
    * Click "Save Settings" to store your configuration[cite: 13].

**Important:** The application stores your API keys in your browser's localStorage[cite: 14]. Be cautious when using shared computers[cite: 14]. You can clear this data through your browser settings[cite: 15].

## Usage Guide

1.  **Basic Usage:**
    * Paste a YouTube URL or video ID in the input field[cite: 16].
    * Click "Summarize" for a text summary or "Mindmap" for a visual map[cite: 16].
    * Processing progress is shown via an animated indicator[cite: 16].
    * Results appear in the corresponding tab when ready[cite: 16].
2.  **Working with Results:**
    * **Navigate Tabs:** Switch between Summary, Mindmap, Transcript, and Follow-up views[cite: 17].
    * **Timestamp Navigation:** Click timestamps in transcripts or responses to jump to that video point[cite: 17].
    * **Copy Content:** Use the copy icon (📋) to copy tab content[cite: 17].
    * **Export as JPG:** Use the download icon (💾) to save content as a JPG[cite: 17].
    * **View as JPG:** Use the image search icon (🖼️) to preview the JPG with zoom[cite: 17].
3.  **Follow-up Questions:**
    * Go to the "Follow-up" tab[cite: 18].
    * Enter your question (e.g., "What was said about climate change?")[cite: 18].
    * Click "Ask"[cite: 18].
    * The AI generates an answer based on the transcript[cite: 18].

## AI Models & Prompts

* **Supported AI Models:** Primarily Google Gemini models (`gemini-pro`, `gemini-1.5-pro`)[cite: 19]. Placeholder support for OpenAI, Claude, Groq, OpenRouter exists but requires implementation[cite: 19].
* **Default Prompts:** The application uses specific prompts for summaries, mind maps, and follow-up questions. These are designed to produce structured, Markdown-formatted output with relevant details like timestamps[cite: 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].
* **Customization:** Prompts can be customized in the settings[cite: 32].

## Technical Details

* **Frontend:** Vanilla HTML, CSS, JavaScript[cite: 32].
* **Styling:** Tailwind CSS[cite: 32].
* **Icons:** Material Design Icons[cite: 32].
* **Content Processing:** Marked.js (Markdown parsing), DOMPurify (security)[cite: 32].
* **Media Processing:** html2canvas (JPG export)[cite: 32].
* **API Communication:** Axios[cite: 32].
* **Video Embedding:** YouTube iframe API[cite: 32].
* **API Endpoints:**
    * YouTube Transcript: `https://youtube-transcript3.p.rapidapi.com/api/transcript` [cite: 32]
    * YouTube Video Details: `https://youtube-v31.p.rapidapi.com/videos` [cite: 32]
    * Gemini API: `https://generativelanguage.googleapis.com/v1beta/models` [cite: 32]
* **Data Storage:** Browser `localStorage` is used for API keys, settings, preferences, and custom prompts. Session content (summaries, etc.) is stored in memory and not persisted[cite: 32].

## License

Released under the [MIT License](https://opensource.org/licenses/MIT)[cite: 33].

## Contact

Created by @techflyervp [cite: 33]

## Acknowledgments

* Google's Gemini API for AI processing[cite: 34].
* RapidAPI for transcript extraction[cite: 34].
* YouTube iframe API for video embedding[cite: 34].

## Limitations & Future Improvements

* **Limitations:** Processing very long videos might face API limits; currently optimized for English; fallback AI model support is basic; requires internet[cite: 35].
* **Future Ideas:** Full fallback model implementation, enhanced multi-language support, persistent content storage, batch processing, additional export formats (PDF, Markdown)[cite: 35].

---

*This README was generated based on the provided document Highlights 360 - README.pdf.*