import { catchAsync } from '../utils/utils.js';
import Artical from '../models/Artical.js';
import mongoose from 'mongoose';


export const getArtical = catchAsync(async (req, res) => {
    let query = JSON.stringify(req.query);
    query = query.replace(/(gt|gte|lt|lte)/, (match) => `$${match}`);
    let Articals = Artical.find(JSON.parse(query));

    if (req.query.page !== undefined) {
        const limit = req.query.limit;
        Articals.skip((+req.query.page - 1) * limit);
        Articals.limit(limit);
    }
    if (req.query.sort != undefined && req.query.orderby != undefined) {
        const sortObject = {};
        sortObject[req.query.sort] = req.query.orderby === "asc" ? 1 : -1;
        Articals.sort(sortObject);
    }
    res.json({
        status: "success",
        data: await Articals,
    });
});
export const getOneArtical = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Artical with id: ${id}`);

    const artical = await Artical.findById(id);

    res.json(artical);
});
export const getAllArticals = catchAsync(async (req, res, next) => {
    console.log("getAllArticals Artical");
    const Articals = await Artical.find();
    res.status(201).json({ status: "success", data: Articals });
});
export const createArtical = catchAsync(async (req, res, next) => {
    console.log("create Artical");
    const Articals = await Artical.create(req.body);
    res.status(201).json({ status: "success", data: Articals });
});
export const deleteArtical = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Artical with id: ${id}`);

    await Artical.findByIdAndRemove(id);

    res.json({ message: "Artical deleted successfully." });
});
export const likeArtical = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Artical with id: ${id}`);

    const artical = await Artical.findById(id);

    const index = artical.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        artical.likes.push(req.userId);
    } else {
        artical.likes = artical.likes.filter((id) => id !== String(req.userId));
    }
    const updatedArtical = await Artical.findByIdAndUpdate(id, artical, { new: true });
    res.status(200).json(updatedArtical);
});

export const updateArtical = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Artical with id: ${id}`);

    const updatedArtical = await Artical.findByIdAndUpdate(id, req.body, { new: true });

    res.json(updatedArtical);
});

export const articalComments = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Artical with id: ${id}`);
    const articals = await Artical.findById(id);

    res.json(articals.comments);
})