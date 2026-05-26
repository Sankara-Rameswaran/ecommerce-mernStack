export const uploadProduct = async (req,res) =>{
    try{
        const files = req.files;
        const imageNames = files.map((file)=>file.filename);
        res.status(200).json({
            success:true,
            images:imageNames,
            message:"Images uploaded successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}