import express from "express"
import Post from "../Models/Post.js";
import { verifyUser } from "../utils/VerifyUser.js";
import { errorHandler } from "../utils/errHandler.js";
import upload from "../utils/Middleware.js";

const routes = express.Router();

routes.post("/new", verifyUser, upload, async (req, res, next) => {
    try {
        const data = req.user;
        const { title, summary, content } = req.body;

        const cover = req.file.path
        if (!title, !summary, !content, !cover) return next(errorHandler(400, "something is mising"));

        const NewPost = await Post.create({
            title,
            summary,
            content,
            cover: cover,
            user: data._id
        })

        res.status(200).json(NewPost);

    } catch (error) {
        next(error)
    }
})

routes.get("/get", async (req, res, next) => {
    try {
        const Lists = await Post.find()

        res.status(200).json({
            success: true,
            data: Lists
        })

    } catch (error) {
        next(error)
    }
})

routes.get("/get/:id", async (req, res, next) => {
    try {
        const { id } = req.params

        const Lists = await Post.findById(id)

        res.status(200).json({
            success: true,
            data: Lists
        })

    } catch (error) {
        next(error)
    }
})

routes.patch("/update/:id", verifyUser, async (req, res, next) => {
    try {

        const id = req.params.id;
        const userId = req.user._id;

        const { title, description, status, date } = req.body;

        const List = await Todo.findById(id);
        if (!List) return next(errorHandler(404, "Not Found"));
        if (List.user != userId) return next(errorHandler(400, "bad request!"))


        if (title) List.title = title
        if (description) List.description = description
        if (status) List.status = status
        if (date) List.date = date

        const data = await List.save();



        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
})



routes.delete("/delete/:id", verifyUser, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const id = req.params.id;

        const List = await Post.findById(id);
        if(List.user != userId) return next(errorHandler(400, "Bad Request"))

        await Post.findByIdAndDelete(List._id)

        res.status(200).json({
            success: true,
            message: "delete successfully",
        });

    } catch (error) {
        next(error)
        console.log(error);
    }
})


export default routes
