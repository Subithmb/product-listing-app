import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-transparent p-4 flex justify-between shadow-2xl">
      <Link to="/" className="text-[#00df9a] font-semibold">Home</Link>
      <div className="space-x-4">
        <Link to="/category" className="text-[#00df9a] font-semibold">Category</Link>
        <Link to="/addcategory" className="text-[#00df9a] font-semibold">Add Category</Link>
        <Link to="/addsubcategory" className="text-[#00df9a] font-semibold">Add SubCategory</Link>
        <Link to="/addproduct" className="text-[#00df9a] font-semibold">Add Product</Link>
      </div>
    </nav>
  );
};

export default NavBar;

