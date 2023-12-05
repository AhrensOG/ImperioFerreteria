import { preference } from "@/payment/mp";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
    } catch (error) {
      return res.status(400).send(error);
    }
  } else if (req.method === "POST") {
    try {
      const { items, payer } = req.body; 
      const response = await preference.create({
        body: {
          items: items,
          payer: {
            name: payer.name,
            email: payer.email,
            phone: {
              number: payer.phone
            },
            address: {
              street_name: payer.address
            }
          },
          back_urls: {
            success: '',
            pending: '',
            failure: ''
          },
          notification_url: "https://63d9-2803-9800-94c2-8ab6-19a0-98bf-5c12-b222.ngrok-free.app/api/payment/webhook"
        }
      })
      return res.status(200).send(response)
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
