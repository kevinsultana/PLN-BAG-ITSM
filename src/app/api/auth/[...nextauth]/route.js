import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    {
      id: "sso-bag",
      name: "Aplikasi ITSM",
      type: "oauth",
      version: "2.0",
      clientId: process.env.SSO_BAG_CLIENT_ID,
      clientSecret: process.env.SSO_BAG_CLIENT_SECRET,
      authorization: {
        url: `${process.env.BASE_URL}/svc-sso/oauth2/auth`,
        params: {
          scope: "openid empinfo profile email address 2fa",
          redirect_uri: `${process.env.NEXTAUTH_URL}/redirect`,
        },
      },
      token: {
        url: `${process.env.BASE_URL}/svc-sso/oauth2/token`,
      },
      userinfo: {
        url: `${process.env.BASE_URL}/svc-sso/oauth2/me`,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
