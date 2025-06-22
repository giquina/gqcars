# Google Maps API Setup Guide

## 🗺️ Real-Time Route Calculations Setup

Your GQ Cars website now has **real-time route calculations** using Google Maps! Here's how to set it up:

### 1. Get Your Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Maps Directions API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Directions API"
   - Click "Enable"
4. Create an API key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### 2. Configure Your Environment

1. Open your `.env.local` file in the project root
2. Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key:

```bash
GOOGLE_MAPS_API_KEY=AIzaSyC4R6AN7SmxxP6zbQfAi-qw-ErTlfh_9Wg
```

### 3. Secure Your API Key (Important!)

For production, restrict your API key:

1. In Google Cloud Console, go to "Credentials"
2. Click on your API key
3. Under "API restrictions", select "Restrict key"
4. Choose "Directions API"
5. Under "Application restrictions", select "HTTP referrers"
6. Add your domain: `https://yourdomain.com/*`

### 4. Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Go to your homepage
3. Use the quote widget:
   - Enter a pickup location (e.g., "Watford, UK")
   - Enter a destination (e.g., "Heathrow Airport, London")
   - Click "BOOK NOW" or "SCHEDULE RIDE"

### 5. How It Works

#### Backend API (`/api/maps/route`)
- **Secure**: Your API key stays on the server
- **Protected**: Only your website can make requests
- **Error Handling**: User-friendly error messages
- **Optimized**: Returns formatted distance and duration

#### Frontend Integration
- **Real Data**: No more mock calculations
- **UK Optimized**: Configured for UK addresses
- **Smart Parsing**: Handles miles/kilometers conversion
- **Error Recovery**: Graceful handling of invalid addresses

### 6. Expected Results

When working correctly, you'll see:

✅ **Real distances**: "21.6 mi" instead of random numbers  
✅ **Accurate times**: "45 mins" based on actual routes  
✅ **Correct pricing**: £6.50/mile × actual distance  
✅ **Address validation**: Google's verified start/end addresses  

### 7. Troubleshooting

#### API Key Issues
```
Error: Maps service is temporarily unavailable
```
- Check your `.env.local` file
- Verify the API key is correct
- Ensure Directions API is enabled

#### Route Calculation Errors
```
No route found between these locations
```
- Use more specific addresses
- Include city/country (e.g., "London, UK")
- Check for typos in location names

#### Network Errors
```
Failed to calculate route
```
- Check your internet connection
- Verify the API isn't over quota limits
- Try different addresses

### 8. API Usage & Costs

**Google Maps Directions API Pricing:**
- First 1,000 requests/month: **FREE**
- Additional requests: ~$0.005 each
- Typical usage: 100-500 requests/month for small business

**Rate Limits:**
- 50 requests per second per project
- 1,000 requests per 100 seconds per user

### 9. Next Steps

Consider adding these enhancements:
- **Route optimization** for multiple stops
- **Traffic data** for more accurate timing
- **Alternative routes** display
- **Map visualization** with route lines
- **Geocoding** for address auto-completion

### 10. Support

If you need help:
1. Check the browser console for error messages
2. Verify your API key has the right permissions
3. Test with simple addresses first (e.g., "London" to "Birmingham")
4. Contact support with specific error messages

---

**🎉 Congratulations!** Your GQ Cars website now provides **real-time, accurate route calculations** for professional security transport services!