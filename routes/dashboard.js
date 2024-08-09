const { ensureAuthenticated } = require("../middleware/auth")
const db = require("../models")

const router = require("express").Router()

router.get('/',ensureAuthenticated,async(req,res,next)=>{
    try {
        if (req.user.role==='Admin') {
            const technician = [];
            const getUser = []
            const users = await db.User.findAll({include:["roles"],raw:true})
            const count_intervention = await db.Intervention.count();
            const count_issues = await db.Issue.count();
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user['roles.name']==='Technician') {
                    technician.push(user)
                }else if(user['roles.name']==='User'){
                    getUser.push(user)
                }
            }
            return res.render("dashboard",{count_technician:technician.length,count_user:getUser.length,count_intervention,count_issues})
        }else{
            const count_intervention = await db.Intervention.count({where:{technician_id:req.user.id}});
            const count_issues = await db.Issue.count();
            return res.render("dashboard",{count_intervention,count_issues})
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router