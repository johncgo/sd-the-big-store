import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import * as secrets from "../../../config/constants/secrets.js";
import UserException from "../exception/UserException.js";

class UserService {
    async findByEmail(req) {
        try {
            const { email } = req.params;
            const { authUser } = req;
            this.validarDadosRequisicao(email);
            let user = await UserRepository.findByEmail(email);
            this.validarUsuarioNotFound(user);
            this.validateAuthenticationUser(user, authUser);
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
            throw new UserException(httpStatus.BAD_REQUEST,"User was not found.")
        }
    }

    async getAccessToken(req) {
        try{
            const { email, password } = req.body;
            this.validateAccessTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validarUsuarioNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            const accessToken = jwt.sign( {authUser}, secrets.API_SECRET, {expiresIn: '1d'}) 
            return {
                status: httpStatus.SUCCESS,
                accessToken
            }
        } catch(err){
            return {
                status: err.status? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.status,
            }
        }
    }

    validateAccessTokenData(email, password) {
        if( !email || !password){
            throw new UserException(httpStatus.UNAUTHORIZED, "Email or password must be informed.");
        }
    }

    async validatePassword(password, hashPassword){
        if( !bcrypt.compare(password, hashPassword)){
            throw new UserException(httpStatus.UNAUTHORIZED, "Password doesn't match.");
        }
    }

    validateAuthenticationUser(user, authUser){
        if(!user.id || user.id !== authUser.id){
            throw new UserException(httpStatus.FORBIDDEN, "You cannot see this user data.")
        }
    }
}

export default new UserService();