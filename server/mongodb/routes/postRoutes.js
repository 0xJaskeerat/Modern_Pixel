import express from 'express';
import * as dotenv from 'dotenv';

import PostModel from '../models/post.js';

dotenv.config();

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Can't fetch posts, please try again" });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating a post, please try again' });
  }
});

export default router;