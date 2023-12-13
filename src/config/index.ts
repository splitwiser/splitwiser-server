import "dotenv/config";

export default {
  // Env Variables
  dbUrl: process.env.DB_URL,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASSWORD,

  // Settings
  /**
   * The default api version to handle requests where either an invalid or no api version is specified.
   * This can be used to maintain backward compatibility without immediate changes on frontend.
   */
  defaultApiVersion: "1",
};
