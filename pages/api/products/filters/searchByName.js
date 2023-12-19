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

      const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().startsWith(productName.toLowerCase()) || product.title.toLowerCase().includes(productName.toLowerCase()) ;
      });
        return res.status(200).send(filteredProducts);

    } catch (error) {
      return res.status(400).send(error)
    }
  }
};