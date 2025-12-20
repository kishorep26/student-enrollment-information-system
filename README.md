# SEIS - Student Enrollment Information System

A web-based platform for managing student course enrollments and tracking enrollment analytics.

## Overview

SEIS is a Next.js application that provides separate interfaces for students and administrators. Students can enroll in courses and set up alerts, while administrators can view enrollment data through interactive visualizations.

## Features

### For Students
- Enroll in up to 3 courses per semester
- Set up course alerts for notifications
- View and manage current enrollments
- Track enrollment status

### For Administrators
- View enrollment analytics across all courses
- Interactive data visualizations with D3.js
- Real-time enrollment tracking
- Course management dashboard

## Technology Stack

- **Frontend**: Next.js 16, React 19
- **Backend**: Firebase (Authentication, Firestore)
- **Styling**: Tailwind CSS, DaisyUI
- **Data Visualization**: D3.js

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Firebase account with a configured project
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/kishorep26/SEIS.git
cd SEIS
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_apiKey=your-firebase-api-key
NEXT_PUBLIC_authDomain=your-auth-domain
NEXT_PUBLIC_projectId=your-project-id
NEXT_PUBLIC_storageBucket=your-storage-bucket
NEXT_PUBLIC_messagingSenderId=your-messaging-sender-id
NEXT_PUBLIC_appId=your-app-id
NEXT_PUBLIC_collection=your-enrollment-collection
NEXT_PUBLIC_collection_alerts=your-alerts-collection
NEXT_PUBLIC_collection_summaire=your-summaries-collection
```

4. Run the development server
```bash
npm run dev
```

Access the application at `http://localhost:3000`

## Firebase Setup

### Required Services

1. **Authentication**: Enable Email/Password authentication
2. **Firestore Database**: Create three collections:
   - Enrollment collection (for course enrollments)
   - Alerts collection (for course alerts)
   - Summaries collection (for enrollment analytics)

### Firestore Structure

Each collection should contain documents with course IDs as document names. The enrollment and alerts collections start empty, while the summaries collection requires date fields with enrollment counts for visualization.

## Deployment

The application is designed to be deployed on Vercel. Ensure all environment variables are configured in your Vercel project settings before deployment.

## User Roles

### Student Account
- Access to course enrollment
- Alert management
- Personal dashboard

### Administrator Account
- Access to analytics dashboard
- Enrollment data visualization
- Course overview

## License

This project is private and proprietary.

## Author

Kishore Prashanth
