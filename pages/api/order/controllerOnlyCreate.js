import { Order, Products, User } from "@/db/models/models";
import { Op } from "sequelize";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).send("An UserID is required");
      }

      const foundOrder = await Order.findOne({
        where: { [Op.and]: { UserId: userId, status: "Shopping" } },
        include: [{ model: User }, { model: Products }],
      });

      if (foundOrder) {
        await foundOrder.update({ status: 'Pending' })
        return res.status(200).send({ Order: foundOrder, alreadyExist: true });
      }

      const newOrder = await Order.create({
        status: "Pending",
        totalPrice: 0,
      });

      const userOrder = await User.findOne({ where: { id: userId } });

      await userOrder.addOrder(newOrder);

      const createdOrder = await Order.findOne({
        where: { id: newOrder.dataValues.id },
        include: [{ model: User }, { model: Products }],
      });

      return res.status(200).send({ Order: createdOrder, alreadyExist: false });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
