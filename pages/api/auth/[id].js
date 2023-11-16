import { Cart, User } from "@/db/models/models"


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      if(!id) {
        return res.status(400).json('An ID is required');
      };
      const user = await User.findAll({ where: { id }, include: { model: Cart } });
      if (!user) {
        return res.status(400).json('User not found');
      };

      return res.status(200).json(user);

    } catch (error) {
      return res.status(400).json(error.message)
    };
  };
};