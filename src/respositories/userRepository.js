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
                statusCode: error.statusCode||500,
                
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
                statusCode: error.statusCode||500,
                
            }
        }
    }
    async updateUser(params, userDetails) {
        try {
            const response = await User.findOneAndUpdate({ ...params }, { ...userDetails }, { new: true });
            return response;
        }
        catch (error) {
            throw {
                reason: error.message,
                statusCode: error.statusCode||500,
                
            }
        }
    }
}

module.exports = UserRepository;