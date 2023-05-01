// import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { Test } from './pages/Test';

dayjs.extend(weekday);

function App() {
  // const [event, setEvent] = useState<number | null>(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/test" element={<Test/>} />
      </Routes>
    </Router>
  );
}

export default App;
