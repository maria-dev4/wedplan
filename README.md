# WedPlan

WedPlan is a role-based wedding planning platform. Customers discover wedding services and send booking requests, vendors publish services and manage requests, and admins moderate users, services and transactions.

## Live Website

- Live site: https://YOUR-CLIENT-URL.vercel.app
- Client repository: https://github.com/YOUR-USERNAME/wedplan-client
- Server repository: https://github.com/YOUR-USERNAME/wedplan-server

## Important Features

- Email/password and Google authentication with Better Auth
- Three roles: Customer, Vendor and Admin (admin accounts cannot be created through public sign up)
- Browse approved services with name search, category and location filters, and price sorting (low to high, high to low) with pagination
- Service details with an image gallery and a booking request form (duplicate and ownership rules enforced on the server)
- Customer dashboard: overview, booking tracking and cancelling pending requests
- Vendor dashboard: add, update, delete and activate services, accept or reject booking requests, subscription management
- Free plan limited to 3 active services, Premium unlocked by a verified Stripe webhook
- Admin dashboard: user management with block and unblock, service moderation, read-only transaction history
- JWT verification and role-based middleware on every protected API
- Profile management with ImgBB image uploads
- Responsive design with Motion animations and toast notifications

## Technology Stack

- Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI
- Motion (Framer Motion), Lucide icons, Sonner toasts
- Better Auth with MongoDB
- Express.js, MongoDB, JWT (jose), Stripe Checkout and webhooks
- ImgBB for image hosting

## Installation

```bash
git clone https://github.com/YOUR-USERNAME/wedplan-client.git
cd wedplan-client
npm install
```

## Environment Variables

Create a `.env.local` file using `.env.example` as a guide.

| Variable | Description |
| --- | --- |
| `BETTER_AUTH_SECRET` | Long random secret used by Better Auth |
| `BETTER_AUTH_URL` | Base URL of this client app |
| `NEXT_PUBLIC_APP_URL` | Public URL of this client app |
| `NEXT_PUBLIC_API_URL` | Base URL of the Express server |
| `MONGODB_URI` | MongoDB connection string |
| `DB_NAME` | Database name |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `IMGBB_API_KEY` | ImgBB API key (used only on the server side) |

## Required Application URLs

- Google OAuth authorized redirect URI: `{BETTER_AUTH_URL}/api/auth/callback/google`
- Server base URL: `NEXT_PUBLIC_API_URL`

## Run Locally

```bash
npm run dev
```

Open http://localhost:3000. The Express server must also be running (see the server repository).

## Build

```bash
npm run build
npm start
```