import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ fetchItems, selectedItem, clearSelection }) => {
  const [name, setName] = useState('');

  // If an item is selected for editing, populate the form
  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
    }
  }, [selectedItem]);

  // Create a new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      if (selectedItem) {
        // Update item
        await axios.put(`http://localhost:5000/api/items/${selectedItem._id}`, { name });
      } else {
        // Add new item
        await axios.post('http://localhost:5000/api/items', { name });
      }

      fetchItems(); // Refresh the list after add/update
      setName(''); // Clear input field
      clearSelection(); // Clear selected item
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
      />
      <button type="submit">{selectedItem ? 'Update' : 'Add'} Item</button>
    </form>
  );
};

export default ItemForm;
