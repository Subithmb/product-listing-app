
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from './CommonComponents/Navbar';
import TextFields from './CommonComponents/TextFields';
import Buttons from './CommonComponents/Buttons';
import { useNavigate } from 'react-router-dom';
import Footer from './CommonComponents/Footer';

const AddProduct = () => {

    const navigate=useNavigate()
    const [name, setName] = useState("");
    const [selectedOption, setSelectedOption] = useState("null");
    // const[productData,setProductData]=useState()
    const [categoryData, setcategoryData] = useState();
    const [status, setStatus] = useState(false);
    const [nameStatus, setNamestatus] = useState(false);
    const [photo,setphoto] = useState('')
    const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

    useEffect(() => {
   
    axios.get('https://serverforproductlisting.onrender.com/category')
      .then((response) => {
        // console.log(response?.data?.categoryData);
        setcategoryData(response?.data?.categoryData)
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange=(e)=>{
    
    // console.log(e.target.files[0],'tagetfile');
    const file = e.target.files[0];
    setphoto(file)
  }
    const subcategoryfinding=(id) => {
      
      //  console.log(id);
        axios.get(`https://serverforproductlisting.onrender.com/categoryforAddProduct?id=${id}`)
          .then((response) => {
            // console.log(response?.data?.categoryData,'dffffffffffffff');
            // console.log(response?.data?.categoryData?.length,'length');
            if(response?.data?.categoryData?.length == 0){
               
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

      const submit = () => {
        console.log(name, selectedOption, 'selectedOption');
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('productname', name);
        formData.append('categoryId', selectedOption);
      
        axios
          .post('https://serverforproductlisting.onrender.com/addProduct', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log(response?.data?.ProductData);
            if (response?.data?.ProductData) {
              alert(response?.data?.message);
              navigate('/');
            }
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          });
      };
      
  return (


    <div>
        
        <NavBar/>

       <div  className="flex flex-wrap justify-around px-16 mt-10 mb-1">
         <p className='font-semibold text-[#00df9a] text-2xl'>ADD PRODUCT</p>
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

       {status? <div >
        <div className="flex flex-wrap justify-around px-16 mt-7">
       <TextFields
         name="Product name"
         type="text"
         value={name}
         onChange={handleNameChange}
       />
     </div>
       <div className="flex flex-wrap justify-around px-16">

        <TextFields name="photo" type="file" input={true} onChange={handleImageChange}/>
       </div>
     <div className="flex flex-wrap justify-around px-16 ">
        <Buttons name="Submit" click={submit}/>
      </div></div>:''}
      <Footer />
    </div>
   
  )
}

export default AddProduct