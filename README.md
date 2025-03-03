# HoneyTrip 🍯

HoneyTrip is your ultimate climbing trip meal planner companion - helping climbers plan, organize, and manage their meals for climbing trips with offline-first capabilities.

## 🌟 Features

- **Offline-First**: Plan your trips and manage meals without internet connection
- **Kitchen-Aware**: Filter recipes based on available cooking facilities
- **Group Planning**: Coordinate shopping and expenses with your climbing partners
- **Location Smart**: Find nearby stores and manage location-specific planning
- **Expense Tracking**: Split and track costs among group members

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Wrangler CLI for Cloudflare deployment

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Run an initial database migration:

```bash
npm run db:migrate
```

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

Create a production build:

```bash
npm run build
```

### Deployment

Deployment is done using the Wrangler CLI.
First, you need to create a D1 database in Cloudflare:

```bash
npx wrangler d1 create honey-trip-db
```

Be sure to update the `wrangler.toml` file with the correct database name and id.
You will also need to update the `drizzle.config.ts` file, and then run the production migration:

```bash
npm run db:migrate-production
```

To build and deploy directly to production:

```bash
npm run deploy
```

To deploy a preview URL:

```bash
npx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively:

```bash
npx wrangler versions deploy
```

## 🏗️ Tech Stack

- **Frontend**: React Router 7
- **Backend**: Node.js
- **Database**: Cloudflare D1 (SQLite-compatible serverless database)
- **Infrastructure**: Cloudflare Pages, R2 Storage

## 📱 Architecture

```fs
🌐 Web Application
├── Trip Planning System
├── Recipe Management
├── Shopping Coordinator
└── Offline Data Manager
```

## 📖 Documentation

For detailed documentation, please visit our [Wiki](https://github.com/Emilio-Ramirez/HoneyTrip/wiki)

Key documentation sections:

- [System Overview](https://github.com/Emilio-Ramirez/HoneyTrip/wiki/system-overview)
- [API Documentation](https://github.com/Emilio-Ramirez/HoneyTrip/wiki/ApiEndpoints)
- [Development Roadmap](https://github.com/Emilio-Ramirez/HoneyTrip/wiki/DevelopmentRoadmap)

## 🤝 Contributing

We welcome contributions! Please check our [Contributing Guidelines](CONTRIBUTING.md) before getting started.

## 📅 Project Status

- **Current Phase**: MVP Development (Phase 1)
- **Timeline**: 13 months total (4 phases)
- **Focus**: Core Infrastructure & Basic Trip Planning

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Special thanks to me until someone else comes along

---

Built with ❤️ for the climbing community
