import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../modules/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  if (
    [fullName, email, userName, password].some((value) => value?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const avratLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avratLocalPath) {
    throw new ApiError(400, "Avatar file  is required");
  }
  const avatar = await uploadOnCloudinary(avratLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });
  const createdUser = await user
    .findById(user._id)
    .select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "something went wrong when registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registred successfully"));
});
export { registerUser };
