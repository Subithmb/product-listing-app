const product=require('../models/ProductModel');
const category=require('../models/CategoryModel');



//...............add Product .............................
const AddProduct=async(req,res)=>{
    try {
    //     console.log('came');
        // console.log(req.body);
      
                const{productname,categoryId}=req.body
                // console.log(parent);
                if(categoryId !="null"){
                    const productExist=await product.findOne({name:productname})
                    if(productExist){
                        return res.status(400).json({message:"product already exist"})
                    }

                    // console.log(categoryId,'iddd');
                  
                    const categoryData=await category.findById({_id:categoryId})

                    // console.log(categoryData,'dataaaaaaaaa');

                    const  ProductData=new product({
                        name:productname,
                        category:categoryData._id
                         })
                         await ProductData.save();

                         if(!ProductData){
                            return res.status(500).json({message:"unable to add product"}) 
                         }
                        return res.status(200).json({message:'product added', ProductData})

                }
                
                     return res.status(500).json({message:"unable to add category"})
                  
        } catch (error) {
        console.log(error.message);
    }
}

//.............................  viewproduct .................................

const ProductDatas=async(req,res)=>{
    try {
        console.log('came');
      
                    const productData=await product.find().populate('category')
                  
                         if(!productData){
                            return res.status(500).json({message:"unable to get category"}) 
                         }
                        return res.status(201).json({productData})
                  
        } catch (error) {
        console.log(error.message);
    }
}



module.exports={
    AddProduct,
    ProductDatas

}