import { model, models, Schema } from "mongoose";

const PageSchema = new Schema(
  {
    // uri: { type: String, required: true, unique: true }, // URL slug for the page
    username: { type: String, required: true, unique: true }, // Username for the page
    image: {
      type: String,
      default: "",
    }, // Profile picture URL
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Refers to the user who owns the page
    bio: {
      type: String,
      default: "Hey there! I'm using ConnectifyMe",
      maxlength: 80,
    }, // User bio
    textFont: { type: String, default: "Poppins" }, // Font for the text on the page
    background: { type: String, default: "" }, // Background video URL
    styleStatus: {
      type: String,
      enum: ["locked", "unlocked"],
      default: "unlocked",
    }, // Status for the page style

    links: [
      {
        title: { type: String }, // Link title
        link: { type: String }, // Link URL
        active: { type: Boolean, default: true }, // Status if the link is active
        variant: { type: String, default: "" }, // Variant for the link button
      },
    ],
  },
  { timestamps: true }
);

const Page = models.Page || model("Page", PageSchema);

export default Page;
