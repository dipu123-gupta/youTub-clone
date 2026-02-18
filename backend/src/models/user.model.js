import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      lowercase: [true, "Username must be lowercase"],
      trim: [true, "Username must be trimmed"],
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: [true, "Full name must be trimmed"],
      index: true,
    },
    avatar: {
      type: String, //cludinary url image
      required: [true, "Avatar is required"],
      trim: [true, "Avatar must be trimmed"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      lowercase: [true, "Email must be lowercase"],
      trim: [true, "Email must be trimmed"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: [true, "Password must be trimmed"],
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash password before saving to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Methods compared password with hashed password in database
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Methods to generate access token and refresh token
userSchema.methods.generateAccessToken = function () {
  return jsonwebtoken.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      avatar: this.avatar,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Methods to generate access token and refresh token
userSchema.methods.generateRefreshToken = function () {
  return jsonwebtoken.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESS_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
