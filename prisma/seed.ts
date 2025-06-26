const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@gqcars.com',
      name: 'Admin User',
      password: 'admin123', // In production, use proper password hashing
      role: 'ADMIN',
      phone: '+44 123 456 7890'
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })