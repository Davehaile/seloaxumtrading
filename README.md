# Seloaxum Trading PLC

A modern, multilingual web application for **Seloaxum Trading PLC** built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Multilingual Support**: Full internationalization in English, Arabic, and Simplified Chinese
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **RTL Support**: Seamless right-to-left layout support for Arabic content
- **Dark Mode**: Built-in theme switching capabilities
- **Contact Form**: B2B contact management with enterprise-grade security
  - Server-side rate limiting (5 requests per hour)
  - Field-level validation and error reporting
  - CSRF protection and input sanitization
- **PDF Generation**: Dynamic company profile PDF download functionality
- **Modern UI**: Smooth animations with Framer Motion and Lucide React icons
- **Accessibility**: Built with semantic HTML and ARIA attributes

## 🛠 Tech Stack

### Frontend
- **Frontend Framework**: React 18+
- **Language**: TypeScript (93.8% of codebase)
- **Styling**: Tailwind CSS (4.7% of codebase)
- **Animation**: Framer Motion
- **UI Components**: Custom component library with shadcn/ui patterns
- **PDF Generation**: React PDF
- **Icons**: Lucide React
- **State Management**: React Hooks & Context API
- **Toast Notifications**: Custom useToast hook

### Backend
- **Server**: PHP 7.4+
- **Features**:
  - Rate limiting per IP address
  - Input validation and sanitization
  - CORS headers support
  - Email notification system

## 📁 Project Structure

```
seloaxumtrading/
├── seloaxum/                           # Frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactSection.tsx      # B2B contact form & company info
│   │   │   ├── CompanyProfilePDF.tsx   # PDF template for company profile
│   │   │   └── ui/                     # Reusable UI components
│   │   ├── context/
│   │   │   └── LanguageContext.tsx     # Multilingual context provider
│   │   ├── hooks/
│   │   │   └── use-toast.ts            # Toast notification hook
│   │   └── ...
│   ├── public/
│   │   └── seloaxum-logo.png           # Company logo
│   ├── package.json
│   └── vite.config.ts
├── api/
│   └── contact.php                     # Contact form backend (rate limiting + validation)
├── .cache/
│   └── rate_limit/                     # Cache directory for rate limiting (auto-created)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Frontend**: Node.js 16.x or higher, npm or yarn
- **Backend**: PHP 7.4+, web server (Apache, Nginx, etc.)

### Frontend Installation

1. Clone the repository:
```bash
git clone https://github.com/Davehaile/seloaxumtrading.git
cd seloaxumtrading/seloaxum
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or your configured port).

### Backend Setup

1. Deploy the `api/` directory to your web server
2. Ensure the `.cache/rate_limit/` directory is writable:
```bash
chmod 755 .cache/rate_limit/
```

3. Update the email recipient in `api/contact.php` (line 218):
```php
$to = 'contact@seloaxumtrading.com'; // Change to your email
```

4. Ensure your server supports:
   - PHP 7.4+ with `mail()` function enabled
   - JSON request/response handling
   - CORS headers (if frontend and backend are on different origins)

## 📝 Key Components

### ContactSection
The main contact interface featuring:
- Company headquarters information with location, phone, and global presence
- B2B contact form with **server-side validation**
- Real-time error feedback with field highlighting
- Company profile PDF download functionality
- Multilingual labels and placeholders
- RTL text direction support
- **Rate limiting feedback** (HTTP 429 handling)

### Contact Form Fields
- **Name**: Contact person's name (max 100 characters)
- **Company**: Company/organization name (max 100 characters)
- **Email**: Business email address (validated format)
- **Country**: Country of origin (max 100 characters)
- **Message**: Inquiry or business proposal (max 2000 characters)

### PDF Download
Generates and downloads a professional company profile PDF with:
- Company logo
- Corporate branding
- Responsive formatting

## 🔐 Security Features

### Rate Limiting
- **Limit**: 5 requests per hour per IP address
- **Method**: File-based caching (no Redis required)
- **Response**: HTTP 429 (Too Many Requests)
- **Cooldown**: 3600 seconds (1 hour)

### Input Validation
- **Required Fields**: All fields are mandatory
- **Length Limits**:
  - Name: max 100 characters
  - Company: max 100 characters
  - Country: max 100 characters
  - Message: max 2000 characters
  - Email: validated email format
- **Sanitization**: 
  - Removes null bytes
  - Strips control characters
  - Trims whitespace
  - HTML escapes output

