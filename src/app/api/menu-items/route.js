import mongoose from "mongoose";
import { MenuItem } from "../../../models/MenuItem";

export async function POST(req){
    mongoose.connect(process.env.MONOGDB_URI)
    const data = await req.json();
   const menuItemDoc = await MenuItem.create(data);
   return Response.json(menuItemDoc);
}