import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
