import QueryBuilder from "../../builder/querybuilder";
import { IExperience } from "./experience.interface";
import Experience from "./experience.model";

// Create new experience entry
const createExperience = async (payload: IExperience): Promise<IExperience> => {
  console.log("Payload in service", payload);
  const result = await Experience.create(payload);
  return result;
};

// Get all experiences with search, filter, pagination
const getExperiences = async (query: Record<string, unknown>) => {
  const searchableFields = ["company", "role", "description", "technologies"];

  const experiences = new QueryBuilder(Experience.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .select();

  const result = await experiences.modelQuery;
  return result;
};

// Get single experience by ID
const getSingleExperience = async (id: string): Promise<IExperience | null> => {
  const result = await Experience.findById(id);
  return result;
};

// Update experience
const updateExperience = async (
  id: string,
  data: Partial<IExperience>
): Promise<IExperience | null> => {
  const result = await Experience.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

// Delete experience
const deleteExperience = async (id: string): Promise<IExperience | null> => {
  const result = await Experience.findByIdAndDelete(id);
  return result;
};

export const experienceService = {
  createExperience,
  getExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
