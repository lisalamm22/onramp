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
        const user = yield userPool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
userRouter.post('/likes', userAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { image, imagelink } = req.body;
        const likes = yield userPool.query("SELECT * FROM likes WHERE liker_id = $1 AND image = $2", [req.user, image]);
        if (likes.rows.length !== 0) {
            return res.status(401).send("User already likes photo");
        }
        const newLike = yield userPool.query("INSERT INTO likes (image, imagelink, liker_id) VALUES ($1, $2, $3) RETURNING *", [image, imagelink, req.user]);
        res.json(newLike.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
userRouter.get('/likes', userAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const likes = yield userPool.query("SELECT image, imagelink FROM likes WHERE liker_id =$1", [req.user]);
        res.json({
            results: likes.rowCount,
            images: likes.rows
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}));
userRouter.post('/edits', userAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { image, imagelink, options } = req.body;
        const newEdit = yield userPool.query("INSERT INTO edits (image, imagelink, options, editor_id) VALUES ($1, $2, $3, $4) RETURNING *", [image, imagelink, options, req.user]);
        res.json(newEdit);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
userRouter.get('/edits', userAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const edits = yield userPool.query("SELECT image,imagelink,options FROM edits WHERE editor_id =$1", [req.user]);
        res.json({
            // results: edits.rowCount,
            edits: edits.rows
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}));
module.exports = userRouter;
//# sourceMappingURL=user.js.map