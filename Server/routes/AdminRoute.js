const express=require('express')
const adminRouter=express.Router()
const{Addcategory,categoryDatas,categoryDataforProduct,subcategoryfinding}=require('../controllers/categoryController')
const{AddProduct,ProductDatas}=require('../controllers/ProductController')

adminRouter.post('/addCategory',Addcategory)
adminRouter.post('/addProduct',AddProduct)
adminRouter.get('/category',categoryDatas)
adminRouter.get('/products',ProductDatas)
adminRouter.get('/categoryforProduct',categoryDataforProduct)
adminRouter.get('/subcategory',subcategoryfinding)

module.exports=adminRouter