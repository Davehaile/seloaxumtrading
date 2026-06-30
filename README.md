# Seloaxum Trading PLC

A modern, multilingual web application for **Seloaxum Trading PLC** built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Multilingual Support**: Full internationalization in English, Arabic, and Simplified Chinese
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **RTL Support**: Seamless right-to-left layout support for Arabic content
- **Dark Mode**: Built-in theme switching capabilities
- **Contact Form**: B2B contact management with API integration
- **PDF Generation**: Dynamic company profile PDF download functionality
- **Modern UI**: Smooth animations with Framer Motion and Lucide React icons
- **Accessibility**: Built with semantic HTML and ARIA attributes

## 🛠 Tech Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript (93.8% of codebase)
- **Styling**: Tailwind CSS (4.7% of codebase)
- **Animation**: Framer Motion
- **UI Components**: Custom component library with shadcn/ui patterns
- **PDF Generation**: React PDF
- **Icons**: Lucide React
- **State Management**: React Hooks & Context API
- **Toast Notifications**: Custom useToast hook

## 📁 Project Structure

```
seloaxum/
├── src/
│   ├── components/
│   │   ├── ContactSection.tsx       # B2B contact form & company info
│   │   ├── CompanyProfilePDF.tsx    # PDF template for company profile
│   │   └── ui/                      # Reusable UI components
│   ├── context/
│   │   └── LanguageContext.tsx      # Multilingual context provider
│   ├── hooks/
│   │   └── use-toast.ts             # Toast notification hook
│   └── ...
├── public/
│   └── seloaxum-logo.png            # Company logo
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

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

## 📝 Key Components

### ContactSection
The main contact interface featuring:
- Company headquarters information with location, phone, and global presence
- B2B contact form with multi-field validation
- Company profile PDF download functionality
- Multilingual labels and placeholders
- RTL text direction support

### Contact Form Fields
- **Name**: Contact person's name
- **Company**: Company/organization name
- **Email**: Business email address
- **Country**: Country of origin
- **Message**: Inquiry or business proposal

### PDF Download
Generates and downloads a professional company profile PDF with:
- Company logo
- Corporate branding
- Responsive formatting

## 🌐 Multilingual Support

The application supports three languages with full UI localization:

| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | LTR |
| Arabic | `ar` | RTL |
| Chinese (Simplified) | `zh` | LTR |

Language switching is handled via the `LanguageContext` provider with automatic text direction adjustment.

## 🔌 API Integration

### Contact Form Submission
- **Endpoint**: `/api/contact.php`
- **Method**: POST
- **Content-Type**: application/json

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

**Success Response**:
```json
{
  "status": "mail_sent"
}
```

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

- **Form Validation**: Client-side validation with required field checks
- **Loading States**: Disabled buttons with loading indicators during submission
- **Error Handling**: Comprehensive error messages in multiple languages
- **Success Feedback**: Toast notifications for successful submissions
- **Smooth Animations**: Fade-in and slide animations using Framer Motion
- **Lazy Loading**: Viewport-triggered animations for performance

## 🧪 Testing

Components include `data-testid` attributes for testing:
- `section-contact`: Main contact section
- `form-contact`: Contact form
- `input-*`: Form input fields (name, company, email, country, message)
- `button-submit-contact`: Submit button
- `button-download-profile`: PDF download button

## 🔐 Environment Variables

Create a `.env.local` file (if needed) for:
```
VITE_API_URL=/api/contact.php
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
