# Equiply
### Equipment Rental Platform
> **Everything you need. Ready to rent.**

Equiply is a modern equipment rental marketplace designed to help people and businesses discover, rent, and manage equipment in one convenient place. The platform is intended to support a wide range of rental categories, from construction machinery and power tools to electronics, vehicles, and event equipment.

## Overview

Equiply aims to make equipment rental simple and accessible through a clean, responsive marketplace experience.

### Core goals

- Make it easy to discover equipment across multiple categories.
- Help renters compare equipment details, rental rates, and availability.
- Give equipment owners a place to publish and manage listings.
- Provide a clear booking experience for renters.
- Offer account and administration tools for managing the marketplace.

## Features

The following is the planned feature set.

- [ ] Responsive landing page and navigation
- [ ] Browse equipment by category
- [ ] Search, filtering, and sorting
- [ ] Equipment details with images, specifications, pricing, and availability
- [ ] User registration, login, and profile management
- [ ] Equipment owner listings (create, edit, and remove)
- [ ] Rental booking with date selection and price calculation
- [ ] Renter dashboard and booking history
- [ ] Owner dashboard and listing management
- [ ] Admin dashboard for users, listings, and bookings
- [ ] Reviews and ratings
- [ ] Notifications and booking status updates
- [ ] Add to favorites a equipment

## Brand identity

| Element | Specification |
| --- | --- |
| Brand name | Equiply |
| Tagline | Everything you need. Ready to rent. |
| Style | Modern and minimal |
| Primary color | Forest Green — `#166534` |
| Secondary color | Deep Evergreen — `#102A24` |
| Accent color | Mint Green — `#6EE7A5` |
| Background | Soft Green — `#F0FDF4` |
| Main text | `#172B24` |
| Typography | Inter |

---

## Equiply color system

- Primary — Forest Green #166534 · Brand identity, primary buttons
- Secondary — Deep Evergreen #102A24 · Headings, navbar, footer
- Accent — Fresh Mint #6EE7A5 · Highlights, active states
- Background — Soft Green #F0FDF4 · Page backgrounds
- Surface — White #FFFFFF · Cards, forms, modals
- Text — Charcoal #172B24 · Main text and labels
- Muted — Slate Green #64756B · Descriptions, secondary text
- Border — Light Sage #DCE9DF · Card and input borders

---
## Technology

Equiply is a Next.js project. The following tools are used.

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI components:** shadcn/ui (base-nova style, built on Base UI)
- **Icons:** Lucide React
- **Forms and validation:** React Hook Form and Zod
- **Database:** MongoDB
- **Authentication:** Better Auth
- **Verification:** JWT plugin
- **Payment Method:** Stripe

## Getting started

### Prerequisites

- Node.js (use a current LTS release)
- npm, pnpm, or yarn
- A MongoDB database, if your local configuration uses MongoDB

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd equiply
```

Replace `<your-repository-url>` with the URL of your Git repository.

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or use the package manager configured for your project.

### 3. Configure environment variables

Create a `.env.local` file in the project root. Add only the variables required by the services you have configured.

Example for a project using MongoDB and Better Auth:

```env
MONGODB_URI="your-mongodb-connection-string"
MONGODB_DB="equiply"

BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
BETTER_AUTH_URL="http://localhost:3000"
```


### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

## project structure


```

## Equipment categories

Equiply is intended for a broad range of equipment, including:

- Construction and heavy machinery
- Power tools and hand tools
- Electronics and gadgets
- Vehicles and transportation
- Home and garden equipment
- Photography and event equipment
- Industrial and business equipment

## Development roadmap

1. Set up the Next.js application and shared design system.
2. Build the responsive marketplace homepage.
3. Implement equipment categories, listing cards, search, and filters.
4. Create equipment detail pages.
5. Add authentication and user profiles.
6. Build owner listing management.
7. Implement rental booking and booking management.
8. Add admin tools, reviews, and notifications.
9. Test accessibility, responsiveness, and performance.
10. Prepare deployment and production environment variables.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feat/your-feature`
5. Open a pull request.

Please keep components reusable, use clear TypeScript types, and follow the existing project conventions.
---
---

## Author

**Md. Arifur Rahman**


