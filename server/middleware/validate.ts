module.exports = (req, res, next) => {
    const { email, name, password } = req.body;

    function validEmail(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    if(req.path === "/register") {
        if(![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing information")
        } else if(!validEmail(email)) {
            return res.status(401).json("Email is invalid")
        }
        else if (req.path === "/login") {
            if(![email, password].every(Boolean)) {
                return res.statu(401).json("Missing information");
            } else if (!validEmail(email)) {
                return res.status(401).json("Email is invalid");
            }
        }
    }

    next();
}