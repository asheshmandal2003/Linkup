import {
  follow,
  getFollowers,
  getFollowersCount,
  getFollowing,
  getFollowingsCount,
  unfollow,
} from "../controllers/followers";
import { verifyToken } from "../middleware/auth";
import { router } from "../utils/router";

router.route("/:id/followers/count").get(getFollowersCount);
router.route("/:id/followers").get(getFollowers);
router.route("/:id/follow/:userId").put(follow).delete(unfollow);
router.route("/:id/followings/count").get(getFollowingsCount);
router.route("/:id/followings").get(getFollowing);

export default router;
