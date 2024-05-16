import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
          response_type: "code",
        },
      },
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
        // const user = { id: "1", name: "hakim", email: "jsmith@example.com", password:"Hakim,12" };
        // if(credentials?.username === user.name && credentials?.password === user.password ){
        //     return user;
        // }
        // else{
        //     return null
        // }
        if (!credentials) {
          return null;
        }

        try {
          // Authenticate user against Strapi
          const response = await fetch(`${process.env.STRAPI_PUBLIC_URL}/api/auth/local`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identifier: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          // Check for errors in the response
          if (data.error || !data.user) {
            console.error("Authorize callback - Invalid credentials:", data);
            return null;
          }

          // Return user object
          return { id: data.user.id, name: data.user.username, email: data.user.email };
        } catch (error) {
          console.error("Authorize callback - Fetch error:", error);
          return null;
        }

      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback - token:", token);
      if (token?.jwt) {
        session.jwt = token.jwt;
        session.id = token.id;
      } else {
        console.error("Session callback - token does not have jwt");
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        try {
          const response = await fetch(
            `${process.env.STRAPI_PUBLIC_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
          );
          const data = await response.json();
          if (data.jwt && data.user.id) {
            token.jwt = data.jwt;
            token.id = data.user.id;
          } else {
            console.error("JWT callback - Failed to fetch valid data:", data);
          }
        } catch (error) {
          console.error("JWT callback - Fetch error:", error);
        }
      }
      return token;
    },
  },
};
