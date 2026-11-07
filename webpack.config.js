import path from "path";
import { fileURLToPath } from "url";
import pkg from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { EnvironmentPlugin } = pkg;

export default (env, argv) => {
  return {
    mode: env.production ? "production" : "development",
    devtool: env.production ? false : "eval-cheap-source-map",
    plugins: [
      /* Public client-side config, read from dev.env / prod.env at build time (see .env.example) */
      new EnvironmentPlugin([
        "FB_CLIENT_API_KEY",
        "FB_CLIENT_AUTH_DOMAIN",
        "FB_CLIENT_PROJECT_ID",
        "FB_CLIENT_STORAGE_BUCKET",
        "FB_CLIENT_MESSAGING_SENDER_ID",
        "FB_CLIENT_APP_ID",
        "SIGNUP_ACTION_URL",
        "ANNUAL_PRICE_ID",
        "MONTHLY_PRICE_ID",
        "STRIPE_BILLING_PORTAL",
      ]),
    ],
    entry: {
      app: "./src/index.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          include: path.resolve(__dirname, "src"),
          exclude: [/node_modules/, /dist/],
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
      ],
    },
    watch: true,
    target: "web",
    performance: {
      hints: env.production ? "error" : false,
    },
  };
};
