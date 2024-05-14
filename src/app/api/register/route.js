
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { User } from "../../../models/User";


export async function POST(req){
    const body = await req.json();
    mongoose.connect(process.env.MONGODB_URI);
    const pass = body.password;
    if (!pass?.length || pass.length < 5) {
      new Error('password must be at least 5 characters');
    }
  
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);
    const createdUser = await User.create(body);
    return Response.json(createdUser);
}