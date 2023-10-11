import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-300 p-4 flex justify-end">
      <div className="space-x-4">
        <Link to="/addcategory" className="text-black font-semibold">Add Category</Link>
        <Link to="/addproduct" className="text-black font-semibold">Add Product</Link>
      </div>
    </nav>
  );
};

export default NavBar;
