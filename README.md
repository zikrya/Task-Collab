This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# TaskCollab

TaskCollab is a real-time task collaboration app built using **Next.js**, **Socket.IO**, and **Express.js**. It allows users to add, complete, and delete tasks in real time.

---

## Getting Started

Follow these steps to set up the project for local development:

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (use the LTS version)
- **npm** or **yarn**
- **Vercel CLI** (optional for frontend deployment)
- **Fly.io CLI** (for backend deployment)

---

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd task-collab
   ```

2. **Use Node.js LTS Version**

   Switch to the LTS version of Node.js using nvm:

   ```bash
   nvm use --lts
   ```

3. **Install Dependencies**

   In the root directory, install the required dependencies:

   ```bash
   npm install
   ```

4. **Set Up the Backend**

   Navigate to the WebSocket server directory:

   ```bash
   cd src/websocket
   ```

   Install the dependencies:

   ```bash
   npm install
   ```

5. **Run the WebSocket Server**

   Start the WebSocket server:

   ```bash
   npm run dev
   ```

   The server will be running on http://localhost:8008 by default.

6. **Run the Frontend**

   Open a new terminal, navigate back to the root directory, and start the frontend:

   ```bash
   npm run dev
   ```

   Access the application at http://localhost:3000.

## Deployment

### Backend Deployment (Fly.io)

#### Prepare the Server for Deployment

Ensure the server runs on port 3000 for production.

Run the build command to prepare the server for deployment:
