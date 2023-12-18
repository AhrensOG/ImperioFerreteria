import { Business, BusinessImages } from "@/db/models/models";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { businessId } = req.query;

            if (businessId) {
                const business = await Business.findOne({
                    where: { id: businessId },
                    include: { model: BusinessImages },
                });

                if (!business) {
                    return res.status(400).send("Business doesnt exists");
                }

                return res.status(200).send(business);
            }

            const business = await Business.findAll({
                include: { model: BusinessImages },
            });

            return res.status(200).send(business);
        } catch (error) {
            return res.status(400).send(error);
        }
    } else if (req.method === "POST") {
        try {
            const {
                name,
                url,
                whatsAppLink,
                instagramLink,
                facebookLink,
                locationLink,
            } = req.body;

            if (
                !name ||
                !url ||
                !whatsAppLink ||
                !instagramLink ||
                !locationLink ||
                !facebookLink
            ) {
                return res.status(200).send("Missing Data");
            }

            const foundBusiness = await Business.findOne({ where: { name } });

            if (foundBusiness) {
                return res
                    .status(200)
                    .send("Already exists a business with same name");
            }

            await Business.create({
                name,
                url,
                whatsAppLink,
                instagramLink,
                facebookLink,
                locationLink,
            });

            const newBusiness = await Business.findOne({
                where: { name },
                include: { model: BusinessImages },
            });

            return res.status(200).send(newBusiness);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    } else if (req.method === "PUT") {
        try {
            const {
                name,
                url,
                whatsAppLink,
                instagramLink,
                facebookLink,
                locationLink,
                businessId,
            } = req.body;

            const business = await Business.findByPk(businessId);

            if (!business) {
                return res.status(200).send("Business doesnt exists");
            }

            if (name) {
                await business.update({ name });
            }
            if (url) {
                await business.update({ url });
            }
            if (whatsAppLink) {
                await business.update({ whatsAppLink });
            }
            if (instagramLink) {
                await business.update({ instagramLink });
            }
            if (facebookLink) {
                await business.update({ facebookLink });
            }
            if (locationLink) {
                await business.update({ locationLink });
            }

            const updated = await Business.findOne({
                where: { id: businessId },
                include: { model: BusinessImages },
            });

            return res.status(200).send(updated);
        } catch (error) {
            return res.status(400).send(error);
        }
    } else if (req.method === "DELETE") {
        try {
            const { businessId } = req.query;

            const business = await Business.findByPk(businessId);

            if (!business) {
                return res.status(200).send("business doesnt exists");
            }

            await business.destroy();

            const deleted = await Business.findByPk(businessId);

            return deleted
                ? res.status(400).send("Error deleting business")
                : res.status(200).send("Deleted successfully");
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}
