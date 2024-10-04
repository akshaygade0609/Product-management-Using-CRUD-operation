import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
  const { id } = useParams();  // Get product ID from URL
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState([{ color: '', size: '', price: '' }]);

  // Fetch product details
  useEffect(() => {
    axios.get(`http://localhost:3000/api/product/${id}`)
      .then(response => {
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setVariants(product.variants);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      price,
      description,
      variants
    };

    axios.put(`http://localhost:3000/api/product/${id}`, updatedProduct)
      .then(response => {
        console.log('Product updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <h3>Product Variants</h3>
        {variants.map((variant, index) => (
          <div key={index}>
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={variant.color}
              onChange={(e) => {
                const updatedVariants = [...variants];
                updatedVariants[index].color = e.target.value;
                setVariants(updatedVariants);
              }}
            />
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={variant.size}
              onChange={(e) => {
                const updatedVariants = [...variants];
                updatedVariants[index].size = e.target.value;
                setVariants(updatedVariants);
              }}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={variant.price}
              onChange={(e) => {
                const updatedVariants = [...variants];
                updatedVariants[index].price = e.target.value;
                setVariants(updatedVariants);
              }}
            />
          </div>
        ))}

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
