const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const isLoggedIn = (req,res,next)=>{
    const token = req.cookies.authToken;
    if(!token){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        })
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "Invalid Auth Token"
        })
    }
    req.user={
        email: decoded.email,
        id: decoded.id,
        userType: decoded.userType
    }
    next();

}
const isAdmin = (req, res, next)=>{
    if(req.user.userType !== 'admin'){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "Not an admin"
        })
    }
    next();
}
module.exports = {
    isLoggedIn,
    isAdmin
};