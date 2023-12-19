import { Order, Products, ProductsOrder, User } from "@/db/models/models"
import { Op } from "sequelize";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).send('Missing UserID')
      }
      const response = await Order.findOne({ where: { UserId: userId }, include: [
        {model: User},
        {model: Products},
      ] })
      return response ? res.status(200).send(response) : res.status(400).send('Order doesnt exists')
    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'POST') {
    try {
      const { userId } = req.body;

      if( !userId ) {
        return res.status(400).send('An UserID is required')
      };

      const foundOrder = await Order.findOne({ where: { [Op.and]: { UserId: userId, status: 'Shopping' } }, include: [
        {model: User},
        {model: Products}
      ] })

      if (foundOrder) {
        return res.status(200).send({ Order:foundOrder, alreadyExist: true})
      }

      const newOrder = await Order.create({
        status: 'Shopping',
        totalPrice: 0,
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
      const { userId, status, totalPrice } = req.body;

      if ( !userId ) {
        return res.status(400).send('An UserID is required')
      }

      const foundOrder = await Order.findOne({ where: { UserId: userId } });

      if (status) {
        await foundOrder.update({
          status
        })
      }
      if (totalPrice) {
        await foundOrder.update({
          totalPrice
        })
      }

      const updatedOrder = await Order.findOne({ where: { UserId: userId }, include: [
        {model: User},
        {model: Products}
      ] });

      return res.status(200).send(updatedOrder)
      
    } catch (error) {
      res.status(400).send(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      const { userId } = req.body;

      if ( !userId ) {
        return res.status(400).send('An UserID is required');
      };

      await Order.destroy({ where: { UserId: userId } });

      const deleted = await Order.findOne({ where: { UserId: userId } });

      return deleted ? res.status(400).send('Error deleting Order') : res.status(200).send('Order successfully destroyed');

    } catch (error) {
      res.status(400).send(error)
    }
  };
};