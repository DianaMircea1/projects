# Tourism Audit Frontend - Technical Specifications Document

## 1. Introduction
*   **Project Name:** Tourism Audit Frontend
*   **Document Version:** 1.0
*   **Date:** August 5, 2025
*   **Author(s):** AI Development Team
*   **Purpose:** This document outlines the technical specifications for the Tourism Audit Frontend application, detailing the development environment, technology choices, implementation patterns, and technical constraints for the Next.js web application that will be hosted on Vercel.

## 2. Goals
*   **Technical Goals:** 
    - **Performance:** Achieve Core Web Vitals compliance with LCP < 2.5s, FID < 100ms, CLS < 0.1
    - **Scalability:** Handle high traffic through Vercel's CDN and static generation
    - **Security:** Implement secure communication with backend API and protect against common web vulnerabilities
    - **Maintainability:** Use TypeScript for type safety, modular component architecture, and consistent coding patterns
    - **Accessibility:** Ensure WCAG 2.1 AA compliance using Radix UI primitives
    - **SEO:** Optimize for search engines with SSR/SSG and proper meta tags
*   **Business Goals:** 
    - Create an intuitive interface for Romanian tourism property owners to request digital audits
    - Integrate seamlessly with the existing Python Flask backend API
    - Support the two-phase AI audit system (raw audit generation + Romanian template formatting)
    - Display audit results in a professional, branded format matching the backend's HTML email template
    - Generate leads and conversions for the audit service

## 3. Development Environment
*   **Operating Systems:** Windows 11, macOS, Linux (Ubuntu/Debian)
*   **Programming Languages:** 
    - TypeScript 5.x (primary)
    - JavaScript ES2022+ (fallback)
    - CSS (via Tailwind CSS)
*   **Frameworks:** 
    - Next.js 15.4.5 (React 19.1.0 framework)
    - React 19.1.0 (UI library)
*   **Libraries:** 
    - Radix UI (accessible UI primitives)
    - Tailwind CSS 4.x (utility-first CSS)
    - Lucide React (icon library)
    - class-variance-authority (component variants)
    - clsx & tailwind-merge (CSS class utilities)
*   **Development Tools:** 
    - Visual Studio Code (recommended IDE)
    - ESLint (code linting)
    - TypeScript compiler (type checking)
    - Next.js Dev Server with Turbopack (development server)
    - Git (version control)
    - npm/yarn (package management)

## 4. Technologies Used
*   **Technology Stack:** 
    - **Frontend:** Next.js 15 + React 19 + TypeScript
    - **Styling:** Tailwind CSS 4 + Radix UI components
    - **Deployment:** Vercel platform
    - **Backend Integration:** RESTful API communication with Python Flask backend
*   **Technology Selection Rationale:**
    - **Next.js:** Chosen for its excellent SEO capabilities, automatic optimization, and Vercel integration
    - **React 19:** Latest stable version with improved performance and developer experience
    - **TypeScript:** Ensures type safety and better developer experience when integrating with backend API
    - **Tailwind CSS:** Rapid development with utility-first approach, excellent for responsive design
    - **Radix UI:** Accessible primitives that ensure WCAG compliance out of the box
    - **Vercel:** Seamless deployment with automatic optimizations, CDN, and excellent Next.js support

## 5. Key Technical Decisions
*   **App Router vs Pages Router:** Selected Next.js App Router for better performance, nested layouts, and server components
*   **Static Generation Strategy:** Use Static Site Generation (SSG) for marketing pages and Server-Side Rendering (SSR) for dynamic audit results
*   **Component Library:** Chose shadcn/ui built on Radix UI for consistent, accessible components with full customization control
*   **State Management:** Use React's built-in state management with custom hooks instead of external libraries for simplicity
*   **Form Handling:** Implement controlled components with custom validation hooks rather than heavy form libraries
*   **API Integration:** Use native Fetch API with custom service layer for backend communication
*   **Styling Approach:** Utility-first CSS with Tailwind for rapid development and consistent design system
*   **File Structure:** Follow Next.js 13+ conventions with src/ directory and feature-based organization

