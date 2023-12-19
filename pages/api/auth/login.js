import { User } from "@/db/models/models"


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const credentials = req.body;
      
      const id = credentials?.user?.uid;
      const name = credentials?.user?.displayName;
      const email = credentials?.user?.email;
      const profileImage = credentials?.user?.photoURL;

      if( !id || !name || !email || !profileImage ) {
        return res.status(400).json('Missing data')
      };

      const user = await User.findOne({ where: { id } });

      if(user) {
        return res.status(200).json({data: user, userAlreadyExists: true})
      } else {
        await User.create({
          id,
          name,
          email,
          profileImage
        })
  
        const created = await User.findOne({ where: { id } });
  
        return res.status(200).json({data: created, userAlreadyExists: false})
      };

    } catch (error) {
      res.status(400).json(error)
    }
  };
};