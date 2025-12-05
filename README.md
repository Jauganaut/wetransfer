# ArcHero — Landing Hero Replica
This project is a visually-exquisite, pixel-accurate replica of a WeTransfer-style marketing hero/landing page. It was built as a demonstration of rapid, high-quality frontend development using modern tools.
![ArcHero Landing Page Screenshot](https://placehold.co/1200x630/2F6BF6/FFFFFF/png?text=ArcHero%20Landing%20Page)
## Project Overview
The application is a single, responsive landing page featuring:
- **Dynamic Hero Variants:** The main headline, subtext, and background accent colors cycle through multiple variants.
- **Interactive Preview Card:** A floating card on the left showcases a mock file list with smooth hover interactions.
- **Gated Content Simulation:** "Download" and "Preview" actions trigger modals that simulate an authentication flow.
- **Video Background:** One of the hero variants features a seamless, looping video background with a graceful fallback to a gradient.
- **Polished UI/UX:** Built with `shadcn/ui`, `Tailwind CSS`, and `Framer Motion` for a beautiful, modern, and interactive user experience.
- **Responsive Design:** The layout is fully responsive and provides an excellent experience on all devices, from mobile phones to large desktops.
## Prerequisites
Before you begin, ensure you have the following installed:
- **[Bun](https://bun.sh/) (v1.0 or higher):** The project uses Bun as the package manager and runtime.
- **[Node.js](https://nodejs.org/) (v18.0 or higher):** Required for the Bun runtime.
- **[Cloudflare Account](https://dash.cloudflare.com/sign-up):** Required for deploying the application using Wrangler.
## Setup
To get the project up and running on your local machine, follow these simple steps:
1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd arc-hero-landing
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
    This command will install all the necessary packages defined in `package.json`.
## Running Locally
To start the development server and view the application in your browser:
```bash
bun dev
```
The application will be available at `http://localhost:3000`. The server supports hot-reloading, so any changes you make to the code will be reflected instantly in the browser.
## Building & Deploying
### Building for Production
To create a production-ready build of the application:
```bash
bun build
```
This command bundles the frontend assets and the Cloudflare Worker code into the `dist` directory.
### Deploying to Cloudflare
To deploy the application to your Cloudflare account:
```bash
bun deploy
```
This command uses the Wrangler CLI to publish your application to Cloudflare's global network. You will be prompted to log in to your Cloudflare account if you haven't already.
## Export Options
- **GitHub:** Push your code to a GitHub repository for version control, collaboration, and CI/CD integration.
- **Cloudflare Pages:** The project can also be deployed to Cloudflare Pages, which offers seamless integration with Git providers for automatic deployments.
## Troubleshooting
- **Preview Not Updating:** If the live preview in your browser doesn't reflect your latest changes, try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R).
- **Console Errors:** Open your browser's developer tools (F12 or Ctrl+Shift+I) and check the console for any error messages. This is the best place to start debugging UI issues.
- **Video Background Issues:** If the video background fails to load, the application will gracefully fall back to a static gradient. If the video consistently fails, try clearing your browser cache or checking your network connection.
---
*Built with ❤️ at Cloudflare*