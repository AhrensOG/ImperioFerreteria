import { BusinessImages, Business } from "@/db/models/models";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { businessId } = req.body;

            if (!businessId) {
                return res.status(400).send("A businessId is required");
            }

            const response = await BusinessImages.findAll({
                where: { BusinessId: businessId },
                include: { model: Business },
            });

            return res.status(200).send(response);
        } catch (error) {
            return res.status(400).send(error);
        }
    } else if (req.method === "POST") {
        try {
            const { imagesList, businessId } = req.body;

            if (!imagesList || imagesList.length === 0 || !businessId) {
                return res
                    .status(400)
                    .send("Images are required | businessId is required");
            }

            const business = await Business.findByPk(businessId);

            if (!business) {
                return res.status(400).send("business doesnt exists");
            }

            for (let i = 0; i < imagesList.length; i++) {
                const exists = await BusinessImages.findOne({
                    where: { url: imagesList[i].url },
                });

                if (exists) {
                    return res.status(400).send({
                        exist: true,
                        name: imagesList[i].name,
                        url: imagesList[i].url,
                    });
                }
            }

            for (let i = 0; i < imagesList.length; i++) {
                const created = await BusinessImages.create({
                    name: imagesList[i].name,
                    url: imagesList[i].url,
                });
                await business.addBusinessImages(created);
            }

            const businessImages = await BusinessImages.findAll({
                where: { businessId: businessId },
            });

            return res.status(200).send(businessImages);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
}
