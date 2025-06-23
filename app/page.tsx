import React from 'react';
import AIAssistantWidget from '@/app/components/ui/AIAssistantWidget';
import AIBadge from '@/app/components/ui/AIBadge';
// ...all other imports commented out...

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white space-y-12 p-8">
      <section><h2 className="text-2xl font-bold mb-4">AIAssistantWidget</h2><AIAssistantWidget /></section>
      <section><h2 className="text-2xl font-bold mb-4">AIBadge</h2><AIBadge /></section>
      {/* All other components commented out for isolation */}
    </main>
  );
}
