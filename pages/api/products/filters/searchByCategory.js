import { Categories, Order, Products, ProductsImages } from "@/db/models/models"


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { categoryName } = req.query;
      
      const products = await Products.findAll({ include: [
        { model: ProductsImages },
        { model: Order },
        { model: Categories }
      ] });

      const filteredProducts = products.filter(product => {
        return product.Categories.some(categoria => categoria.name === categoryName);
      });

      return res.status(200).send(filteredProducts)

    } catch (error) {
      return res.status(400).send(error)
    }
  }
};