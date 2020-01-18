const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { userOnlineByPk, checkTokenBlackList } = require('./controllers/validations/seg');

module.exports = {
    async auth (req,res,next) {
        try{
            
            let token = req.headers['x-access-token'] || req.headers['authorization'] || req.header('auth-token');
            if(!token) return res.status(401).json({ message: 'Access Denied'});

            if (token.startsWith('Bearer ')) token = token.slice(process.env.SLICE_BEARER, token.length);

            const black = await checkTokenBlackList(token);
            if(black) return res.status(400).json({ message : 'Invalid Token', blacklist: true, reload: true });
            
            const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_KEY);
            req.idUser = decoded._id;
            req.to = token;
            
            const user = await userOnlineByPk(req.idUser);
            if(!user) return res.status(400).json({ message : 'Invalid Token', reload : true });
            
            next();
      
        }catch(err){
            res.status(400).send(err);
        }
    },
}