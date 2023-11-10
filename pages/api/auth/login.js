import { User } from "@/db/models/models"


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.params;
      if(!id) {
        return res.status(400).json('An ID is required');
      };
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json('User not found');
      };

      return res.status(200).json(user);

    } catch (error) {
      return res.status(400).json(error)
    };
  } else if (req.method === 'POST') {
    try {
      const credentials = req.body;
      
      const id = credentials?.user?.uid;
      const name = credentials?.user?.displayName;
      const email = credentials?.user?.email;
      const profileImage = credentials?.user?.photoURL;

      if( !id || !name || !email || !profileImage ) {
        return res.status(400).json('Missing data')
      };

      const user = await User.findByPk(id);

      if(user) {
        return res.status(200).json({data: user, userAlreadyExists: true})
      } else {
        await User.create({
          id,
          name,
          email,
          profileImage
        })
  
        const created = await User.findByPk(id);
  
        return res.status(200).json({data: created, userAlreadyExists: false})
      };

    } catch (error) {
      res.status(400).json(error)
    }
  };
};