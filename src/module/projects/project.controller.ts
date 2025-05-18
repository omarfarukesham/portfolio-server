import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { projectService } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const result = await projectService.createProject(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Project created successfully',
    data: result,
  });
});

const getProjects = catchAsync(async (req, res) => {
  const result = await projectService.getProjects(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Projects fetched successfully',
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const projectId = req.params.id;
  const result = await projectService.getSingleProject(projectId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Project fetched successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const projectId = req.params.id;
  const result = await projectService.updateProject(projectId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Project updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const projectId = req.params.id;
  await projectService.deleteProject(projectId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Project deleted successfully',
    data: {},
  });
});

export const projectController = {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
