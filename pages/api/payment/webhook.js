import { payment } from "@/payment/mp";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
    } catch (error) {
      return res.status(400).send(error);
    }
  } else if (req.method === "POST") {
    try {
      const query = req.query;
      if (query.type === 'payment') {
        const data = await payment.get({ id: query['data.id'] })
        console.log(data.order)
        console.log(data.payer)
        console.log(data.additional_info.items)
      }

      return res.status(200).send(query)
    } catch (error) {
      res.status(400).send(error);
    }
  } else if (req.method === "PUT") {
    try {
    } catch (error) {
      res.status(400).send(error);
    }
  } else if (req.method === "DELETE") {
    try {
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
