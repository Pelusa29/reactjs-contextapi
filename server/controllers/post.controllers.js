import Post from '../models/Post.js'
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

//#region Posts
export const getPost = async (req, res) => {
    const allPosts = await Post.find()
    res.send(allPosts)
}
//#endregion


//#region Comments
export const creaPost = async (req, res) => {
    try {
        const { title, description } = req.body

        let image = {}

        if (req.files.image) {
            const globalUrl = await uploadImage(req.files.image.tempFilePath)

            image = {
                url: globalUrl.secure_url,
                public_id: globalUrl.public_id
            }
            //Delete the image from the filesystem
            await fs.remove(req.files.image.tempFilePath)
        }

        const newPost = new Post({ title, description, image })
        await newPost.save()
            .then(task => {
                res.status(201).json({
                    message: 'Post created successfully',
                    data: task
                })
            })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
//#endregion

//#region Update Post
export const updatePost = async (req, res) => {
    try {
        const { title, description } = req.body
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' })

        res.status(200).json({ message: 'Post Updated', updatedPost })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
//#endregion

//#region Delete Post
export const deletePost = async (req, res) => {
    try {

        if (!req.params.id) return res.status(404).json({ message: 'Id needs to exist' })

        const postDelete = await Post.findByIdAndDelete(req.params.id)
        if (!postDelete) return res.status(404).json({ message: 'Post not found' })

        //Delete image from cloudinary
        if (postDelete.image?.public_id) {
            await deleteImage(postDelete.image.public_id)
        }

        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//#endregion

//#region Get By Id Post

export const getPostById = async (req, res) => {
    try {
        console.log(req.params.id)
        const post = await Post.findById(req.params.id)

        if (!post) return res.status(404).json({ message: 'Post not found' })

        res.status(200).json({ message: 'Post founded successfully', post })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//#endregion