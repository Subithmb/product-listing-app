const category=require('../models/CategoryModel');

//...............add category .............................


const Addcategory=async(req,res)=>{
    try {
        console.log('came');
        console.log(req.body);
      
                const{newCategory,parent}=req.body
               
                 const  categoryData=new category({
                    name:newCategory,
                    parent:parent
                     })
                     await categoryData.save();
                     
                     if(!categoryData){
                        return res.status(500).json({message:"unable to add category"}) 
                     }
                    return res.status(201).json({categoryData})
                
                     return res.status(500).json({message:"unable to add category"})
                  
        } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    Addcategory

}