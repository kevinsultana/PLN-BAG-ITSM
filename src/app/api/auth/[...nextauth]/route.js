import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    {
      id: "sso-bag",
      name: "Aplikasi ITSM",
      type: "oauth",
      version: "2.0",
      checks: ["pkce", "state"],
      idToken: false,

      clientId: process.env.SSO_BAG_CLIENT_ID,
      clientSecret: process.env.SSO_BAG_CLIENT_SECRET,

      authorization: {
        url: `${process.env.BASE_URL}/svc-sso/oauth2/auth`,
        params: {
          scope: "openid empinfo profile email address 2fa",
          redirect_uri: "http://localhost/redirect",
        },
      },

      token: {
        async request(context) {
          const { params, checks, provider } = context;
          const url = `${process.env.BASE_URL}/svc-sso/oauth2/token`;

          const body = new URLSearchParams();
          body.append("grant_type", "authorization_code");
          body.append("code", params.code);
          body.append("redirect_uri", "http://localhost/redirect");
          body.append("client_id", provider.clientId);
          body.append("client_secret", provider.clientSecret);
          if (checks?.code_verifier)
            body.append("code_verifier", checks.code_verifier);

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
          });

          const tokens = await res.json();
          if (!res.ok) throw new Error(JSON.stringify(tokens));

          if (!tokens.token_type) tokens.token_type = "Bearer";

          if (tokens.expires_in && !tokens.expires_at) {
            tokens.expires_at =
              Math.floor(Date.now() / 1000) + Number(tokens.expires_in);
          }
          console.log("INI TOKEN NYA", tokens);

          return { tokens };
        },
      },

      userinfo: {
        async request({ tokens }) {
          const res = await fetch(`${process.env.BASE_URL}/svc-sso/oauth2/me`, {
            headers: {
              Authorization: `${tokens.token_type || "Bearer"} ${
                tokens.access_token
              }`,
              Accept: "application/json",
            },
          });
          const profile = await res.json();
          if (!res.ok) throw new Error(JSON.stringify(profile));
          return profile;
        },
      },

      profile(profile) {
        return {
          id: profile.sub || profile.user_id || profile.id,
          name:
            profile.name ||
            profile.preferred_username ||
            `${profile.given_name || ""} ${profile.family_name || ""}`.trim(),
          email: profile.email || null,
          image: profile.picture || null,
          empinfo: profile.empinfo || null,
        };
      },
    },
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.token_type = account.token_type || "Bearer";
        token.expires_at = account.expires_at;
        if (user?.id) token.userId = user.id;
      }

      const nowInSec = Math.floor(Date.now() / 1000);
      if (
        token.expires_at &&
        token.expires_at - 60 <= nowInSec &&
        token.refresh_token
      ) {
        try {
          const url = `${process.env.BASE_URL}/svc-sso/oauth2/token`;
          const body = new URLSearchParams();
          body.append("grant_type", "refresh_token");
          body.append("refresh_token", token.refresh_token);
          body.append("client_id", process.env.SSO_BAG_CLIENT_ID);
          body.append("client_secret", process.env.SSO_BAG_CLIENT_SECRET);

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
          });
          const refreshed = await res.json();
          if (!res.ok) throw refreshed;

          token.access_token = refreshed.access_token;
          token.token_type =
            refreshed.token_type || token.token_type || "Bearer";
          token.expires_at =
            refreshed.expires_at ||
            (refreshed.expires_in
              ? nowInSec + Number(refreshed.expires_in)
              : nowInSec + 3600);
          if (refreshed.refresh_token)
            token.refresh_token = refreshed.refresh_token;
        } catch (e) {
          token.error = "RefreshAccessTokenError";
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.access_token;
      session.tokenType = token.token_type;
      session.expiresAt = token.expires_at;
      session.user.id = token.userId || session.user.id;
      session.error = token.error || null;
      return session;
    },
  },

  events: {
    async error(message) {
      console.error("NEXTAUTH_ERROR_EVENT", message);
    },
  },
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
