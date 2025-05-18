"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const projectSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
// Remove this if slug is not used
// projectSchema.pre("save", function (next) {
//   if (!this.slug && this.title) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   next();
// });
const Project = mongoose_1.default.model("Projects", projectSchema);
exports.default = Project;
