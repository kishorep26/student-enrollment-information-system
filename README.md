# SEIS - Student Enrollment Information System

A modern web application for managing student enrollment, built with Next.js and Firebase.

## Features

- 🔐 User Authentication (Email/Password)
- 👥 User and Admin Dashboards
- 📊 Course Enrollment Management
- 🔔 Alert System
- 📈 Data Visualization with D3.js
- 🎨 Modern UI with Tailwind CSS and DaisyUI

## Tech Stack

- **Frontend**: Next.js 16, React 19
- **Backend**: Firebase (Authentication, Firestore)
- **Styling**: Tailwind CSS, DaisyUI
- **Data Visualization**: D3.js

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Firebase account
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/SEIS.git
cd SEIS
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Firebase configuration:
```env
NEXT_PUBLIC_apiKey=your-api-key
NEXT_PUBLIC_authDomain=your-auth-domain
NEXT_PUBLIC_projectId=your-project-id
NEXT_PUBLIC_storageBucket=your-storage-bucket
NEXT_PUBLIC_messagingSenderId=your-messaging-sender-id
NEXT_PUBLIC_appId=your-app-id
NEXT_PUBLIC_collection=your-collection-name
NEXT_PUBLIC_collection_alerts=your-alerts-collection
NEXT_PUBLIC_collection_summaire=your-summaries-collection
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
SEIS/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── context/          # React Context providers
│   └── firebase/         # Firebase configuration and utilities
├── public/               # Static assets
├── firebase-functions/   # Firebase Cloud Functions
└── ...
```

## Deployment

This application is designed to be deployed on Vercel with Firebase as the backend.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/SEIS)

Make sure to add all required environment variables in your Vercel project settings.

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Create the required collections
5. Copy your Firebase configuration to `.env.local`

## License

This project is private and proprietary.

## Author

Kishore Prashanth
