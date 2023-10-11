import React from 'react';
import NavBar from './CommonComponents/Navbar';


const ProductCard = () => {
    const productData = [
        { name: 'Product 1', categoryName: 'Category A' },
        { name: 'Product 2', categoryName: 'Category B' },
        { name: 'Product 3', categoryName: 'Category A' },
        // Add more product objects here
      ];
  return (
    <div >   
       <NavBar/>
    <div className="w-full flex gap-4 items-center justify-center mt-10">
         {productData.map((product, index) => (
      <div className=" w-[20%] bg-white rounded-lg shadow-md lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.categoryName}</p>
        </div>
      </div>
         ))}
    </div>
    </div>
  );
};


export default ProductCard;
