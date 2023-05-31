const articlemodel = require('../Models/Article')
const usermodel = require('../Models/User')
const mongoose = require('mongoose')

const ObjectId = require('mongoose').Types.ObjectId

const createarticle = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ Error: "Body  should be not empty" })
        }
        
        let body = req.body
        if (!(body.title && body.description )) {
            return res.status(400).send({ status: false, msg: " Body must contain title , description !" })
        }

        let id = req.body.userId
        if (!ObjectId.isValid(body.userId)) {
            return res.status(404).send({ status: false, msg: "UserId invalid" });
          }
       
          let user = await usermodel.findById(id)
        if (!user) {
            return res.status(404).send({ status: false, msg: "User not found" })
        }
       
        let data = new articlemodel(req.body)
        let result = await data.save()
        let ig=result._id.toString()
        if(result.isDeleted==false){
            result =await articlemodel.findOneAndUpdate({_id:ig},{new:true})
        }
        res.status(201).send({ status: true, data: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const getarticle = async (req, res) => {
    try {
        let query = req.query 
        
        if (query) {
            let articles = await articlemodel.find({ $and: [query, { isDeleted: false }] })
            
            return articles.length == 0 ? res.status(404).send({ status: false, msg: "article are not found" }) : res.status(200).send({ status: true, data: articles })
        }
        else {
            let articles = await articlemodel.find({ isDeleted: false })
            return articles.length == 0 ? res.status(404).send({ status: false, msg: "article are not found" }) : res.status(200).send({ status: true, data: articles })
        }
        
    } 
    
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }

}


module.exports.createarticle = createarticle
module.exports.getarticle = getarticle

