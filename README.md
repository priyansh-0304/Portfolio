# Priyansh Arora - Developer Portfolio

A modern, responsive developer portfolio built with React, Vite, and Tailwind CSS v4. Features smooth animations, dark/light mode, and a clean design system.

![Portfolio Preview](./public/og-image.png)

## ✨ Features

- **Modern Tech Stack** - React 19, Vite 7, Tailwind CSS v4
- **Responsive Design** - Mobile-first approach, looks great on all devices
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Smooth Animations** - Scroll reveal effects, hover transitions, rotating text
- **SEO Optimized** - Meta tags, Open Graph, Twitter cards, JSON-LD structured data
- **Accessible** - ARIA labels, keyboard navigation, focus management
- **Performance** - Code splitting, optimized builds, lazy loading ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/priyansh0304/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
│   ├── favicon.svg      # Site favicon
│   ├── robots.txt       # SEO robots file
│   └── sitemap.xml      # Sitemap for search engines
├── src/
│   ├── components/
│   │   ├── icons/       # Icon components
│   │   ├── layout/      # Navbar, Footer
│   │   ├── sections/    # Hero, About, Projects, Skills, Contact
│   │   └── ui/          # Reusable UI components
│   ├── context/         # React context (Theme)
│   ├── data/            # Portfolio data (projects, skills)
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles & animations
│   └── main.jsx         # App entry point
├── index.html           # HTML template with SEO
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite build configuration
```

## 🎨 Customization

### Personal Information

1. Update `index.html` with your name, description, and social links
2. Modify `src/data/index.js` for skills data
3. Edit `src/data/projects.json` for your projects
4. Update `public/sitemap.xml` with your domain

### Theme Colors

The color palette uses Tailwind's built-in colors:
- **Primary**: Indigo (buttons, links, accents)
- **Secondary**: Rose (highlights, gradients)
- **Accent**: Teal (badges, special elements)
- **Surface**: Slate (backgrounds, text)

### Adding Projects

Edit `src/data/projects.json`:

```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Brief description of the project",
  "techStack": ["React", "Node.js", "MongoDB"],
  "image": "/project-image.png",
  "githubLink": "https://github.com/...",
  "demoLink": "https://demo-link.com",
  "featured": true
}
```

## 🛠️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# The build output will be in the 'dist' folder
```

The production build includes:
- Minified JavaScript and CSS
- Code splitting for optimal loading
- Asset optimization
- Source maps removed
- Console logs stripped

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Deploy
npm run build && npm run deploy
```

## 🔧 Technologies

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite 7 | Build Tool |
| Tailwind CSS 4 | Styling |
| ESLint | Code Linting |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by [Priyansh Arora](https://linkedin.com/in/priyansh-arora)
