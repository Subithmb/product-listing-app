import React, { useEffect, useState } from "react";

import Buttons from "./CommonComponents/Buttons";
import TextFields from "./CommonComponents/TextFields";
import baseURL from '../Config/API'
import axios from "axios";
import NavBar from "./CommonComponents/Navbar";
const Addcategory = () => {
  const [name, setName] = useState("");
  const [categoryData, setcategoryData] = useState();

  const [selectedOption, setSelectedOption] = useState("null");

  useEffect(() => {
    console.log(baseURL, 'yuuuuuuuuuuuuuuuuuuuuuu');
    axios.get('http://localhost:5000/category')
      .then((response) => {
        console.log(response?.data?.categoryData);
        setcategoryData(response?.data?.categoryData)
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);
  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const submit=()=>{
    console.log(name,selectedOption);
    if(selectedOption!=null){

    axios.post('http://localhost:5000/addCategory',{newCategory:name,parent:selectedOption})
      .then((response) => {
        console.log(response?.data?.categoryData);
      
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
    }else{

        axios.post('http://localhost:5000/addCategory',{newCategory:name,parent:'null'})
      .then((response) => {
        console.log(response?.data?.categoryData);
       
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
    }
  }
  return (
    <>
    <NavBar/>
    <div  className="flex flex-wrap justify-around px-16 mt-24">
    <p >add category / sub category</p>
    </div>
      <div className="flex flex-wrap justify-around px-16 mt-4">
       
        <TextFields
          name="category name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div  className="flex flex-wrap justify-around px-16  mb-1">
        <p>select catgory to make this as subcategory</p>
      </div>

       
      <div className="flex flex-wrap justify-around px-16 mb-2">
       
        <select
        
          value={selectedOption}
          onChange={handleOptionChange}
          className="border border-gray-300 text-black py-2 px-4 rounded inline-flex items-center focus:outline-none"
        >
    
          <option value="null">null</option>

        {categoryData?.map((data)=>{
            return(
                <>
            <option value={data.name}>{data.name}</option>
                </>
            )
            
        })  }
         
        </select>
      </div>

      <div className="flex flex-wrap justify-around px-16 ">
        <Buttons name="click" click={submit}/>
      </div>
    </>
  );
};

export default Addcategory;
