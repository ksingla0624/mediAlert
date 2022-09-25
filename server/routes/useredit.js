const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


router.get("/:id",(req, res)=>{
    const id = req.params.id;
    // console.log("Hn"+ id);
    // console.log(req.body);
    User.findById(id, (err,doc)=>{
      if(err){
        res.send(err);
      }
      else{
        res.send(doc);
        console.log(doc);
        // console.log("Worked");
      }
      // console.log(doc);
    })
  })



  router.post("/:id",async (req,res) =>{
    console.log("I am ");
    console.log(req.body);
    try{
      const user = await User.findOne({ _id: req.params.id });

    const checkPasswordchanged = await bcrypt.compare(
			req.body.password,
			user.password
		);
    if(!checkPasswordchanged){
      console.log("run this");
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashPassword;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
    }
    if(checkPasswordchanged){
      console.log("run that");
      user.password = req.body.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
    }
    await user.save();
		res.status(200).send({ message: "Account info updated successfully" });
    }catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
    

  })
module.exports = router;