## 6. Design Patterns
*   **Component Composition:** Use React composition pattern for reusable UI components
*   **Custom Hooks Pattern:** Extract stateful logic into reusable custom hooks (useAuditRequest, useFormValidation)
*   **Service Layer Pattern:** Separate API communication logic into dedicated service modules
*   **Provider Pattern:** Use React Context for global state when needed (theme, user preferences)
*   **Higher-Order Components (HOCs):** For cross-cutting concerns like error boundaries and loading states
*   **Render Props:** For flexible component composition and logic sharing
*   **Container/Presentational Pattern:** Separate data logic from UI presentation
*   **Factory Pattern:** For creating different types of form validators and API request handlers

## 7. Technical Constraints
*   **Vercel Platform Limitations:**
    - Function execution timeout (10 seconds for Hobby plan, 60 seconds for Pro)
    - Function memory limit (1024 MB)
    - Build time limit (45 minutes)
*   **Backend API Dependencies:**
    - Must integrate with existing Python Flask API endpoints
    - Follow existing data contracts and response formats
    - Handle backend's two-phase audit system workflow
*   **Browser Compatibility:**
    - Support modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
    - Progressive enhancement for older browsers
*   **Performance Requirements:**
    - Meet Core Web Vitals thresholds
    - Mobile-first responsive design
*   **Localization:**
    - Primary language: Romanian
    - Must handle Romanian diacritics correctly
    - Future-proof for additional languages

## 8. API Specifications
*   **Backend Integration:** Communicate with Python Flask API hosted separately
*   **Base URL:** To be configured via environment variables
*   **Authentication:** API key-based authentication (if required)
*   **Key Endpoints:**
    ```typescript
    // Audit request submission
    POST /api/audit/request
    {
      "property_name": string,
      "website_url": string,
      "booking_platform_links": string[],
      "social_media_links": string[],
      "google_my_business_link": string,
      "primary_marketing_goal": string,
      "owner_name": string,
      "email": string,
      "phone_number": string,
      "property_address": string
    }
    
    // Audit status check
    GET /api/audit/status/{audit_id}
    
    // Audit results retrieval
    GET /api/audit/results/{audit_id}
    ```
*   **Error Handling:** Standardized error responses with HTTP status codes
*   **Rate Limiting:** Respect backend rate limits for audit requests

## 9. Data Storage
*   **Frontend Data Storage:**
    - **Component State:** React useState and useReducer for local component state
    - **Browser Storage:** localStorage for user preferences and form draft data
    - **Session Storage:** Temporary data for current session
    - **Memory Cache:** In-memory caching for API responses using custom hooks
*   **No Direct Database Access:** Frontend communicates only through backend API
*   **Data Types:**
    ```typescript
    interface PropertyData {
      property_name: string;
      website_url: string;
      booking_platform_links: string[];
      social_media_links: string[];
      google_my_business_link: string;
      primary_marketing_goal: string;
      owner_name: string;
      email: string;
      phone_number: string;
      property_address: string;
    }
    
    interface AuditResult {
      id: string;
      status: 'pending' | 'processing' | 'completed' | 'failed';
      raw_audit?: string;
      formatted_audit?: string;
      created_at: string;
      completed_at?: string;
    }
    ```

## 10. Security Considerations
*   **HTTPS Enforcement:** All communications encrypted via Vercel's automatic HTTPS
*   **Input Validation:**
    - Client-side validation for immediate user feedback
    - Rely on backend for authoritative validation
    - Sanitize all user inputs before display
*   **XSS Protection:**
    - Use React's built-in XSS protection
    - Sanitize any HTML content from backend
    - Implement Content Security Policy headers
*   **CSRF Protection:** 
    - Use SameSite cookies if implementing authentication
    - CSRF tokens for state-changing operations
