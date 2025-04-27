# Coffee Ionic App

![test](https://github.com/user-attachments/assets/428ef57a-d36e-45bf-aab5-64a6dc5fffca)

This is a cross-platform coffee shop app built with [Ionic React](https://ionicframework.com/docs/react), [Vite](https://vitejs.dev/), and [Capacitor](https://capacitorjs.com/). The app features a modern UI for browsing coffee drinks and beans, managing a cart, and viewing favorites and notifications.

**This project is inspired by the design in [this Figma Coffee Shop App UI](https://www.figma.com/design/RyVLhDKrymZhThABrSgzIK/Coffee-Shop-App-UI?node-id=11-2&t=VFIHt43fi9h2bLK9-0).**

## Features

- Browse coffee drinks and beans with images from Unsplash API
- Add items to cart and adjust quantities
- View favorites and notifications
- Responsive design for mobile devices
- Built with TypeScript and React
- Ready for Android build via Capacitor

## Project Structure

```
.
├── android/           # Android native project (Capacitor)
├── src/               # React source code
│   ├── pages/         # Main app pages (Tab1, Tab2, Tab3, Tab4)
│   ├── theme/         # CSS variables and styles
│   └── ...
├── public/            # Static assets (if any)
├── package.json       # NPM dependencies and scripts
├── vite.config.ts     # Vite configuration
├── capacitor.config.ts# Capacitor configuration
└── ...
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Android Studio](https://developer.android.com/studio) (for Android builds)
- Unsplash API key (already set in `.env`)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the app in development mode:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

3. **Run unit tests:**

   ```bash
   npm run test.unit
   # or
   yarn test.unit
   ```

4. **Run end-to-end (E2E) tests:**

   ```bash
   npm run test.e2e
   # or
   yarn test.e2e
   ```

5. **Build for production:**

   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview the production build:**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Android Build (Capacitor)

1. **Build the web app:**

   ```bash
   npm run build
   ```

2. **Sync with Capacitor:**

   ```bash
   npx cap sync android
   ```

3. **Open Android Studio:**

   ```bash
   npx cap open android
   ```

4. **Build and run the app on an emulator or device from Android Studio.**

## Environment Variables

- The Unsplash API key is stored in `.env` as `VITE_UNSPLASH_API_KEY`.

## Linting

To check code style and lint errors:

```bash
npm run lint
# or
yarn lint
```

## Notes

- The `android/` directory contains the native Android project. Do **not** ignore it in version control, but build outputs and local configs are already gitignored.
- For iOS builds, you can add the iOS platform with Capacitor (`npx cap add ios`) and use Xcode.

---

**Enjoy your coffee app!**
