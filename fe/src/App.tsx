// import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Create, Home, Register } from './pages';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/ja';

dayjs.extend(weekday);
dayjs.locale('ja');

function App() {
  // const [event, setEvent] = useState<number | null>(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/register/:eventId/:hash" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
