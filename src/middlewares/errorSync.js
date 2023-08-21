export const errorSync = (error, req, res, next) => {
  if (error) return res.status(500).json({ error: "Server Internal Error" });
  next();
};
