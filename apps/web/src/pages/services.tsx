import { Layout } from '@/features/common/components/Layout'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    title: 'Vehicle Maintenance',
    description: 'Comprehensive maintenance services for luxury vehicles',
    image: '/images/maintenance.jpg',
    price: 'From £99',
  },
  {
    title: 'Professional Detailing',
    description: 'Premium detailing services to keep your car looking its best',
    image: '/images/detailing.jpg',
    price: 'From £149',
  },
  {
    title: 'Performance Upgrades',
    description: 'Expert installation of performance enhancements',
    image: '/images/performance.jpg',
    price: 'Custom Quote',
  },
  {
    title: 'Paint Protection',
    description: 'Advanced ceramic coating and paint protection films',
    image: '/images/paint.jpg',
    price: 'From £599',
  },
  {
    title: 'Interior Restoration',
    description: 'Complete interior cleaning and restoration services',
    image: '/images/interior.jpg',
    price: 'From £299',
  },
  {
    title: 'Wheel & Tire Services',
    description: 'Professional wheel repair and tire services',
    image: '/images/wheels.jpg',
    price: 'From £79',
  },
]

export default function Services() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Services
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Professional automotive services tailored to your needs
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {services.map((service) => (
              <div key={service.title} className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link href="/booking">
                    <span className="absolute inset-0" />
                    {service.price}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">{service.title}</p>
                <p className="mt-2 text-sm text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Book a Service
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}