import { Cart, Products, ProductsCart } from "@/db/models/models";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { cartId } = req.body;

      if ( !cartId ) {
        return res.status(400).send('A CartID is required')
      }

      const found = await ProductsCart.findAll({ where: { CartId: cartId } });

      return res.status(200).send(found)

    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'POST') {
    try {
      const { cartId, productsList } = req.body;

      if ( !cartId || !productsList || productsList.length === 0 ) {
        return res.status(400).send('A CartId or Products list are required')
      }

      const cart = await Cart.findByPk(cartId);

      if ( !cart ) {
        return res.status(400).send('Cart not found')
      }

      for (let i = 0; i < productsList.length; i++) {
        const product = await Products.findByPk(productsList[i].id)

        if ( !product ) {
          return res.status(400).send(`Product with ID ${productsList[i].id} doesn't exists`)
        }
      }

      for (let i = 0; i < productsList.length; i++) {
        const product = await Products.findByPk(productsList[i].id)
        await cart.addProducts(product, { through: { productName: productsList[i].name, quantity: productsList[i].quantity } })
      }

      const productsCart = await ProductsCart.findAll({ where: { CartId: cartId } });
      
      return res.status(200).send(productsCart)

      
    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      const { cartId } = req.body;

      if ( !cartId ) {
        return res.status(400).send('A CartId is required')
      }

      await ProductsCart.destroy({ where: { CartId: cartId } })

      const deleted = await ProductsCart.findAll({ where: { CartId: cartId } })

      return deleted.length === 0 ? res.status(200).send('Cart items successfully deleted') : res.status(200).send('An error has ocurred')

    } catch (error) {
      return res.status(400).send(error)
    }
  };
};