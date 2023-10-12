const product=require('../models/ProductModel');

const Category=require('../models/Category');
const cloudinary = require('../Middileware/cloudinary')




const AddProduct = async (req, res) => {
  try {
    console.log('came');
    console.log(req.body);

    const { productname, categoryId } = req.body;
    const photo = req.file; 

    if (categoryId !== "null") {
      const productExist = await product.findOne({ name: productname });

      if (productExist) {
        return res.status(400).json({ message: "Product already exists" });
      }

      const categoryData = await Category.findById({ _id: categoryId });

     
      if (!photo) {
        return res.status(400).json({ message: "Photo must be uploaded." });
      }

      
      const photoUpload = await cloudinary.uploader.upload(photo.path);

      if (!photoUpload.secure_url) {
        return res.status(400).json({ message: "Failed to upload photo" });
      }

      const ProductData = new product({
        name: productname,
        category: categoryData._id,
        photo: photoUpload.secure_url,
      });

      await ProductData.save();

      if (!ProductData) {
        return res.status(500).json({ message: "Unable to add product" });
      }

      return res.status(200).json({ message: 'Product added', ProductData });
    }

    return res.status(500).json({ message: "Unable to add category" });
  } catch (error) {
    console.log(error.message);
  }
};

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

  
// async function findSubcategoriesAndProducts(categoryId, depth = 0, parentProducts = new Set()) {
//     try {
//       const categoryInfo = {
//         name: '',
//         products: new Set(), 
//         subcategories: [],
//         totalProductCount: 0,
//       };
  
//       const subcategories = await Category.find({ parent: categoryId });
  
//       for (const subcategory of subcategories) {
//         const subcategoryInfo = {
//           name: subcategory.name,
//           subcategories: [],
//           products: new Set(), 
//           totalProductCount: 0,
//         };
  
//         const subcategorielist = await Category.find({ parent: subcategory._id });
  
//         if (subcategorielist.length === 0) {
//           const products = await product.find({ category: subcategory._id });
  
//           for (const p of products) {
//             if (!parentProducts.has(p._id)) {
//               subcategoryInfo.products.add(p); 
//               parentProducts.add({_id:p._id,name:p.name,category:p.category});
//             }
//           }
  
//           subcategoryInfo.totalProductCount += subcategoryInfo.products.size;
//         }
  
//         categoryInfo.subcategories.push(subcategoryInfo);
  
//         const childCategoryInfo = await findSubcategoriesAndProducts(subcategory._id, depth + 1, parentProducts);
//         subcategoryInfo.subcategories = childCategoryInfo.subcategories;
//         subcategoryInfo.totalProductCount += childCategoryInfo.totalProductCount;
  
       
//         categoryInfo.totalProductCount += subcategoryInfo.totalProductCount;
//       }
  
//       categoryInfo.name = categoryInfo.name || (await Category.findOne({ _id: categoryId })).name;
  
//       return {
//         ...categoryInfo,
//         products: [...categoryInfo.products, ...parentProducts],
//       };
//     } catch (error) {
//       console.error(error);
//     }
//   }
  



  
  
  // ...
  
  // const findProductandCategory = async (req, res) => {
  //   const id = req.query.id;
  //   try {
  //     const CategoryFound = await Category.findById(id).exec();
  //     const result = await findSubcategoriesAndProducts(CategoryFound._id);
  //     console.log(JSON.stringify(result, null, 2));
  //     return res.status(201).json({result})
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  

  //...............sample



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
    // findProductandCategory,
    getProductsByCategory

}