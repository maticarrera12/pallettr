# 🎨 Pallettr

**Turn Ideas Into Art With Stunning Palette Designs**

Pallettr is an AI-powered color palette generator that creates stunning, accessible, and professional color schemes for designers and developers. Built with Next.js 15, it leverages Google Gemini AI to generate harmonious color palettes that comply with WCAG accessibility standards.

## ✨ Features

- **AI-Powered Generation**: Uses Google Gemini 1.5 Pro to create intelligent color palettes
- **Accessibility First**: All palettes meet WCAG AA contrast standards (4.5:1 ratio)
- **Professional Quality**: Generates harmonious, vibrant, and dynamic color schemes
- **Smart Color Theory**: Implements analogous, triadic, and complementary color schemes
- **Dark/Light Mode Support**: Optimized for both themes
- **Rate Limiting**: Free tier with 5 requests per 24 hours, unlimited for wishlist members
- **Modern UI**: Beautiful, responsive interface with smooth animations using GSAP
- **Real-time Usage Tracking**: Monitor your API usage and remaining requests

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, CSS Modules
- **AI Integration**: Google Gemini 2.0 Flash API
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Animations**: GSAP (GreenSock)
- **UI Components**: Custom component library with shadcn/ui inspiration
- **Deployment**: Vercel-ready

## 🎯 Use Cases

- **Web Design**: Generate color schemes for websites and applications
- **Brand Identity**: Create cohesive brand color palettes
- **UI/UX Design**: Design accessible and beautiful user interfaces
- **Development**: Get ready-to-use color codes for CSS/SCSS
- **Creative Projects**: Inspire artistic and design projects

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Gemini API key

### Setup

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Google Gemini API
   GEMINI_API_KEY=your_gemini_api_key
   
   # Development (optional)
   ALLOWED_IPS=127.0.0.1,::1
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Run the following SQL to create required tables:
   ```sql
   -- Waitlist table
   CREATE TABLE waitlist (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT,
     name TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     notified BOOLEAN DEFAULT FALSE
   );
   
   -- API usage tracking
   CREATE TABLE api_usage (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     ip_address TEXT NOT NULL,
     usage_count INTEGER DEFAULT 1,
     last_used TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Create indexes for performance
   CREATE INDEX idx_api_usage_ip ON api_usage(ip_address);
   CREATE INDEX idx_waitlist_email ON waitlist(email);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 API Endpoints

### Generate Palette
```
POST /api/generate-palette
```
Generates a color palette based on a text prompt.

**Request Body:**
```json
{
  "prompt": "A modern tech startup with vibrant blues and energetic oranges"
}
```

**Response:**
```json
{
  "primary": "#1E40AF",
  "secondary": "#EA580C",
  "tertiary": "#059669",
  "backgroundLight": "#F8FAFC",
  "backgroundDark": "#0F172A",
  "cardLight": "#FFFFFF",
  "cardDark": "#1E293B",
  "textLight": "#0F172A",
  "textDark": "#F8FAFC"
}
```

### Check Usage
```
GET /api/check-usage
```
Returns current API usage statistics for the client IP.

### Join Waitlist
```
POST /api/waitlist
```
Adds an email to the waitlist for early access.

## 🎨 How It Works

1. **User Input**: Enter a description of your desired color palette
2. **AI Processing**: Google Gemini analyzes your prompt and generates appropriate colors
3. **Accessibility Check**: Colors are automatically optimized for WCAG AA compliance
4. **Color Theory**: Palettes follow professional color theory principles
5. **Output**: Receive a complete color scheme with hex codes and usage examples

## 🌟 Key Features Explained

### Accessibility Compliance
- All generated colors meet WCAG AA standards
- Automatic contrast ratio optimization
- Support for both light and dark themes

### Smart Color Generation
- Primary colors: 10-35% lightness, 85-100% saturation
- Secondary colors: 10-35% lightness, 80-100% saturation  
- Tertiary colors: 10-35% lightness, 75-100% saturation
- Harmonious color relationships using color theory

### Rate Limiting
- Free tier: 5 requests per 24 hours
- Wishlist members: Unlimited access
- IP-based tracking with development bypass

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js static export
- **Railway**: Full-stack deployment support
- **Docker**: Containerized deployment available

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for AI-powered color generation
- [Supabase](https://supabase.com/) for backend infrastructure
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [GSAP](https://greensock.com/gsap/) for smooth animations

## 📞 Support

- **Documentation**: [docs.pallettr.com](https://docs.pallettr.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/pallettr/issues)
- **Discord**: [Join our community](https://discord.gg/pallettr)
- **Email**: support@pallettr.com

## 🔮 Roadmap

- [ ] Color palette export (CSS, SCSS, Tailwind config)
- [ ] Advanced color theory options
- [ ] Palette history and favorites
- [ ] Team collaboration features
- [ ] API rate limit customization
- [ ] Integration with design tools (Figma, Sketch)

---

**Made with ❤️ by the Pallettr team**

*Transform your ideas into beautiful, accessible color palettes with the power of AI.*