### Error Handling
- **422 Unprocessable Entity**: Validation errors with field-level details
- **429 Too Many Requests**: Rate limit exceeded
- **400 Bad Request**: Invalid JSON or Content-Type
- **405 Method Not Allowed**: Non-POST requests
- **500 Internal Server Error**: Server-side issues (details not exposed)

### CORS & Headers
- CORS headers enabled for cross-origin requests
- POST-only enforcement
- JSON Content-Type validation
- Handles OPTIONS preflight requests

## 🌐 Multilingual Support

The application supports three languages with full UI localization:

| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | LTR |
| Arabic | `ar` | RTL |
| Chinese (Simplified) | `zh` | LTR |

Language switching is handled via the `LanguageContext` provider with automatic text direction adjustment.

Error messages are localized in all three languages.

## 🔌 API Integration

### Contact Form Submission

**Endpoint**: `/api/contact.php`
**Method**: POST
**Content-Type**: application/json

**Request Payload**:
```json
{
  "name": "Contact Name",
  "company": "Company Name",
  "email": "email@company.com",
  "country": "Country",
  "message": "Message content"
}
```

**Success Response (200)**:
```json
{
  "status": "mail_sent",
  "message": "Your message has been sent successfully. We will get back to you soon.",
  "code": "SUCCESS"
}
```

**Validation Error Response (422)**:
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": {
    "email": "Invalid email format",
    "name": "Name must not exceed 100 characters"
  }
}
```

**Rate Limit Exceeded Response (429)**:
```json
{
  "error": "Too many requests. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED",
  "retry_after": 3600
}
```

**Error Responses**:
- `400`: Invalid JSON or Content-Type
- `405`: Non-POST request
- `500`: Internal server error

## 🎨 Styling & Theming

The project uses Tailwind CSS with a custom design system:

- **Colors**: Primary, secondary, accent, and semantic colors
- **Spacing**: Consistent padding and margin scales
- **Typography**: Serif and sans-serif font families
- **Dark Mode**: Full dark mode support with CSS variables

### Design Tokens
- Border radius: `rounded-2xl`, `rounded-3xl` for modern aesthetics
- Shadows: Subtle shadow effects with `shadow-sm`, `shadow-lg`
- Backgrounds: `bg-card`, `bg-muted/30` for visual hierarchy

## ✨ User Experience Features

- **Form Validation**:
  - Client-side required field checks
  - Server-side comprehensive validation
  - Real-time error feedback with visual indicators
- **Rate Limiting UX**:
  - Client-side 5-second cooldown between submissions
  - Countdown timer on submit button
  - Server-side 1-hour rate limit per IP
- **Loading States**: Disabled buttons with loading indicators during submission
- **Error Handling**: Comprehensive error messages in multiple languages
- **Field-Level Errors**: Individual error messages displayed below each field
- **Success Feedback**: Toast notifications for successful submissions
- **Smooth Animations**: Fade-in and slide animations using Framer Motion
- **Lazy Loading**: Viewport-triggered animations for performance
- **Accessibility**: ARIA attributes for error reporting and form validity

## 🧪 Testing

Components include `data-testid` attributes for testing:
- `section-contact`: Main contact section
- `form-contact`: Contact form
- `input-*`: Form input fields (name, company, email, country, message)
- `button-submit-contact`: Submit button
- `button-download-profile`: PDF download button

## 🔧 Configuration

### Environment Variables (Frontend)

Create a `.env.local` file in the `seloaxum/` directory:
```
VITE_API_URL=/api/contact.php
```

### Backend Configuration (PHP)

Edit `api/contact.php` to customize:
- **Email recipient** (line 218)
- **Rate limit requests** (line 9): `RATE_LIMIT_REQUESTS = 5`
- **Rate limit window** (line 10): `RATE_LIMIT_WINDOW = 3600`

## 📊 Build & Deployment

### Development

```bash
cd seloaxum
npm run dev
```

### Production Build

```bash
cd seloaxum
npm run build
npm run serve
```

### Type Checking

```bash
npm run typecheck
```

## 📞 Contact Information

**Seloaxum Trading PLC**

- **Phone**: +251 911 54 70 49
- **Address**: Available in the contact form
- **Global Presence**: International business operations

## 📜 License

This project is proprietary. All rights reserved to Seloaxum Trading PLC.

## 🤝 Contributing

For internal use only. For contributions or inquiries, please contact the development team.

---

Built with ❤️ for Seloaxum Trading PLC
