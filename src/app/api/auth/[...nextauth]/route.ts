import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  secret:process.env.SECRET,
    providers: [
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
            
            return null
          }
        })
      ]
})

export { handler as GET, handler as POST }