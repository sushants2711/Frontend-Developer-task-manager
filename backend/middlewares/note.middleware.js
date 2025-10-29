import joi from "joi";

export const addNotesMiddleware = async (req, res, next) => {
    try {

        if (req.body && typeof req.body.tags === "string") {
            try {
                req.body.tags = JSON.parse(req.body.tags);
            } catch (error) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid JSON format in 'tags' field",
                        error: error.message
                    });
            };
        };

        const schema = joi.object({
            title: joi.string().min(5).max(50).trim().required(),
            content: joi.string().min(10).max(100).trim().required(),
            tags: joi.array().items(joi.string().min(2).max(50).trim().optional().empty("")).optional().empty("")
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

export const updateNotesMiddleware = async (req, res, next) => {
    try {

        if (req.body && typeof req.body.tags === "string") {
            try {
                req.body.tags = JSON.parse(req.body.tags);
            } catch (error) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid JSON format in 'tags' field",
                        error: error.message
                    });
            };
        };

        const schema = joi.object({
            title: joi.string().min(5).max(50).trim().optional().empty(""),
            content: joi.string().min(10).max(100).trim().optional().empty(""),
            tags: joi.array().items(joi.string().min(2).max(50).trim().optional().empty("")).optional().empty("")
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