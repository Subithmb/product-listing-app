import React, { useEffect, useState } from "react";

import Buttons from "./CommonComponents/Buttons";
import TextFields from "./CommonComponents/TextFields";
import baseURL from '../Config/API'
import axios from "axios";
import NavBar from "./CommonComponents/Navbar";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [categoryData, setcategoryData] = useState();

  const [selectedOption, setSelectedOption] = useState("null");

  useEffect(() => {
    console.log(baseURL, 'yuuuuuuuuuuuuuuuuuuuuuu');
    axios.get('http://localhost:5000/categoryforProduct')
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
    if(selectedOption!='null'){

    axios.post('http://localhost:5000/addProduct',{productname:name,categoryId:selectedOption})
      .then((response) => {
        console.log(response?.data?.ProductData);
        alert(response?.data?.message)
      
      })
      .catch((error) => {
        alert(error?.response?.data?.message)
        console.error('An error occurred:', error);
      });
    }else{

       alert('select one category')
    }
  }
  return (
    <>
    <NavBar/>
    <div  className="flex flex-wrap justify-around px-16 mt-24">
    <p >add Product</p>
    </div>
      <div className="flex flex-wrap justify-around px-16 mt-4">
       
        <TextFields
          name="product name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div  className="flex flex-wrap justify-around px-16  mb-1">
        <p>select catgory</p>
      </div>

       
      <div className="flex flex-wrap justify-around px-16 mb-2">
       
        <select
        
          value={selectedOption}
          onChange={handleOptionChange}
          className="border border-gray-300 text-black py-2 px-4 rounded inline-flex items-center focus:outline-none"
        >
    
          <option value="null">choose</option>

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
        <Buttons name="click" click={submit}/>
      </div>
    </>
  );
};

export default AddProduct;
