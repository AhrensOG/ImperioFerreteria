import {  Categories, Products } from "@/db/models/models";

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
  }
}
