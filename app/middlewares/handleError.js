import { GeneralError } from "../utils/errors";

export const handleError = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    const code = err.getCode();
    console.log(code);
    return res.status(code).json({ name: err.name, message: err.message });
  }

  return res.status(500).json({
    name: "Internal Server Error",
    message: err.message,
  });
};
