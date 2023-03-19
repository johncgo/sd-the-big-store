import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js";

export async function createInitialData() {
    try {
        await User.sync({ force: true });
        let password = await bcrypt.hash("123456", 10);

        await User.create({
            name: 'User test1',
            email: 'userteste1@teste.com',
            password: password,
        });

        await User.create({
            name: 'User test2',
            email: 'userteste2@teste.com',
            password: password,
        });
    } catch (err) {
        console.log(err);
    }
}