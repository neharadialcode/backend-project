import mongoose, { Schema } from "mongoose";
import bcrypy from "bcrypy";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: String, //cloudnary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
// MIDDLEWARE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypy.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  bcrypy.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};
export const User = mongoose.model("User", userSchema);