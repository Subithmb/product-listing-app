const product=require('../models/ProductModel');
// const subcategory=require('../models/CategoryModel');
const Category=require('../models/Category');



//...............add Product .............................
const AddProduct=async(req,res)=>{
    try {
        console.log('came');
        console.log(req.body);
      
                const{productname,categoryId}=req.body
                // console.log(parent);
                if(categoryId !="null"){
                    const productExist=await product.findOne({name:productname})
                    if(productExist){
                        return res.status(400).json({message:"product already exist"})
                    }

                    // console.log(categoryId,'iddd');
                  
                    const categoryData=await Category.findById({_id:categoryId})

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
      
        const productData = await product.find({})
                  console.log(productData);
                         if(!productData){
                            return res.status(500).json({message:"unable to get category"}) 
                         }
                        return res.status(201).json({productData})
                  
        } catch (error) {
        console.log(error.message);
    }
}


// //......................

  
async function findSubcategoriesAndProducts(categoryId, depth = 0, parentProducts = new Set()) {
    try {
      const categoryInfo = {
        name: '',
        products: new Set(), 
        subcategories: [],
        totalProductCount: 0,
      };
  
      const subcategories = await Category.find({ parent: categoryId });
  
      for (const subcategory of subcategories) {
        const subcategoryInfo = {
          name: subcategory.name,
          subcategories: [],
          products: new Set(), 
          totalProductCount: 0,
        };
  
        const subcategorielist = await Category.find({ parent: subcategory._id });
  
        if (subcategorielist.length === 0) {
          const products = await product.find({ category: subcategory._id });
  
          for (const p of products) {
            if (!parentProducts.has(p._id)) {
              subcategoryInfo.products.add(p); 
              parentProducts.add({_id:p._id,name:p.name,category:p.category});
            }
          }
  
          subcategoryInfo.totalProductCount += subcategoryInfo.products.size;
        }
  
        categoryInfo.subcategories.push(subcategoryInfo);
  
        const childCategoryInfo = await findSubcategoriesAndProducts(subcategory._id, depth + 1, parentProducts);
        subcategoryInfo.subcategories = childCategoryInfo.subcategories;
        subcategoryInfo.totalProductCount += childCategoryInfo.totalProductCount;
  
       
        categoryInfo.totalProductCount += subcategoryInfo.totalProductCount;
      }
  
      categoryInfo.name = categoryInfo.name || (await Category.findOne({ _id: categoryId })).name;
  
      return {
        ...categoryInfo,
        products: [...categoryInfo.products, ...parentProducts],
      };
    } catch (error) {
      console.error(error);
    }
  }
  



  
  
  // ...
  
  const findProductandCategory = async (req, res) => {
    const id = req.query.id;
    try {
      const CategoryFound = await Category.findById(id).exec();
      const result = await findSubcategoriesAndProducts(CategoryFound._id);
      console.log(JSON.stringify(result, null, 2));
      return res.status(201).json({result})
    } catch (error) {
      console.error(error);
    }
  }
  

  //...............sample


//   async function getProductsByCategory(req, res) {
//     try {
//         const categoryId = req.query.id;
//         const products = new Set(); // Use a Set to avoid duplicate products
//         const categoriesToCheck = [categoryId];
//         const parentCategories = new Set();

//         while (categoriesToCheck.length > 0) {
//             const currentCategoryId = categoriesToCheck.pop();
//             const category = await Category.findById(currentCategoryId);

//             if (!category) {
//                 continue;
//             }

//             const subcategories = await Category.find({ parent: currentCategoryId });
//             const categoryProducts = await product.find({ category: currentCategoryId });

//             if (categoryProducts.length > 0) {
//                 parentCategories.add(currentCategoryId); // Add the parent category

//                 // Check for duplicate products and add unique ones
//                 categoryProducts.forEach((product) => {
//                     products.add(product);
//                 });
//             }

//             categoriesToCheck.push(...subcategories.map(subcategory => subcategory._id));
//         }

//         const categoryDetails = [];

//         parentCategories.forEach(async(parentId) => {
//             const parentCategory = await Category.findById(parentId);
//             if (parentCategory) {
//                 const subcategories = await Category.find({ parent: parentId });
//                 categoryDetails.push({
//                     _id: parentCategory._id,
//                     name: parentCategory.name,
//                     subcategories: subcategories.map(subcategory => ({
//                         _id: subcategory._id,
//                         name: subcategory.name
//                     })),
//                     products: [...products].filter(product => product.category.equals(parentId))
//                 });
//             }
//         });

//         return res.status(201).json({ products: [...products], categories: categoryDetails });
//     } catch (error) {
//         console.error(error);
//     }
// }


// async function getProductsByCategory(req, res) {
//     try {
//         const categoryId = req.query.id;
//         const products = new Set(); 
//         const categoriesToCheck = [categoryId];
//         const categoryDetails = new Map();

//         while (categoriesToCheck.length > 0) {
//             const currentCategoryId = categoriesToCheck.pop();
//             const category = await Category.findById(currentCategoryId);

//             if (!category) {
//                 continue;
//             }

//             const subcategories = await Category.find({ parent: currentCategoryId });
//             const categoryProducts = await product.find({ category: currentCategoryId });

//             // console.log(subcategories.length,';;;;;;;;;;');
//             if (categoryProducts.length > 0 || subcategories.length>0 ) {
                
//                 categoryProducts.forEach((product) => {
//                     products.add(product);
//                 });
               
//                 categoryDetails.set(currentCategoryId, {
//                     _id: category._id,
//                     name: category.name,
//                     subcategories: subcategories.map(subcategory => ({
//                         _id: subcategory._id,
//                         name: subcategory.name
//                     }))
//                 });
//             }

//             categoriesToCheck.push(...subcategories.map(subcategory => subcategory._id));
//         }

//         const categoryIdDetails = await Category.findById(categoryId);
        
//         return res.status(201).json({ categoryId: { _id: categoryIdDetails._id, name: categoryIdDetails.name }, products: [...products], categories: [...categoryDetails.values()] });
//     } catch (error) {
//         console.error(error);
//     }
// }



async function getProductsByCategory(req, res) {
    try {
        const categoryId = req.query.id;
        const allProducts = new Set(); 
        const categoriesToCheck = [categoryId];
        const categoryDetails = new Map();

        while (categoriesToCheck.length > 0) {
            const currentCategoryId = categoriesToCheck.pop();
            const category = await Category.findById(currentCategoryId);

            if (!category) {
                continue;
            }

            const subcategories = await Category.find({ parent: currentCategoryId });
            const categoryProducts = await product.find({ category: currentCategoryId });

           
            const productCount = categoryProducts.length;

            if (productCount > 0) {
                categoryProducts.forEach((product) => {
                    allProducts.add(product);
                });


                const parentCategory = await Category.findById(category.parent);


                categoryDetails.set(currentCategoryId, {
                    _id: category._id,
                    name: category.name,
                    productCount, 

                    //parent finding
                    parent: parentCategory ? { _id: parentCategory._id, name: parentCategory.name } : null,
                    
                    subcategories: subcategories.map(subcategory => ({
                        _id: subcategory._id,
                        name: subcategory.name
                    }))
                });
            }

            categoriesToCheck.push(...subcategories.map(subcategory => subcategory._id));
        }

        const categoryIdDetails = await Category.findById(categoryId);

        return res.status(201).json({
            categoryId: { _id: categoryIdDetails._id, name: categoryIdDetails.name },
            totalProductCount: allProducts.size,
            products: [...allProducts],
            categories: [...categoryDetails.values()]
        });
    } catch (error) {
        console.error(error);
    }
}



  

module.exports={
    AddProduct,
    ProductDatas,
    findProductandCategory,
    getProductsByCategory

}