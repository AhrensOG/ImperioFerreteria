import { Business, BusinessImages } from "@/db/models/models";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const business = await Business.findOne({
        include: BusinessImages,
      });

      if (!business) {
        return res.status(404).send("Business not found");
      }

      return res.status(200).json(business);
    } catch (error) {
      return res.status(500).send(error.message);
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
        return res.status(400).send("Missing required data");
      }

      const foundBusiness = await Business.findOne();

      if (foundBusiness) {
        return res.status(409).send("The organization already exists");
      }

      const newBusiness = await Business.create(
        {
          name,
          url,
          whatsAppLink,
          instagramLink,
          facebookLink,
          locationLink,
        },
        {
          include: { model: BusinessImages },
        }
      );

      return res.status(200).json(newBusiness);
    } catch (error) {
      return res.status(500).send(error.message);
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
        return res.status(404).send("Business doesn't exist");
      }

      const updatedFields = {};

      if (name) updatedFields.name = name;
      if (url) updatedFields.url = url;
      if (whatsAppLink) updatedFields.whatsAppLink = whatsAppLink;
      if (instagramLink) updatedFields.instagramLink = instagramLink;
      if (facebookLink) updatedFields.facebookLink = facebookLink;
      if (locationLink) updatedFields.locationLink = locationLink;

      await business.update(updatedFields);

      const updatedBusiness = await Business.findOne({
        where: { id: businessId },
        include: { model: BusinessImages },
      });

      return res.status(200).json(updatedBusiness);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
