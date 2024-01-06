import { BusinessImages, Business } from "@/db/models/models";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { businessId } = req.query;

      if (!businessId) {
        return res.status(400).send("A businessId is required");
      }

      const response = await BusinessImages.findAll({
        where: { BusinessId: businessId },
        include: Business,
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else if (req.method === "POST") {
    try {
      const { imagesList, businessId } = req.body;

      if (!imagesList || imagesList.length === 0 || !businessId) {
        return res
          .status(400)
          .send("Invalid input. Images list and businessId are required.");
      }

      const business = await Business.findByPk(businessId);

      if (!business) {
        return res.status(404).send("Business not found");
      }

      for (const image of imagesList) {
        const exists = await BusinessImages.findOne({
          where: { url: image.url },
        });

        if (exists) {
          return res.status(400).json({
            exist: true,
            name: image.name,
            url: image.url,
          });
        }
      }

      await Promise.all(
        imagesList.map(async (image) => {
          const created = await BusinessImages.create({
            name: image.name,
            url: image.url,
          });
          await business.addBusinessImages(created);
        })
      );

      const businessImages = await BusinessImages.findAll({
        where: { id: businessId },
      });

      return res.status(201).send(businessImages);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
