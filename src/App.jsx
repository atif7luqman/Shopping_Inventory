import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  const addProduct = () => {
    // Validate input values
    if (productName.trim() === '' || quantity <= 0 || price < 0.01) {
      alert('Please enter valid product details.');
      return;
    }

    // Calculate the amount for the current product
    const amount = quantity * price;

    if (editIndex !== null) {
      // If editing, update the existing product
      const updatedProducts = [...products];
      updatedProducts[editIndex] = { name: productName, quantity, price, amount };
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      // If not editing, add a new product to the state
      setProducts([...products, { name: productName, quantity, price, amount }]);
    }

    // Clear the form
    setProductName('');
    setQuantity(0);
    setPrice(0);
  };

  const editProduct = (index) => {
    // Set the form values to the values of the selected product
    const productToEdit = products[index];
    setProductName(productToEdit.name);
    setQuantity(productToEdit.quantity);
    setPrice(productToEdit.price);
    setEditIndex(index);
  };

  const deleteProduct = (index) => {
    // Remove the selected product from the state
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const calculateGrandTotal = () => {
    return products.reduce((total, product) => total + product.amount, 0);
  };

  return (
    <>
      <form id="productForm">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0.01"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />

        <button type="button" onClick={addProduct}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </form>

      <table className="product-table">

        <caption>Shopping Inventory Table</caption>

        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.amount}</td>
              <td>
                <button type="button" onClick={() => editProduct(index)}>
                  Edit
                </button>
              </td>
              <td>
                <button type="button" className='deleteButton' onClick={() => deleteProduct(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr className='grandTotal'>
            <td colSpan="3">Grand Total</td>
            <td>{calculateGrandTotal()}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
