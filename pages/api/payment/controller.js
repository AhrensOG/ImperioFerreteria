import { preference } from "@/payment/mp";


export default async function handler(req, res) {
  if (req.method === "POST") {
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
          notification_url: "https://9f84-2803-9800-94c2-8ab6-846-468d-656a-a46.ngrok-free.app/api/payment/webhook"
        }
      })
      return res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
