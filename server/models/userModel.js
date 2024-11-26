const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePhoto: {
      type: String,
      default: "default-profile-photo.png",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      //   validate: {
      //     validator: function (v) {
      //       // Check if password contains at least one uppercase letter, one lowercase letter, one number, and one special character
      //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      //         v
      //       );
      //     },
      //     message:
      //       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      //   },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, 10);

  user.password = hashedPassword;

  next();
});

module.exports = mongoose.model("User", userSchema);
