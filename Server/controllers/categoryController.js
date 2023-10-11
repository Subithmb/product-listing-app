const category=require('../models/CategoryModel');
const Product=require('../models/ProductModel');

//...............add category .............................


const Addcategory=async(req,res)=>{
    try {
        console.log('came');
        console.log(req.body);
      
                const{newCategory,parent}=req.body
                console.log(parent);
                if(parent !="null"){
                    console.log('null');
                    const parentData=await category.findOne({name:parent})
                    const  categoryData=new category({
                        name:newCategory,
                        parent:parentData._id
                         })
                         await categoryData.save();

                         if(!categoryData){
                            return res.status(500).json({message:"unable to add category"}) 
                         }
                        return res.status(201).json({categoryData})

                }else{
               
                 const  categoryData=new category({
                    name:newCategory
                     })
                     await categoryData.save();

                     if(!categoryData){
                        return res.status(500).json({message:"unable to add category"}) 
                     }
                    return res.status(200).json({message:'new category created',categoryData})

                    }
                    
                
                     return res.status(500).json({message:"unable to add category"})
                  
        } catch (error) {
        console.log(error.message);
    }
}

//............... get category .............................


const categoryDatas=async(req,res)=>{
    try {
        console.log('came');
      
                    const categoryData=await category.find()
                  
                         if(!categoryData){
                            return res.status(500).json({message:"unable to get category"}) 
                         }
                        return res.status(201).json({categoryData})
                  
        } catch (error) {
        console.log(error.message);
    }
}
//............... get product category .............................


const categoryDataforProduct=async(req,res)=>{
    try {
        const categoryData = await category.find({ parent: { $ne: null } });
    
        if (!categoryData) {
          return res.status(500).json({ message: "Unable to get categories" });
        }
    
        return res.status(201).json({ categoryData });
      } catch (error) {
        console.log(error.message);
      }
}

//.....................   cattegory find by id .......................

const subcategoryfinding=async(req,res)=>{
    try {

        const{id}=req.query
        const categoryData = await category.find({ parent:id});
        
        console.log(categoryData);
        
        if (categoryData.length==0) {
          const productData = await Product.find({category:id});
          if(!productData)

          return res.status(500).json({ message: "Unable to get categories and products" });
          return res.status(201).json({ productData });
        }
    
        return res.status(201).json({ categoryData });
      } catch (error) {
        console.log(error.message);
      }
}

module.exports={
    Addcategory,
    categoryDatas,
    categoryDataforProduct,
    subcategoryfinding

}