const ownerOrAdminMiddleware  = (req,res,next) =>{
    if(req.user.role==="ADMIN"){
        return next();
    }
    if(req.params.id === String(req.user.id)){
        return next();
    }
    return res.status(403).json({
        success:false,
        message:"Access denied"
    })
}
export default ownerOrAdminMiddleware;