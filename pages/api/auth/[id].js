import { Order, Products, User } from "@/db/models/models"


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      if(!id) {
        return res.status(400).json('An ID is required');
      };
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(400).json('User not found');
      };
      const orders = await Order.findAll({ where: { UserId: user.dataValues.id }, include: { model: Products },order: [ [ 'updatedAt', 'DESC' ] ] })
      
      user.dataValues.Orders = orders

      return res.status(200).json(user);

    } catch (error) {
      return res.status(400).json(error.message)
    };
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { phone, address } = req.body;
      if(!id) {
        return res.status(400).json('An ID is required');
      };
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json('User not found');
      };
      if (phone) {
        await user.update({ phone });
      };
      if (address) {
        await user.update({ address });
      };

      const updated = await User.findOne({ where: { id }, include: { model: Order } });

      return res.status(200).send(updated);

    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
};