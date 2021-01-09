var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwtV = require('jsonwebtoken');
require("dotenv").config();
module.exports = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const jwtToken = req.header("token");
    if (!jwtToken) {
        return res.status(403).json("Not Authorized - no token");
    }
    try {
        const payload = jwtV.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;
        next();
    }
    catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorized");
    }
});
//# sourceMappingURL=authorization.js.map