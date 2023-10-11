import React, { useEffect, useState } from "react";

import Buttons from "./CommonComponents/Buttons";
import TextFields from "./CommonComponents/TextFields";
import baseURL from '../Config/API'
import axios from "axios";
import NavBar from "./CommonComponents/Navbar";
import { useNavigate } from "react-router-dom";
const Addcategory = () => {
  const [name, setName] = useState("");
  const navigate=useNavigate()
  const [categoryData, setcategoryData] = useState();

  const [selectedOption, setSelectedOption] = useState("null");


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const submit=()=>{
    console.log(name);
   
    axios.post('http://localhost:5000/addcategory',{newCategory:name})
      .then((response) => {
        console.log(response?.data?.categoryData);
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
    <p >add category</p>
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
        <Buttons name="click" click={submit}/>
      </div>
    </>
  );
};

export default Addcategory;
