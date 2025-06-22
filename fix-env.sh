#!/bin/bash

echo "🔧 Fixing GQ Security Environment..."

# Navigate to the project directory
cd "$(dirname "$0")"

echo "📁 Current directory: $(pwd)"

# Clean up existing files that might cause conflicts
echo "🧹 Cleaning up existing files..."
rm -f package-lock.json
rm -rf node_modules
rm -rf .next

# Update package.json with all required dependencies
echo "📦 Updating package.json..."
cat > package.json << 'EOF'
{
  "name": "gq-security",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "fix-permissions": "chmod +x fix-env.sh && chmod +x project-setup.sh"
  },
  "dependencies": {
    "next": "^14.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.2.2",
    "@types/node": "^20.8.7",
    "@types/react": "^18.2.31",
    "@types/react-dom": "^18.2.14",
    "tailwindcss": "^3.3.5",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "clsx": "^2.0.0",
    "lucide-react": "^0.290.0",
    "framer-motion": "^10.16.4",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "eslint": "^8.52.0",
    "eslint-config-next": "^14.0.3"
  }
}
EOF

# Install dependencies
echo "⬇️  Installing dependencies..."
npm install

# Create or update next.config.js
echo "⚙️  Updating Next.js config..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001']
    }
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-value'
  },
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard'
      }
    ]
  }
}

module.exports = nextConfig
EOF

# Update TypeScript config
echo "📝 Updating TypeScript config..."
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Update Tailwind config
echo "🎨 Updating Tailwind config..."
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#1a1a1a',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#313131',
          950: '#1a1a1a'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
EOF

# Update PostCSS config
echo "📋 Updating PostCSS config..."
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  echo "🔐 Creating .env.local..."
  cat > .env.local << 'EOF'
# Development environment variables
NEXT_PUBLIC_APP_NAME="GQ Security Services"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Add your environment variables here
# DATABASE_URL=your_database_url
# API_KEY=your_api_key
EOF
fi

echo "✅ Environment fixed successfully!"
echo ""
echo "🚀 Now, please do the following:"
echo "1. Open Windows Command Prompt (cmd.exe) as Administrator"
echo "2. Navigate to your project: cd C:\\Users\\Student\\Desktop\\gqcars"
echo "3. Run the development server: npm run dev"
echo "4. Visit: http://localhost:3000"
echo ""
echo "🔧 If you still have permission issues, run: npm run fix-permissions"