*   **API Security:**
    - Secure API communication with authentication headers
    - No sensitive data stored in client-side code
    - Environment variables for configuration
*   **Data Privacy:**
    - Handle user data according to GDPR requirements
    - No unnecessary data collection
    - Clear privacy policy and consent mechanisms

## 11. Performance Considerations
*   **Core Web Vitals Optimization:**
    - **Largest Contentful Paint (LCP):** < 2.5 seconds through image optimization and code splitting
    - **First Input Delay (FID):** < 100ms via efficient JavaScript execution and proper event handling
    - **Cumulative Layout Shift (CLS):** < 0.1 through proper sizing of images and dynamic content
*   **Loading Performance:**
    - Static Site Generation for marketing pages
    - Code splitting at route and component level
    - Lazy loading for below-the-fold content
    - Optimized images with Next.js Image component
*   **Runtime Performance:**
    - Minimize bundle size through tree shaking
    - Use React.memo for expensive components
    - Implement virtual scrolling for large lists
    - Debounce user inputs and API calls
*   **Caching Strategy:**
    - Browser caching for static assets
    - CDN caching via Vercel Edge Network
    - API response caching with appropriate TTL

## 12. Testing Strategy  
*   **Unit Testing:** Jest + React Testing Library for component testing
*   **Integration Testing:** Test API integration points and user workflows
*   **E2E Testing:** Playwright for critical user journeys
*   **Performance Testing:** Lighthouse CI for automated performance monitoring
*   **Accessibility Testing:** axe-core integration for a11y compliance
*   **Visual Regression Testing:** Consider Chromatic or similar tools

## 13. Development Workflow
*   **Version Control:** Git with feature branch workflow
*   **Code Quality:** ESLint + Prettier for consistent code formatting
*   **Type Safety:** TypeScript strict mode enabled
*   **Pre-commit Hooks:** Husky for running lints and tests before commits
*   **CI/CD:** GitHub Actions for automated testing and deployment
*   **Code Reviews:** Required pull request reviews before merging

## 14. Environment Configuration
*   **Development:** Local development with Next.js dev server
*   **Staging:** Vercel preview deployments for testing
*   **Production:** Vercel production deployment with custom domain
*   **Environment Variables:**
    - `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL
    - `NEXT_PUBLIC_SITE_URL`: Frontend site URL for meta tags
    - `NEXT_PUBLIC_GA_ID`: Google Analytics ID (if used)

## 15. Monitoring and Analytics
*   **Performance Monitoring:** Vercel Analytics for Core Web Vitals
*   **Error Tracking:** Consider Sentry for production error monitoring
*   **User Analytics:** Privacy-friendly analytics solution
*   **Uptime Monitoring:** Vercel's built-in monitoring capabilities

---

**Implementation Priority:**
1. Set up Next.js project structure with TypeScript
2. Implement basic UI components with Radix UI + Tailwind
3. Create audit request form with validation
4. Integrate with backend API
5. Add error handling and loading states
6. Implement audit results display
7. Add SEO optimization and meta tags
8. Performance optimization and testing
9. Deployment to Vercel with proper configuration
*   Describe how the system will be optimized for performance.

## 12. Scalability Considerations
*   List the scalability considerations for the project.
*   Describe how the system will be scaled to meet future demands.

## 13. Open Issues
*   List any open issues or questions that need to be resolved.

## 14. Future Considerations
*   List any potential future enhancements or features that are not included in the current scope but may be considered for future releases.

## 15. Glossary
*   Define any technical terms or acronyms used in this document.

---

**Example Prompts for Filling Out This Template:**

*   "What are the main technical goals of this project? What are the key priorities?"
*   "What technologies will be used in this project? Why were these technologies chosen?"
*   "What are the key technical decisions that have been made so far? What was the rationale behind each decision?"
*   "What design patterns will be used in this project? How will these patterns be implemented?"
*   "What are the technical constraints that may impact this project? How will these constraints be addressed?"
*   "How will data be stored and accessed in this project? What database schema will be used?"
