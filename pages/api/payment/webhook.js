import { Order, ProductsOrder, User } from "@/db/models/models";
import { payment } from "@/payment/mp";
import { Op } from "sequelize";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const query = req.query;
      if (query.type === "payment") {
        const data = await payment.get({ id: query["data.id"] });

        const user = await User.findOne({
          where: { email: "ahrensog@gmail.com" },
        });

        const order = await Order.findOne({
          where: {
            [Op.and]: { UserId: user.dataValues.id, status: "Shopping" },
          },
        });

        await order.update({
          orderId: data.id,
          status: "Paid",
          totalPrice: data.transaction_amount,
        });

        await ProductsOrder.update(
          { status: "Paid" },
          {
            where: {
              [Op.and]: {
                OrderId: order.dataValues.id,
                status: "Shopping",
              },
            },
          }
        );
      }
      return res.status(200);
    } catch (error) {
      res.status(400).send(error);
    }
    try {
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
