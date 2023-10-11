import React, { useEffect, useState } from 'react';
import NavBar from './CommonComponents/Navbar';
import axios from 'axios';


const ProductCard = () => {

    const[productData,setProductData]=useState()

    useEffect(() => {
       
        axios.get('http://localhost:5000/products')
          .then((response) => {
            // console.log(response?.data?.productData);
            setProductData(response?.data?.productData)
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          });
      }, []);
  
  return (
    <div >   
       <NavBar/>
    <div className="w-full gap-4 items-center justify-center mt-10 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
    {productData?.map((product) => (
    <div className="w-[90%] bg-white rounded-lg shadow-md ml-5 " key={product._id}>
        <div className="p-4">
        <h2 className="text-xl font-semibold">{product?.name}</h2>
        <p className="text-gray-600">{product?.category?.name}</p>
        </div>
    </div>
    ))}
    </div>
    </div>
  );
};


export default ProductCard;
