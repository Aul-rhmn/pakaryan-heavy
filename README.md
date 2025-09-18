# PakaryanHeavyRent

*A web application for renting heavy equipment across Java Island*

[![Live Demo](https://img.shields.io/badge/demo-online-green)](https://pakaryan-heavy.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/github-repo-blue)](https://github.com/Aul-rhmn/pakaryan-heavy)

## Overview

**PakaryanHeavyRent** is a full-stack web application designed to facilitate the rental of heavy equipment such as excavators, bulldozers, and cranes.
The platform connects contractors, construction companies, and individuals with available machinery for short- or long-term projects.

The app provides:

* Search and filtering by equipment type, brand, location, availability, and price
* Equipment detail pages with specifications, images, reviews, and ratings
* Interactive booking system with date selection
* User dashboard to manage bookings and profiles

---

## Tech Stack

**Frontend**

* [Next.js](https://nextjs.org/) (React Framework with SSR/SSG)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/) for UI styling

**Backend**

* [Supabase](https://supabase.com/)

  * PostgreSQL Database
  * Auth (email/password, OAuth)
  * RESTful & Realtime APIs
  * Storage for images & documents

**Deployment & Hosting**

* [Vercel](https://vercel.com/) (Frontend)
* [Supabase](https://supabase.com/) (Backend + Database)

---

## Project Structure

```
pakaryan-heavy/
│── app/                 # Next.js App Router pages & routes
│── components/          # Reusable React components
│── lib/                 # API clients, Supabase utils
│── public/              # Static assets (images, icons)
│── styles/              # Global CSS / Tailwind setup
│── README.md            # Project documentation
│── package.json         # Dependencies & scripts
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Aul-rhmn/pakaryan-heavy.git
cd pakaryan-heavy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

* Create a project in [Supabase](https://supabase.com/)
* Copy your **API keys** and **Project URL**
* Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the development server

```bash
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## Live Demo

👉 [PakaryanHeavyRent Live](https://pakaryan-heavy.vercel.app/)

---

## Future Features

* Admin dashboard for managing equipment listings
* Integration with Google Maps for location-based search
* Push/email notifications for booking confirmations
* Role-based access control (Admin, Renter, User)

---

## License

This project is licensed under the **MIT License**.