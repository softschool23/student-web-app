export const routes = {
  auth: {
    login: "/",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    emailVerification: "/email-verification",
  },
  main: {
    dashboard: "/dashboard",
    subjects: "/subjects",
    holidays: "/holidays",
    attendance: "/attendance",
    assignments: "/assignments",
    results: "/results",
    analytics: "/analytics",
    settings: "/settings",
    profile: "/profile",
    wallet: "/wallet",
    walletTransactions: "/wallet/transactions",
    walletAnalytics: "/wallet/analytics",
  },
  public: {
    home: "/",
    about: "/about",
    contact: "/contact",
  },
} as const;

// Type for route values
export type RouteKey = typeof routes;
export type AuthRoutes = keyof typeof routes.auth;
export type MainRoutes = keyof typeof routes.main;
export type PublicRoutes = keyof typeof routes.public;
