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
    links: [
      {
        title: { type: String }, // Link title
        link: { type: String }, // Link URL
        active: { type: Boolean, default: true }, // Status if the link is active
        variant: [
          {
            bgColor: { type: String, default: "#000" }, // Background color
            bgImage: { type: String, default: "" }, // Background image URL
            bgVideo: { type: String, default: "" }, // Background video URL
            textColor: { type: String, default: "#fff" }, // Text color
            textFont: { type: String, default: "sans-serif" }, // Text font
            buttonStyle: { type: String, default: "" }, // Button style
            styleStatus: { type: String, enum: ["locked", "unlocked"] }, // Style status
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Page = models.Page || model("Page", PageSchema);

export default Page;
