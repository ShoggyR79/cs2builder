import { useState } from 'react';
import './App.css';
import InventoryColumns from './components/inventoryColumns';
import { Loading } from './components/loading';

function App() {

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center h-screen bg-gray-900 overflow-hidden">
      {loading && <Loading/>}
      <div className="w-3/4 bg-gray-800 p-4 my-10 rounded-lg shadow-lg">
        <InventoryColumns setLoading={setLoading}/>
      </div>
    </div>

  );
}

export default App;
