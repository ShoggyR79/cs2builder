import { useState } from 'react';
import './App.css';
import InventoryColumns from './components/inventoryColumns';
import { Loading } from './components/loading';

function App() {

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center h-screen bg-[#40413c] overflow-hidden">
      {loading && <Loading/>}
        <InventoryColumns setLoading={setLoading}/>
    </div>

  );
}

export default App;
