# SubSaharan Investment Link Group

A modern Next.js 16 application for SubSaharan Investment Link Group, providing business consulting, governance, and professional services across Sub-Saharan Africa.

## 🚀 Features

- **Next.js 16** with App Router
- **Turbopack** for lightning-fast development
- **React 19** with latest features
- **Docker Support** for containerized deployment
- **TypeScript** for type safety
- **Internationalization** (6 languages: EN, FR, ES, ZU, HA, SW)
- **SEO Optimized** with SSR and structured data
- **3D Components** with Three.js and Globe.gl
- **Animations** with GSAP and Framer Motion
- **Tailwind CSS** for styling

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development with Turbopack

```bash
# Start development server with Turbopack (recommended)
npm run dev

# Development with bundle analysis
npm run dev:analyze

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

### Production Build

```bash
# Build for production
npm run build

# Build with bundle analysis
npm run build:analyze

# Start production server
npm run start
```

## � Docker Deployment

### Quick Start with Docker

```bash
# Build and run with Docker Compose (recommended)
docker-compose up -d

# Or use npm scripts
npm run docker:build    # Build image
npm run docker:run      # Run container
npm run docker:stop     # Stop container
npm run docker:dev      # Development mode with hot reload
```

### Manual Docker Commands

```bash
# Build the image
docker build -t sub-saharan-app .

# Run the container
docker run -p 3000:3000 --name sub-saharan-app sub-saharan-app

# Stop and remove
docker stop sub-saharan-app
docker rm sub-saharan-app
```

### Docker Configuration

- **Multi-stage build** for optimized image size
- **Standalone output** mode for Next.js
- **Health checks** included
- **Non-root user** for security
- **Production-ready** with proper caching

See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for detailed Docker documentation.

## �🚀 Turbopack Configuration

This project is optimized for **Turbopack**, Next.js's new bundler that provides:

- ⚡ **10x faster** development builds
- 🔄 **Instant hot reloads**
- 📦 **Optimized bundle splitting**
- 🎯 **Better tree-shaking**

### Key Optimizations

1. **Package Imports**: Optimized imports for `react-icons`, `gsap`, `three`, and `framer-motion`
2. **SSR External Packages**: Three.js packages are externalized for better SSR performance
3. **Image Optimization**: WebP and AVIF formats with responsive sizing
4. **Security Headers**: Comprehensive security headers for production
5. **SEO Optimization**: Structured data, metadata, and canonical URLs

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Turbopack Performance
NEXT_TURBO=1
NEXT_TELEMETRY_DISABLED=1

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://subsaharan.com

# Development
NODE_ENV=development
ANALYZE=false
```

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── components/         # Shared components
│   ├── lib/               # Utilities and data
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── locales/               # i18n translations
└── components/            # Additional components
```

## 🌍 Internationalization

Supports 6 languages:
- 🇺🇸 English (EN)
- 🇫🇷 French (FR) 
- 🇪🇸 Spanish (ES)
- 🇿🇦 isiZulu (ZU)
- 🇳🇬 Hausa (HA)
- 🇹🇿 Kiswahili (SW)

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration with Turbopack optimizations
- `turbo.json` - Turbopack pipeline configuration
- `tsconfig.json` - TypeScript configuration optimized for ES2022
- `tailwind.config.js` - Tailwind CSS configuration

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **SEO**: Full structured data and metadata
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Deployment

### Docker (Recommended for Self-Hosting)

```bash
# Using Docker Compose
docker-compose up -d

# Or build and deploy manually
docker build -t sub-saharan-app .
docker run -p 3000:3000 sub-saharan-app
```

### Vercel

```bash
npm run build
```

### Other Platforms

The project uses `output: 'standalone'` for optimal deployment on any platform including AWS, GCP, Azure, or any Docker-compatible hosting.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Turbopack Documentation](https://turbo.build/pack/docs)
- [React 19 Features](https://react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

Built with ❤️ for Sub-Saharan Africa
