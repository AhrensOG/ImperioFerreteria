import { Categories, Products } from "@/db/models/models";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await Categories.findAll({
        include: { model: Products },
      });

      return response.length
        ? res.status(200).send(response)
        : res.status(400).send("Categories Not Found");
    } catch (error) {
      return res.status(400).send(error);
    }
  } else if (req.method === "POST") {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).send('A name is required')
      }

      const found = await Categories.findOne({ where: { name } });

      if (found) {
        return res.status(400).send("Category already exists");
      }

      await Categories.create({ name });

      const created = await Categories.findOne({ where: { name } });

      return created
        ? res.status(200).send(created)
        : res.status(400).send("Error during category creation");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).send('An ID is required')
      }

      const category = await Categories.findByPk(id)

      if (!category) {
        return res.status(400).send('Category doesnt exists')
      }

      await Categories.destroy({ where: { id } })

      return res.status(200).send('Category deleted successfully')

    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
