#\!/bin/bash
echo "🚀 Setting up GQCars..."
npm install
npx prisma generate
npx prisma db push
echo "✅ Setup complete\! Run 'npm run dev' to start"
