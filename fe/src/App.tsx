import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Create, OwnerView, Register } from './pages';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/ja';

dayjs.extend(weekday);
dayjs.locale('ja');

function App() {
  return (
    <Router basename='/schedule-checker'>
      <Routes>
        <Route path="/" element={<Create/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/register/:eventId/:hash" element={<Register/>} />
        <Route path="/owner/:eventId/:hash" element={<OwnerView/>} />
      </Routes>
    </Router>
  );
}

export default App;
