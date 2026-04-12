const validate = (schema) => {
  return (req, res, next) => {
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
