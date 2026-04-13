import ApiError from "../utils/api-error.js";

const validate = (schema) => {
  return (req, _, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => e.message).join("; ");
      throw ApiError.badRequest(errors);
    }

    req.body = result.data;
    next();
  };
};

export default validate;
