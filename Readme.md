# darioristic.com

Personal blog by Dario Ristic covering topics on cloud-native technology, DevOps, organizational transformation, and AI infrastructure.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/darioristic/darioristic.com)

## Features

- 📝 **MDX-powered posts** - Write content in Markdown with React components
- 🎨 **Modern design** - Built with Tailwind CSS and Geist font family
- 🚀 **Next.js 16 App Router** - Latest Next.js with Server Components
- 📊 **Post analytics** - View counts powered by Upstash Redis
- 🔍 **SEO optimized** - Structured data, OpenGraph images, sitemaps
- 📱 **Responsive** - Mobile-first design approach
- ⚡ **Performance** - Vercel Speed Insights integration
- 📈 **Analytics** - Vercel Analytics for visitor tracking
- 🐦 **Tweet embeds** - Native Twitter/X embed support
- 🎥 **YouTube embeds** - Integrated video player
- 📊 **Data visualization** - Charts with Recharts
- 🌐 **Internationalization** - Multi-language support (EN/JA)
- 🤖 **RSS/Atom feed** - Syndication support

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Fonts**: [Geist Sans & Geist Mono](https://vercel.com/font)
- **Database**: [Upstash Redis](https://upstash.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/docs/speed-insights)
- **Deployment**: [Vercel](https://vercel.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/darioristic/darioristic.com.git
cd darioristic.com

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Upstash Redis (for view counts)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

See [REDIS_SETUP.md](./REDIS_SETUP.md) for detailed Redis configuration.

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
darioristic.com/
├── app/
│   ├── (post)/              # Blog post layouts and pages
│   │   ├── 2009-2025/       # Posts organized by year
│   │   ├── components/      # MDX component overrides
│   │   ├── og/              # OpenGraph image generation
│   │   └── utils/           # Post utilities
│   ├── about/               # About page
│   ├── api/                 # API routes (posts, views)
│   ├── components/          # Shared React components
│   ├── atom/                # RSS/Atom feed
│   ├── links/               # Short link redirects
│   ├── posts.json           # Post metadata index
│   └── layout.tsx           # Root layout
├── fonts/                   # Custom Geist fonts
├── public/                  # Static assets
│   └── images/              # Post images
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Writing Blog Posts

Posts are organized by year under `app/(post)/[year]/[slug]/page.mdx`.

Example post structure:

```mdx
export const metadata = {
  title: 'Your Post Title',
  description: 'Post description for SEO',
  openGraph: {
    title: 'Your Post Title',
    description: 'Post description',
    images: ['/og/your-post.png']
  }
}

# Your Post Title

Your content here...
```

### Available MDX Components

- `<Figure>` - Image with caption
- `<Blockquote>` - Styled quotes
- `<Callout>` - Highlighted callout boxes
- `<Code>` - Syntax highlighted code blocks
- `<Tweet>` - Embedded tweets
- `<YouTube>` - Embedded YouTube videos
- `<Snippet>` - Code snippets with copy button

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using Vercel:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments on push.

### Other Platforms

Since this is a standard Next.js application, it can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Node.js

## Performance & SEO

- **Static Generation**: Posts are statically generated at build time
- **Image Optimization**: Automatic image optimization with Next.js Image
- **Code Splitting**: Automatic code splitting per route
- **Font Optimization**: Self-hosted Geist fonts with `font-display: swap`
- **Structured Data**: JSON-LD for articles and FAQs
- **OpenGraph Images**: Dynamic OG image generation
- **Sitemap**: Automatically generated sitemap
- **RSS Feed**: Full content RSS/Atom feed

## Analytics & Monitoring

- **View Counts**: Real-time view tracking with Redis
- **Vercel Analytics**: Privacy-friendly analytics
- **Speed Insights**: Core Web Vitals monitoring

## License

MIT © [Dario Ristic](https://darioristic.com)

## Contact

- Website: [darioristic.com](https://darioristic.com)
- Twitter: [@darioristic](https://twitter.com/darioristic)
- LinkedIn: [darioristic]https://www.linkedin.com/in/dario-ristic/

---

Built with ❤️ using Next.js and deployed on Vercel.
