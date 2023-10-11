// import React, { useEffect, useState } from "react";

// import Buttons from "./CommonComponents/Buttons";
// import TextFields from "./CommonComponents/TextFields";
// import baseURL from '../Config/API'
// import axios from "axios";
// import NavBar from "./CommonComponents/Navbar";

// const AddProduct = () => {
//   const [name, setName] = useState("");
//   const [categoryData, setcategoryData] = useState();

//   const [selectedOption, setSelectedOption] = useState("null");

//   useEffect(() => {
//     console.log(baseURL, 'yuuuuuuuuuuuuuuuuuuuuuu');
//     axios.get('http://localhost:5000/categoryforProduct')
//       .then((response) => {
//         console.log(response?.data?.categoryData);
//         setcategoryData(response?.data?.categoryData)
//       })
//       .catch((error) => {
//         console.error('An error occurred:', error);
//       });
//   }, []);
  

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const submit=()=>{
//     console.log(name,selectedOption);
//     if(selectedOption!='null'){

//     axios.post('http://localhost:5000/addProduct',{productname:name,categoryId:selectedOption})
//       .then((response) => {
//         console.log(response?.data?.ProductData);
//         alert(response?.data?.message)
      
//       })
//       .catch((error) => {
//         alert(error?.response?.data?.message)
//         console.error('An error occurred:', error);
//       });
//     }else{

//        alert('select one category')
//     }
//   }
//   return (
//     <>
//     <NavBar/>
//     <div  className="flex flex-wrap justify-around px-16 mt-24">
//     <p >add Product</p>
//     </div>
//       <div className="flex flex-wrap justify-around px-16 mt-4">
       
//         <TextFields
//           name="product name"
//           type="text"
//           value={name}
//           onChange={handleNameChange}
//         />
//       </div>
//       <div  className="flex flex-wrap justify-around px-16  mb-1">
//         <p>select catgory</p>
//       </div>

       
//       <div className="flex flex-wrap justify-around px-16 mb-2">
       
//         <select
        
//           value={selectedOption}
//           onChange={handleOptionChange}
//           className="border border-gray-300 text-black py-2 px-4 rounded inline-flex items-center focus:outline-none"
//         >
    
//           <option value="null">choose</option>

//         {categoryData?.map((data)=>{
//             return(
//                 <>
//             <option value={data._id}>{data.name}</option>
//                 </>
//             )
            
//         })  }
         
//         </select>
//       </div>

//       <div className="flex flex-wrap justify-around px-16 ">
//         <Buttons name="click" click={submit}/>
//       </div>
//     </>
//   );
// };

// export default AddProduct;


import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from './CommonComponents/Navbar';
import TextFields from './CommonComponents/TextFields';
import Buttons from './CommonComponents/Buttons';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const navigate=useNavigate()
    const [name, setName] = useState("");
    const [selectedOption, setSelectedOption] = useState("null");
    const[productData,setProductData]=useState()
    const [categoryData, setcategoryData] = useState();
    const [status, setStatus] = useState(false);
    const [nameStatus, setNamestatus] = useState(false);

    const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };



    useEffect(() => {
   
    axios.get('http://localhost:5000/category')
      .then((response) => {
        console.log(response?.data?.categoryData);
        setcategoryData(response?.data?.categoryData)
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

    const subcategoryfinding=(id) => {
       console.log('lllllllllllllllll');
       console.log(id);
        axios.get(`http://localhost:5000/categoryforAddProduct?id=${id}`)
          .then((response) => {
            console.log(response?.data?.categoryData,'dffffffffffffff');
            console.log(response?.data?.categoryData?.length,'length');
            if(response?.data?.categoryData?.length ==0){
               
                setStatus(true)
            }else{
                setNamestatus(true)
                setcategoryData(response?.data?.categoryData)
            }
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          });
      }

      const submit=()=>{
        console.log(name,selectedOption,'selectedOption');

        // console.log( addProduct,categoryId)
       
        axios.post('http://localhost:5000/addProduct',{productname:name,categoryId:selectedOption})
          .then((response) => {
            console.log(response?.data?.ProductData);
            if(response?.data?.ProductData){
                alert(response?.data?.message)
                navigate('/')
            }
          
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          });
       
      }


  return (


    <div>
        
        <NavBar/>

       <div  className="flex flex-wrap justify-around px-16 mt-10 mb-1">
         <p className='font-semibold text-2xl'>ADD_PRODUCT</p>
      </div>
      {!status?<>
       <div  className="flex flex-wrap justify-around px-16 mt-10 mb-1">
        {nameStatus? <p className='text-lg'>select Subcategory</p>:<p className='text-lg'>select category</p>}
      </div>

       <div className="flex flex-wrap justify-around px-16 mb-2  ">
            <select
            value={selectedOption}
            onChange={(event) => {
                handleOptionChange(event);
                subcategoryfinding(event.target.value);
            }}
            className="border border-gray-300 w-[20%] text-black py-2 px-4 rounded inline-flex items-center focus:outline-none"
            >
            <option value="null">choose</option>

            {categoryData?.map((data) => (
                <option key={data._id} value={data._id}>
                {data.name}
                </option>
            ))}
            </select>


      </div></>:''}

       {status? <><div className="flex flex-wrap justify-around px-16 mt-7">
       <TextFields
         name="category name"
         type="text"
         value={name}
         onChange={handleNameChange}
       />
     </div>
     <div className="flex flex-wrap justify-around px-16 ">
        <Buttons name="click" click={submit}/>
      </div></>:''}

    </div>
   
  )
}

export default AddProduct