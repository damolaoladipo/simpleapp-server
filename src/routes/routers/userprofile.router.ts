import { Router } from 'express';
import { createOrUpdateUserProfile, getUserProfileById, deleteUserProfile } from '../../controllers/userprofile.controller';

const userprofileRouter = Router();


userprofileRouter.post('/:userId', createOrUpdateUserProfile);
userprofileRouter.get('/:userId', getUserProfileById);
userprofileRouter.delete('/:userId', deleteUserProfile);

export default userprofileRouter;
