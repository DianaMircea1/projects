# Tourism Audit Frontend

A Next.js frontend application for the Tourism Audit System, providing an interface for tourism property owners to request digital audits.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Client-side validation with TypeScript
- **Security**: Integrated reCAPTCHA and honeypot protection
- **Backend Integration**: Seamless communication with Flask API
- **Modern UI**: Built with Radix UI primitives and shadcn/ui components
- **Performance**: Optimized with Next.js App Router and static generation

## Tech Stack

- **Framework**: Next.js 15.4.5 (React 19.1.0)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```bash
# Backend API Configuration
NEXT_PUBLIC_BACKEND_API_URL="https://api.tourism-audit.devidevs.com"
API_CLIENT_ID="your-api-client-id"
API_CLIENT_SECRET="your-api-client-secret"

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
RECAPTCHA_SECRET_KEY="your-recaptcha-secret-key"

# Security
NEXT_PUBLIC_HONEYPOT_FIELD_NAME="_hp_website"
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── audit/             # Audit form page
│   │   ├── page.tsx       # Main audit form component
│   │   └── actions.ts     # Server actions (if needed)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── RecaptchaPlaceholder.tsx
├── hooks/                # Custom React hooks
│   ├── useFormState.ts   # Form state management
│   ├── useFormValidation.ts # Form validation logic
│   └── index.ts          # Hook exports
├── lib/                  # Utility functions
├── services/             # API service layer
│   ├── auditService.ts   # Audit API calls
│   └── index.ts          # Service exports
├── types/                # TypeScript type definitions
│   ├── audit.ts          # Audit-related types
│   └── index.ts          # Type exports
└── constants/            # Application constants
```

## Key Components

### Audit Form (`/audit`)
- Multi-section form for collecting accommodation data
- Real-time validation
- reCAPTCHA integration
- Honeypot protection
- Progress indication
- Error handling with user feedback

### Form Sections
1. **Contact Information**: Owner details and contact info
2. **Property Information**: Accommodation name and address
3. **Online Presence**: Website and platform links
4. **Marketing & Promotion**: Current strategies and goals
5. **Strategy & Targeting**: Customer segments and unique features
6. **Analytics & Performance**: Data insights and business description

## API Integration

The frontend communicates with the Flask backend through:

- **Endpoint**: `/api/generate-audit`
- **Authentication**: Basic Auth with API credentials
- **Security**: reCAPTCHA verification and honeypot protection
- **Rate Limiting**: Backend handles rate limiting per email
- **Data Format**: JSON payload matching Python models

### Data Flow
1. User fills out the audit form
2. Client-side validation runs
3. reCAPTCHA verification
4. Data transformation to backend format
5. API call with authentication
6. Response handling and user feedback

## Security Features

- **reCAPTCHA v3**: Bot detection and spam prevention
- **Honeypot Field**: Additional bot protection
- **Input Validation**: Client and server-side validation
- **HTTPS Enforcement**: All API calls over HTTPS
- **Environment Variables**: Secure credential management

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality

- **TypeScript**: Strict typing for better code quality
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)

### Testing

The project is set up for testing with:
- Unit tests for utilities and hooks
- Integration tests for components
- E2E tests for user flows (to be implemented)

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_BACKEND_API_URL` | Backend API base URL | Yes |
| `API_CLIENT_ID` | Backend API client ID | Yes |
| `API_CLIENT_SECRET` | Backend API client secret | Yes |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA site key | Yes |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret key | Yes |
| `NEXT_PUBLIC_HONEYPOT_FIELD_NAME` | Honeypot field name | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

## Architecture Compliance

This frontend follows the architectural guidelines defined in:
- `memory/docs/architecture_template.md`
- `project_rules/` directory

Key architectural principles:
- Component-based architecture with clear separation of concerns
- Service layer for API communication
- Hook-based state management
- TypeScript for type safety
- Performance optimization with Next.js features

## License

This project is licensed under the MIT License - see the LICENSE file for details.
