import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true },
    fullName: { type: String },
    role: { type: String, default: "user" },
    image: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    page: { type: Schema.Types.ObjectId, ref: "Page" },
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
