export const getRoutes = (shortName: string) => ({
  auth: {
    login: `/${shortName}`,
    register: `/${shortName}/register`,
    forgotPassword: `/${shortName}/forgot-password`,
    resetPassword: `/${shortName}/reset-password`,
    emailVerification: `/${shortName}/email-verification`,
  },
  main: {
    dashboard: `/${shortName}/dashboard`,
    subjects: `/${shortName}/subjects`,
    holidays: `/${shortName}/holidays`,
    attendance: `/${shortName}/attendance`,
    assignments: `/${shortName}/assignments`,
    results: `/${shortName}/results`,
    analytics: `/${shortName}/analytics`,
    settings: `/${shortName}/settings`,
    profile: `/${shortName}/profile`,
    wallet: `/${shortName}/wallet`,
    walletTransactions: `/${shortName}/wallet/transactions`,
    walletAnalytics: `/${shortName}/wallet/analytics`,
  },
});

// Legacy static routes kept for backward compatibility during migration
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
