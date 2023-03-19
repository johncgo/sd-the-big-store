import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js";

export async function createInitialData() {
    try {
        await User.sync({ force: true });
        let password = await bcrypt.hash("123456", 10);

        await User.create({
            name: 'User test3',
            email: 'userteste3@teste.com',
            password: password,
        });

        await User.create({
            name: 'User test4',
            email: 'userteste4@teste.com',
            password: password,
        });
    } catch (err) {
        console.log(err);
    }
}