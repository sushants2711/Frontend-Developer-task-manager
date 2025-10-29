import joi from "joi";


export const createPostMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(5).max(50).trim().required(),
            content: joi.string().min(10).max(100).trim().required(),
            likes: joi.number().optional().default(0)
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const updatePostMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(5).max(50).trim().optional().empty(""),
            content: joi.string().min(10).max(100).trim().optional().empty(""),
            likes: joi.number().optional().default(0)
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};