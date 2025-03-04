import express from "express";
import homeController from "../controllers/home-controller.js";
import blogSchema from "../validators/blog-validator.js";
import validate from "../middlewares/validate-middleware.js";
const router = express.Router();

router.route('/').get(homeController.home);
router.route('/createPost').post(validate(blogSchema),homeController.createPost);
router.route('/likeDislike/:id').post(homeController.likeDisLike);
router.route('/readBlog/:id').get(homeController.readBlog);
router.route('/deleteBlog/:id').delete(homeController.deleteBlog);
router.route('/search').get(homeController.search);

export default router;