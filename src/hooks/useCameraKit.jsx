import { useState } from 'react';

import { bootstrapCameraKit } from '@snap/camera-kit';
import { useEffect } from 'react';

export default function useCameraKit() {
  const [cameraKit, setCameraKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiToken = import.meta.env.VITE_CAMERA_KIT_API_TOKEN;

  useEffect(() => {
    async function initCameraKit() {
      if (!apiToken) {
        console.error('Missing Camera Kit API token');
        return;
      }
      
      const cameraKit = await bootstrapCameraKit(apiToken);
      setCameraKit(cameraKit);

      setLoading(false);
    }

    initCameraKit();
  }, []);

  return {
    cameraKit,
    loading
  }
}