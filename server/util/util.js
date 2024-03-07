import jwt from "jsonwebtoken";

export const varifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    if (await reGenerateAccessToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(accessToken, "access-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({
          vaild: false,
          message: "invalid access token",
        });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

const reGenerateAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let isToken = false;

  if (!refreshToken) {
    return res.json({
      vaild: false,
      message: "no refresh token",
    });
  } else {
    jwt.verify(refreshToken, "refresh-token-secret-key", (err, decoded) => {
      if (err) {
        res.json({
          vaild: false,
          message: "invalid refresh token",
        });
      } else {
        const accessToken = jwt.sign(
          {
            email: decoded.email,
          },
          "access-token-secret-key",
          {
            expiresIn: "1m",
          }
        );

        res.cookie("accessToken", accessToken, {
          maxAge: 60000,
        });

        isToken = true;
      }
    });
  }
  return isToken;
};
