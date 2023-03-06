import User from "../model/User.js";

class userRepository {
    async findByEmail(email) {
        try {
            return await userRepository.findOne({ where: { email } });
        } catch (err) {
            console.error(err.message);
            return null;
        }
    }

    async finById(id) {
        try {
            return await userRepository.findOne({ where: { id } });
        } catch (err) {
            console.error(err.message);
            return null;
        }
    }
}

export default new userRepository();