import path from "path"
import multer from "multer"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"src/uploads")
    },
    filename:(req,file,cb)=>{
        const uniqueName = Date.now()+""+ Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null,uniqueName);    
    }
})

const upload = multer({storage}) 

export default upload;