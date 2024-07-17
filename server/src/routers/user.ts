import { deleteUser } from "../controllers/user";
import { verifyToken } from "../middleware/authentication";
import { router } from "../utils/router";

router.route("/:id").delete(verifyToken, deleteUser);

export default router;
