import './App.css';
import InventoryColumns from './components/inventoryColumns';

function App() {
  return (
    <div className="flex justify-center h-screen bg-gray-900 overflow-hidden">
      <div className="w-3/4 bg-gray-800 p-4 my-10 rounded-lg shadow-lg">
        <InventoryColumns />
      </div>
    </div>

  );
}

export default App;
