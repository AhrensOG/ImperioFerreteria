import { ProductsImages } from "@/db/models/models";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { idList } = req.body;
      if ( !idList || !idList.length ) {
        return res.status(400).send('An ID list is required')
      };

      for (let i = 0; i < idList.length; i++) {
        const exist = await ProductsImages.findByPk(idList[i].id);
        if (!exist) {
          return res.status(400).send(`Image with ID ${idList[i].id} doesnt exists`)
        }
      }

      for (let i = 0; i < idList.length; i++) {
        await ProductsImages.destroy({ where: { id: idList[i].id } });
      }

      return res.status(200).send('Image successfully destroyed')

    } catch (error) {
      return res.status(400).send(error)
    }
  };
};