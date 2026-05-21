export const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
    req.log.error(
    {
      err,
      method: req.method,
      url: req.url
    },
    "request failed"
  );

  return res
    .status(statusCode)
    .json({ status: "error", message: err.message || "Internal server error" });
};
