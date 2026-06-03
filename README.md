# Instagram Feed Planner

A Next.js web application that displays Instagram posts from a Notion database, allowing you to plan your feed before it goes live.

## Features

- 📸 Display Instagram posts from Notion database
- 🎨 Responsive grid layout (1 column on mobile, 3 columns on desktop)
- 🌓 Dark mode support
- 🔄 Real-time updates from Notion
- ⚡ Built with Next.js 16 and React 19

## Prerequisites

Before you start, make sure you have:

- Node.js 18+ and npm
- A Notion account
- A Notion integration token
- A Notion database with your Instagram posts

## Setup

### 1. Create a Notion Integration

1. Go to [Notion My Integrations](https://www.notion.so/my-integrations)
2. Click "New Integration"
3. Give it a name (e.g., "Instagram Feed Planner")
4. Copy the API key

### 2. Create/Connect Notion Database

1. Create a new Notion database with the following columns:
   - **Title** (Text) - Post title
   - **Caption** (Text) - Post description
   - **Image** (File) - Post image URL

2. Share the database with your integration:
   - Click "Share" on your database
   - Select your integration under "Integrations"
   - Grant access

3. Copy your database ID from the database URL:
   - URL format: `https://www.notion.so/{database-id}?v=...`
   - The ID is the part before the `?`

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Fill in your Notion credentials:

```env
NOTION_API_KEY=your_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── lib/
│   └── notion.ts        # Notion API client
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Technologies Used

- **Next.js 16** - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Notion API** - Database integration

## Troubleshooting

### Posts not loading

1. Check that `NOTION_API_KEY` and `NOTION_DATABASE_ID` are correctly set in `.env.local`
2. Verify the integration has access to your database
3. Check the browser console and server logs for error messages
4. Ensure your database has the correct column structure

### Image not displaying

1. Make sure images are uploaded to the Notion database
2. Check that the Image column contains files or external URLs
3. Verify the image URLs are accessible

## License

MIT
