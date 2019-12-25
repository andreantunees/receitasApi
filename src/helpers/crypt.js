const bcrypt = require('bcryptjs');

module.exports = {
    async _generateCrypt (data) {
        const salt = await bcrypt.genSalt(process.env.GEN_CRYPT);
    
        return await bcrypt.hash(data,salt);    
    },
    
    async _compareCrypt (data, crypted) {
        return await bcrypt.compare(data, crypted);
    },
};
