var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGeneratorFunc = require('../util/jwtGenerator');
router.post('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield pool.query(" SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }
        const numSalts = 10;
        const salt = yield bcrypt.genSalt(numSalts);
        const bcryptPassword = yield bcrypt.hash(password, salt);
        const newUser = yield pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *", [name, email, bcryptPassword]);
        const token = jwtGeneratorFunc(newUser.rows[0].user_id);
        res.json({ token });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
// router.post("/login", async (req, res) => {
//     try{
//     } catch{
//     }
// })
module.exports = router;
//# sourceMappingURL=jwtAuth.js.map