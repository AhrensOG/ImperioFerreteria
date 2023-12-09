import { Categories, Order, Products, ProductsImages } from "@/db/models/models"


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { productId } = req.query;
      
      if( productId ) {
        const product = await Products.findOne({ where: { id: productId }, include: [
          { model: ProductsImages },
          { model: Order }
        ] })

        if ( !product ) {
          return res.status(400).send('Product doesnt exists')
        }

        return res.status(200).send(product)
      };

      const products = await Products.findAll({ include: [
        { model: ProductsImages },
        { model: Order },
        { model: Categories }
      ] });

      return res.status(200).send(products)
    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'POST') {
    try {
      const { title, firstImage, description, price, quantity } = req.body;

      if ( !title || !firstImage || !description || !price || !quantity ) {
        return res.status(200).send('Missing Data')
      };

      const foundProduct = await Products.findOne({ where: { title } });

      if (foundProduct) {
        return res.status(200).send('Already exists a product with same name')
      };

      await Products.create({
        title,
        firstImage,
        description,
        price,
        quantity
      })

      const newProduct = await Products.findOne({ where: { title }, include: [
        { model: ProductsImages },
        { model: Order },
        { model: Categories }
      ] })

      return res.status(200).send(newProduct)

    } catch (error) {
      return res.status(400).send(error.message)
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, firstImage, description, price, quantity, productId } = req.body;

      const product = await Products.findByPk(productId);

      if ( !product ) {
        return res.status(200).send('Product doesnt exists');
      };

      if ( title ) {
        await product.update({ title });
      };
      if ( firstImage ) {
        await product.update({ firstImage });
      };
      if ( description ) {
        await product.update({ description });
      };
      if ( price ) {
        await product.update({ price });
      };
      if ( quantity ) {
        await product.update({ quantity });
      };

      const updated = await Products.findOne({ where: { id: productId }, include: [
        { model: ProductsImages },
        { model: Order },
        { model: Categories }
      ] })

      return res.status(200).send(updated)

    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      const { productId } = req.query;

      const product = await Products.findByPk(productId);

      if ( !product ) {
        return res.status(200).send('Product doesnt exists');
      }

      await product.destroy();

      const deleted = await Products.findByPk(productId);

      return deleted ? res.status(400).send('Error deleting product') : res.status(200).send('Deleted successfully')

    } catch (error) {
      return res.status(400).send(error)
    }
  };
};