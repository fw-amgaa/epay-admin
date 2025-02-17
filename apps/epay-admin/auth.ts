import NextAuth from "next-auth";
import Auth0Provider from 'next-auth/providers/auth0';
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub, 
    Google, 
    // !!! Should be stored in .env file.
    Auth0Provider({
      clientId: "AcinJvjWp1Dr41gPcJeQ20r5vcsteks4",
      clientSecret:
        "y3pj2KaTiNgING-5e8_JYmX_bIQSwvkp_XgDcA75sEPSSB2zmi0n-3UoTfH0pOTP",
      issuer: "https://dev-y38p834gjptooc4g.us.auth0.com",
    }),
  ],
  secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,
  
})
