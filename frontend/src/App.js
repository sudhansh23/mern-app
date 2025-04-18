import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/api/items');
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems(); // only once on load
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const clearSelection = () => {
    setSelectedItem(null);
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>MERN CRUD App</h1>
      <ItemForm
        fetchItems={fetchItems}
        selectedItem={selectedItem}
        clearSelection={clearSelection}
      />
      <ItemList
        items={items}               // pass down items
        fetchItems={fetchItems}     // used for delete
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
