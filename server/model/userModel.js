const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, " password can't be empty"],
      minLength: [4, "password should be greater than 4 characters"],
      select: false,
    },
    mobile: {
      type: Number,
        },
        role: {
            type: String,
            default:"user",
    },
    addresses: [
      {
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
            },
            zipCode: {
            type:Number,
            },
            addressType: {
                type:String
            }
      },
        ],
        avatar: {
            public_id: {
                type: String,
                required:false,
            },
            url: {
                type: String,
                required:false,
            }
        },
        resetPasswordToken: String,
        resetPasswordTime:Date,
  },
  {
    timestamps: true,
  }
);
// hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})
// jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRES,
    });
}
// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passWord);
}

module.exports = mongoose.model("User", userSchema);
