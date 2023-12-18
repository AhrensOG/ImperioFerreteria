import { Order, Products, ProductsOrder, User } from "@/db/models/models"
import { Op } from "sequelize";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userId, delivery, orderReceiver, receiverPhone, totalPrice } = req.body;

      if( !userId ) {
        return res.status(400).send('An UserID is required')
      };

      await Order.destroy({ where: { [Op.and]: { UserId: userId, status: 'Shopping' } } })

      let newOrder;

      if (!receiverPhone || !orderReceiver || !totalPrice) {
        return res.status(400).send('Missed Receiver Phone or Order Receiver or Total Price')
      }

      newOrder = await Order.create({
        status: 'Pending',
        totalPrice,
        delivery,
        orderReceiver,
        receiverPhone
      })

      const userOrder = await User.findOne({where: { id: userId }})

      await userOrder.addOrder(newOrder)

      const createdOrder = await Order.findOne({ where: { id: newOrder.dataValues.id }, include: [
        {model: User},
        {model: Products}
      ] })

      return res.status(200).send({ Order: createdOrder, alreadyExist: false})

    } catch (error) {
      res.status(400).send(error)
    }
  } else if (req.method === 'PUT') {
    try {
      const { orderId } = req.body;

      if( !orderId ) {
        return res.status(400).send('An UserID is required')
      };

      const order = await Order.findByPk(orderId)

      if (!order) {
        return res.status(400).send('Order doesnt exists')
      }

      await order.update({ status: 'Cancel' })

      const orderProducts = await ProductsOrder.findAll({ where: { OrderId: orderId } })

      if (orderProducts.length) {
        for (let i = 0; i < orderProducts.length; i++) {
          await orderProducts[i].update({status: 'Cancel'}) 
        }
      }

      const orderProductsUpdated = await Order.findOne({ where: { id: orderId }, include: {
        model: Products
      } })

      return res.status(200).send(orderProductsUpdated)

    } catch (error) {
      res.status(400).send(error)
    }
  }
}