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
          where: { email: data.additional_info.payer.first_name },
        });

        const order = await Order.findOne({
          where: {
            [Op.and]: { UserId: user.dataValues.id, id: data.additional_info.payer.last_name },
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
              },
            },
          }
        );
      }
      return res.status(200).send('Succes');
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
