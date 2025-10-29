import jwt from "jsonwebtoken";
import authModel from "../models/auth.model.js";

export const verifyCookies = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Unauthorized User - No Token Provided"
                });
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Jwt - Authorization failed"
                });
        };

        const user = await authModel.findById(decode.userId).select("-password");

        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not found, wrong token"
                });
        };

        req.user = user;

        next();

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
}