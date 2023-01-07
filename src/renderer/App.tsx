import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import OverlayWindow from '../../pages/OverlayWindow';

const Hello = () => {

  return (
    <div>
      Test
      <Link to="/overlayWindow" replace={true} >
        dfjijdf
      </Link>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Hello />} />
        <Route exact path="/overlayWindow" element={<OverlayWindow />} />
      </Routes>
    </Router>
  );
}
