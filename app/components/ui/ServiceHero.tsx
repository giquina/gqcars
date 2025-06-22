import { LucideIcon } from 'lucide-react'

interface ServiceHeroProps {
  title: string
  description: string
  Icon: LucideIcon
  image?: string
}

export default function ServiceHero({ title, description, Icon, image }: ServiceHeroProps) {
  return (
    <section className="relative h-[60vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gq-black via-gq-black/95 to-transparent z-10" />
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: image ? `url(${image})` : 'linear-gradient(to bottom right, #0f172a, #1e293b)'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <Icon className="w-12 h-12 text-gq-gold" />
            <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
          </div>
          <p className="text-xl text-gray-300">{description}</p>
        </div>
      </div>
    </section>
  )
}