import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
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
        password: {
          label: "Password",
          type: "password",
          placeholder: "xxxxxxxxxx",
        },
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
          const response = await fetch(
            `${process.env.STRAPI_PUBLIC_URL}/api/auth/local`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                identifier: credentials.username,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          // Check for errors in the response
          if (data.error || !data.user) {
            console.error("Authorize callback - Invalid credentials:", data);
            return null;
          }

          // Return user object
          return {
            id: data.user.id,
            name: data.user.username,
            email: data.user.email,
          };
        } catch (error) {
          console.error("Authorize callback - Fetch error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    //Note: jwt callback runs before session callback
    //once google authentiate us in the frontend, we pass both the account and token to our jwt callback to contact our strapi backend to either register the user if not present or authenticate the user if present and send us a jwt

    async jwt({ token, account }) {
      if (account && account.provider === "google") {
        try {
          const strapiResponse = await fetch(
            `${process.env.STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
            { cache: "no-cache" }
          );
          if (!strapiResponse.ok) {
            const strapiError = await strapiResponse.json();
            throw new Error(strapiError.error.message);
          }
          const data = await strapiResponse.json();
          //once strapi complete our request and send back a response, we put the jwt in the token object of the nextauth so that we can later put this data in the session
          // Below is the data we get from strapi, so we can base on this to populate the token object and later pass it on to the session
          /*
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE2Mzk1NzM1LCJleHAiOjE3MTg5ODc3MzV9.dAOTYDITKm65VZgBa6DyOotDjYnFf4SRDg5rORC_IOk',
            user: {
              id: 3,
              username: 'abdulhakimaben',
              email: 'abdulhakimaben@gmail.com',
              provider: 'google',
              confirmed: true,
              blocked: false,
              createdAt: '2024-05-22T15:53:09.923Z',
              updatedAt: '2024-05-22T15:53:09.923Z'
            }
          */
         //we can now use this data to populate the token object
          token.strapi_user_id = data.user.id;
          token.strapi_user_account_status = data.user.blocked;
          token.strapiToken = data.jwt;

          //you can then decide to log the data from strapi
          console.log("JWT callback - data:", data);
        } catch (error) {
          throw error;
        }
      }
      return token;
    },

    async session({ token, session }) {
      session.strapiToken = token.strapiToken;
      session.strapi_user_id = token.strapi_user_id;
      session.strapi_user_account_status = token.strapi_user_account_status;
      return session;
    },
  },
};
