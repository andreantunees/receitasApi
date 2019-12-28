const jwt = require('jsonwebtoken');

module.exports = {
    async auth (req,res,next) {
        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.header('auth-token');
        if(!token) return res.status(401).send('Access Denied');

        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
    
        try{
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            req.user = decoded;
            next();
        }catch(err){
            res.status(400).send('Invalid Request');
        }
    },
}