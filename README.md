# Parking POS

Parking management desktop application for recording vehicle entry and exit, calculating parking fees, and managing parking transactions.

The application is built with Next.js and packaged as a Windows desktop application using Electron. SQLite is used as the local database.

## Features

* Vehicle entry and exit recording
* Automatic entry and exit timestamps
* Parking duration calculation
* Parking fee calculation
* Parking transaction management
* Receipt generation
* Local SQLite database
* Keyboard and numpad support
* Windows desktop application

## Tech Stack

* Next.js
* React
* Tailwind CSS
* Prisma
* SQLite
* Electron
* JavaScript / TypeScript

## Application Flow

```text
Vehicle Entry
     |
     v
License Plate
     |
     v
Record Entry Time
     |
     v
Vehicle Parked
     |
     v
Vehicle Exit
     |
     v
Calculate Parking Duration
     |
     v
Calculate Parking Fee
     |
     v
Record Transaction
     |
     v
Generate Receipt
```

## Project Structure

```text
parking-pos/
│
├── app/
│   ├── api/
│   ├── admin/
│   └── ...
│
├── components/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│
├── electron/
│
├── package.json
└── README.md
```

## Getting Started

### Requirements

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Theerapath-Ch/Landmark-Parking.git
cd parking-pos
```

Install dependencies:

```bash
npm install
```

### Database

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migration:

```bash
npx prisma migrate dev
```

### Development

Start the Next.js development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

Build the Next.js application:

```bash
npm run build
```

Build the desktop application:

```bash
npm run electron:build
```

The generated Windows application will be available in the configured Electron Builder output directory.

## Database

The application uses SQLite for local data storage.

```text
database/
└── app.db
```

SQLite was selected because the application is intended to run locally without requiring a separate database server.

Prisma is used to manage database access and migrations.

## Parking Transaction

A typical transaction contains:

```text
License Plate
Entry Time
Exit Time
Parking Duration
Parking Fee
Transaction Status
```

Example:

```text
License Plate : ABC-1234
Entry Time    : 08:30
Exit Time     : 11:45
Duration      : 3h 15m
Parking Fee   : ฿40
Status        : Completed
```

## Screenshots

Screenshots will be added here.

## Future Improvements

* User authentication
* Role-based access control
* Revenue reports
* Transaction search and filtering
* Automatic database backup
* Receipt printer integration
* Barcode / QR Code support
* Application auto-update

## License

This project is for personal and educational use.

## Author

Theerapath Chaicharoen

Computer Engineering | Software Developer
