const express=require('express')
const adminRouter=express.Router()
const{Addcategory}=require('../controllers/categoryController')

adminRouter.post('/addCategory',Addcategory)

module.exports=adminRouter