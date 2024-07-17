import { deletePost, doPost, editPost, getPosts } from "../controllers/post";
import { authorizeProfile } from "../middleware/authorization";
import { isPrivate } from "../middleware/isPrivate";
import { router } from "../utils/router";

router.route("/:id/profile/:profileId/posts").get(isPrivate, getPosts);
router.route("/:id/profile/:profileId/post").post(authorizeProfile, doPost);

router
  .route("/:id/profile/:profileId/post/:postId")
  .put(authorizeProfile, editPost)
  .delete(authorizeProfile, deletePost);

export default router;
