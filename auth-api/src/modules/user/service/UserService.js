import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserException from "../exception/UserException.js";

class UserService {
    async findByEmail(req) {
        try {
            const { email } = req.params;
            this.validarDadosRequisicao(email);
            let user = await UserRepository.findByEmail(email);
            this.validarUsuarioNotFound(user);
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            }
         } catch(err) {
            return {
                status: err.status? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.status,
            }
        }
    }

    validarDadosRequisicao(email) {
        if(!email) {
            throw new UserException(httpStatus.BAD_REQUEST,"User email was not informed.");
        }
    }

    validarUsuarioNotFound(user) {
        if(!user) {
            throw new UserException(httpStatus.BAD_REQUEST, "User was not found.")
        }
    }
}

export default new UserService();