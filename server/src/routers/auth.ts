import { login, register } from "../controllers/auth";
import { doesExist } from "../middleware/doesExist";
import { router } from "../utils/router";
import { validateLogin, validateRegistration } from "../validations/auth";

router.route("/register").post(validateRegistration, doesExist, register);
router.route("/login").post(validateLogin, login);

export default router;
