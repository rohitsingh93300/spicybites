import {Category} from "@/models/Category"
import mongoose from "mongoose";

export async function POST(req){
    mongoose.connect(process.env.MONOGDB_URI)
    const {name} = await req.json();
    const categoryDoc = await Category.create({name})
    return Response.json(categoryDoc);
} 

export async function PUT(req){
    mongoose.connect(process.env.MONOGDB_URI)
    const {_id, name} = await req.json();
    await Category.updateOne({_id}, {name});
    return Response.json(true)
}

export async function GET(req){
    mongoose.connect(process.env.MONOGDB_URI)
    return Response.json(
        await Category.find()
    )
}