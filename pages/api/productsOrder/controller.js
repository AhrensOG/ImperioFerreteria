import { Order, Products, ProductsOrder } from "@/db/models/models";
import { Op } from "sequelize";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { OrderId } = req.query;
      if ( !OrderId ) {
        return res.status(400).send('A OrderID is required')
      }

      const found = await ProductsOrder.findAll({ where: { [Op.and]: { OrderId: OrderId} } });

      return res.status(200).send(found)

    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'POST') {
    try {
      const { OrderId, productsList, delivery } = req.body;

      if ( !OrderId || !productsList || productsList.length === 0 ) {
        return res.status(400).send('A OrderId or Products list are required')
      }

      const order = await Order.findByPk(OrderId);

      if ( !order ) {
        return res.status(400).send('Order not found')
      }

      for (let i = 0; i < productsList.length; i++) {
        const product = await Products.findByPk(productsList[i].id)

        if ( !product ) {
          return res.status(400).send(`Product with ID ${productsList[i].id} doesn't exists`)
        }
      }
      if (delivery) {
        for (let i = 0; i < productsList.length; i++) {
          const product = await Products.findByPk(productsList[i].id)
          await order.addProducts(product, { through: { productName: productsList[i].title, quantity: productsList[i].items, status: 'Pending' } })
        }  
      } else {
        for (let i = 0; i < productsList.length; i++) {
          const product = await Products.findByPk(productsList[i].id)
          await order.addProducts(product, { through: { productName: productsList[i].title, quantity: productsList[i].items, status: 'Shopping' } })
        }  
      }

      const productsOrder = await ProductsOrder.findAll({ where: { [Op.and]: { OrderId: OrderId, status: 'Shopping' } } });
      
      return res.status(200).send(productsOrder)

      
    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      const { OrderId } = req.query;

      if ( !OrderId ) {
        return res.status(400).send('A OrderId is required')
      }

      await ProductsOrder.destroy({ where: { [Op.and]: {  OrderId: OrderId, status: 'Shopping'  } } })

      return res.status(200).send('Order items successfully deleted')

    } catch (error) {
      return res.status(400).send(error)
    }
  };
};