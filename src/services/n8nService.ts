import axios from 'axios';

/**
 * N8N Service - Inventory Data from Webhook
 * 
 * This service fetches inventory data FROM n8n webhooks.
 * The data originates from external systems (ERP, databases, etc.) that n8n connects to.
 * 
 * Supabase is used for:
 * - User authentication and credentials
 * - Caching dashboard preferences
 * - Storing user-specific settings
 * 
 * Supabase is NOT the source of truth for inventory data.
 */
class N8NService {
  private webhookUrl: string;
  private apiKey: string;

  constructor() {
    this.webhookUrl = process.env.N8N_WEBHOOK_URL || '';
    this.apiKey = process.env.N8N_API_KEY || '';
  }

  /**
   * Fetch inventory data directly from n8n webhook
   * @param endpoint - Optional specific endpoint (e.g., 'top-moving', 'reorder-alerts')
   */
  async fetchInventoryData(endpoint?: string) {
    try {
      const url = endpoint ? `${this.webhookUrl}/${endpoint}` : this.webhookUrl;
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('n8n webhook error:', error.message);
        if (error.code === 'ECONNABORTED') {
          throw new Error('Webhook request timed out');
        }
        if (error.response?.status === 404) {
          console.warn('n8n webhook endpoint not found, returning mock data');
          return this.getMockData(endpoint);
        }
      }
      console.warn('Falling back to mock data due to webhook error');
      return this.getMockData(endpoint);
    }
  }

  /**
   * Get mock data as fallback when webhook is unavailable
   */
  private getMockData(endpoint?: string) {
    interface StockOverview {
      totalMaterials: number;
      lowStockItems: number;
      pendingOrders: number;
      turnoverRate: number;
    }

    interface MockDataItem {
      id?: string;
      material_id?: string;
      material_name?: string;
      name?: string;
      code?: string;
      category?: string;
      total_usage?: number;
      usageVelocity?: number;
      velocity?: number;
      trend?: 'up' | 'down' | 'stable';
      unit?: string;
      current_stock?: number;
      reorder_point?: number;
      urgency?: 'critical' | 'warning' | 'info';
      suggested_quantity?: number;
      day?: string;
      week?: string;
      consumption?: number;
      forecast?: number;
    }

    const mockData: Record<string, MockDataItem[] | { week: MockDataItem[] } | { month: MockDataItem[] } | StockOverview> = {
      'top-moving': [
        { 
          id: '1',
          material_id: 'MAT001', 
          name: 'Urea', 
          code: 'URE-001',
          category: 'Nitrogen',
          usageVelocity: 173,
          velocity: 173,
          trend: 'up' as const,
          unit: 'kg' 
        },
        { 
          id: '2',
          material_id: 'MAT002', 
          name: 'Ammonia', 
          code: 'AMM-002',
          category: 'Nitrogen',
          usageVelocity: 160,
          velocity: 160,
          trend: 'up' as const,
          unit: 'kg' 
        },
        { 
          id: '3',
          material_id: 'MAT003', 
          name: 'Phosphate', 
          code: 'PHO-003',
          category: 'Phosphorus',
          usageVelocity: 130,
          velocity: 130,
          trend: 'stable' as const,
          unit: 'kg' 
        },
        { 
          id: '4',
          material_id: 'MAT004', 
          name: 'Potassium Chloride', 
          code: 'POT-004',
          category: 'Potassium',
          usageVelocity: 117,
          velocity: 117,
          trend: 'down' as const,
          unit: 'kg' 
        },
        { 
          id: '5',
          material_id: 'MAT005', 
          name: 'Sulfur', 
          code: 'SUL-005',
          category: 'Sulfur',
          usageVelocity: 93,
          velocity: 93,
          trend: 'up' as const,
          unit: 'kg' 
        },
      ],
      'reorder-alerts': [
        { 
          id: '1', 
          name: 'Nitrogen Powder', 
          code: 'NIT-001', 
          current_stock: 450, 
          reorder_point: 1000, 
          unit: 'kg',
          urgency: 'critical' as const,
          suggested_quantity: 600
        },
        { 
          id: '2', 
          name: 'Phosphoric Acid', 
          code: 'PHO-002', 
          current_stock: 280, 
          reorder_point: 500, 
          unit: 'L',
          urgency: 'warning' as const,
          suggested_quantity: 250
        },
        { 
          id: '3', 
          name: 'Potassium Sulfate', 
          code: 'POT-003', 
          current_stock: 1200, 
          reorder_point: 1500, 
          unit: 'kg',
          urgency: 'info' as const,
          suggested_quantity: 350
        },
      ],
      'stock-overview': {
        totalMaterials: 156,
        lowStockItems: 12,
        pendingOrders: 8,
        turnoverRate: 87.5,
      },
      'usage-metrics': {
        week: [
          { day: 'Mon', consumption: 1250, forecast: 1200 },
          { day: 'Tue', consumption: 1480, forecast: 1450 },
          { day: 'Wed', consumption: 1320, forecast: 1380 },
          { day: 'Thu', consumption: 1590, forecast: 1520 },
          { day: 'Fri', consumption: 1420, forecast: 1480 },
          { day: 'Sat', consumption: 980, forecast: 1050 },
          { day: 'Sun', consumption: 750, forecast: 800 },
        ],
        month: [
          { week: 'Week 1', consumption: 8500, forecast: 8200 },
          { week: 'Week 2', consumption: 9200, forecast: 9000 },
          { week: 'Week 3', consumption: 8800, forecast: 9100 },
          { week: 'Week 4', consumption: 9500, forecast: 9300 },
        ],
      },
    };

    if (!endpoint) {
      return mockData['top-moving'];
    }

    // Extract base endpoint name
    const baseEndpoint = endpoint.split('?')[0];
    return mockData[baseEndpoint] || mockData['top-moving'];
  }

  /**
   * Get top moving materials from n8n
   */
  async fetchTopMovingMaterials(limit: number = 10) {
    return this.fetchInventoryData(`top-moving?limit=${limit}`);
  }

  /**
   * Get reorder alerts from n8n
   */
  async fetchReorderAlerts() {
    return this.fetchInventoryData('reorder-alerts');
  }

  /**
   * Get usage metrics from n8n
   */
  async fetchUsageMetrics(period: string = 'week') {
    return this.fetchInventoryData(`usage-metrics?period=${period}`);
  }

  /**
   * Get stock overview from n8n
   */
  async fetchStockOverview() {
    return this.fetchInventoryData('stock-overview');
  }

  /**
   * Subscribe to real-time updates via polling
   * n8n webhook is the single source of truth
   */
  subscribeToUpdates(callback: (data: unknown) => void) {
    const pollInterval = 30000; // 30 seconds
    
    const poll = async () => {
      try {
        const data = await this.fetchInventoryData();
        callback(data);
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Initial fetch
    poll();

    // Set up polling interval
    const intervalId = setInterval(poll, pollInterval);

    // Return cleanup function
    return () => clearInterval(intervalId);
  }
}

export const n8nService = new N8NService();
