"use client";

export default function TestPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🚗 GQ Cars Test Page</h1>
          <p className="text-gray-300">If you can see this, the basic setup is working!</p>
          <div className="mt-8">
            <div className="text-green-400">✅ Next.js is working</div>
            <div className="text-green-400">✅ Tailwind CSS is working</div>
            <div className="text-green-400">✅ TypeScript is working</div>
          </div>
        </div>
      </div>
    </main>
  );
}