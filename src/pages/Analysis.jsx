import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";

export default function Analysis() {
    const webcamRef = useRef(null);
    const [screenshot, setScreenshot] = useState(null);
    const [loading, setLoading] = useState(false);

    const captureScreenshot = () => {
        setLoading(true);
        setTimeout(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            setScreenshot(imageSrc);
            setLoading(false);
            // history.push("/colors/summer"); // Assuming `history` is defined somewhere
        }, 2000); // 2 second delay
    };

    return (
        <div className="bg-[#322C27] min-w-screen min-h-screen" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="flex rounded-md w-screen justify-center object-center pt-[3vw]">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{ width: '80%', height: '500px', transform: 'scaleX(-1)'}}
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/colors/summer">
                    {/* We ran out of API tokens so its manual for now */}
                    <button 
                        onClick={captureScreenshot}
                        disabled={loading}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: loading ? '#CCCCCC' : '#FFFFFF',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {loading ? 'Loading...' : '📸'}
                    </button>
                </Link>
            </div>
        </div>
    );
}
