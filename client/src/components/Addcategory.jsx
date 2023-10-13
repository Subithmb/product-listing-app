import React, {  useState } from "react";

import Buttons from "./CommonComponents/Buttons";
import TextFields from "./CommonComponents/TextFields";

import axios from "axios";
import NavBar from "./CommonComponents/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./CommonComponents/Footer";
const Addcategory = () => {
  const [name, setName] = useState("");
  const navigate=useNavigate()
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const submit=()=>{
    console.log(name);
   
    axios.post('https://serverforproductlisting.onrender.com/addcategory',{newCategory:name})
      .then((response) => {
        // console.log(response?.data?.categoryData);
        if(response?.data?.categoryData){
            alert(response?.data?.message)
            navigate('/')
        }
      
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
   
  }
  return (
    <>
    <NavBar/>
    <div  className="flex flex-wrap justify-around px-16 mt-24">
    <p className='font-semibold text-[#00df9a] text-2xl'>Add Category</p>
    </div>
      <div className="flex flex-wrap justify-around px-16 mt-4">
       
        <TextFields
          name="category name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      

      <div className="flex flex-wrap justify-around px-16 ">
        <Buttons name="Submit" click={submit}/>
      </div>
      <Footer/>
    </>
  );
};

export default Addcategory;
