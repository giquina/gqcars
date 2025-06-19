import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Invoice, InvoiceItem, Customer, BookingDetails } from '../types/payment';
import { v4 as uuidv4 } from 'uuid';

// Extend jsPDF type for autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export class InvoiceGenerator {
  private static readonly COMPANY_DETAILS = {
    name: 'GQ Cars LTD',
    address: {
      line1: '123 Security Street',
      line2: 'Business District',
      city: 'London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    registrationNumber: 'GQ123456789',
    vatNumber: 'GB123456789',
    phone: '+44 20 7123 4567',
    email: 'billing@gqcars.co.uk',
    website: 'www.gqcars.co.uk'
  };

  /**
   * Generate a professional invoice with VAT compliance
   */
  public static async generateInvoice(
    customer: Customer,
    bookings: BookingDetails[],
    priceBreakdowns: any[],
    invoiceType: 'individual' | 'monthly' = 'individual'
  ): Promise<Invoice> {
    
    const invoiceNumber = this.generateInvoiceNumber();
    const invoiceDate = new Date();
    const dueDate = new Date();
    
    // Set due date based on customer type
    if (customer.corporateAccount) {
      dueDate.setDate(dueDate.getDate() + customer.corporateAccount.paymentTerms);
    } else {
      dueDate.setDate(dueDate.getDate() + 7); // 7 days for individual customers
    }

    // Calculate totals
    const { items, subtotal, vatAmount, totalAmount } = this.calculateInvoiceTotals(
      bookings,
      priceBreakdowns,
      customer
    );

    const invoice: Invoice = {
      id: uuidv4(),
      invoiceNumber,
      customerId: customer.id,
      bookingId: bookings[0]?.id || '',
      amount: subtotal,
      vatAmount,
      totalAmount,
      currency: 'GBP',
      status: 'draft',
      dueDate,
      issuedAt: invoiceDate,
      items,
      billingAddress: customer.billingAddress,
      companyDetails: customer.companyDetails,
      notes: this.generateInvoiceNotes(customer, invoiceType),
    };

    // Generate PDF
    const pdfBuffer = await this.generatePDF(invoice, customer, bookings);
    invoice.pdfUrl = await this.uploadPDF(pdfBuffer, invoiceNumber);

    return invoice;
  }

  /**
   * Generate monthly consolidated invoice for corporate customers
   */
  public static async generateMonthlyInvoice(
    customer: Customer,
    bookingsForMonth: BookingDetails[],
    priceBreakdowns: any[]
  ): Promise<Invoice> {
    return this.generateInvoice(customer, bookingsForMonth, priceBreakdowns, 'monthly');
  }

  /**
   * Generate expense-ready receipt for individual bookings
   */
  public static async generateReceipt(
    customer: Customer,
    booking: BookingDetails,
    priceBreakdown: any
  ): Promise<string> {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RECEIPT', 105, 30, { align: 'center' });
    
    // Company details
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(this.COMPANY_DETAILS.name, 20, 50);
    pdf.text(this.COMPANY_DETAILS.address.line1, 20, 55);
    pdf.text(`${this.COMPANY_DETAILS.address.city}, ${this.COMPANY_DETAILS.address.postcode}`, 20, 60);
    pdf.text(`VAT: ${this.COMPANY_DETAILS.vatNumber}`, 20, 65);
    
    // Receipt details
    pdf.text(`Receipt #: ${this.generateInvoiceNumber()}`, 120, 50);
    pdf.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 120, 55);
    pdf.text(`Booking: ${booking.id}`, 120, 60);
    
    // Service details
    let yPos = 85;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Service Details:', 20, yPos);
    
    pdf.setFont('helvetica', 'normal');
    yPos += 10;
    pdf.text(`Service: ${booking.serviceType.toUpperCase()}`, 20, yPos);
    yPos += 5;
    pdf.text(`From: ${booking.pickupLocation}`, 20, yPos);
    yPos += 5;
    pdf.text(`To: ${booking.dropoffLocation}`, 20, yPos);
    yPos += 5;
    pdf.text(`Date: ${booking.pickupTime.toLocaleDateString('en-GB')}`, 20, yPos);
    yPos += 5;
    pdf.text(`Distance: ${booking.distance} miles`, 20, yPos);
    
    // Amount breakdown
    yPos += 20;
    pdf.autoTable({
      startY: yPos,
      head: [['Description', 'Amount']],
      body: [
        ['Base Fare', `£${priceBreakdown.baseFare.toFixed(2)}`],
        ...(priceBreakdown.securityPremium > 0 ? [['SIA Premium', `£${priceBreakdown.securityPremium.toFixed(2)}`]] : []),
        ...(priceBreakdown.airportSurcharge > 0 ? [['Airport Surcharge', `£${priceBreakdown.airportSurcharge.toFixed(2)}`]] : []),
        ...(priceBreakdown.surgePricing > 0 ? [['Surge Pricing', `£${priceBreakdown.surgePricing.toFixed(2)}`]] : []),
        ['Subtotal', `£${priceBreakdown.subtotal.toFixed(2)}`],
        ['VAT (20%)', `£${priceBreakdown.vat.toFixed(2)}`],
        ['Total', `£${priceBreakdown.total.toFixed(2)}`],
      ],
      theme: 'striped',
      styles: { fontSize: 10 },
      columnStyles: { 1: { halign: 'right' } }
    });
    
    return pdf.output('dataurlstring');
  }

  private static calculateInvoiceTotals(
    bookings: BookingDetails[],
    priceBreakdowns: any[],
    customer: Customer
  ) {
    const items: InvoiceItem[] = [];
    let subtotal = 0;
    
    // Group bookings by service type
    const serviceGroups: { [key: string]: { count: number; amount: number } } = {};
    
    bookings.forEach((booking, index) => {
      const breakdown = priceBreakdowns[index];
      const serviceKey = `${booking.serviceType} ${booking.requiresSIA ? '(SIA Licensed)' : ''}`;
      
      if (!serviceGroups[serviceKey]) {
        serviceGroups[serviceKey] = { count: 0, amount: 0 };
      }
      
      serviceGroups[serviceKey].count++;
      serviceGroups[serviceKey].amount += breakdown.subtotal;
    });
    
    // Create invoice items
    Object.entries(serviceGroups).forEach(([description, data]) => {
      items.push({
        description: `${description} - ${data.count} trip${data.count > 1 ? 's' : ''}`,
        quantity: data.count,
        unitPrice: data.amount / data.count,
        vatRate: 0.20,
        amount: data.amount
      });
      subtotal += data.amount;
    });
    
    // Apply corporate discount if applicable
    if (customer.corporateAccount?.discountRate) {
      const discount = subtotal * (customer.corporateAccount.discountRate / 100);
      items.push({
        description: `Corporate Discount (${customer.corporateAccount.discountRate}%)`,
        quantity: 1,
        unitPrice: -discount,
        vatRate: 0,
        amount: -discount
      });
      subtotal -= discount;
    }
    
    const vatAmount = subtotal * 0.20;
    const totalAmount = subtotal + vatAmount;
    
    return { items, subtotal, vatAmount, totalAmount };
  }

  private static async generatePDF(
    invoice: Invoice,
    customer: Customer,
    bookings: BookingDetails[]
  ): Promise<Buffer> {
    const pdf = new jsPDF();
    
    // Header with company logo area
    pdf.setFillColor(212, 175, 55); // GQ Gold
    pdf.rect(0, 0, 210, 40, 'F');
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INVOICE', 20, 25);
    
    // Company details
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(this.COMPANY_DETAILS.name, 150, 15, { align: 'right' });
    pdf.text(this.COMPANY_DETAILS.phone, 150, 20, { align: 'right' });
    pdf.text(this.COMPANY_DETAILS.email, 150, 25, { align: 'right' });
    pdf.text(this.COMPANY_DETAILS.website, 150, 30, { align: 'right' });
    
    // Reset text color
    pdf.setTextColor(0, 0, 0);
    
    // Invoice details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Invoice Details', 20, 55);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, 65);
    pdf.text(`Issue Date: ${invoice.issuedAt.toLocaleDateString('en-GB')}`, 20, 70);
    pdf.text(`Due Date: ${invoice.dueDate.toLocaleDateString('en-GB')}`, 20, 75);
    pdf.text(`Customer ID: ${customer.id}`, 20, 80);
    
    // Customer details
    pdf.setFont('helvetica', 'bold');
    pdf.text('Bill To:', 110, 55);
    
    pdf.setFont('helvetica', 'normal');
    let yPos = 65;
    if (customer.companyDetails) {
      pdf.text(customer.companyDetails.name, 110, yPos);
      yPos += 5;
      if (customer.companyDetails.registrationNumber) {
        pdf.text(`Reg: ${customer.companyDetails.registrationNumber}`, 110, yPos);
        yPos += 5;
      }
      if (customer.companyDetails.vatNumber) {
        pdf.text(`VAT: ${customer.companyDetails.vatNumber}`, 110, yPos);
        yPos += 5;
      }
    } else {
      pdf.text(customer.name, 110, yPos);
      yPos += 5;
    }
    
    pdf.text(customer.billingAddress.line1, 110, yPos);
    yPos += 5;
    if (customer.billingAddress.line2) {
      pdf.text(customer.billingAddress.line2, 110, yPos);
      yPos += 5;
    }
    pdf.text(`${customer.billingAddress.city}, ${customer.billingAddress.postcode}`, 110, yPos);
    yPos += 5;
    pdf.text(customer.billingAddress.country, 110, yPos);
    
    // Invoice items table
    const tableData = invoice.items.map(item => [
      item.description,
      item.quantity.toString(),
      `£${item.unitPrice.toFixed(2)}`,
      `${(item.vatRate * 100).toFixed(0)}%`,
      `£${item.amount.toFixed(2)}`
    ]);
    
    pdf.autoTable({
      startY: 95,
      head: [['Description', 'Qty', 'Unit Price', 'VAT', 'Amount']],
      body: tableData,
      foot: [
        ['', '', '', 'Subtotal:', `£${invoice.amount.toFixed(2)}`],
        ['', '', '', 'VAT:', `£${invoice.vatAmount.toFixed(2)}`],
        ['', '', '', 'Total:', `£${invoice.totalAmount.toFixed(2)}`]
      ],
      theme: 'striped',
      styles: { fontSize: 9 },
      columnStyles: {
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'center' },
        4: { halign: 'right' }
      },
      footStyles: { fontStyle: 'bold' }
    });
    
    // Payment terms and notes
    const finalY = (pdf as any).lastAutoTable.finalY + 20;
    
    pdf.setFont('helvetica', 'bold');
    pdf.text('Payment Terms:', 20, finalY);
    
    pdf.setFont('helvetica', 'normal');
    const paymentTerms = customer.corporateAccount
      ? `Net ${customer.corporateAccount.paymentTerms} days`
      : 'Payment due within 7 days';
    pdf.text(paymentTerms, 20, finalY + 7);
    
    if (invoice.notes) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Notes:', 20, finalY + 20);
      pdf.setFont('helvetica', 'normal');
      pdf.text(invoice.notes, 20, finalY + 27, { maxWidth: 170 });
    }
    
    // Footer
    pdf.setFontSize(8);
    pdf.text('This invoice is VAT compliant under UK regulations.', 105, 280, { align: 'center' });
    pdf.text(`${this.COMPANY_DETAILS.name} - ${this.COMPANY_DETAILS.registrationNumber}`, 105, 285, { align: 'center' });
    
    return Buffer.from(pdf.output('arraybuffer'));
  }

  private static generateInvoiceNumber(): string {
    const prefix = 'GQ';
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${year}${month}${random}`;
  }

  private static generateInvoiceNotes(customer: Customer, invoiceType: 'individual' | 'monthly'): string {
    let notes = 'Thank you for choosing GQ Cars LTD for your transportation needs. ';
    
    if (invoiceType === 'monthly') {
      notes += 'This is your monthly consolidated invoice. ';
    }
    
    if (customer.corporateAccount) {
      notes += `Corporate account discount of ${customer.corporateAccount.discountRate}% has been applied. `;
    }
    
    notes += 'All drivers are SIA licensed professionals. For any queries, please contact our billing department.';
    
    return notes;
  }

  private static async uploadPDF(pdfBuffer: Buffer, invoiceNumber: string): Promise<string> {
    // TODO: Implement actual file upload to cloud storage (AWS S3, Google Cloud, etc.)
    // This is a placeholder implementation
    const filename = `invoice-${invoiceNumber}.pdf`;
    
    // In a real implementation, you would:
    // 1. Upload to cloud storage
    // 2. Return the public URL
    // 3. Set appropriate permissions and access controls
    
    return `https://storage.gqcars.com/invoices/${filename}`;
  }

  /**
   * Send invoice via email
   */
  public static async sendInvoice(invoice: Invoice, customer: Customer): Promise<boolean> {
    try {
      // TODO: Implement email sending service (SendGrid, AWS SES, etc.)
      console.log(`Sending invoice ${invoice.invoiceNumber} to ${customer.email}`);
      
      // In a real implementation:
      // 1. Use email service provider
      // 2. Attach PDF invoice
      // 3. Use professional email template
      // 4. Track delivery status
      // 5. Handle bounces and failures
      
      return true;
    } catch (error) {
      console.error('Failed to send invoice:', error);
      return false;
    }
  }

  /**
   * Generate tax summary for accounting purposes
   */
  public static generateTaxSummary(invoices: Invoice[], period: { start: Date; end: Date }) {
    const summary = {
      period,
      totalRevenue: 0,
      totalVAT: 0,
      invoiceCount: invoices.length,
      paidInvoices: 0,
      outstandingAmount: 0,
      breakdown: {
        standard: { count: 0, amount: 0, vat: 0 },
        closeProtection: { count: 0, amount: 0, vat: 0 },
        vip: { count: 0, amount: 0, vat: 0 },
        corporate: { count: 0, amount: 0, vat: 0 }
      }
    };
    
    invoices.forEach(invoice => {
      summary.totalRevenue += invoice.amount;
      summary.totalVAT += invoice.vatAmount;
      
      if (invoice.status === 'paid') {
        summary.paidInvoices++;
      } else {
        summary.outstandingAmount += invoice.totalAmount;
      }
      
      // Categorize by service type based on invoice items
      invoice.items.forEach(item => {
        if (item.description.toLowerCase().includes('close protection')) {
          summary.breakdown.closeProtection.count++;
          summary.breakdown.closeProtection.amount += item.amount;
          summary.breakdown.closeProtection.vat += item.amount * item.vatRate;
        } else if (item.description.toLowerCase().includes('vip')) {
          summary.breakdown.vip.count++;
          summary.breakdown.vip.amount += item.amount;
          summary.breakdown.vip.vat += item.amount * item.vatRate;
        } else if (item.description.toLowerCase().includes('corporate')) {
          summary.breakdown.corporate.count++;
          summary.breakdown.corporate.amount += item.amount;
          summary.breakdown.corporate.vat += item.amount * item.vatRate;
        } else {
          summary.breakdown.standard.count++;
          summary.breakdown.standard.amount += item.amount;
          summary.breakdown.standard.vat += item.amount * item.vatRate;
        }
      });
    });
    
    return summary;
  }
}