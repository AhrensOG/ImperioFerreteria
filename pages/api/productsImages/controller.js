import { Products, ProductsImages } from "@/db/models/models";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { productId } = req.body;

      if ( !productId ) {
        return res.status(200).send('A ProductId is required')
      };

      const response = await ProductsImages.findAll({ where: { ProductId: productId }, include: { model: Products } });

      return res.status(200).send(response)

    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'POST') {
    try {
      const { imagesList, productId } = req.body;

      if ( !imagesList || imagesList.length === 0 || !productId ) {
        return res.status(400).send('Images are required | ProductId is required')
      };

      const product = await Products.findByPk(productId)
      console.log(product)

      if ( !product ) {
        return res.status(400).send('Product doesnt exists')
      }

      for (let i = 0; i < imagesList.length; i++) {
        const exists = await ProductsImages.findOne({ where: { url: imagesList[i].url } })

        if (exists) {
          return res.status(400).send({exist: true, name: imagesList[i].name, url: imagesList[i].url })
        } 
      }

      for (let i = 0; i < imagesList.length; i++) {
        const created = await ProductsImages.create({
          name: imagesList[i].name,
          url: imagesList[i].url
        })
        await product.addProductsImages(created)
      }

      const productsImages = await ProductsImages.findAll( { where: { ProductId : productId } } );

      return res.status(200).send(productsImages)

    } catch (error) {
      return res.status(400).send(error.message)
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if ( !id ) {
        return res.status(200).send('An ID is required')
      };

      const exist = await ProductsImages.findByPk(id);

      if ( !exist ) {
        return res.status(200).send('Image doesnt exists')
      }

      await ProductsImages.destroy({ where: { id } });

      const destroyed = await ProductsImages.findByPk(id);

      return !destroyed ? res.status(200).send('Image successfully destroyed') : res.status(200).send('Image wasnt destroyed')

    } catch (error) {
      return res.status(400).send(error)
    }
  };
};