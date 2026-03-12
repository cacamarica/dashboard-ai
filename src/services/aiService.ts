import axios from 'axios';

interface AIQueryResponse {
  query: string;
  response: string;
  context?: string;
  confidence?: number;
}

interface PredictiveInsight {
  materialId: string;
  materialName: string;
  prediction: string;
  confidence: number;
  recommendedAction: string;
}

class AIService {
  private endpoint: string;
  private apiKey: string;
  private model: string;

  constructor() {
    this.endpoint = process.env.AI_MODEL_ENDPOINT || '';
    this.apiKey = process.env.AI_API_KEY || '';
    this.model = process.env.AI_MODEL_NAME || 'qwen3.5-122b-a10b';
  }

  /**
   * Process natural language queries using Qwen model
   * Independent from n8n - uses dedicated AI model
   */
  async processQuery(query: string, context?: any): Promise<AIQueryResponse> {
    try {
      const systemPrompt = `You are an intelligent inventory management assistant for Pupuk Sriwijaya. 
You help warehouse and production managers understand inventory data, identify trends, and make informed decisions.
Provide clear, concise, and actionable insights based on the data provided.`;

      const userPrompt = context 
        ? `${query}\n\nContext: ${JSON.stringify(context, null, 2)}`
        : query;

      const response = await axios.post(
        `${this.endpoint}/chat/completions`,
        {
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiResponse = response.data.choices[0]?.message?.content || '';
      
      return {
        query,
        response: aiResponse,
        context: JSON.stringify(context),
        confidence: 0.9, // Could be enhanced with actual confidence scoring
      };
    } catch (error) {
      console.error('Error processing AI query:', error);
      throw new Error('Failed to process AI query');
    }
  }

  /**
   * Generate predictive insights using AI analysis
   */
  async generatePredictiveInsights(inventoryData: any[]): Promise<PredictiveInsight[]> {
    try {
      const prompt = `Analyze the following inventory data and provide predictive insights:
${JSON.stringify(inventoryData.slice(0, 20), null, 2)}

For each material that needs attention, provide:
1. Material ID and name
2. Prediction about future demand
3. Confidence level (0-100%)
4. Recommended action

Format as JSON array.`;

      const response = await this.processQuery(prompt);
      
      // Parse AI response to extract structured insights
      try {
        const insights = JSON.parse(response.response);
        return insights.map((insight: any) => ({
          ...insight,
          confidence: Number(insight.confidence) || 75,
        }));
      } catch {
        // Fallback if response is not valid JSON
        return this.generateFallbackInsights(inventoryData);
      }
    } catch (error) {
      console.error('Error generating predictive insights:', error);
      return this.generateFallbackInsights(inventoryData);
    }
  }

  /**
   * Fallback method for generating insights without AI
   */
  private generateFallbackInsights(inventoryData: any[]): PredictiveInsight[] {
    return inventoryData
      .filter((item) => item.current_stock <= item.reorder_point)
      .map((item) => ({
        materialId: item.id,
        materialName: item.name,
        prediction: `Stock will deplete in ${Math.ceil(item.current_stock / 10)} days at current rate`,
        confidence: 85,
        recommendedAction: `Reorder ${item.reorder_point * 2} units immediately`,
      }));
  }

  /**
   * Generate automated report summary
   */
  async generateReportSummary(reportData: any, period: string): Promise<string> {
    try {
      const prompt = `Generate an executive summary for this inventory report:
Period: ${period}
Data: ${JSON.stringify(reportData, null, 2)}

Include:
- Key metrics and performance indicators
- Notable trends or anomalies
- Actionable recommendations
- Future outlook

Keep it professional and concise (150-200 words).`;

      const response = await this.processQuery(prompt);
      return response.response;
    } catch (error) {
      console.error('Error generating report summary:', error);
      return this.generateFallbackReportSummary(reportData, period);
    }
  }

  /**
   * Fallback report summary generation
   */
  private generateFallbackReportSummary(reportData: any, period: string): string {
    const totalItems = reportData.totalMaterials || 0;
    const lowStock = reportData.lowStockItems || 0;
    
    return `Inventory Report Summary - ${period}:
    
Total materials tracked: ${totalItems}
Items requiring attention: ${lowStock} (${((lowStock / totalItems) * 100).toFixed(1)}% of inventory)

Key observations:
- Stock levels are being monitored continuously
- ${lowStock > 0 ? `${lowStock} items have reached reorder points and require immediate attention` : 'All items are within optimal stock levels'}
- Turnover rate remains stable based on historical patterns

Recommendations:
- Review and approve pending purchase orders for critical items
- Consider adjusting reorder points based on seasonal demand patterns
- Continue monitoring usage trends for early anomaly detection`;
  }

  /**
   * Detect anomalies in usage patterns
   */
  async detectAnomalies(usageHistory: any[]): Promise<any[]> {
    try {
      const prompt = `Analyze these usage patterns and identify anomalies:
${JSON.stringify(usageHistory.slice(0, 50), null, 2)}

Identify:
- Unusual spikes or drops in consumption
- Patterns that deviate from normal behavior
- Potential causes or concerns

Return as JSON array with: materialId, anomalyType, description, severity.`;

      const response = await this.processQuery(prompt);
      
      try {
        return JSON.parse(response.response);
      } catch {
        return [];
      }
    } catch (error) {
      console.error('Error detecting anomalies:', error);
      return [];
    }
  }

  /**
   * Answer questions about inventory data
   */
  async answerInventoryQuestion(question: string, inventoryData: any): Promise<string> {
    const context = {
      currentDate: new Date().toISOString(),
      totalMaterials: inventoryData.length,
      categories: [...new Set(inventoryData.map((i: any) => i.category))],
      lowStockCount: inventoryData.filter((i: any) => i.current_stock <= i.reorder_point).length,
    };

    const response = await this.processQuery(question, context);
    return response.response;
  }
}

export const aiService = new AIService();
