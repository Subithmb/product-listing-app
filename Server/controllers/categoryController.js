// const subcategory=require('../models/CategoryModel');
const Category=require('../models/Category');
const Product=require('../models/ProductModel');

//...............add category .............................


const Addcategory=async(req,res)=>{
    try {
        console.log('came');
        console.log(req.body);
      
                const{newCategory}=req.body
        
                  
                    const  categoryData=new Category({
                        name:newCategory,
                      
                         })
                         await categoryData.save();

                         if(!categoryData){
                            return res.status(500).json({message:"unable to add category"}) 
                         }
                       
                         return res.status(200).json({message:'new category created',categoryData})
                  
        } catch (error) {
        console.log(error.message);
    }
}
//...............add subcategory .............................


const Addsubcategory=async(req,res)=>{
    try {
        console.log('came');
        console.log(req.body);
      
                const{newCategory,parent}=req.body
              
                const parentData=await Category.findOne({parent:parent})
               
                console.log(parentData,'hfhfhfh');

                    if(!parentData){
                      const parentDatas=await Category.findOne({_id:parent})
                      console.log(parentDatas,'hiiiiiiiiiii');
                      if(!parentDatas){
                      const  categoryData=new Category({
                        name:newCategory
                         })
                         await categoryData.save();
                         if(!categoryData){
                          return res.status(500).json({message:"unable to add category"}) 
                       }
                         return res.status(201).json({message:'subcategory  added',categoryData})
                      }else{
                        const  categoryData=new Category({
                          name:newCategory,parent:parentDatas._id
                             })
                             await categoryData.save();
    
                             if(!categoryData){
                                return res.status(500).json({message:"unable to add category"}) 
                             }
                            return res.status(201).json({message:'subcategory  added',categoryData})
                      }
                   }else{

                    const  categoryData=new Category({
                      name:newCategory,parent:parentData._id
                         })
                         await categoryData.save();

                         if(!categoryData){
                            return res.status(500).json({message:"unable to add category"}) 
                         }
                        return res.status(201).json({message:'subcategory  added',categoryData})
                   }
                   

        } catch (error) {
        console.log(error.message);
    }
}

//............... get category .............................


const categoryDatas=async(req,res)=>{
    try {
        console.log('came');
      
                    // const categoryData=await Category.find()
                    const categoryData = await Category.find({
                      $or: [
                        { parent: null }
                        ,{ parent: { $exists: false } }
                      ]
                    });
                    
                  
                         if(!categoryData){
                            return res.status(500).json({message:"unable to get category"}) 
                         }
                        return res.status(201).json({categoryData})
                  
        } catch (error) {
        console.log(error.message);
    }
}


//................


const categoryDataforsubcategory=async(req,res)=>{
  try {
      console.log('came');
    
                  const categoryData=await Category.find()
                  // const categoryData = await Category.find({
                  //   $or: [
                  //     { parent: null }
                  //     ,{ parent: { $exists: false } }
                  //   ]
                  // });
                  
                
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
        const categoryData = await Category.find({ parent: { $ne: null } });
    
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
        const categoryData = await Category.find({ parent:id});
        
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


//.......................sub category finding to add product ..............................

const subcategoryfindingtoAddproduct=async(req,res)=>{
    try {
      console.log('canme',req.query);

        const{id}=req.query
        const categoryData = await Category.find({ parent:id});
        
        console.log(categoryData,'neww');
        
        if (categoryData.length==0) {
        console.log('zeroooooooooooo');
          return res.json({categoryData, message: "Unable to get categories and products" });
          
        }
    
        return res.status(201).json({ categoryData });
      } catch (error) {
        console.log(error.message);
      }
}

module.exports={
    Addcategory,
    Addsubcategory,
    categoryDatas,
    categoryDataforProduct,
    subcategoryfinding,
    subcategoryfindingtoAddproduct,
    categoryDataforsubcategory

}