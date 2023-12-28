const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken')

const registerController = async(req,res) =>{
    try{
     const existinguser = await userModel.findOne({email:req.body.email})
     //validation
     if(existinguser){
        return res.status(200).send({
            success:false,
            message:'user Already exists'
        })
     }
     //hash password
     const salt = await bcrypt.genSalt(10)
     const hashedpassword = await bcrypt.hash(req.body.password,salt)
     req.body.password = hashedpassword
     //rest data
     const user = new userModel(req.body)
     await user.save()
     return res.status(201).send({
        success:true,
        message: "user registered successfully",
        user,
     })
    }catch(error){
        console.log(error)
        res.status(500).send({
        success:false,
        message:'error im register API',
        error
    })
    }
};

//login call back
const loginController = async(req,res) => {
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'user not found',
            })
        }
        //check role
        if (user.role !== req.body.role)  {
          return res.status(500).send({
            success : false,
            message : "role doesnt match"
          })
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
         if(!comparePassword){
              return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
              })
         }

          const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
          return res.status(200).send({
            success : true,
            message: 'Login Successfully',
            token,
            user,
          })

    }catch(error){
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Error in Login API',
        error
      })
    }
};

//GET CURRENT USER
const currentUserController = async(req,res) => {
   try{
    const user = await userModel.findOne({ _id: req.body.userId});
    return res.status(200).send({
      success: true,
      message: "User Fatched Successfully",
      user,
    });

   }
   catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message: 'unable to get user',
      error
    })
   }
}


module.exports = {registerController, loginController, currentUserController}