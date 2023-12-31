import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Landing} from './components/landing'; // Assuming Landing is a default export

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
