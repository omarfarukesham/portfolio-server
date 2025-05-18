import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { experienceService } from './experience.service';

const createExperience = catchAsync(async (req, res) => {
  const result = await experienceService.createExperience(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Experience created successfully',
    data: result,
  });
});

const getExperiences = catchAsync(async (req, res) => {
  const result = await experienceService.getExperiences(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Experiences fetched successfully',
    data: result,
  });
});

const getSingleExperience = catchAsync(async (req, res) => {
  const experienceId = req.params.id;
  const result = await experienceService.getSingleExperience(experienceId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Experience fetched successfully',
    data: result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const experienceId = req.params.id;
  const data = req.body;

  const result = await experienceService.updateExperience(experienceId, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Experience updated successfully',
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const experienceId = req.params.id;

  await experienceService.deleteExperience(experienceId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Experience deleted successfully',
    data: {},
  });
});

export const experienceController = {
  createExperience,
  getExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
