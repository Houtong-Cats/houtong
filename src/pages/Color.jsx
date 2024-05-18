import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default function Color(props) {
    const [description, setDescription] = useState('');

    async function handleTakePhoto(dataUri) {
        console.log('Photo taken:', dataUri);

        // Note: OpenAI's GPT models cannot directly process images. You might need a separate image recognition API.
        const payload = {
            model: "gpt-4o",
            prompt: "Describe the contents of the following image URL: " + dataUri,
            max_tokens: 300
        };

        try {
            const response = await fetch("https://api.openai.com/v1/completions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${api_key}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error('Response status:', response.status, response.statusText);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from OpenAI:', data);
            setDescription(data.choices[0].text);
        } catch (error) {
            console.error('Error sending data to OpenAI:', error);
        }
    }

    return (
        <div>
            <Camera
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                isImageMirror={true} // Add this line to mirror the image
            />
            <div>
                <h2>Description:</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

