const jwt = require('jsonwebtoken');
const { JWT_EXPIRE, JWT_SECRET } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class AuthService {
    constructor(userRespository) {

        this.userRepository = userRespository;
        this.jwt = jwt;
        this.JWT_SECRET = JWT_SECRET;
        this.JWT_EXPIRE = JWT_EXPIRE;
        this.bcrypt = bcrypt;
    }

    async loginUser(authDetail) {
        try {
            if (!authDetail.email) {
                throw {
                    reason: "Email required",
                    statusCode: 400
                }
            }
            if (!authDetail.password) {
                throw {
                    reason: "Password required",
                    statusCode: 400
                }
            }
            const user = await this.userRepository.findUser({ email: authDetail.email });
            if (!user) {
                throw {
                    reason: "Email not found",
                    statusCode: 404
                }
            }
            const hasPassword = user.password;
            const plainPassword = authDetail.password;
            const isPasswordMatch = await this.bcrypt.compare(plainPassword, hasPassword);
            if (!isPasswordMatch) {
                throw {
                    reason: "Password not match",
                    statusCode: 400
                }
            }
            const token = this.jwt.sign({ id: user._id, email: user.email }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRE });
            return token;

        }
        catch (error) {
            throw {
                reason: error.reason,
                statusCode: error.statusCode || 500
            }
        }
    }
}
module.exports = AuthService;