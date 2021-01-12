var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userRouter = require('express').Router();
const userAuth = require('../middleware/authorization');
const userPool = require('../db');
userRouter.get("/dash", userAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // const { id } = req.user
        const user = yield userPool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
userRouter.post('/likes', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { user, image } = req.body;
        const newLike = yield userPool.query("INSERT INTO likes (image, liker_id) VALUES ($1, $2) RETURNING *", [image, user]);
        res.json(newLike.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
// userRouter.get('/likes', userAuth, async (req, res) => {
//     try{
//         const likes = await userPool.query("SELECT image FROM likes WHERE liker_id =$1", [req.user])
//         res.json(likes)
//     } catch(err){
//         console.log(err.message);
//         res.status(500).send("Server Error")
//     }
// })
module.exports = userRouter;
//# sourceMappingURL=user.js.map