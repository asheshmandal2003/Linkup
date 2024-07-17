import {
  editProfile,
  editProfileType,
  getProfile,
} from "../controllers/profile";
import { authorizeProfile } from "../middleware/authorization";
import { isPrivate } from "../middleware/isPrivate";
import { router } from "../utils/router";

router
  .route("/:id/profile/:profileId")
  .get(isPrivate, getProfile)
  .put(editProfile)
  .patch(authorizeProfile, editProfileType);

export default router;
