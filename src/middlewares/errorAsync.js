export const resolver = (handlefn) => {
  return (req, res, next) => {
    return Promise.resolve(handlefn(req, res, next)).catch((error) => {
      console.log(error);
      next(error);
    });
  };
};
