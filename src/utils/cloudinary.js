import {v2 as cloudinary} from "cloudinary";
import fs from "fs" ; // fs => file system

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath){
            return null;
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        
        //console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response
    }catch(error){
         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload got failed
         return null;
    }
}

export { uploadOnCloudinary }



// router.get("/", async (req, res) => {
//     try {
//       res.status(200).json({}); 
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
// });
