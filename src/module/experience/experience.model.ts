import mongoose, { Schema } from "mongoose";
import { IExperience } from "./experience.interface";

const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    location: { type: String },
    technologies: [{ type: String }],
    isCurrent: { type: Boolean, default: false },
    companyIcon: { type: String },
  },
  { timestamps: true }
);

const Experience = mongoose.model<IExperience>("Experience", experienceSchema);
export default Experience;
