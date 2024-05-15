import { User } from "@/models/User";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "@/lib/mongoConnect"

const handler = NextAuth({
  secret:process.env.SECRET,
  // adapter: MongoDBAdapter(clientPromise),  
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
        CredentialsProvider({
          name: 'Credentials',
          id:'credentials',
        
          credentials: {
            email: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log(credentials)
            const email = credentials?.email;
            const password = credentials?.password;
            mongoose.connect(process.env.MONGODB_URI);
            const user = await User.findOne({email})
            const hashedPassword = user.password
            
             const passwordOk = user && bcrypt.compareSync(password, hashedPassword)
             console.log({password})
             if(passwordOk){
              return user
             }
            return null
          }
        })
      ]
})

export { handler as GET, handler as POST }