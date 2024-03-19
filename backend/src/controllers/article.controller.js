import mongoose, {isValidObjectId} from "mongoose"
import {Article} from "../models/article.model.js"
import {User} from "../models/user.model.js"
import {asynchandaler} from "../utils/asynchandler.js"
import{apierror} from "../utils/apierror.js"
import {apiresponse} from "../utils/apiresponse.js"

import {uploadoncloudinary} from "../utils/cloudinary.js"
import fs from "fs";



const publishAArticle = asynchandaler(async (req, res) => {
    // get article, upload to cloudinary
    //req.user - user , check if there or not 
    //title , description , check if there not 
    //upload file on multer , check if there not 
    //local path from multer and upload it on cloudinary 
    //if there is anything in is public then also update that 

   try {
     const { title, Text } = req.body

     if( !req.files.ArticleImage){
        console.log("artice")
        if(req.files.ArticleImage){
            fs.unlinkSync(req.files?.ArticleImage[0]?.path)
        }
        throw new apierror(401," ArticleImage is missing");
     }
     
     const articleimagelocalpath = req.files?.ArticleImage[0]?.path;

     if(!title || !Text){
        
        if(articleimagelocalpath){
            fs.unlinkSync(articleimagelocalpath)
        }
        throw new apierror(401,"cannot publish video without title and and text");
     }
     
     const ownerId = req.user?._id ;
     if(!ownerId) throw new apierror(401,"user not loggedin");
 
     const articleimage = await uploadoncloudinary(articleimagelocalpath);
    
     if(!articleimage) throw new apierror(500,"uploading error when uploading either thumbnail to cloudinary") ;
     
     const createdarticle = await Article.create({
        ArticleImage:articleimage.secure_url ,
         owner:ownerId,
         title,
         Text,
         isPublic:req.body.isPublic == "false" ? false : true
        
     })
     if(!createdarticle){
        throw new apierror(500,"something went wrong")
    }
     return res
     .status(201)
     .json(
         new apiresponse(201,createdarticle,"article is published")
     )
   } catch (error) {
     res
     .status(error?.statusCode||500)
     .json({
        status:error?.statusCode||500,
        message:error?.message||"some error in publishing article"
     })
   }

})




const updateArticleimage = asynchandaler(async (req, res) => {
    try {
      const { articleId } = req.params
      // update video details like title, description, thumbnail
      if(!articleId) throw new apierror(400,"articleId missing");
      
      const {title,Text} = req.body ;
      const articleimagelocalpath = req.file?.path;
      if(!title && !Text && !articleimagelocalpath)
      throw new apierror(400,"either send updated title ,text or thumbnail");
      
      const userId = req.user._id;
      if(!userId) throw new apierror(400,"user not logged in");
  
      const article = await Article.findById(articleId);
  
      if(!article) throw new apierror(400,"article with this articleId is missing")
      const ownerId = article?.owner;
      const permission = JSON.stringify(ownerId) == JSON.stringify(userId);
      console.log(JSON.stringify(ownerId),JSON.stringify(userId))
  
      if(!permission) throw new apierror(400,"login with owner id");
      
      if(articleimagelocalpath){ 
          var thumbnail = await uploadoncloudinary(articleimagelocalpath);
      }
      
      const updatedObj = {};
      if(title) updatedObj.title = title;
      if(Text) updatedObj.Text = Text;
      if(articleimagelocalpath) updatedObj.ArticleImage = thumbnail.secure_url ;
      
  
      const updatedVideo = await Article.findByIdAndUpdate(
          new mongoose.Types.ObjectId(articleId),
          updatedObj,
          {
              new:true
          }
      )
  
      res.status(200)
      .json( 
          new apiresponse(200,updatedVideo,"video updated successFully")
      ) ;
  
    } catch (error) {
      
     res
     .status(error?.statusCode||500)
     .json({
        status:error?.statusCode||500,
        message:error?.message||"some error in updating the video"
     })
 
    }
 
 })




 const deletearticle = asynchandaler(async (req, res) => {
    // delete video
   try {
     const { articleId } = req.params
     console.log(articleId)
     
     if(!articleId) throw new apierror(400,"videoId missing");
     
     if(!req.user) throw new apierror(400,"user not loggedIn");
 
     const userId = req.user._id;
     const article = await Article.findById(articleId);
     if(!article) throw new apierror(400,"video with this videoId is missing")
     const ownerId = article?.owner;
     // console.log(new String(userId));
     // console.log(JSON.stringify(ownerId));
 
     if(JSON.stringify(ownerId) !== JSON.stringify(userId)) throw new apierror(400,"login with owner id")
 
     const deleted = await Article.findByIdAndDelete(new mongoose.Types.ObjectId(articleId));
     console.log(deleted)
 
     return res
     .status(200)
     .json(
         new apiresponse(200,{info:`article : ${article.title} is deleted`},"video deleted successFully")
     )
   } catch (error) {
    res
    .status(error?.statusCode||500)
    .json({
       status:error?.statusCode||500,
       message:error?.message||"some error in deleting a video"
    })
   }
})




