import { Router } from 'express';
import {
    publishAArticle,
    updateArticleimage,
    deletearticle,
    togglePublishStatus,
    getAllarticles,
    getarticleById
} from "../controllers/article.controller.js"
import {verifyjwt} from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";



const router = Router();
router.use(verifyjwt); // Apply verifyJWT middleware to all routes in this file

router
    .route("/publisarticle")
    .get(getAllarticles)
    .post(
        upload.fields([
            {
                name: "ArticleImage",
                maxCount: 1,
            },
            
        ]),
        publishAArticle
    );
    // router.route("/getallvideo").get(getAllVideos)

router
    .route("/:articleId")
    .get(verifyjwt,getarticleById)
    .delete(deletearticle)
    .patch(upload.single("ArticleImage"), updateArticleimage);

router.route("/toggle/publish/:articleId").patch(togglePublishStatus);

export default router