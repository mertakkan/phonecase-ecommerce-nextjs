# CaseCobra - Custom Phone Case E-commerce Platform

CaseCobra is a modern, full-stack e-commerce application that allows customers to create custom phone cases by uploading their own images. Built with Next.js 14, it provides a seamless experience from image upload to order fulfillment with real-time preview capabilities.

## What It Does

CaseCobra enables users to:
- **Upload personal images** and create custom phone cases
- **Preview designs in real-time** with interactive phone mockups
- **Customize case options** including materials (silicone/polycarbonate) and finishes (smooth/textured)
- **Choose case colors** (black, blue, rose) with live preview updates
- **Process secure payments** through Stripe integration
- **Track order status** with admin dashboard management
- **Manage user authentication** with Supabase Auth

## How It Works

### User Journey
1. **Landing Page**: Users see testimonials, product features, and quality guarantees
2. **Image Upload**: Drag-and-drop interface for PNG, JPG, JPEG files with progress tracking
3. **Design Configuration**: Interactive design tool with live phone preview
4. **Customization**: Material selection, finish options, and color choices
5. **Checkout**: Secure payment processing with Stripe
6. **Order Management**: Admin dashboard for order tracking and status updates

### Technical Architecture
- **Frontend**: Next.js 14 with React 18, TypeScript, and Tailwind CSS
- **Authentication**: Supabase Auth with middleware-based session management
- **Database**: Supabase PostgreSQL for user data, orders, and configurations
- **File Storage**: UploadThing for image upload and processing
- **Payments**: Stripe integration for secure payment processing
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React Query for server state management

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend & Services
- **Supabase** - Backend-as-a-Service (Database, Auth, Storage)
- **Stripe** - Payment processing
- **UploadThing** - File upload service
- **Prisma** - Database ORM

### UI & Design
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Dropzone** - File upload interface
- **React RND** - Resizable and draggable components

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Sharp** - Image optimization

## Key Features

### Design Configuration
- Real-time phone case preview with multiple color options
- Interactive image positioning and resizing
- Material and finish customization with price calculations
- Responsive design that works across all devices

### E-commerce Functionality
- Secure payment processing with Stripe
- Order management system with status tracking
- Admin dashboard for order fulfillment
- User authentication and profile management

### Image Processing
- Drag-and-drop image upload with progress tracking
- Image optimization and resizing
- Support for PNG, JPG, and JPEG formats
- Real-time preview generation

### User Experience
- Modern, responsive UI with smooth animations
- Mobile-first design approach
- Loading states and error handling
- Toast notifications for user feedback

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth-callback/     # Authentication handling
│   ├── configure/         # Design configuration flow
│   ├── dashboard/         # Admin dashboard
│   └── thank-you/         # Order confirmation
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── *.tsx             # Feature components
├── config/               # Configuration files
├── lib/                  # Utility libraries
├── utils/                # Helper functions
└── validators/           # Form validation schemas
```

CaseCobra represents a complete e-commerce solution with modern web technologies, providing both customers and administrators with powerful tools for creating and managing custom phone case orders.