const getAllarticles = asynchandaler(async (req, res) => {
   
    // get all videos based on query, sort, pagination
    // run a query -
    // we also check for query i.e. through which we can search from search bar 
    // also important take care of not showing videos with isPublic = false 
    // first check for page and limit 
    // sortBy - createdAt , views , duration 
    // sortType - ascending , descending 
    // sort by UserId i.e get all the videos of user
    
   try {
     const { page, limit, query, sortBy, sortType, userId } = req.query
     const pageOptions = {
         page : Number(page) || 0,
         limit : Number(limit) || 10
     }
 
     let pipelineArr = [
         {
             $match:{
                isPublished:true
             }
         },  
     ]

     if(query){
        pipelineArr.push(
            {  
               $match:{
                title:{
                    $regex:query,
                    $options: 'i'
                }
               }
            }
        )
     }
    
     if(sortBy){
         if(sortType == "ascending") {
             pipelineArr.push(
                 {
                     $sort: {
                       [sortBy]:1
                     }
                   }
             )
         }
         if(sortType == "descending") {
             pipelineArr.push(
                 {
                     $sort: {
                       [sortBy]:-1
                     }
                   }
             )
         }
     
     }
     if(userId){
        pipelineArr.push(
            {
                $match:{
                    owner : userId
                }
            }
        )
     }
     pipelineArr.push(
         {
             $lookup:{
                 from:"users",
                 localField:"owner",
                 foreignField:"_id",
                 as:"channel"
             }
         }
     )
     pipelineArr.push(
         {
             $unwind:"$channel"
         }
     )
     pipelineArr.push(
         {
             $project:{
                 _id : 1,
                 owner:1,
                 Text:1,
                 ArticleImage:1,
                 title:1,
                 views:1,
                 channel:"$channel.username",
                 channelFullName:"$channel.fullName",
                 channelAvatar:"$channel.avatar",
                 createdAt:1
             }
         }
     )
     const result = await Article.aggregate(pipelineArr)
     .skip(pageOptions.limit * pageOptions.page)
     .limit(pageOptions.limit)
     
         
      res
      .status(200)
      .json(
         new apiresponse(
             200,
             result,
             "videos fetched successFully"
         )
      )
   } catch (error) {
    throw new apierror(500,error,"error at get all video")
   }
})



const getarticleById = asynchandaler(async (req, res) => {
    try {
      const { articleId } = req.params
      // get video by id
  console.log(articleId)
      if(!articleId) throw new apierror(400,"videoId missing");
      
      const article = await Article.findOneAndUpdate({
          _id: new mongoose.Types.ObjectId(articleId)
      },{
          $inc:{views:1}
      },{
          new:true
      })
      console.log(article,"ghjh")
     
      // can update this so that owner can only see through id
      if(!article || !article?.isPublished) throw new apierror(400,`video with this ${videoId} is not available`)
 
      const userId = req.user?._id;
      console.log(userId)
      const user = await User.findById(userId);
      console.log(user)

      await user.save({
         validateBeforeSave:false
      })
 
      res.status(200)
      .json(new apiresponse(200,article,"got article from id"))
    } catch (error) {
     throw new apierror(500,error,"something went wrong when get video by id")
    }
 })



const togglePublishStatus =asynchandaler(async (req, res) => {
    try {
      const { articleId } = req.params
      // check if video is present and user  is logged in 
      // check if the owner is the one who is toggling the status
      // then if all conditions are satisfied then toggle it
      if(!articleId) throw new apierror(400,"videoId is absent");
  
      const article = await Article.findById(articleId);
      if(!article) throw new apierror(400,"video with this videoId is missing");
      const ownerId = article?.owner;
  
      const userId = req.user?.id;
      if(!userId)throw new apierror(400,"user is not logged in");
  
      const permission = JSON.stringify(userId) == JSON.stringify(ownerId);
  
      if(!permission) throw new apierror (400,"for toggling video status login with owner id");
  
      const updatedUser = await Article.findByIdAndUpdate(
          new mongoose.Types.ObjectId(articleId),
          {
             isPublished: article.isPublished? false :true  
          },
          {
              new : true 
          }
      )
      
      res
      .status(200)
      .json(
          new apiresponse(
              200,
              updatedUser,
              `${article._id} toggle to ${article.isPublished?false:true}`
          )
      )
      
    } catch (error) {
     res
     .status(error?.statusCode||500)
     .json({
        status:error?.statusCode||500,
        message:error?.message||"some error in toggle publishing"
     })
    }
 
 })
 

export {
    getAllarticles,
    publishAArticle,
    getarticleById,
    updateArticleimage,
    deletearticle,
    togglePublishStatus
}