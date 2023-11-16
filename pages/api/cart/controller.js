import { Cart, Products, ProductsCart, User } from "@/db/models/models"


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).send('Missing UserID')
      }
      const response = await Cart.findOne({ where: { UserId: userId }, include: [
        {model: User},
        {model: Products},
      ] })
      return response ? res.status(200).send(response) : res.status(400).send('Cart doesnt exists')
    } catch (error) {
      return res.status(400).send(error)
    }
  } else if (req.method === 'POST') {
    try {
      const { userId } = req.body;

      if( !userId ) {
        return res.status(400).send('An UserID is required')
      };

      const foundCart = await Cart.findOne({ where: { UserId: userId }, include: [
        {model: User},
        {model: Products}
      ] })

      if (foundCart) {
        return res.status(200).send({ Cart:foundCart, alreadyExist: true})
      }

      const newCart = await Cart.create({
        status: 'Shopping',
        totalPrice: 0,
      })

      const userCart = await User.findOne({where: { id: userId }})

      await userCart.setCart(newCart)

      const createdCart = await Cart.findOne({ where: { UserId: userId }, include: [
        {model: User},
        {model: Products}
      ] })

      return res.status(200).send({ Cart: createdCart, alreadyExist: false})

    } catch (error) {
      res.status(400).send(error)
    }
  } else if (req.method === 'PUT') {
    try {
      const { userId, status, totalPrice } = req.body;

      if ( !userId ) {
        return res.status(400).send('An UserID is required')
      }

      const foundCart = await Cart.findOne({ where: { UserId: userId } });

      if (status) {
        await foundCart.update({
          status
        })
      }
      if (totalPrice) {
        await foundCart.update({
          totalPrice
        })
      }

      const updatedCart = await Cart.findOne({ where: { UserId: userId }, include: [
        {model: User},
        {model: Products}
      ] });

      return res.status(200).send(updatedCart)
      
    } catch (error) {
      res.status(400).send(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      const { userId } = req.body;

      if ( !userId ) {
        return res.status(400).send('An UserID is required');
      };

      await Cart.destroy({ where: { UserId: userId } });

      const deleted = await Cart.findOne({ where: { UserId: userId } });

      return deleted ? res.status(400).send('Error deleting Cart') : res.status(200).send('Cart successfully destroyed');

    } catch (error) {
      res.status(400).send(error)
    }
  };
};