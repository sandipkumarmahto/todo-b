import { User } from "../model/user.model.js";


const registerUser = async (req, res) => {
  // try {
    console.log("in register controller")
    const { fullname, email, mobile, password } = req.body;
    const ps = password;
    console.log(fullname);
    console.log(email);
    console.log(mobile); 
    console.log(password);
    if (fullname==="" || !email==="" || !mobile==="" || !password==="") {
      res.staus(400).json({message:"all fields required"})
    }
  
    // if([fullName,email,username,password].some((field) =>{
    //     field?.trim()===""
    // })){
    //     return res.status(400).json({message:"all fields are required"})
    // }

    const existedUSer = await User.findOne({email});

    if (existedUSer) {
      console.log("username or email already exist");
      console.log(existedUSer);
      return res.status(409).json({message:"email already exist"})
    //   throw new ApiError(409, "username or email already exist");
    }

    const createdUser = await User.create({
      fullname, 
      email,
      mobile,
      password,
      ps,
    }); 

    if (!createdUser) {
      return res.status(500).json({ message: "Failed register user" });
    }
    res.status(201).json({
      message: "User registered successfully",
      user: createdUser
      // {
      //   id: createdUser._id,
      //   name: createdUser.fullName,
      //   mobile: createdUser.mobile,
      //   email: createdUser.email,
      // },
    });
    console.log("user registered" + createdUser);
};

const findUser = async (req, res) => {
  console.log("in findUser")
  const user=req.user;
  console.log(user)
  if(!user){
    res.status(404).json("unable to fetch user details")
  }
  res.status(200).json({user});
  
  // try {
  //   const { id } = req.params;
  //   const user = await User.findById(id);
  //   if (!user) {
  //     res.status(404).json({ message: "user not found" });
  //   }
  //   // console.log(user)
  //   res.status(200).json(user);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  //   console.log(error);
  // }
};

// const findAllUsers = async (req, res) => {
//   try {
//     const users = await User.find(); 
//     if (!users) {
//       res.status(404).json({ message: "user not found" });
//     }
//     console.log("all users are getting"); 
//     res.status(200).json(users); 
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log(error);
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     console.log("in update controller");
//     console.log(id);

//     const updatedUser = await User.findByIdAndUpdate(id, updates, {
//       new: true,
//     });

//     if (!updatedUser) {
//       res.status(404).json({ message: "user not found" });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message + "error in updating user" });
//     console.log(error);
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);
//     console.log("in delete controller");
//     const deleted = await User.findOneAndDelete(id);
//     if (!deleted) {
//       res.status(404).json({ message: "something wrong" });
//     }
//     res.status(200).json({ message: "user deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log(error);
//   }
// };

// export { resisterUser, findUser, findAllUsers, updateUser, deleteUser };

export { registerUser, findUser };
