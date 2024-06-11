// const UserRepository = require("../respositories/userRepository");

class UserService {
    // #userRepository = new UserRepository(); to create private variable
    constructor(_userRepository) {
        this.userRepository = _userRepository;
    }
    async registerUser(userDetails) {
        // It will create a brand new user in database

        try {

            // 1 We need check if the user with this email is already exist or not
            const user = await this.userRepository.findUser({
                email: userDetails.email,
                mobileNumber: userDetails.mobileNumber
            })

            if (user) {

                throw {
                    reason: "User with given email and mobile number already exist",
                    statusCode: 400
                }
            }

            // 2 If not exist then create a new user in the database

            const newUser = await this.userRepository.createUser({
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                mobileNumber: userDetails.mobileNumber,
                email: userDetails.email,
                password: userDetails.password
            });
            // 4 Return the detail of created user

            return newUser;
        }
        catch (error) {

            throw {
                reason: error.reason,
                statusCode: error.statusCode || 500,

            }

        }
    }
}

module.exports = UserService;