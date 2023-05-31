const ArticleModel=require('../Models/Article')

// Authorization
const jwt=require('jsonwebtoken')
const authori = async (req, res, next) => {
    try {
        
        let id = req.params.articleid
        
        let article = await ArticleModel.findById(id)
        if (!article) {
            return res.status(404).send({status:false,msg:"blog is not found given id"})
        }
        
        let userId = article.userId
        let token = req.headers['x-api-key']
        if (!token) {
            return res.status(400).send({status:false,msg:"Header must be present !"})
        }
        jwt.verify(token,"this is a secreat key" , function (err, valid) {
            if (err) {
                return res.status(403).send({status:false,msg:"Invalid token !"})
            }
            if (valid) {
                
                if (valid.userId == userId) { //here I checked user have permit to access this resources
                    next()
                } else {
                    return res.status(403).send({ status: false, msg: "you have not authorized person!!" })
                }
            }
        });
    } catch (error) {
        return res.status(500).send({ Error: error.message })
    }
}

module.exports.authori = authori
