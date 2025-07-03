# Introduction

WisdomWaves is an AI-powered research and drafting platform that guides users through structured stages of idea development, data exploration, and content generation, leading to outputs such as research articles, project proposals, patents, and thesis assistance.

## Tech Stack
- [Next.js 15 (App Router)]
- [Tailwind CSS 4]
- [Prisma ORM ]
## Project Structure

```
wisdomwaves/
├── src/                # Application source code
│   ├── app/            # Next.js app directory
│   |   ├── page.js         # Home page
│   |   ├── layout.js       # Global layout and fonts
│   |   ├── globals.css     # Global styles (with Tailwind)
│   |   └── api/            # API routes (Next.js route handlers)
│   ├── generated/      # Auto-generated code (e.g., Prisma client)
│   └── lib/            # Utility libraries and shared modules
|
├── public/             # Static assets (images, favicon, etc.)
├── prisma/             # Prisma schema and migrations
├── package.json        # Project dependencies and scripts
├── postcss.config.mjs  # PostCSS configuration

```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `wisdomwaves/` directory with the following content:

```
DATABASE_URL="file:./dev.db"
```

### 3. Initialize the database

```bash
npx prisma migrate dev
```
If you update the schema  run:
  ```bash
  npx prisma generate
  ```
  This will regenerate the Prisma Client for use in your code.

  Use Prisma Studio for database management 

```bash
npx prisma studio
```


### 4. Start the development server

```bash
npm run dev
```


## Additional Notes
- Place all images in the `public/` directory and reference them as `/xxx.png` or `/xxx.svg` in your code.
- Tailwind configuration and global styles are in `src/app/globals.css`.
- Fonts are loaded via `next/font/google`.
- To add API routes, create a directory and `route.js` file under `src/app/api/`.



