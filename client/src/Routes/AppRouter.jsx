import React from 'react'
import { Routes,Route } from 'react-router-dom'
import CategoryAdding from '../pages/CategoryAdding'
import ProjectAdding from '../pages/ProjectAdding'
import Home from '../pages/Home'

const AppRouter = () => {

    return (
        <div>
             <Routes>
             <Route path='/addcategory' element={<CategoryAdding/>}/>
             <Route path='/addproduct' element={<ProjectAdding/>}/>
             <Route path='/' element={<Home/>}/>
            
          </Routes>
          </div>
      )
  
}

export default AppRouter