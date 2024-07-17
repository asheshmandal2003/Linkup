import {
  follow,
  getFollowers,
  getFollowersCount,
  getFollowing,
  getFollowingsCount,
  unfollow,
} from "../controllers/followers";
import { verifyToken } from "../middleware/authentication";
import { router } from "../utils/router";

router.route("/:profileId/followers/count").get(getFollowersCount);
router.route("/:profileId/followers").get(getFollowers);
router
  .route("/:profileId/follow/:friendProfileId")
  .put(follow)
  .delete(unfollow);
router.route("/:profileId/followings/count").get(getFollowingsCount);
router.route("/:profileId/followings").get(getFollowing);

export default router;
