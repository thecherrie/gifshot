import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import OverlayWindow from '../../pages/OverlayWindow';
import RecordWindow from '../../pages/RecordWindow';
import { useEffect, useState } from 'react';
import { desktopCapturer, ipcRenderer } from 'electron';

const Hello = () => {
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    if (recorder) {
      recorder.ondataavailable = async (event) => {
        const blob = new Blob([event.data], {
          type: 'video/webm; codecs=vp9',
        })
        window.electron.saveRecording(blob);
        console.log(blob)
        // recordedChunks.push(event.data);
      };

      recorder.handlestop = handleStop

      recorder.start();
    }
  }, [recorder]);

  const handleRecord = (stream) => {
    const options = {
      mimeType: 'video/webm; codecs=vp9',
    };
    console.log(stream);
    setRecorder(new MediaRecorder(stream, options));
  };
  console.log(recorder);
  const handleStop = async (e) => {
    recorder?.stop()

    // const { filePath } = await dialog.showSaveDialog({

    //   buttonLabel: 'Save video',
    //   defaultPath: `vid-${Date.now()}.webm`
    // });

    // console.log(filePath);

    console.log(123);
    // writeFile('test.webm', buffer, () => console.log('video saved successfully!'));
  };

  const handleStream = (stream: any) => {
    handleRecord(stream);
    const video = document.querySelector('video');
    video!.srcObject = stream;
    video!.onloadedmetadata = () => video!.play();
  };

  const handleError = (e: any) => {
    console.log(e);
  };

  const getResource = async () => {
    const sourceId = await window.electron.getSources();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      });
      handleStream(stream);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <div>
      <video width={300} height={300} controls>
        <source src="" type="video/mp4" />
      </video>
      <button onClick={getResource}>strt</button>
      <button onClick={handleStop}>stop</button>
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
