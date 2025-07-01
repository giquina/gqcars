// GQ Cars Service Worker - PWA Functionality
const CACHE_NAME = 'gqcars-v1.0.0'
const STATIC_CACHE_NAME = 'gqcars-static-v1.0.0'
const DYNAMIC_CACHE_NAME = 'gqcars-dynamic-v1.0.0'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/services',
  '/about',
  '/contact',
  '/book',
  '/offline',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  '/apple-touch-icon.png',
  '/favicon.ico'
]

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/booking',
  '/api/quote',
  '/api/security-assessment',
  '/api/contact'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🚀 GQ Cars Service Worker Installing...')
  
  event.waitUntil(
    Promise.all([
      // Cache static files
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('📦 Caching static files')
        return cache.addAll(STATIC_FILES.map(url => new Request(url, { 
          credentials: 'same-origin' 
        })))
      }),
      
      // Prefetch critical resources
      self.skipWaiting()
    ])
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ GQ Cars Service Worker Activated')
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName.startsWith('gqcars-') && 
              ![STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME].includes(cacheName)
            )
            .map(cacheName => {
              console.log('🗑️ Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      }),
      
      // Take control of all pages
      self.clients.claim()
    ])
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) return
  
  // Handle different types of requests
  if (request.method === 'GET') {
    event.respondWith(handleGetRequest(request))
  } else if (request.method === 'POST') {
    event.respondWith(handlePostRequest(request))
  }
})

// Handle GET requests with caching strategy
async function handleGetRequest(request) {
  const url = new URL(request.url)
  
  try {
    // Static files - Cache first, network fallback
    if (STATIC_FILES.some(file => url.pathname === file) || 
        url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$/)) {
      return await cacheFirst(request, STATIC_CACHE_NAME)
    }
    
    // API requests - Network first, cache fallback
    if (url.pathname.startsWith('/api/') || 
        API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint))) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME)
    }
    
    // Pages - Network first, cache fallback
    if (request.headers.get('Accept')?.includes('text/html')) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME)
    }
    
    // Default - Network first
    return await networkFirst(request, DYNAMIC_CACHE_NAME)
    
  } catch (error) {
    console.error('❌ Fetch error:', error)
    
    // Return offline page for navigation requests
    if (request.headers.get('Accept')?.includes('text/html')) {
      const cache = await caches.open(STATIC_CACHE_NAME)
      return await cache.match('/offline') || new Response('Offline', { status: 503 })
    }
    
    return new Response('Network Error', { status: 503 })
  }
}

// Handle POST requests
async function handlePostRequest(request) {
  try {
    // Clone request for potential retry
    const requestClone = request.clone()
    
    // Try network first
    const response = await fetch(request)
    
    // If successful, return response
    if (response.ok) {
      return response
    }
    
    // If failed, queue for background sync
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      await queueRequest(requestClone)
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Request queued for when online',
        queued: true 
      }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    return response
    
  } catch (error) {
    console.error('❌ POST request failed:', error)
    
    // Queue request for background sync
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      await queueRequest(request.clone())
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Request queued for when online',
        queued: true 
      }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Network unavailable' 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Cache first strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  
  if (cachedResponse) {
    // Return cached version and update in background
    updateCache(request, cacheName)
    return cachedResponse
  }
  
  // Not in cache, fetch from network
  const networkResponse = await fetch(request)
  
  if (networkResponse.ok) {
    await cache.put(request, networkResponse.clone())
  }
  
  return networkResponse
}

// Network first strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful responses
      await cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
    
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

// Update cache in background
async function updateCache(request, cacheName) {
  try {
    const cache = await caches.open(cacheName)
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      await cache.put(request, networkResponse)
    }
  } catch (error) {
    console.log('Background cache update failed:', error)
  }
}

// Queue requests for background sync
async function queueRequest(request) {
  const queue = await getQueue()
  const requestData = {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: request.method !== 'GET' ? await request.text() : null,
    timestamp: Date.now()
  }
  
  queue.push(requestData)
  await setQueue(queue)
}

// Get request queue
async function getQueue() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const response = await cache.match('__queue__')
    
    if (response) {
      return await response.json()
    }
  } catch (error) {
    console.log('Queue read error:', error)
  }
  
  return []
}

// Save request queue
async function setQueue(queue) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    await cache.put('__queue__', new Response(JSON.stringify(queue), {
      headers: { 'Content-Type': 'application/json' }
    }))
  } catch (error) {
    console.log('Queue save error:', error)
  }
}

// Background sync event
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(processQueue())
  }
})

// Process queued requests
async function processQueue() {
  const queue = await getQueue()
  
  if (queue.length === 0) return
  
  console.log(`🔄 Processing ${queue.length} queued requests`)
  
  const processedRequests = []
  
  for (const requestData of queue) {
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        body: requestData.body
      })
      
      if (response.ok) {
        console.log('✅ Queued request processed:', requestData.url)
        processedRequests.push(requestData)
      }
    } catch (error) {
      console.log('❌ Queued request failed:', requestData.url, error)
    }
  }
  
  // Remove processed requests from queue
  const remainingQueue = queue.filter(req => !processedRequests.includes(req))
  await setQueue(remainingQueue)
  
  console.log(`✅ Processed ${processedRequests.length} requests, ${remainingQueue.length} remaining`)
}

// Push notification event
self.addEventListener('push', (event) => {
  console.log('📱 Push notification received')
  
  let notificationData = {
    title: 'GQ Cars',
    body: 'New update available',
    icon: '/icon-192.svg',
    badge: '/icon-192.svg',
    tag: 'gqcars-notification',
    requireInteraction: false,
    actions: [
      { action: 'view', title: 'View', icon: '/icon-192.svg' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  }
  
  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = { ...notificationData, ...data }
    } catch (error) {
      console.log('Push data parse error:', error)
      notificationData.body = event.data.text()
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('📱 Notification clicked:', event.action)
  
  event.notification.close()
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message event - communicate with main thread
self.addEventListener('message', (event) => {
  console.log('📨 Message received:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
})

console.log('🔧 GQ Cars Service Worker Loaded - Version:', CACHE_NAME)