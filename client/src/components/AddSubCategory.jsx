import React, { useEffect, useState } from "react";

import Buttons from "./CommonComponents/Buttons";
import TextFields from "./CommonComponents/TextFields";
import baseURL from '../Config/API'
import axios from "axios";
import NavBar from "./CommonComponents/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./CommonComponents/Footer";

const AddSubcategory = () => {
  const [name, setName] = useState("");
  const navigate=useNavigate()
  const [categoryData, setcategoryData] = useState();

  const [selectedOption, setSelectedOption] = useState("null");

  useEffect(() => {
    console.log(baseURL, 'yuuuuuuuuuuuuuuuuuuuuuu');
    axios.get('http://localhost:5000/categoryforsubcategory')
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
    if(selectedOption!='null' && name.length>0 ){

    axios.post('http://localhost:5000/addsubcategory',{newCategory:name,parent:selectedOption})
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
    }else{
    alert('must add category and name')
    }
  }
  return (
    <>
    <NavBar/>
    <div  className="flex flex-wrap justify-around px-16 mt-24">
    <p className='font-semibold text-[#00df9a] text-2xl'>Add Subcategory</p>
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
        <p>select category</p>
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
            <option value={data._id}>{data.name}</option>
                </>
            )
            
        })  }
         
        </select>
      </div>

      <div className="flex flex-wrap justify-around px-16 ">
        <Buttons name="Submit" click={submit}/>
      </div>
      <Footer/>
    </>
  );
};

export default AddSubcategory;
