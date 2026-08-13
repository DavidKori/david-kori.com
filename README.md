# 🚀 MERN Developer Portfolio

## 📌 Project Overview
A modern, professional portfolio website for Full Stack MERN Developers. Fully data-driven, responsive, and optimized for landing internships or junior developer roles.

## 🎯 Features
- ✅ **Fully Data-Driven**: No placeholders - renders only if data exists
- ✅ **Dark/Light Mode**: Elegant theme switching
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Single Page Application**: Smooth scrolling navigation
- ✅ **Professional UI**: Clean, employer-friendly design
- ✅ **Performance Optimized**: Fast loading with IntersectionObserver

## 🛠️ Tech Stack
- **Frontend**: React 18.2, JSX, Plain CSS
- **API**: Axios for HTTP requests
- **Animations**: IntersectionObserver API
- **Icons**: React Icons
- **Hosting**: Consumes external backend API

## 📁 Project Structure
```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar/         # Navigation with theme toggle
│   │   ├── Hero/           # Welcome section
│   │   ├── About/          # Professional background
│   │   ├── Skills/         # Technical skills display
│   │   ├── Projects/       # Project showcase
│   │   ├── Experience/     # Work timeline
│   │   ├── Education/      # Academic background
│   │   ├── Contact/        # Contact form & info
│   │   └── SocialLinks/    # Social media links
│   ├── hooks/
│   │   └── useIntersectionObserver.js
│   ├── services/
│   │   └── axios.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/mern-portfolio.git
cd mern-portfolio
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Create Environment File
Create `.env` file in root:
```env
REACT_APP_API_URL=http://localhost:5000/api
# or your backend URL
```

### 4. Start Development Server
```bash
npm start
# or
yarn start
```

### 5. Build for Production
```bash
npm run build
# or
yarn build
```

## 🔧 API Endpoints Required

### Backend Must Provide:
```
GET  /api/profile         # Hero section data
GET  /api/about           # About section
GET  /api/skills          # Technical skills
GET  /api/projects        # Projects showcase
GET  /api/experience      # Work experience
GET  /api/education       # Education history
GET  /api/certifications  # Certifications
GET  /api/testimonials    # Testimonials
GET  /api/resume          # Resume PDF URL
GET  /api/contact         # Contact information
GET  /api/social          # Social media links
POST /api/contact         # Contact form submission
```

### Example API Response (Skills):
```json
[
  {
    "_id": "1",
    "name": "React",
    "category": "Frontend",
    "level": "Expert",
    "iconUrl": "https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg"
  }
]
```

## 🌐 Sections

### 1. **Navbar** 📍
- Fixed/sticky navigation
- Collapsible hamburger menu (mobile)
- Dynamic section links
- Dark/light mode toggle
- Smooth scroll navigation

### 2. **Hero Section** 🌟
- Developer name & role
- Professional tagline
- CTA buttons (View Projects, Download Resume)
- Profile image with futuristic effects
- Animated tech stack scroll

### 3. **Skills Section** ⚡
- Categorized skills (Frontend, Backend, Database, Tools, Other)
- Proficiency levels with star ratings
- Icon support from URLs
- Responsive grid layout
- Color-coded categories

### 4. **Projects Section** 🚀
- Grid layout with cards
- Image/video previews
- Tech stack tags
- Live demo & GitHub links
- Hover animations

### 5. **Experience Section** 💼
- Timeline layout
- Company roles & periods
- Job descriptions
- Technology tags
- Responsive design

### 6. **Contact Section** 📞
- Contact information display
- Working contact form (Formspree)
- Success/error feedback
- Email, phone, location

## 🎨 Styling Features

### CSS Architecture
- **CSS Variables** for theming
- **Modular CSS** per component
- **Mobile-first** responsive design
- **Custom animations** with IntersectionObserver

### Theme Variables
```css
:root {
  --primary-color: #2563eb;
  --text-primary: #1f2937;
  --bg-primary: #ffffff;
  /* Light theme variables */
}

[data-theme="dark"] {
  --primary-color: #3b82f6;
  --text-primary: #f9fafb;
  --bg-primary: #0f172a;
  /* Dark theme variables */
}
```

## 📱 Responsive Breakpoints
```css
/* Mobile First */
@media (min-width: 480px) { /* Small devices */ }
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 992px) { /* Desktops */ }
@media (min-width: 1200px) { /* Large screens */ }
```

## 🔄 Data Flow
1. **Component mounts** → Fetches data from API
2. **API returns data** → Component validates response
3. **If data exists** → Renders section with data
4. **If no data** → Section doesn't render
5. **Loading/Error states** → Shows appropriate UI

## ⚡ Performance Features
- **Lazy loading** for images
- **Code splitting** with React
- **IntersectionObserver** for animations
- **CSS containment** for paint performance
- **Optimized bundle size**

## 🐛 Common Issues & Solutions

### 1. API Connection Failed
```bash
# Check if backend is running
curl http://localhost:5000/api/profile

# Update .env file with correct URL
REACT_APP_API_URL=http://your-backend-url/api
```

### 2. Skills Section Not Rendering
- Ensure `/api/skills` returns valid JSON array
- Check browser console for errors
- Verify API response structure matches expected format

### 3. Theme Not Persisting
- Check localStorage permissions
- Verify theme toggle functionality
- Clear browser cache if needed

### 4. Mobile Menu Issues
- Test on actual mobile device
- Check CSS media queries
- Verify touch event handling

## 📦 Deployment

### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Add environment variables
4. Deploy!

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Follow GitHub Pages setup
```

## 🚨 Important Rules
- ❌ **No placeholders** - Use real data only
- ✅ **Conditional rendering** - Sections show only if data exists
- ✅ **Performance focused** - Lightweight and fast
- ✅ **Employer-friendly** - Clean, professional design
- ✅ **Accessibility** - Semantic HTML, ARIA labels

## 🎯 Goal
This portfolio instantly communicates competence, shows real work, feels modern, and makes employers want to contact the developer.

## 📄 License
MIT License - Feel free to use and modify for your own portfolio!

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author
**David Kori** - Full Stack MERN Developer

## 🙏 Acknowledgments
- React Documentation
- CSS Tricks for animations
- All contributors and testers

---

## 📞 Support
For support, email mutugidavid37@gmail.com or create an issue in the GitHub repository.

**⭐ Star this repo if you found it helpful!**

---

*Built with ❤️ for the developer community*
