const userRouter = require('express').Router();
const userAuth = require('../middleware/authorization');
const userPool = require('../db');

userRouter.get("/dash", userAuth, async (req, res) => {
    try {
        // const { id } = req.user
        const user = await userPool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = userRouter