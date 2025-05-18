import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    // slug: { type: String, unique: true }, ← remove this

    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    thumbnail: { type: String, required: true },
    liveUrl: { type: String },
    githubUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    details: { type: String },
    screenshots: [{ type: String }],
    videoDemoUrl: { type: String },
    clientName: { type: String },
    projectType: {
      type: String,
      enum: ['Personal', 'Freelance', 'Company'],
    },
    duration: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Remove this if slug is not used
// projectSchema.pre("save", function (next) {
//   if (!this.slug && this.title) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   next();
// });

const Project = mongoose.model<IProject>("Projects", projectSchema);
export default Project;
