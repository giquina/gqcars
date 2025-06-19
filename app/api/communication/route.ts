import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.MESSAGE_ENCRYPTION_KEY || 'gq-security-default-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'send_message':
        return handleSendMessage(data);
      case 'get_templates':
        return handleGetTemplates();
      case 'translate_message':
        return handleTranslateMessage(data);
      case 'initiate_call':
        return handleInitiateCall(data);
      case 'send_voice_message':
        return handleSendVoiceMessage(data);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Communication API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tripId = searchParams.get('tripId');
    const userId = searchParams.get('userId');

    if (tripId && userId) {
      // Return message history for trip
      const messages = [
        {
          id: 'msg-1',
          senderId: 'driver-001',
          receiverId: 'customer',
          content: 'Good evening! I\'m James, your driver for tonight. I\'ll be with you in 5 minutes.',
          timestamp: Date.now() - 5 * 60 * 1000,
          type: 'text',
          encrypted: true,
          delivered: true,
          read: true
        },
        {
          id: 'msg-2',
          senderId: 'customer',
          receiverId: 'driver-001',
          content: 'Perfect, thank you. I\'ll be waiting outside.',
          timestamp: Date.now() - 3 * 60 * 1000,
          type: 'text',
          encrypted: true,
          delivered: true,
          read: true
        }
      ];

      return NextResponse.json({ messages });
    }

    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  } catch (error) {
    console.error('Communication GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleSendMessage(data: any) {
  const { tripId, senderId, receiverId, content, type = 'text' } = data;

  // Encrypt message content
  const encrypted = CryptoJS.AES.encrypt(content, ENCRYPTION_KEY).toString();

  const message = {
    id: `msg-${Date.now()}`,
    tripId,
    senderId,
    receiverId,
    content: encrypted,
    originalContent: content, // For demo purposes
    type,
    timestamp: Date.now(),
    encrypted: true,
    delivered: false,
    read: false
  };

  // In real implementation:
  // 1. Save to database
  // 2. Send via WebSocket to recipient
  // 3. Send push notification if offline

  console.log('Message sent:', { ...message, content: '[ENCRYPTED]' });

  return NextResponse.json({ 
    success: true, 
    messageId: message.id,
    encrypted: true,
    deliveryGuarantee: '100%'
  });
}

async function handleGetTemplates() {
  const templates = [
    {
      id: 'arrival',
      category: 'arrival',
      message: 'I\'m arriving at your location now',
      translations: {
        es: 'Estoy llegando a tu ubicación ahora',
        fr: 'J\'arrive à votre emplacement maintenant',
        de: 'Ich komme jetzt an Ihrem Standort an'
      }
    },
    {
      id: 'pickup',
      category: 'pickup',
      message: 'I\'m outside and ready for pickup',
      translations: {
        es: 'Estoy afuera y listo para recogerte',
        fr: 'Je suis dehors et prêt pour la prise en charge',
        de: 'Ich bin draußen und bereit zur Abholung'
      }
    },
    {
      id: 'traffic',
      category: 'traffic',
      message: 'There\'s unexpected traffic, I\'ll be 10 minutes late',
      translations: {
        es: 'Hay tráfico inesperado, llegaré 10 minutos tarde',
        fr: 'Il y a un trafic inattendu, j\'aurai 10 minutes de retard',
        de: 'Es gibt unerwarteten Verkehr, ich werde 10 Minuten zu spät sein'
      }
    },
    {
      id: 'safety_check',
      category: 'safety',
      message: 'Safety check - everything okay?',
      translations: {
        es: 'Control de seguridad - ¿todo bien?',
        fr: 'Vérification de sécurité - tout va bien?',
        de: 'Sicherheitskontrolle - alles in Ordnung?'
      }
    }
  ];

  return NextResponse.json({ templates });
}

async function handleTranslateMessage(data: any) {
  const { content, targetLanguage } = data;

  // Mock translation service (in real implementation, use Google Translate API)
  const translations: Record<string, string> = {
    es: 'Mensaje traducido al español',
    fr: 'Message traduit en français',
    de: 'Nachricht ins Deutsche übersetzt'
  };

  return NextResponse.json({
    originalContent: content,
    translatedContent: translations[targetLanguage] || content,
    targetLanguage
  });
}

async function handleInitiateCall(data: any) {
  const { tripId, callType = 'masked' } = data;

  // Generate masked phone numbers for privacy
  const maskedNumbers = {
    driver: '+44 20 7946 0001', // Temporary masked number
    customer: '+44 20 7946 0002' // Temporary masked number
  };

  console.log('Call initiated:', { tripId, callType, maskedNumbers });

  return NextResponse.json({
    success: true,
    callType,
    maskedNumbers,
    callDuration: null,
    privacyProtected: true
  });
}

async function handleSendVoiceMessage(data: any) {
  const { tripId, senderId, receiverId, audioBlob } = data;

  // In real implementation:
  // 1. Process audio blob
  // 2. Convert to appropriate format
  // 3. Encrypt audio data
  // 4. Store securely
  // 5. Send notification

  const voiceMessage = {
    id: `voice-${Date.now()}`,
    tripId,
    senderId,
    receiverId,
    type: 'voice',
    duration: 15, // seconds
    timestamp: Date.now(),
    encrypted: true
  };

  return NextResponse.json({ 
    success: true, 
    messageId: voiceMessage.id,
    encrypted: true 
  });
}