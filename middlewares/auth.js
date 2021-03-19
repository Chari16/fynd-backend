const { verifyToken, getTokenFromRequest } = require('../utils/auth');
const { unauthorized } = require('../utils/apiError');

// middleware to extract token from header

/* 
Header Format:
Autorization Bearer asdadadadadadad
*/

const auth = async(req, res, next) => {
    console.log(" in auth ")
    try {
        const token = getTokenFromRequest(req);
        console.log(" token ", token)
        const decoded = await verifyToken(token);
        console.log(" decode ", decoded)
        if(decoded._id) {
            req.user = { id: decoded._id, type: decoded.type }
        }
        next()
    } 
    catch(e){
        console.log(" rer ", e)
        // res.status(401).send({ error:'Unauthorized'})
        return next(unauthorized())
    }
}
 
module.exports = auth