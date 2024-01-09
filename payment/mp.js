import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

const ACCESSTOKEN = process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN;

export const client = new MercadoPagoConfig({
  accessToken: `${ACCESSTOKEN}`,
  options: { timeout: 5000, idempotencyKey: "abc" },
});

export const preference = new Preference(client);

export const payment = new Payment(client);
