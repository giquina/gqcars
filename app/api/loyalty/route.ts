import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        loyaltyPoints: true,
        accountType: true,
        bookings: {
          select: {
            finalCost: true,
            status: true,
            createdAt: true,
          },
          where: {
            status: 'COMPLETED'
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate potential rewards
    const totalSpent = user.bookings.reduce((sum, booking) => sum + (booking.finalCost || 0), 0)
    const nextRewardAt = Math.ceil(user.loyaltyPoints / 100) * 100

    // Get available rewards
    const rewards = await getAvailableRewards(user.loyaltyPoints, user.accountType)

    return NextResponse.json({
      currentPoints: user.loyaltyPoints,
      totalSpent,
      nextRewardAt,
      pointsToNextReward: nextRewardAt - user.loyaltyPoints,
      recentEarnings: user.bookings.map(booking => ({
        points: Math.floor((booking.finalCost || 0) * 0.1), // 10% as points
        date: booking.createdAt,
        amount: booking.finalCost
      })),
      availableRewards: rewards
    })

  } catch (error) {
    console.error('Loyalty program error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve loyalty information' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, rewardId, points } = await request.json()

    if (action === 'redeem') {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { loyaltyPoints: true }
      })

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      const reward = getRewardById(rewardId)
      if (!reward || user.loyaltyPoints < reward.pointsCost) {
        return NextResponse.json({ error: 'Insufficient points' }, { status: 400 })
      }

      // Deduct points
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          loyaltyPoints: { decrement: reward.pointsCost }
        }
      })

      // Log the redemption
      await prisma.analytics.create({
        data: {
          eventType: 'REWARD_REDEEMED',
          eventData: {
            rewardId,
            pointsSpent: reward.pointsCost,
            rewardTitle: reward.title
          },
          userId: session.user.id
        }
      })

      return NextResponse.json({
        success: true,
        message: `Successfully redeemed ${reward.title}!`,
        newBalance: user.loyaltyPoints - reward.pointsCost
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('Loyalty redemption error:', error)
    return NextResponse.json(
      { error: 'Failed to process redemption' },
      { status: 500 }
    )
  }
}

function getAvailableRewards(points: number, accountType: string) {
  const allRewards = [
    { id: 'discount_10', title: '10% Discount', description: 'Get 10% off your next booking', pointsCost: 100, type: 'discount' },
    { id: 'discount_20', title: '20% Discount', description: 'Get 20% off your next booking', pointsCost: 200, type: 'discount' },
    { id: 'free_upgrade', title: 'Free Vehicle Upgrade', description: 'Upgrade to luxury vehicle at no cost', pointsCost: 300, type: 'upgrade' },
    { id: 'priority_support', title: 'Priority Support', description: '24/7 dedicated support line access', pointsCost: 500, type: 'service' },
    { id: 'vip_lounge', title: 'Airport VIP Lounge', description: 'Access to VIP lounge during airport transfers', pointsCost: 750, type: 'service' },
    { id: 'personal_concierge', title: 'Personal Concierge', description: 'Dedicated concierge service for 1 month', pointsCost: 1000, type: 'service' }
  ]

  // Filter rewards based on account type and points
  return allRewards.filter(reward => {
    if (accountType === 'FAMILY_OFFICE' || accountType === 'VIP') {
      return true // VIP users get access to all rewards
    }
    return reward.pointsCost <= points * 2 // Show rewards within reach
  })
}

function getRewardById(id: string) {
  const rewards = [
    { id: 'discount_10', title: '10% Discount', pointsCost: 100 },
    { id: 'discount_20', title: '20% Discount', pointsCost: 200 },
    { id: 'free_upgrade', title: 'Free Vehicle Upgrade', pointsCost: 300 },
    { id: 'priority_support', title: 'Priority Support', pointsCost: 500 },
    { id: 'vip_lounge', title: 'Airport VIP Lounge', pointsCost: 750 },
    { id: 'personal_concierge', title: 'Personal Concierge', pointsCost: 1000 }
  ]
  
  return rewards.find(reward => reward.id === id)
}