import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Hakim677",
        },
        password: { label: "Password", type: "password", placeholder:"xxxxxxxxxx" },
      },
      async authorize(credentials) {
        //hard code a user but this is where we will connect out database
        const user = { id: "1", name: "hakim", email: "jsmith@example.com", password:"Hakim,12" };
        if(credentials?.username === user.name && credentials?.password === user.password ){
            return user;
        }
        else{
            return null
        }
      },
    }),
  ],
};
