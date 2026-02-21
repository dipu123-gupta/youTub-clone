import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
// import User from "./../models/user.model";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend and save it to database
  const { userName, fullName, email, password } = req.body;
  console.log(userName, fullName);
  if (!userName || !fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists
  const existingUser = await User.findOne([{ email }, { userName }]);
  console.log(existingUser);

  // check if user already exists
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // check for images. check for avatar and thumbnal
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log(avatarLocalPath);
  console.log(coverImageLocalPath);

// check if avatar is required
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //  check if avatar uploaded successfully if not upload on cloudinary then throw error
  if (!avatar) {
    throw new ApiError(500, "Avatar file is required");
  }

  // create user in database and send response
  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
  });

  // 
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  // send response to frontend  
  res.status(201).json(
    new ApiResponse(201, "User created successfully", createdUser)
  );
});

export { registerUser };
