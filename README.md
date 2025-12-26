# Student Enrollment Information System (SEIS)

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-brightgreen?logo=vercel)](https://seis-beta.vercel.app) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Release](https://img.shields.io/github/v/release/kishorep26/student-enrollment-information-system)](https://github.com/kishorep26/student-enrollment-information-system/releases)

A comprehensive web-based platform for managing student course enrollments with real-time analytics and administrative oversight.

## Overview

SEIS is a Next.js application that streamlines the course enrollment process for educational institutions. The platform features role-based access control with distinct interfaces for students and administrators, enabling efficient enrollment management and data-driven decision making through interactive analytics.

## Key Features

**Student Interface**
- Course enrollment management with semester-based enrollment caps (maximum 3 courses)
- Customizable course alert notifications
- Real-time enrollment status tracking
- Personal enrollment dashboard with course overview

**Administrator Interface**
- Comprehensive enrollment analytics across all courses
- Interactive data visualizations powered by D3.js
- Real-time enrollment monitoring and reporting
- Administrative dashboard with course management capabilities

## Technology Stack

- **Frontend**: Next.js 16, React 19
- **Backend**: Firebase (Authentication, Firestore Database)
- **Styling**: Tailwind CSS, DaisyUI
- **Data Visualization**: D3.js
- **Deployment**: Vercel

- ## Screenshots

![SEIS Dashboard](https://htbuikuqbwstckwscktq.supabase.co/storage/v1/object/public/images/projects/SEIS.png)

## Prerequisites

- Node.js 18 or higher
- Firebase account with configured project
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone https://github.com/kishorep26/student-enrollment-information-system.git
cd student-enrollment-information-system
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

## Firebase Configuration

### Required Services

1. **Authentication**: Enable Email/Password authentication method
2. **Firestore Database**: Create three collections with the following structure:

**Collections Structure:**
- **Enrollment Collection**: Stores student course enrollments (course IDs as document names)
- **Alerts Collection**: Manages course notification preferences
- **Summaries Collection**: Contains date-based enrollment counts for analytics visualization

Each collection should contain documents with course IDs as document names. The enrollment and alerts collections start empty, while the summaries collection requires date fields with enrollment counts for visualization purposes.

## Deployment

The application is optimized for deployment on Vercel. Ensure all environment variables are properly configured in your Vercel project settings before deployment.
