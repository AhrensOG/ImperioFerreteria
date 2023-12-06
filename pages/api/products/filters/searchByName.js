import { Order, Products, ProductsImages } from "@/db/models/models"
import { Op } from "sequelize";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { productName } = req.query;
      
      const products = await Products.findAll({ include: [
        { model: ProductsImages },
        { model: Order }
      ] });

      let filteredProducts = [];

      if( productName && products.length > 0 ) {
        for (let i = 0; i < products.length; i++) {
          if ( products[i].title.toLowerCase().startsWith(productName.toLowerCase()) || products[i].title.toLowerCase().includes(productName.toLowerCase()) ) {
            filteredProducts.push(products[i])
          }          
        }
      };

      if (productName && filteredProducts.length > 0) {
        return res.status(200).send(filteredProducts);
      } else if (productName && filteredProducts.length === 0) {
        return res.status(400).send('Not found products with "' + productName + '"')
      } else {
        return res.status(200).send(products);
      }

    } catch (error) {
      return res.status(400).send(error)
    }
  }
};