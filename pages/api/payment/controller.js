import { preference } from "@/payment/mp";

const SERVER_URL_PAYMENT_NOTIFICATION =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_PAYMENT_NOTIFICATION_URL;

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
          notification_url: `${SERVER_URL_PAYMENT_NOTIFICATION}`,
        }
      })
      return res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
