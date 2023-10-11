import React from 'react'
import { Routes,Route } from 'react-router-dom'
import CategoryAdding from '../pages/CategoryAdding'
import ProjectAdding from '../pages/ProjectAdding'
import Home from '../pages/Home'
import SubcategoryAdding from '../pages/Subcategoryadding'

const AppRouter = () => {

    return (
        <div>
             <Routes>
             <Route path='/addcategory' element={<CategoryAdding/>}/>
             <Route path='/addproduct' element={<ProjectAdding/>}/>
             <Route path='/addsubcategory' element={<SubcategoryAdding/>}/>
             <Route path='/' element={<Home/>}/>
            
          </Routes>
          </div>
      )
  
}

export default AppRouter