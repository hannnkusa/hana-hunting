import "dotenv/config";

export default {
  expo: {
    name: "hana-hunting",
    slug: "hana-hunting",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/SplashScreen.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
      statusBar: {
        barStyle: "light-content",
      },
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.hana.hunting",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      googleApiKey: process.env.GOOGLE_API_KEY,
      eas: {
        projectId: "71d42f25-9218-4b0d-b072-0480b7636036",
      },
    },
  },
};
