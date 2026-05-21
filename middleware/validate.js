import { logger } from "../utils/logger.js";

export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
        logger.warn("Validation failed", {
        property,
        errors: error.details.map((err) => err.message),
        path: req.originalUrl,
        method: req.method,
      });
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((err) => err.message),
      });
    }

    logger.info("validation passed", { property, data: value });

    if (property === 'body') {
      req.body = value;
    }
    next();
  };
};
// export const validate = (schema, property = 'body') => {
//   return (req, res, next) => {
//     const { error, value } = schema.validate(req[property], {
//       abortEarly: false,
//       stripUnknown: true,
//     });

//     if (error) {
//     logger.warn("Validation failed", {
//         property,
//         errors: error.details.map((err) => err.message),
//         path: req.originalUrl,
//         method: req.method,
//       });
//       return res.status(400).json({
//         message: 'Validation failed',
//         errors: error.details.map((err) => err.message),
//       });
//     }
//     logger.info("validation passed", { property, data: value });
//     if (property === 'query') {
//       req.query = { ...req.query, ...value }; // merge instead of overwrite
//     } else {
//       req[property] = value;
//     }

//     next();
//   };
// };