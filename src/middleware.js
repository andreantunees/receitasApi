const jwt = require('jsonwebtoken');
const authConfig = require('./config/auth');
const { userOnlineByPk } = require('./controllers/validations/seg');

module.exports = {
    async auth (req,res,next) {
        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.header('auth-token');
        if(!token) return res.status(401).json({ message: 'Access Denied'});

        if (token.startsWith('Bearer ')) token = token.slice(process.env.SLICE_BEARER, token.length);

        const black = await checkTokenBlackList(token);
        if(black) return res.status(400).json({ message : 'Invalid Token', reload : true });
    
        try{
            const decoded = await promisify(jwt.verify)(token, authConfig.secret);
            req.idUser = decoded.id;
            req.to = token;

            const user = await userOnlineByPk(req.idUser);
            if(user) return res.status(400).json({ message : 'Invalid Token', reload : true });

            next();
        }catch(err){
            return res.status(400).json({ message : 'Invalid Token' });
        }
    },
}