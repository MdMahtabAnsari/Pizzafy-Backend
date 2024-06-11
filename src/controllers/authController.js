const AuthService = require("../services/authService");
const UserRepository = require("../respositories/userRepository");
const { COOKIE_EXPIRE } = require("../config/serverConfig");
const login = async (req, res) => {
    try {
        const authService = new AuthService(new UserRepository);
        const response = await authService.loginUser(req.body);
        console.log(parseInt(COOKIE_EXPIRE));
        return res.cookie("authToken", response, {
            maxAge: parseInt(COOKIE_EXPIRE),  // Cookie will expire in given Time
            httpOnly: true, // The cookie is not accessible via JavaScript
            secure: false,  // Set to true if using HTTPS
            sameSite: 'strict' // Controls whether the cookie is sent with cross-site requests
        }).status(200).json({
            message: "Sucessfully logged in",
            success: true,
            error: {}
        })

    } catch (error) {
        return res.status(error.statusCode).json({
            reason: error.reason,
            success: false,
            data: {},
            error: error
        })
    }

}
module.exports = login 