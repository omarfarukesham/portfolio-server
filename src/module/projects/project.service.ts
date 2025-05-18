import Projects from './project.model';
import { IProject } from './project.interface';
import QueryBuilder from '../../builder/querybuilder';

const createProject = async (payload: IProject): Promise<IProject> => {
  const result = await Projects.create(payload);
  return result;
};

const getProjects = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'description', 'technologies'];

  const projects = new QueryBuilder(Projects.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .select();

  const result = await projects.modelQuery;
  return result;
};

const getSingleProject = async (id: string): Promise<IProject | null> => {
  const result = await Projects.findById(id);
  return result;
};

const updateProject = async (id: string, data: Partial<IProject>): Promise<IProject | null> => {
  const result = await Projects.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteProject = async (id: string): Promise<IProject | null> => {
  const result = await Projects.findByIdAndDelete(id);
  return result;
};

export const projectService = {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
