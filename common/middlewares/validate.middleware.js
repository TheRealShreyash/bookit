import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.issues.map((e) => e.message).join("; ");
        throw ApiError.badRequest(errors);
      }

      req.body = result.data;
      next();
    } catch (error) {
      ApiResponse.error(res, error);
    }
  };
};

export default validate;
