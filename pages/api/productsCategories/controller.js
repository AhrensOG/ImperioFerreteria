import {  Categories, Products, ProductsCategories } from "@/db/models/models";
import { Op } from "sequelize";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { categoriesList, productId } = req.body;

      if ( !categoriesList || categoriesList.length === 0 || !productId ) {
        return res.status(400).send('CategoriesList are required | ProductId is required')
      };

      const product = await Products.findByPk(productId)

      if ( !product ) {
        return res.status(400).send('Product doesnt exists')
      }

      for (let i = 0; i < categoriesList.length; i++) {
        const exists = await Categories.findByPk(categoriesList[i].id)

        if (!exists) {
          return res.status(400).send(`Category ID ${categoriesList[i].id} doesnt exists`)
        } 
      }

      for (let i = 0; i < categoriesList.length; i++) {
        const category = await Categories.findByPk(categoriesList[i].id)
        await product.addCategories(category)
      }

      const productsCategories = await Products.findAll( { where: { id : productId }, include: { model: Categories } } );

      return res.status(200).send(productsCategories)
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { productId, categoriesList } = req.body;
  
      if ( !categoriesList || !categoriesList.length || !productId ) {
        return res.status(400).send('CategoriesList and ProductId is required')
      };

      const product = await Products.findByPk(productId)

      if ( !product ) {
        return res.status(400).send('Product doesnt exists')
      }

      for (let i = 0; i < categoriesList.length; i++) {
        const exists = await Categories.findByPk(categoriesList[i].id)

        if (!exists) {
          return res.status(400).send(`Category ID ${categoriesList[i].id} doesnt exists`)
        } 
      }

      for (let i = 0; i < categoriesList.length; i++) {
        await ProductsCategories.destroy({ where: { [Op.and]: [ { ProductId: productId }, { CategoryId: categoriesList[i].id } ] } })
      }
  
      return res.status(200).send('Deleted successfully')
    } catch (error) {
      return res.status(400).send(error.message);
    }

  }
}
