import React, { useEffect, useState } from 'react';
import NavBar from './CommonComponents/Navbar';
import axios from 'axios';
import Footer from './CommonComponents/Footer';


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
      <div className='fixed w-full'>
       <NavBar />
        </div> 
       <div className='overflow-y-auto '>
     
       <div className="bg-gradient-to-t from-teal-300 to-purple-400 h-auto">
        <img className='w-full h-[650px]' src='https://wallpaperaccess.com/full/2677233.jpg' alt="images" />
       </div>

      <div className='w-70 py-[5rem] px-4 bg-white'>
        <p className='text-center text-[#00df9a] font-medium text-4xl underline'>PRODUCTS</p>
              <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 gap-5 mt-6'>
                  {productData?.map((product) => {
                    return (
                      <div key={product._id} className="w-fit h-fit shadow-2xl flex flex-col p-4  rounded-lg hover:scale-105 duration-300 text-center">
                        <img 
                          className="mx-auto  h-[250px] w-[300px] bg-white cursor-pointer"
                          src={product?.photo}
                          alt="/"
                        />
                        <h2 className="text-2xl font-bold text-center py-2">
                        {product?.name}
                        </h2> 
                      </div>
                    );
                  })}
              </div>   
        
          </div>
          </div>
          <Footer />
          </div>
        );
      };


export default ProductCard;
