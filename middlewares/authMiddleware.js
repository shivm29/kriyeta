import JWT from "jsonwebtoken"

export const requireSignIn = async (req, res, next) => {
    try {
        // get token from headers
        const token = req.headers.authorization;

        // if token is not present, return a res asking to login
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Login to proceed',
            });
        }

        // verify if token present is VALID or not
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        // save the decoded data in the user field of req headers (will be used ahead in controllers)
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Invalid Credentials',
        });
    }
};