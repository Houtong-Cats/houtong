import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default function Color(props) {
    function handleTakePhoto (dataUri) {
        console.log(dataUri);
      }
    return (
        <div>
            <Camera
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        />
        </div>
    );
}