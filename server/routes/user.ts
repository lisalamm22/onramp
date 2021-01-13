const userRouter = require('express').Router();
const userAuth = require('../middleware/authorization');
const userPool = require('../db');

userRouter.get("/dash", userAuth, async (req, res) => {
    try {
        const user = await userPool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

userRouter.post('/likes', userAuth, async (req, res) => {
    try{
        const { image, imagelink } = req.body;
        const newLike = await userPool.query(
            "INSERT INTO likes (image, imagelink, liker_id) VALUES ($1, $2, $3) RETURNING *",
            [ image,imagelink, req.user]
        );
        res.json(newLike.rows[0])
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
} )

userRouter.get('/likes', userAuth, async (req, res) => {
    try{
        const likes = await userPool.query("SELECT image, imagelink FROM likes WHERE liker_id =$1", [req.user])
        res.json({
            results: likes.rowCount,
            images: likes.rows
        })
    } catch(err){
        console.log(err.message);
        res.status(500).send("Server Error")
    }
})

userRouter.post('/edits', userAuth, async (req, res) => {
    try{
        const { image, imagelink, options } = req.body;
        const newEdit = await userPool.query(
            "INSERT INTO edits (image, imagelink, options, editor_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [ image, imagelink, options, req.user]
        );
        res.json(newEdit)
    } catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
} )

userRouter.get('/edits', userAuth, async (req, res) => {
    try{
        const edits = await userPool.query("SELECT image,imagelink,options FROM edits WHERE editor_id =$1", [req.user])
        res.json({
            // results: edits.rowCount,
            edits: edits.rows
        })
    } catch(err){
        console.log(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = userRouter