import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-400 p-4 flex justify-between">
      <Link to="/" className="text-black font-semibold">Home</Link>
      <div className="space-x-4">
        <Link to="/addcategory" className="text-black font-semibold">Add Category</Link>
        <Link to="/addsubcategory" className="text-black font-semibold">Add SubCategory</Link>
        <Link to="/addproduct" className="text-black font-semibold">Add Product</Link>
      </div>
    </nav>
  );
};

export default NavBar;
