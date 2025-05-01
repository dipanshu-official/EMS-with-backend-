import React, { useState, useEffect } from 'react';

// Dummy product data
const initialProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    stock: 15,
    category: 'Electronics',
    status: 'In Stock',
    image: 'https://via.placeholder.com/60'
  },
  {
    id: 2,
    name: 'Running Shoes',
    price: 59.99,
    stock: 0,
    category: 'Footwear',
    status: 'Out of Stock',
    image: 'https://via.placeholder.com/60'
  },
  {
    id: 3,
    name: 'Backpack',
    price: 39.99,
    stock: 25,
    category: 'Accessories',
    status: 'In Stock',
    image: 'https://via.placeholder.com/60'
  }
];

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(initialProducts);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFiltered(
        products.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, products]);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setSelected(null);
  };

  const handleSave = () => {
    if (selected.id) {
      setProducts(products.map(p => (p.id === selected.id ? selected : p)));
    } else {
      const newProduct = { ...selected, id: Date.now(), image: 'https://via.placeholder.com/60' };
      setProducts([...products, newProduct]);
    }
    setSelected(null);
    setEditing(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <button
            onClick={() => {
              setSelected({ name: '', price: '', stock: '', category: '', status: 'In Stock' });
              setEditing(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full md:w-1/2"
        />

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left text-gray-600">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2"><img src={p.image} alt={p.name} className="h-10 w-10 rounded" /></td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">${p.price}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      p.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button
                      onClick={() => { setSelected(p); setEditing(true); }}
                      className="text-yellow-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {editing && selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{selected.id ? 'Edit' : 'Add'} Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                value={selected.name}
                onChange={e => setSelected({ ...selected, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border px-3 py-2 rounded"
                value={selected.price}
                onChange={e => setSelected({ ...selected, price: parseFloat(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Stock"
                className="w-full border px-3 py-2 rounded"
                value={selected.stock}
                onChange={e => setSelected({ ...selected, stock: parseInt(e.target.value) })}
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full border px-3 py-2 rounded"
                value={selected.category}
                onChange={e => setSelected({ ...selected, category: e.target.value })}
              />
              <select
                value={selected.status}
                onChange={e => setSelected({ ...selected, status: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              >
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setSelected(null); setEditing(false); }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
