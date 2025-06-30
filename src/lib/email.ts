// Email service configuration and utilities

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  service: string;
  date: string;
  time: string;
  pickupLocation: string;
  dropoffLocation?: string;
  passengers: number;
  specialRequests?: string;
  estimatedPrice?: number;
  bookingId: string;
}

export class EmailService {
  private apiKey: string;
  private fromEmail: string;
  private companyEmail: string;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || '';
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@gqcars.co.uk';
    this.companyEmail = process.env.COMPANY_EMAIL || 'bookings@gqcars.co.uk';
  }

  // Booking confirmation email template
  private getBookingConfirmationTemplate(data: BookingEmailData): EmailTemplate {
    const subject = `Booking Confirmation - GQ Cars ${data.service}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
          .footer { background: #1f2937; color: white; padding: 15px; text-align: center; font-size: 12px; }
          .logo { color: #eab308; font-size: 24px; font-weight: bold; }
          .price { color: #16a34a; font-weight: bold; font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">GQ CARS LTD</div>
            <p>AI-Powered Security Transport</p>
          </div>
          
          <div class="content">
            <h2>Booking Confirmation</h2>
            <p>Dear ${data.customerName},</p>
            <p>Thank you for choosing GQ Cars. Your booking has been confirmed.</p>
            
            <div class="booking-details">
              <h3>Booking Details</h3>
              <p><strong>Booking ID:</strong> ${data.bookingId}</p>
              <p><strong>Service:</strong> ${data.service}</p>
              <p><strong>Date:</strong> ${data.date}</p>
              <p><strong>Time:</strong> ${data.time}</p>
              <p><strong>Pickup Location:</strong> ${data.pickupLocation}</p>
              ${data.dropoffLocation ? `<p><strong>Drop-off Location:</strong> ${data.dropoffLocation}</p>` : ''}
              <p><strong>Passengers:</strong> ${data.passengers}</p>
              ${data.specialRequests ? `<p><strong>Special Requests:</strong> ${data.specialRequests}</p>` : ''}
              ${data.estimatedPrice ? `<p class="price">Estimated Price: £${data.estimatedPrice}</p>` : ''}
            </div>
            
            <h3>What to Expect</h3>
            <ul>
              <li>Your SIA licensed driver will arrive 5 minutes early</li>
              <li>You'll receive an SMS with driver details 30 minutes before pickup</li>
              <li>All vehicles are equipped with AI-powered safety systems</li>
              <li>24/7 support available at 07407 655 203</li>
            </ul>
            
            <h3>Need Changes?</h3>
            <p>If you need to modify or cancel your booking, please contact us at least 2 hours in advance:</p>
            <ul>
              <li>Phone: 07407 655 203</li>
              <li>Email: bookings@gqcars.co.uk</li>
              <li>WhatsApp: Available on our website</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>GQ Cars LTD - Professional Security Transport</p>
            <p>SIA Licensed • Fully Insured • 24/7 Service</p>
            <p>Email: bookings@gqcars.co.uk | Phone: 07407 655 203</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      GQ CARS LTD - Booking Confirmation
      
      Dear ${data.customerName},
      
      Thank you for choosing GQ Cars. Your booking has been confirmed.
      
      Booking Details:
      - Booking ID: ${data.bookingId}
      - Service: ${data.service}
      - Date: ${data.date}
      - Time: ${data.time}
      - Pickup: ${data.pickupLocation}
      ${data.dropoffLocation ? `- Drop-off: ${data.dropoffLocation}` : ''}
      - Passengers: ${data.passengers}
      ${data.specialRequests ? `- Special Requests: ${data.specialRequests}` : ''}
      ${data.estimatedPrice ? `- Estimated Price: £${data.estimatedPrice}` : ''}
      
      Your SIA licensed driver will arrive 5 minutes early. You'll receive driver details 30 minutes before pickup.
      
      Need changes? Contact us at least 2 hours in advance:
      Phone: 07407 655 203
      Email: bookings@gqcars.co.uk
      
      GQ Cars LTD - Professional Security Transport
    `;

    return { subject, html, text };
  }

  // Send booking confirmation email
  async sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
    try {
      const template = this.getBookingConfirmationTemplate(data);
      
      // Send to customer
      await this.sendEmail({
        to: data.customerEmail,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      // Send notification to company
      await this.sendEmail({
        to: this.companyEmail,
        subject: `New Booking: ${data.service} - ${data.date}`,
        html: template.html,
        text: template.text,
      });

      return true;
    } catch (error) {
      console.error('Failed to send booking confirmation:', error);
      return false;
    }
  }

  // Generic email sending method
  private async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    text: string;
  }): Promise<void> {
    // This would integrate with SendGrid, AWS SES, or similar service
    // For now, we'll log the email that would be sent
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Email would be sent:', {
        from: this.fromEmail,
        to: params.to,
        subject: params.subject,
      });
      return;
    }

    // Production email sending would go here
    // Example for SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(this.apiKey);
    
    const msg = {
      to: params.to,
      from: this.fromEmail,
      subject: params.subject,
      text: params.text,
      html: params.html,
    };
    
    await sgMail.send(msg);
    */
  }

  // Send quote request notification
  async sendQuoteRequest(quoteData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    service: string;
    details: string;
  }): Promise<boolean> {
    try {
      const subject = `New Quote Request - ${quoteData.service}`;
      const html = `
        <h2>New Quote Request</h2>
        <p><strong>Customer:</strong> ${quoteData.customerName}</p>
        <p><strong>Email:</strong> ${quoteData.customerEmail}</p>
        <p><strong>Phone:</strong> ${quoteData.customerPhone}</p>
        <p><strong>Service:</strong> ${quoteData.service}</p>
        <p><strong>Details:</strong> ${quoteData.details}</p>
      `;
      
      await this.sendEmail({
        to: this.companyEmail,
        subject,
        html,
        text: `New Quote Request - ${quoteData.service}\n\nCustomer: ${quoteData.customerName}\nEmail: ${quoteData.customerEmail}\nPhone: ${quoteData.customerPhone}\nService: ${quoteData.service}\nDetails: ${quoteData.details}`,
      });

      return true;
    } catch (error) {
      console.error('Failed to send quote request:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();