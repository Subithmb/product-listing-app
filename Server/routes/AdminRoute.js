const express=require('express')
const adminRouter=express.Router()
const{Addcategory,Addsubcategory,categoryDatas,categoryDataforProduct,subcategoryfinding,subcategoryfindingtoAddproduct,categoryDataforsubcategory}=require('../controllers/categoryController')
const{AddProduct,ProductDatas,findProductandCategory,getProductsByCategory}=require('../controllers/ProductController')

adminRouter.post('/addCategory',Addcategory)
adminRouter.post('/addsubcategory',Addsubcategory)
adminRouter.post('/addProduct',AddProduct)
adminRouter.get('/category',categoryDatas)
adminRouter.get('/categoryforsubcategory',categoryDataforsubcategory)
adminRouter.get('/products',ProductDatas)
adminRouter.get('/categoryforProduct',categoryDataforProduct)
adminRouter.get('/categoryforAddProduct',subcategoryfindingtoAddproduct)
adminRouter.get('/subcategory',subcategoryfinding)
adminRouter.get('/findProductandCategory',findProductandCategory)
adminRouter.get('/getProductsByCategory',getProductsByCategory)

module.exports=adminRouter