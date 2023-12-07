import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function Popup() {
    const [transcript, setTranscript] = useState('');

    // This effect will run once when the component mounts.
    useEffect(() => {
        // Fetch the formatted transcript from storage.
        chrome.storage.local.get(['formattedYoutubeTranscript'], function(result) {
        if (result.formattedYoutubeTranscript) {
            setTranscript(result.formattedYoutubeTranscript);
        }
        });
    }, []);

    // Function to create markup from the transcript text
    const createMarkup = () => {
        // Replace ### with h3 tags
        const htmlTranscript = transcript.replace(
        /### (.*?)\n/g,
        (_, title) => `<h3>${title}</h3>`
        );
        return { __html: htmlTranscript };
    };

    return (
        <div>
        <h1>Transcript</h1>
        {/* This div will render the formatted transcript as HTML */}
        <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
    );
    }

const container = document.getElementById('react-target');
const root = createRoot(container);
root.render(<Popup />);

