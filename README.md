# TravelTrucks

TravelTrucks is a web application for a camper rental company.

Users can browse available campers, filter them by different characteristics, view detailed information, read reviews, explore the image gallery, and submit a booking request.

The application was built with Next.js, TypeScript, and the Next.js App Router. The interface is primarily optimized for desktop screens.

## Live Demo

[View the deployed application](https://travel-trucks-iota-rust.vercel.app/)

## Repository

[View the source code on GitHub](https://github.com/lisaVecher/travel-trucks)

## Design

The user interface was implemented according to the provided Figma design:

[View the Figma design](https://www.figma.com/design/6vTbzaB3EPgOreQz2jOJJe/Campers?node-id=48730-474&p=f&t=BjGvmaV6ehnsqGDL-0)

## Main Features

- Home page with a promotional banner
- Navigation between the Home and Catalog pages
- Camper catalog loaded from the backend
- Backend filtering by:
  - location
  - camper form
  - engine type
  - transmission type
- Infinite pagination implemented with `useInfiniteQuery`
- Loading four additional camper cards with the Load More button
- Loading modal displayed after applying filters
- Empty results state when no campers match the selected filters
- Camper details page opened in a new browser tab
- Camper image gallery implemented with Swiper
- Detailed camper characteristics
- Customer reviews
- Five-star review rating
- Booking request form
- Form validation for name and email
- Booking request submission to the backend
- Success and error notifications
- Loading states
- Custom 404 page
- Application error handling
- Custom TravelTrucks favicon

## Application Routes

| Route                 | Description                                  |
| --------------------- | -------------------------------------------- |
| `/`                   | Home page with the main call to action       |
| `/catalog`            | Camper catalog with filters and pagination   |
| `/catalog/[camperId]` | Detailed information about a selected camper |

## Technologies

- Next.js 16
- React 19
- TypeScript
- Next.js App Router
- TanStack Query
- CSS Modules
- Swiper
- React Icons
- React Hot Toast

## Backend API

The application uses the TravelTrucks backend API:

[https://campers-api.goit.study](https://campers-api.goit.study)

The API is used to:

- get available camper filters;
- get the list of campers;
- filter campers using query parameters;
- get information about a selected camper;
- get camper reviews;
- submit booking requests.

## Getting Started

### Requirements

Before starting, make sure you have installed:

- Node.js 20.9 or newer
- npm

You can check the installed versions with the following commands:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/lisaVecher/travel-trucks.git
```

Go to the project directory:

```bash
cd travel-trucks
```

Install the dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

### Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Code Quality

Run ESLint:

```bash
npm run lint
```

## Project Structure

```text
travel-trucks/
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── app/
│   │   ├── catalog/
│   │   │   ├── [camperId]/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── icon.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── page.module.css
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   ├── lib/
│   └── types/
├── package.json
├── next.config.ts
└── tsconfig.json
```

## Author

[Yelyzaveta Vecherovska](https://github.com/lisaVecher)
