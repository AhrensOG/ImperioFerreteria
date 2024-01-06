import { BusinessImages } from "@/db/models/models";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { idList } = req.body;

      if (!idList || !idList.length) {
        return res.status(400).send("An ID list is required");
      }

      const imagesToDelete = await BusinessImages.findAll({
        where: {
          id: idList.map((item) => item.id),
        },
      });

      const imageIdsToDelete = imagesToDelete.map((image) => image.id);

      const imagesNotFound = idList.filter(
        (item) => !imageIdsToDelete.includes(item.id)
      );

      if (imagesNotFound.length > 0) {
        return res
          .status(400)
          .send(
            `Images with IDs ${imagesNotFound
              .map((item) => item.id)
              .join(", ")} dont exist`
          );
      }

      await BusinessImages.destroy({
        where: {
          id: imageIdsToDelete,
        },
      });

      return res.status(200).send("Images successfully destroyed");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
