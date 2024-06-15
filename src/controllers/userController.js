const UserService = require("../services/userService")

const createUser = async (req, res) => {
    try {
        const userService = new UserService();
        // const userService = new UserService();
        const response = await userService.registerUser(req.body);

        return res.status(201).json({
            message: "Sucessfully registered the user",
            success: true,
            data: response,
            error:{}
        })
    }
    catch (error) {
        return res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }
}

module.exports =  createUser 