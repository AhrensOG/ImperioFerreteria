import { User } from "@/db/models/models";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const { id } = req.body;

            let users;
            let response;
            id
                ? (users = await User.findOne({ where: { id: id } }))
                : (users = await User.findAll());
            users
                ? (response = res.status(200).send(users))
                : (response = res.status(404).send("Cannot find any user"));
            return response;
        }
        if (req.method === "POST") {
            const { name, email, address, phone, id } = req.body;
            if (!name || !email || !address || !phone || !id) {
                return res.status(400).send("Miss data");
            }
            const user = await User.create({
                id,
                name,
                email,
                address,
                phone,
            });
            let response;
            user
                ? (response = res.status(200).send("User created", user))
                : res.status(400).send("Error in creation of the user");
            return response;
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
}
