import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Here you would typically:
    // 1. Validate the data
    // 2. Store in database
    // 3. Send email notifications
    // For now, we'll just mock the response

    // Example email sending (you would need to set up an email service)
    /*
    await sendEmail({
      to: 'bookings@gqsecurity.com',
      subject: `New Booking Request - ${data.service}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Duration:</strong> ${data.duration}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <h3>Client Details</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Requirements:</strong> ${data.requirements}</p>
      `
    })

    // Send confirmation to client
    await sendEmail({
      to: data.email,
      subject: 'Booking Request Received - GQ Security',
      html: `
        <h2>Thank you for your booking request</h2>
        <p>We have received your request for ${data.service} services.</p>
        <p>Our team will review your requirements and contact you within 24 hours.</p>
        <p>Your booking details:</p>
        <ul>
          <li>Service: ${data.service}</li>
          <li>Date: ${data.date}</li>
          <li>Time: ${data.time}</li>
          <li>Duration: ${data.duration}</li>
          <li>Location: ${data.location}</li>
        </ul>
        <p>If you need immediate assistance, please call our 24/7 line: +44 20 XXXX XXXX</p>
      `
    })
    */

    // Mock successful response
    return NextResponse.json({
      success: true,
      message: 'Booking request received successfully'
    })

  } catch (error) {
    console.error('Booking request error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process booking request'
      },
      { status: 500 }
    )
  }
}