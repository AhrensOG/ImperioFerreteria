import { Order, Products, ProductsOrder } from "@/db/models/models";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { OrderId } = req.body;

      if ( !OrderId ) {
        return res.status(400).send('A OrderID is required')
      }

      const found = await ProductsOrder.findAll({ where: { OrderId: OrderId } });

      return res.status(200).send(found)

    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'POST') {
    try {
      const { OrderId, productsList } = req.body;

      if ( !OrderId || !productsList || productsList.length === 0 ) {
        return res.status(400).send('A OrderId or Products list are required')
      }

      const Order = await Order.findByPk(OrderId);

      if ( !Order ) {
        return res.status(400).send('Order not found')
      }

      for (let i = 0; i < productsList.length; i++) {
        const product = await Products.findByPk(productsList[i].id)

        if ( !product ) {
          return res.status(400).send(`Product with ID ${productsList[i].id} doesn't exists`)
        }
      }

      for (let i = 0; i < productsList.length; i++) {
        const product = await Products.findByPk(productsList[i].id)
        await Order.addProducts(product, { through: { productName: productsList[i].title, quantity: productsList[i].items } })
      }

      const productsOrder = await ProductsOrder.findAll({ where: { OrderId: OrderId } });
      
      return res.status(200).send(productsOrder)

      
    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      const { OrderId } = req.body;

      if ( !OrderId ) {
        return res.status(400).send('A OrderId is required')
      }

      await ProductsOrder.destroy({ where: { OrderId: OrderId } })

      const deleted = await ProductsOrder.findAll({ where: { OrderId: OrderId } })

      return deleted.length === 0 ? res.status(200).send('Order items successfully deleted') : res.status(200).send('An error has ocurred')

    } catch (error) {
      return res.status(400).send(error)
    }
  };
};