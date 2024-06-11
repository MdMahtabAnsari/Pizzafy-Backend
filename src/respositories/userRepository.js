const User = require("../schema/userSchema");

class UserRepository {
    async findUser(params) {
        try {
            const response = await User.findOne({ ...params });
            return response;
        }
        catch (error) {
            throw {
                reason: error.message,
                status: 400,
                
            }
        }
    }

    async createUser(userDetails) {
        try {

            const response = await User.create({ ...userDetails });
            return response;
        }
        catch (error) {
            throw {
                reason: error.message,
                status: 400,
                
            }
        }
    }
}

module.exports = UserRepository;