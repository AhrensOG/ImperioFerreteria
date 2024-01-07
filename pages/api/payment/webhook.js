import { Order, Products, ProductsOrder, User } from "@/db/models/models";
import { payment } from "@/payment/mp";
import { Op } from "sequelize";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const query = req.query;
      if (query.type === "payment") {
        const data = await payment.get({ id: query["data.id"] });
        console.log(data.additional_info.items);

        const user = await User.findOne({
          where: { email: data.additional_info.payer.first_name },
        });

        const order = await Order.findOne({
          where: {
            [Op.and]: {
              UserId: user.dataValues.id,
              id: data.additional_info.payer.last_name,
            },
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

        for (const item of data.additional_info.items) {
          const product = await Products.findByPk(item.id);

          if (product) {
            const newQuantity = Math.max(
              0,
              product.quantity - parseInt(item.quantity)
            );

            await product.update({ quantity: newQuantity });
          }
        }
      }
      return res.status(200).send("Succes");
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
