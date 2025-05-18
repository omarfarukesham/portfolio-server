import Skill from "./skill.model";
import { ISkill } from "./skill.interface";

const createSkill = async (data: ISkill): Promise<ISkill> => {
  const skill = await Skill.create(data);
  return skill;
};

const getSkills = async (): Promise<ISkill[]> => {
  return await Skill.find();
};

const getSingleSkill = async (id: string): Promise<ISkill | null> => {
  return await Skill.findById(id);
};
const updateSkill = async (id: string, data: Partial<ISkill>): Promise<ISkill | null> => {
    return await Skill.findByIdAndUpdate(id, data, { new: true });

}

const deleteSkill = async (id: string): Promise<ISkill | null> => {
  return await Skill.findByIdAndDelete(id);
};

export const skillService = {
  createSkill,
  getSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
