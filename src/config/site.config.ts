export const siteConfig = {
  name: 'Pupuk Sriwijaya - Inventory Dashboard',
  description: 'AI-powered inventory management dashboard for warehouse and production operations',
  version: '1.0.0',
  
  navigation: [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Raw Materials', path: '/raw-materials' },
    { title: 'Reorder Alerts', path: '/reorder-alerts' },
    { title: 'Reports', path: '/reports' },
    { title: 'AI Assistant', path: '/ai-assistant' },
  ],

  features: {
    aiPowered: true,
    realTimeUpdates: true,
    predictiveAnalytics: true,
    automatedReports: true,
    mobileResponsive: true,
  },

  cache: {
    defaultTTL: 300, // 5 minutes
    reorderAlertsTTL: 180, // 3 minutes
    usageMetricsTTL: 300, // 5 minutes
  },

  n8n: {
    webhookUrl: process.env.N8N_WEBHOOK_URL || '',
    apiKey: process.env.N8N_API_KEY || '',
    pollingInterval: 30000, // 30 seconds
  },
};
