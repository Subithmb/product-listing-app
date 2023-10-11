import React from 'react'
import ProductCardList from '../components/ProductCardList'
import Sidebar from '../components/SideBar'

const Home = () => {
  return (
    <div className='w-full flex'>
        <div className='w-[20%]'>
            <Sidebar/>
        </div>
        <div className='w-[80%] '>
        <ProductCardList/>
        </div>
    </div>
  )
}

export default Home