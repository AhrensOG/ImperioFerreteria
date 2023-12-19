import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

export const client = new MercadoPagoConfig({
  accessToken:
    "TEST-1496343084937682-120318-5dfaf2860c22214025e75ba7e692bc28-1575484931",
  options: { timeout: 5000, idempotencyKey: "abc" },
});

export const preference = new Preference(client);

export const payment = new Payment(client);
