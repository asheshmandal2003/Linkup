import {
  deleteUser,
  editProfileType,
  editUser,
  getUser,
} from "../controllers/user";
import { verifyToken } from "../middleware/auth";
import { router } from "../utils/router";
import { validateEditUser } from "../validations/user";

router
  .route("/:id")
  .get(verifyToken, getUser)
  .put(verifyToken, validateEditUser, editUser)
  .patch(verifyToken, editProfileType)
  .delete(verifyToken, deleteUser);

export default router;
