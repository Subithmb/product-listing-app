import React, { useEffect, useState } from 'react'
import NavBar from './CommonComponents/Navbar'
import axios from 'axios'
import { HashLoader } from 'react-spinners'
import Footer from './CommonComponents/Footer'


const HomePage = () => {
   
    const[dataFeaching,setDatafeachind]=useState(true)
    const[name,setName]=useState()
    const[updatedData,setUpdatedData]=useState()
    const[categorycount,setcategorycount]=useState(0)
    const[data,setData]=useState()

    useEffect(() => {
       
        axios.get('http://localhost:5000/categoryforsubcategory')
          .then((response) => {
            // console.log(response?.data?.categoryData,'............');
            setData(response?.data?.categoryData)
            setDatafeachind(!dataFeaching)
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    },[]);
    
    const findSubcategory=(id)=>{
        // console.log(id,'iddddddddddddddddddddddd');
        setDatafeachind(true)
        axios.get(`http://localhost:5000/getProductsByCategory?id=${id}`)
        .then((response) => {
            // console.log(response?.data,'............res',response?.data?.totalProductCount);
            setUpdatedData(response?.data)
            setName(response?.data?.categoryId?.name)
            setcategorycount(response?.data?.totalProductCount)

            setDatafeachind(false)
           
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    }
   
    // console.log(updatedData,'update');
//     return (
//         <>
//     <div>
//         <NavBar/>
       
//    {!dataFeaching ?
//        <div>
//         <div className='w-full  bg-gray-200 flex overflow-x-auto'>
//             <div className='w-full flex flex-wrap gap-4 p-2'>
//             {data?.map((d, index) => {
//                 return (
//                 <div className='w-1/6' key={d._id}>
//                     <p onClick={() => findSubcategory(d._id)} className='w-auto'>{d.name}</p>
//                 </div>
//                 );
//             })}
//             </div>
//         </div>
       

//        {categorycount || name ?
//        <div className='flex h-full'>
//         <div className='w-[18%] border-r-2'>
//         <p className='ml-10 mt-4'>{name}({categorycount})</p>

//        {updatedData?.categories?.length > 1 && <>
//         <p className='ml-10 text-black font-semibold text-xs mt-2'>SubCategory</p>
//         { updatedData?.categories?.map((data)=>{
//             return(
//                 <div className='mt-3 '>
//                     <p onClick={()=>{findSubcategory(data._id)}} className='ml-10 mt-1 text-sm'>{data?.name} ({data?.productCount})</p>
//                 </div>
//             )
//         })

//         }
//         </>}

//         </div>
        
//         <div className='ml-1 mb-5'>
           
//             <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 gap-5 mt-6'>
//             {updatedData?.products?.map((product) => {
//               return (
//                 <div key={product._id} className="w-fit h-fit shadow-2xl flex flex-col p-4  rounded-lg hover:scale-105 duration-300 text-center">
//                   <img 
//                     className="mx-auto  h-[250px] w-[300px] bg-white cursor-pointer"
//                     src={product?.photo}
//                     alt="/"
//                   />
//                   <h2 className="text-2xl font-bold text-center py-2">
//                   {product?.name}
//                   </h2>   
//                 </div>
//               );
//             })}
//         </div>  
       
//         </div>
//        </div>
       
    
//         :''}

//         </div>
      
//     </div>
//     :
//     <>
//     <div className="flex items-center justify-center w-full h-[100vh] align-middle mx-auto text-center">
//       <div className='flex items-center justify-center h-full w-full'>
//         <HashLoader color='#5f655f' size={70} />
//       </div>
//     </div>
//   </>
  
//         }

//         <Footer/>
           

//     </>
//   )
// }


return (
    <>
      <div >
       
        <NavBar />
      
        {!dataFeaching ? (
          <div >
            <div className='w-full bg-gray-200 flex overflow-x-auto'>
              <div className='w-full flex flex-wrap gap-4 p-2'>
                {data?.map((d, index) => {
                  return (
                    <div className='w-1/6' key={d._id}>
                      <p onClick={() => findSubcategory(d._id)} className='w-auto ml-10'>{d.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {categorycount || name ? (
              <div className='flex h-full'>
                <div className='w-[18%] border-r-2'>
                  <p className='ml-10 mt-4'>{name}({categorycount})</p>
                  {updatedData?.categories?.length > 1 && (
                    <>
                      <p className='ml-10 text-black font-semibold text-xs mt-2'>SubCategory</p>
                      {updatedData?.categories?.map((data) => {
                        return (
                          <div className='mt-3'>
                            <p onClick={() => findSubcategory(data._id)} className='ml-10 mt-1 text-sm'>
                              {data?.name} ({data?.productCount})
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className='ml-1 mb-24 overflow-y-auto'>
                  <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 gap-5 mt-6'>
                    {updatedData?.products?.map((product) => {
                      return (
                        <div key={product._id} className="w-fit h-fit shadow-2xl flex flex-col p-4  rounded-lg hover:scale-105 duration-300 text-center">
                          <img
                            className="mx-auto h-[250px] w-[300px] bg-white cursor-pointer"
                            src={product?.photo}
                            alt="/"
                          />
                          <h2 className="text-2xl font-bold text-center py-2">{product?.name}</h2>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : ''}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[100vh] align-middle mx-auto text-center">
            <div className='flex items-center justify-center h-full w-full'>
              <HashLoader color='#5f655f' size={70} />
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
        }  
export default HomePage