import { v2 as cloudinary} from "cloudinary";
import fs from "fs";


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadoncloudinary=async (localfilepath)=>{
    try {
        if(!localfilepath) return null;
    const response=await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto"
    })
    console.log("file is uploaded sucessfully",response.url)
    console.log(localfilepath)
    if (fs.existsSync(localfilepath)) {
        fs.unlinkSync(localfilepath);
        console.log("Local file deleted successfully")
      }
      else {
        console.log("Local file does not exist.");
    }
    return response;
    

    } catch (error) {
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
            console.log("Local file deleted due to error",error);
        }
        console.log(error);
        return null;
    }
}


export {uploadoncloudinary}