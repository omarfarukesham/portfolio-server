import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { skillService } from "./skill.service";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.createSkill(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Skill created successfully",
    data: result,
  });
});

const getSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.getSkills();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Skills fetched successfully",
    data: result,
  });
});

const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.getSingleSkill(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Skill fetched successfully",
    data: result,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response)=>{
  const result =   await skillService.updateSkill(req.params.id, req.body);
    sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Skill updated successfully",
    data: result
  });
})

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  await skillService.deleteSkill(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Skill deleted successfully",
    data: {},
  });
});

export const skillController = {
  createSkill,
  getSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
