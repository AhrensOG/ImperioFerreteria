import { preference } from "@/payment/mp";


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { items, payer } = req.body; 
      
      const response = await preference.create({
        body: {
          items: items,
          payer: {
            name: payer.email,
            surname: payer.order,
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
          notification_url: "https://8f95-2803-9800-94c2-8ab6-b44e-593c-b2f1-c76.ngrok-free.app/api/payment/webhook",
        }
      })
      return res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
