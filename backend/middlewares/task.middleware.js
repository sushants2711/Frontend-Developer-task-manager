import joi from "joi";

export const createTaskMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(5).max(50).trim().required(),
            description: joi.string().min(10).max(200).trim().required(),
            completed: joi.boolean().required()
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

export const updateTaskMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(5).max(50).trim().optional().empty(),
            description: joi.string().min(10).max(200).trim().optional().empty(),
            completed: joi.boolean().optional().empty("")
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