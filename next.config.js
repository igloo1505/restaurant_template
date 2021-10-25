const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withTM = require("next-transpile-modules")(["three"]);
// const withTM = require("next-transpile-modules")([

// ])

const path = require("path");
// module.exports = withPlugins([ withTM, withPWA],
module.exports = withPWA(
	withTM({
		webpack(config, options) {
			config.module.rules.push({
				test: /\.(glb|gltf|obj)$/,
				use: {
					loader: "file-loader",
				},
			});
			return config;
		},
		webpack5: false,
		poweredByHeader: false,
		sassOptions: {
			includePaths: [path.join(__dirname, "styles")],
		},
		images: {
			domains: ["localhost"],
		},
		env: {
			MONGO_URI: process.env.MONGO_URI,
			JWT_SECRET: process.env.JWT_SECRET,
			MONGODB_DB: process.env.MONGODB_DB,
			AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
			AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
			AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
			AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
			EDAMAM_RECIPE_APP_ID: process.env.EDAMAM_RECIPE_APP_ID,

			EDAMAM_RECIPE_ACCESS_KEY: process.env.EDAMAM_RECIPE_ACCESS_KEY,
			EDAMAM_FOOD_APP_ID: process.env.EDAMAM_FOOD_APP_ID,
			EDAMAM_FOOD_ACCESS_KEY: process.env.EDAMAM_FOOD_ACCESS_KEY,
		},
		serverRuntimeConfig: {
			MONGO_URI: process.env.MONGO_URI,
			JWT_SECRET: process.env.JWT_SECRET,
			MONGODB_DB: process.env.MONGODB_DB,
			AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
			AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
			AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
			AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
			EDAMAM_RECIPE_APP_ID: process.env.EDAMAM_RECIPE_APP_ID,

			EDAMAM_RECIPE_ACCESS_KEY: process.env.EDAMAM_RECIPE_ACCESS_KEY,
			EDAMAM_FOOD_APP_ID: process.env.EDAMAM_FOOD_APP_ID,
			EDAMAM_FOOD_ACCESS_KEY: process.env.EDAMAM_FOOD_ACCESS_KEY,
		},
		publicRuntimeConfig: {
			rootUrl: process.env.ROOT_URL,
			// staticFolder: '/static',
		},
		pwa: {
			dest: "public",
			disable: process.env.NODE_ENV === "development",
		},
	})
);
