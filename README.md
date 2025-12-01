# 🎬 CineSeek - Movie Discovery Platform

![CineSeek Banner](https://via.placeholder.com/1200x400/0F0B15/E2D609?text=CineSeek+Movie+Discovery)

A modern, feature-rich movie discovery platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**. CineSeek helps movie lovers discover, explore, and organize their favorite films with an intuitive and beautiful interface.

## ✨ Features

### 🎥 Core Features
- **Movie Discovery**: Browse through thousands of movies with advanced filtering
- **AI-Powered Search**: Smart search with genre, year, and keyword filters
- **Movie Details**: Comprehensive movie information with trailers, cast, and reviews
- **Watchlist**: Save and organize movies you want to watch later
- **Responsive Design**: Seamless experience across all devices

### 🚀 Advanced Features
- **AI Movie Title Generator**: Generate creative movie titles based on plot descriptions
- **Personal Recommendations**: AI-driven movie suggestions
- **Multiple Login Options**: Social media and email authentication
- **User Profiles**: Personalized watch history and preferences
- **Contact System**: Integrated contact form and support

### 🎨 User Experience
- **Dark Theme**: Easy-on-the-eyes dark interface with golden accents
- **Smooth Animations**: Engaging transitions and hover effects
- **Fast Performance**: Optimized loading and smooth interactions
- **Accessible Design**: WCAG compliant components

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern state management

### Backend & APIs
- **TMDB API** - Movie data and images
- **Hugging Face AI** - Movie title generation
- **Next.js API Routes** - Custom backend endpoints

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TMDB API account
- Hugging Face account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IR101D/cineseek.git
   cd cineseek
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # TMDB API Configuration
   TMDB_API_KEY=your_tmdb_api_key_here

   # Hugging Face AI (Optional)
   HUGGING_FACE_API_KEY=your_hugging_face_token_here

   # Next.js Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Get API Keys**
   - **TMDB API**: Register at [The Movie Database](https://www.themoviedb.org/settings/api)
   - **Hugging Face**: Get token from [Hugging Face Settings](https://huggingface.co/settings/tokens)

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 📱 Pages Overview

### 🏠 Homepage (`/`)
- Hero section with animated background
- Feature showcase
- Platform statistics
- Call-to-action buttons

### 🎬 Movies (`/movies`)
- Grid layout of movie cards
- Advanced filtering (year, genre)
- Pagination support
- Search functionality

### 📄 Movie Details (`/movies/[id]`)
- Comprehensive movie information
- YouTube trailer integration
- Cast and crew details
- Similar movies recommendations

### 🤖 AI Generator (`/generate-movie`)
- AI-powered movie title generation
- Creative plot description input
- Multiple AI model fallbacks
- Copy-to-clipboard functionality

### 📞 Contact (`/contact`)
- Multi-channel contact options
- Interactive contact form
- FAQ section
- Social media links

### 🔐 Authentication
- **Sign In** (`/signin`) - Modern login with social options
- **Sign Up** (`/signup`) - Feature-rich registration with validation

## 🎨 Design System

### Color Palette
- **Primary**: `#E2D609` (Golden Yellow)
- **Background**: `#0F0B15` (Dark Blue)
- **Surface**: `#171D22` (Card Background)
- **Text**: `#FFFFFF` (White)
- **Secondary Text**: `#9CA3AF` (Gray)

### Typography
- **Headings**: Inter (Bold weights)
- **Body**: Inter (Regular weights)
- **Monospace**: JetBrains Mono

### Components
- **Buttons**: Multiple variants with hover states
- **Cards**: Glass morphism effects
- **Forms**: Accessible with validation
- **Loading**: Custom animated components

## 🔧 Configuration

### Next.js Config
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
    ],
  },
}
```

### Tailwind Config
Custom configuration with brand colors and extended animations.

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing comprehensive movie data
- **Hugging Face** for AI model hosting
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

---

<div align="center">

**Made with ❤️ and lots of 🍿 by Ikram Romane**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>
