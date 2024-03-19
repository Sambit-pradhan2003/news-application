import mongoose from "mongoose"
import {Article} from "../models/article.model.js"
// import {Like} from "../models/like.model.js"
import {asynchandaler} from "../utils/asynchandler.js"
import{apierror} from "../utils/apierror.js"
import {apiresponse} from "../utils/apiresponse.js"


const getChannelarticles = asynchandaler(async (req, res) => {
    //  Get all the videos uploaded by the channel also the isPublic false video but also 
    const userId = req.user?._id;
    const articles = await Article.aggregate([
        {
           $match:{
             owner:new mongoose.Types.ObjectId(userId)
           }
        }
    ]);
    res.status(200)
    .json(
        new apiresponse(200,articles,"videos fetched successfully for user: ",userId)
    )
})



export {
    getChannelarticles
    }