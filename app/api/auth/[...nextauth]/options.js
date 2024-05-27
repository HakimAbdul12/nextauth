import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
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
        identifier: {
          label: "Email or username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          // Authenticate user against Strapi
          const response = await fetch(
            `${process.env.STRAPI_BACKEND_URL}/api/auth/local`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                identifier: credentials.identifier,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (data.error || !data.user) {
            console.error("Authorize callback - Invalid credentials:", data);
            return null;
          }

          // Return user object
          return {
            name: data.user.username,
            email: data.user.email,
            strapiUserId: data.user.id,
            id: data.user.id.toString(),
            blocked: data.user.blocked,
            strapiToken: data.jwt,
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

    async jwt({ token, account, user, session }) {
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
          token.strapiUserId = data.user.id;
          token.provider = account.provider;
          token.blocked = data.user.blocked;
          token.strapiToken = data.jwt;

          //you can then decide to log the data from strapi
          console.log("JWT callback - data:", data);
        } catch (error) {
          throw error;
        }
      }
      if (account && account.provider === "credentials") {
        // for credentials, not google provider
        // name and email are taken care of by next-auth or authorize
        token.strapiToken = user.strapiToken;
        token.strapiUserId = user.strapiUserId;
        token.provider = account.provider;
        token.blocked = user.blocked;
      }
      return token;
    },

    async session({ token, session }) {
      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;
      return session;
    },
  },
};
