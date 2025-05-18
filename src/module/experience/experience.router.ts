import express from 'express';
import { experienceController } from './experience.controller';

const router = express.Router();

router.post('/', experienceController.createExperience);
router.get('/', experienceController.getExperiences);
router.get('/:id', experienceController.getSingleExperience);
router.patch('/:id', experienceController.updateExperience);
router.delete('/:id', experienceController.deleteExperience);

export const experienceRoutes = router;
