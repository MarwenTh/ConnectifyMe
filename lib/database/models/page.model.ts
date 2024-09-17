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
    // displayName: { type: String, default: "" }, // Profile name
    // profileImage: { type: String, default: "" }, // Profile picture URL
    // bgType: { type: String, default: "color" }, // Either "color" or "image"
    // bgColor: { type: String, default: "#000" }, // Background color
    // bgImage: { type: String, default: "" }, // Background image URL
    bio: { type: String, default: "Hey there! I'm using ConnectifyMe" },
    links: [
      {
        title: { type: String }, // Link title
        link: { type: String }, // Link URL
        active: { type: Boolean, default: true }, // Status if the link is active
        variant: { type: String, default: "" }, // Variant for the link
      },
    ],
  },
  { timestamps: true }
);

const Page = models.Page || model("Page", PageSchema);

export default Page;
