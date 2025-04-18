import React from 'react';
import axios from 'axios';

const ItemList = ({ items, fetchItems, handleEdit }) => {
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems(); // refresh list after deletion
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div>
      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name}
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
