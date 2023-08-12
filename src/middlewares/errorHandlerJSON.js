export const errorHandlerJSON = (error, req, res, next) => {
  if (error instanceof SyntaxError && error.message.includes("JSON")) {
    res.status(400).json({ error: "Request error. Check the JSON format." });
  } else {
    next();
  }
};
