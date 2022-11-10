const authMiddleware = async (req, res, next)=>{
    const {username, admin} = req.session
    if(username && admin){
       return next()
    }
    return res.status(400).render("main", { layouts: "index", session:false})
}

export default authMiddleware;