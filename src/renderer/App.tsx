import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import OverlayWindow from '../../pages/OverlayWindow';
import RecordWindow from '../../pages/RecordWindow';
import { useEffect, useState } from 'react';

const Hello = () => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleStop = (): void => {
    recorder?.stop();
  };

  useEffect(() => {
    if (recorder) {
      recorder.ondataavailable = async (event: BlobEvent) => {
        const blob = new Blob([event.data], {
          type: 'video/webm',
        });

        const buffer = await blob.arrayBuffer();

        const bytes = new Int8Array(buffer);
        window.electron.saveRecording(bytes);
      };

      recorder.handlestop = handleStop;

      recorder.start();
    }
  }, [recorder]);

  const handleRecord = () => {
    const options = {
      mimeType: 'video/webm',
    };
    if (stream) {
      setRecorder(new MediaRecorder(stream, options));
    }
  };

  const tempHandleStream = () => {
    const video = document.querySelector('video');
    if (video) {
      video.srcObject = stream;
      video.onloadedmetadata = () => video.play();
    }
  };

  const handleGetStream = async () => {
    const sourceId = await window.electron.getSources();
    try {
      const rawStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
            innerHeight: 100,
            innerWidth: 100,
          },
        },
      });
      setStream(rawStream);
      tempHandleStream();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!stream) {
      handleGetStream();
    }
  }, [stream]);

  return (
    <div>
      <video width={300} height={300} controls>
        <source src="" type="image/mp4" />
      </video>
      <button type="button" onClick={handleRecord}>
        strt
      </button>
      <button type="button" onClick={handleStop}>
        stop
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Hello />} />
        <Route exact path="/overlayWindow" element={<OverlayWindow />} />
        <Route exact path="/recordWindow" element={<RecordWindow />} />
      </Routes>
    </Router>
  );
}
