import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-300 w-full p-4 h-[100vh]">
      <ul className="space-y-2 text-black">
        <li>
          <Link to="/" className="block cursor-pointer font-semibold mb-10">Home</Link>
        </li>
        <li>
          <Link to="/add-category" className="block hover:underline">Add Category</Link>
        </li>
        <li>
          <Link to="/add-product" className="block hover:underline">Add Product</Link>
        </li>
        <li>
          <Link to="/add-product" className="block hover:underline">Add Product</Link>
        </li>
        <li>
          <Link to="/add-product" className="block hover:underline">Add Product</Link>
        </li>
        <li>
          <Link to="/add-product" className="block hover:underline">Add Product</Link>
        </li>
        <li>
          <Link to="/add-product" className="block hover:underline">Add Product</Link>
        </li>
        <li>
          <Link to="/add-product" className="block hover:underline">Add Product</Link>
        </li>
        <li>
          <Link to="/add-product" className="block hover:underline">Add Product</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
