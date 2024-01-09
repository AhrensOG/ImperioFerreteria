import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

export const client = new MercadoPagoConfig({
  accessToken:
    "TEST-3729247726791169-120318-c9b90bac13fa090a40e5aa05a8d72b98-660580763",
  options: { timeout: 5000, idempotencyKey: "abc" },
});

export const preference = new Preference(client);

export const payment = new Payment(client);
