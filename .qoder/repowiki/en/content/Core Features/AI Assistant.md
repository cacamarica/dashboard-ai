# AI Assistant

<cite>
**Referenced Files in This Document**
- [AIAssistant.tsx](file://src/components/ai/AIAssistant.tsx)
- [PredictiveInsight.tsx](file://src/components/ai/PredictiveInsight.tsx)
- [aiService.ts](file://src/services/aiService.ts)
- [analyticsService.ts](file://src/services/analyticsService.ts)
- [n8nService.ts](file://src/services/n8nService.ts)
- [aiSlice.ts](file://src/store/slices/aiSlice.ts)
- [store.ts](file://src/store/store.ts)
- [inventoryApi.ts](file://src/store/api/inventoryApi.ts)
- [page.tsx](file://src/app/ai-assistant/page.tsx)
- [route.ts](file://src/app/api/inventory/reorder/route.ts)
- [route.ts](file://src/app/api/inventory/top-moving/route.ts)
- [site.config.ts](file://src/config/site.config.ts)
- [package.json](file://package.json)
</cite>

## Update Summary
**Changes Made**
- Updated AI Service Integration section to reflect Qwen API integration with enhanced capabilities
- Added comprehensive documentation for predictive insights generation, anomaly detection, and automated report summarization
- Enhanced AI model configuration details with Qwen-specific parameters
- Updated capability descriptions to include new AI-powered features
- Revised error handling and fallback mechanisms documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction
This document explains the AI-powered natural language query interface for inventory management, now enhanced with Qwen API integration. It covers the AIAssistant conversational interface, the PredictiveInsight component for automated insights, and the aiService integration with external AI models. The system now provides advanced capabilities including predictive analytics, anomaly detection, automated report summarization, and smart recommendations powered by the Qwen language model. Users can ask natural language questions about inventory data, receive contextual responses, and access sophisticated predictive analytics with enhanced accuracy and reliability.

## Project Structure
The AI Assistant feature is organized around four main areas with enhanced Qwen API integration:
- UI components for conversational input and predictive insights
- AI service layer with Qwen API integration for advanced natural language processing
- Data services that bridge inventory data from n8n webhooks and Next.js API routes
- Advanced analytics services for predictive insights and anomaly detection

```mermaid
graph TB
subgraph "UI Layer"
AA["AIAssistant.tsx"]
PI["PredictiveInsight.tsx"]
AAP["page.tsx (AI Assistant Page)"]
end
subgraph "State Management"
AS["aiSlice.ts"]
ST["store.ts"]
IA["inventoryApi.ts"]
end
subgraph "Enhanced AI Services"
AIS["aiService.ts (Qwen API)"]
ANS["analyticsService.ts"]
NS["n8nService.ts"]
end
subgraph "Backend APIs"
API_REORDER["/api/inventory/reorder/route.ts"]
API_TOPMOVING["/api/inventory/top-moving/route.ts"]
end
AAP --> AA
AAP --> PI
AA --> AS
PI --> ANS
AA --> AIS
PI --> ANS
ANS --> AIS
ANS --> NS
NS --> API_REORDER
NS --> API_TOPMOVING
ST --> AS
ST --> IA
```

**Diagram sources**
- [AIAssistant.tsx:1-120](file://src/components/ai/AIAssistant.tsx#L1-L120)
- [PredictiveInsight.tsx:1-152](file://src/components/ai/PredictiveInsight.tsx#L1-L152)
- [page.tsx:1-55](file://src/app/ai-assistant/page.tsx#L1-L55)
- [aiSlice.ts:1-56](file://src/store/slices/aiSlice.ts#L1-L56)
- [store.ts:1-27](file://src/store/store.ts#L1-L27)
- [inventoryApi.ts:1-57](file://src/store/api/inventoryApi.ts#L1-L57)
- [aiService.ts:1-219](file://src/services/aiService.ts#L1-L219)
- [analyticsService.ts:1-134](file://src/services/analyticsService.ts#L1-L134)
- [n8nService.ts:1-271](file://src/services/n8nService.ts#L1-L271)
- [route.ts:1-18](file://src/app/api/inventory/reorder/route.ts#L1-L18)
- [route.ts:1-25](file://src/app/api/inventory/top-moving/route.ts#L1-L25)

**Section sources**
- [page.tsx:10-55](file://src/app/ai-assistant/page.tsx#L10-L55)
- [store.ts:7-27](file://src/store/store.ts#L7-L27)
- [inventoryApi.ts:23-57](file://src/store/api/inventoryApi.ts#L23-L57)

## Core Components
- **AIAssistant**: Provides a natural language input field, sends queries to aiService with Qwen API integration, displays responses, and manages processing state via Redux.
- **PredictiveInsights**: Renders AI-powered demand forecasts and recommendations with enhanced risk assessment, fetching data from analyticsService with Qwen-powered insights.
- **aiService**: Integrates with Qwen API endpoint for advanced natural language processing, handles query processing, predictive insights generation, anomaly detection, and report summarization with robust error handling and fallbacks.
- **analyticsService**: Orchestrates inventory data retrieval from n8n webhooks, transforms raw data into Qwen-powered predictive insights, and provides enhanced anomaly detection and forecasting utilities.
- **n8nService**: Fetches inventory data from n8n webhooks with comprehensive endpoint support, implements polling for real-time updates, and serves as the single source of truth for inventory data.
- **Redux slice and store**: Manage AI state (history, processing flag) and integrate with RTK Query inventory endpoints for enhanced caching.

**Section sources**
- [AIAssistant.tsx:23-120](file://src/components/ai/AIAssistant.tsx#L23-L120)
- [PredictiveInsight.tsx:29-152](file://src/components/ai/PredictiveInsight.tsx#L29-L152)
- [aiService.ts:18-219](file://src/services/aiService.ts#L18-L219)
- [analyticsService.ts:13-134](file://src/services/analyticsService.ts#L13-L134)
- [n8nService.ts:16-271](file://src/services/n8nService.ts#L16-L271)
- [aiSlice.ts:17-56](file://src/store/slices/aiSlice.ts#L17-L56)
- [store.ts:7-27](file://src/store/store.ts#L7-L27)

## Architecture Overview
The AI Assistant architecture follows an enhanced layered design with Qwen API integration:
- **UI layer**: React components render the chat interface and predictive insights cards with enhanced visual feedback.
- **State layer**: Redux manages AI query history and processing state; RTK Query caches inventory data with optimized TTL settings.
- **Enhanced services layer**: aiService encapsulates Qwen API integration with advanced capabilities; analyticsService orchestrates data and AI insights with anomaly detection; n8nService bridges inventory data from webhooks with comprehensive endpoint support.
- **Backend APIs**: Next.js API routes proxy requests to n8n webhooks, returning inventory data to the frontend with enhanced error handling.

```mermaid
sequenceDiagram
participant User as "User"
participant UI as "AIAssistant.tsx"
participant Store as "Redux (aiSlice)"
participant AIS as "aiService.ts (Qwen API)"
participant Qwen as "Qwen API Endpoint"
participant Resp as "Response"
User->>UI : "Enter natural language query"
UI->>Store : "addQuery(query)"
UI->>Store : "setIsProcessing(true)"
UI->>AIS : "processQuery(query) with Qwen"
AIS->>Qwen : "POST /chat/completions"
Qwen-->>AIS : "AI response with enhanced capabilities"
AIS-->>UI : "AIQueryResponse with confidence scores"
UI->>Store : "setIsProcessing(false)"
UI-->>User : "Display formatted response with insights"
```

**Diagram sources**
- [AIAssistant.tsx:29-46](file://src/components/ai/AIAssistant.tsx#L29-L46)
- [aiSlice.ts:24-35](file://src/store/slices/aiSlice.ts#L24-L35)
- [aiService.ts:33-74](file://src/services/aiService.ts#L33-L74)

## Detailed Component Analysis

### AIAssistant Component
The AIAssistant component provides an enhanced conversational interface for natural language inventory queries with Qwen API integration:
- **Input controls**: Multiline text field with clear and send actions, Enter-to-submit behavior, and disabled states during processing.
- **Processing indicator**: Shows a spinner while the AI processes the query with Qwen model.
- **Response display**: Uses an alert box to present the AI's response with enhanced formatting.
- **State management**: Dispatches Redux actions to record queries and toggle processing state.
- **Error handling**: Catches errors from aiService and displays a friendly message with Qwen API fallback.

```mermaid
flowchart TD
Start(["User submits query"]) --> Validate["Validate input"]
Validate --> Valid{"Query empty?"}
Valid --> |Yes| End(["Exit"])
Valid --> |No| Dispatch["Dispatch addQuery + setIsProcessing(true)"]
Dispatch --> CallAI["Call aiService.processQuery(query) with Qwen"]
CallAI --> Success{"Success?"}
Success --> |Yes| SetResp["Set response text with confidence"]
Success --> |No| ShowErr["Show error message with Qwen fallback"]
SetResp --> Reset["Dispatch setIsProcessing(false)"]
ShowErr --> Reset
Reset --> End
```

**Diagram sources**
- [AIAssistant.tsx:29-46](file://src/components/ai/AIAssistant.tsx#L29-L46)
- [aiSlice.ts:24-35](file://src/store/slices/aiSlice.ts#L24-L35)

**Section sources**
- [AIAssistant.tsx:23-120](file://src/components/ai/AIAssistant.tsx#L23-L120)
- [aiSlice.ts:17-56](file://src/store/slices/aiSlice.ts#L17-L56)

### PredictiveInsight Component
The PredictiveInsight component renders machine learning-based demand forecasts and recommendations with enhanced risk assessment:
- **Data fetching**: Uses analyticsService to generate Qwen-powered predictions on mount.
- **Loading state**: Displays a spinner while data is being fetched with enhanced performance.
- **Enhanced risk visualization**: Maps confidence levels to risk categories with improved accuracy.
- **Formatting**: Presents material name, predicted demand, confidence, recommended action, and risk level in an enhanced list with better visual hierarchy.

```mermaid
flowchart TD
Mount(["Component mounts"]) --> Load["Load Qwen-powered predictions via analyticsService"]
Load --> Success{"Data loaded?"}
Success --> |Yes| Render["Render enhanced predictions list"]
Success --> |No| Error["Log error and continue with mock data"]
Render --> Risk["Map confidence -> enhanced risk level"]
Risk --> Icons["Assign icons and chips with improved UX"]
Icons --> Done(["Done"])
Error --> Done
```

**Diagram sources**
- [PredictiveInsight.tsx:33-46](file://src/components/ai/PredictiveInsight.tsx#L33-L46)
- [analyticsService.ts:17-41](file://src/services/analyticsService.ts#L17-L41)

**Section sources**
- [PredictiveInsight.tsx:29-152](file://src/components/ai/PredictiveInsight.tsx#L29-L152)
- [analyticsService.ts:13-134](file://src/services/analyticsService.ts#L13-L134)

### AI Service Integration
The aiService integrates with Qwen API for advanced natural language processing:
- **Configuration**: Reads Qwen endpoint, API key, and model name from environment variables with enhanced security.
- **Query processing**: Sends system prompts and user queries to Qwen model, returning structured responses with confidence scores.
- **Predictive insights**: Parses Qwen responses into structured insights with enhanced accuracy; falls back to deterministic logic if parsing fails.
- **Report summarization**: Generates concise executive summaries from inventory report data using Qwen's advanced reasoning capabilities.
- **Anomaly detection**: Identifies unusual consumption patterns from usage history using Qwen's pattern recognition.
- **Inventory question answering**: Augments queries with contextual inventory metadata using Qwen's understanding capabilities.
- **Enhanced error handling**: Comprehensive error handling with specific Qwen API error types and graceful degradation.

```mermaid
classDiagram
class AIService {
-string endpoint
-string apiKey
-string model
+constructor()
+processQuery(query, context) Promise~AIQueryResponse~
+generatePredictiveInsights(inventoryData) Promise~PredictiveInsight[]~
+generateReportSummary(reportData, period) Promise~string~
+detectAnomalies(usageHistory) Promise~any[]~
+answerInventoryQuestion(question, inventoryData) Promise~string~
-generateFallbackInsights(inventoryData) PredictiveInsight[]
-generateFallbackReportSummary(reportData, period) string
}
```

**Diagram sources**
- [aiService.ts:18-219](file://src/services/aiService.ts#L18-L219)

**Section sources**
- [aiService.ts:18-219](file://src/services/aiService.ts#L18-L219)

### Analytics Service Orchestration
The analyticsService coordinates data retrieval and Qwen-powered insights:
- **Predictions**: Fetches inventory items from n8n webhooks, generates AI insights using Qwen, and enriches with risk levels and randomized demand figures.
- **Enhanced fallback**: Returns mock predictions with improved realism if data is unavailable.
- **Anomaly detection**: Retrieves usage metrics and passes them to aiService for Qwen-powered anomaly identification.
- **Forecasting utilities**: Provides simple demand forecasting helpers with enhanced accuracy.
- **Qwen integration**: Leverages Qwen's advanced reasoning capabilities for complex inventory analysis.

```mermaid
sequenceDiagram
participant Comp as "PredictiveInsight.tsx"
participant ANS as "analyticsService.ts"
participant NS as "n8nService.ts"
participant AIS as "aiService.ts (Qwen)"
Comp->>ANS : "generatePredictions()"
ANS->>NS : "fetchInventoryData()"
NS-->>ANS : "inventoryItems[]"
ANS->>AIS : "generatePredictiveInsights(inventoryItems) with Qwen"
AIS-->>ANS : "Enhanced PredictiveInsight[] with confidence scores"
ANS-->>Comp : "Enhanced PredictionData[] (risk + demand)"
```

**Diagram sources**
- [analyticsService.ts:17-41](file://src/services/analyticsService.ts#L17-L41)
- [n8nService.ts:29-51](file://src/services/n8nService.ts#L29-L51)
- [aiService.ts:79-109](file://src/services/aiService.ts#L79-L109)

**Section sources**
- [analyticsService.ts:13-134](file://src/services/analyticsService.ts#L13-L134)
- [n8nService.ts:16-271](file://src/services/n8nService.ts#L16-L271)

### Data Sources and API Integration
- **n8nService**: Fetches inventory data from n8n webhooks with comprehensive endpoint support for top-moving materials, reorder alerts, usage metrics, and stock overview. Implements polling for real-time updates with enhanced reliability.
- **Next.js API routes**: Proxy requests to n8n webhooks and return inventory data to the frontend with enhanced error handling.
- **RTK Query**: Caches inventory endpoints for performance with optimized TTL settings for different data types.

```mermaid
graph LR
FE["Frontend Components"] --> IA["RTK Query inventoryApi.ts"]
IA --> API["Next.js API Routes"]
API --> NS["n8nService.ts"]
NS --> WH["n8n Webhooks"]
```

**Diagram sources**
- [inventoryApi.ts:23-57](file://src/store/api/inventoryApi.ts#L23-L57)
- [route.ts:1-18](file://src/app/api/inventory/reorder/route.ts#L1-L18)
- [route.ts:1-25](file://src/app/api/inventory/top-moving/route.ts#L1-L25)
- [n8nService.ts:29-51](file://src/services/n8nService.ts#L29-L51)

**Section sources**
- [n8nService.ts:16-271](file://src/services/n8nService.ts#L16-L271)
- [inventoryApi.ts:23-57](file://src/store/api/inventoryApi.ts#L23-L57)
- [route.ts:1-18](file://src/app/api/inventory/reorder/route.ts#L1-L18)
- [route.ts:1-25](file://src/app/api/inventory/top-moving/route.ts#L1-L25)

## Dependency Analysis
- **UI depends** on Redux for state and on aiService for Qwen-powered AI responses.
- **PredictiveInsight depends** on analyticsService for enhanced insights and on n8nService for inventory data.
- **aiService depends** on environment variables for Qwen model configuration and on axios for HTTP calls.
- **analyticsService depends** on aiService for Qwen insights and on n8nService for inventory data.
- **n8nService depends** on axios and environment variables for webhook access with enhanced error handling.
- **Store integrates** Redux slices and RTK Query inventory endpoints with optimized caching.

```mermaid
graph TD
AA["AIAssistant.tsx"] --> AS["aiSlice.ts"]
AA --> AIS["aiService.ts (Qwen)"]
PI["PredictiveInsights.tsx"] --> ANS["analyticsService.ts"]
ANS --> AIS
ANS --> NS["n8nService.ts"]
ST["store.ts"] --> AS
ST --> IA["inventoryApi.ts"]
```

**Diagram sources**
- [AIAssistant.tsx:17-19](file://src/components/ai/AIAssistant.tsx#L17-L19)
- [aiSlice.ts:17-56](file://src/store/slices/aiSlice.ts#L17-L56)
- [aiService.ts:18-219](file://src/services/aiService.ts#L18-L219)
- [PredictiveInsight.tsx:3-4](file://src/components/ai/PredictiveInsight.tsx#L3-L4)
- [analyticsService.ts:1-2](file://src/services/analyticsService.ts#L1-L2)
- [n8nService.ts:1-1](file://src/services/n8nService.ts#L1-L1)
- [store.ts:7-16](file://src/store/store.ts#L7-L16)
- [inventoryApi.ts:1-1](file://src/store/api/inventoryApi.ts#L1-L1)

**Section sources**
- [store.ts:7-27](file://src/store/store.ts#L7-L27)
- [aiSlice.ts:17-56](file://src/store/slices/aiSlice.ts#L17-L56)
- [aiService.ts:18-219](file://src/services/aiService.ts#L18-L219)
- [analyticsService.ts:13-134](file://src/services/analyticsService.ts#L13-L134)
- [n8nService.ts:16-271](file://src/services/n8nService.ts#L16-L271)

## Performance Considerations
- **Caching**: RTK Query caches inventory endpoints with optimized TTL settings (300s for most endpoints, 180s for reorder alerts) to reduce network calls.
- **Polling**: n8nService polls inventory data at 30-second intervals to keep the UI updated with minimal server load.
- **Request timeouts**: n8nService sets a 10-second timeout for webhook requests with enhanced error handling.
- **Qwen optimization**: aiService sets conservative max tokens (500) and moderate temperature (0.7) for balanced creativity and determinism with Qwen model.
- **Confidence scoring**: PredictiveInsights maps confidence to risk levels with enhanced granularity; consider adding dynamic confidence thresholds for stricter filtering.
- **Enhanced error handling**: Qwen API integration includes comprehensive error handling with specific timeout and parsing error types.

## Troubleshooting Guide
Common issues and resolutions with Qwen API integration:
- **AI query failures**: aiService throws a standardized error with Qwen-specific error types; AIAssistant displays a friendly message and resets processing state.
- **Predictive insights parsing errors**: aiService falls back to deterministic logic based on reorder points with enhanced fallback mechanisms.
- **Webhook timeouts**: n8nService throws a timeout error with detailed logging; analyticsService returns mock predictions with improved fallback.
- **Empty inventory data**: analyticsService returns mock predictions with enhanced realism; PredictiveInsights still renders a loading state until data arrives.
- **Qwen API connectivity**: Enhanced error handling for network issues, authentication failures, and service unavailability with graceful degradation.
- **Confidence score issues**: Qwen API may return unexpected confidence values; aiService includes validation and fallback mechanisms.

**Section sources**
- [AIAssistant.tsx:40-45](file://src/components/ai/AIAssistant.tsx#L40-L45)
- [aiService.ts:70-74](file://src/services/aiService.ts#L70-L74)
- [aiService.ts:101-104](file://src/services/aiService.ts#L101-L104)
- [n8nService.ts:43-50](file://src/services/n8nService.ts#L43-L50)
- [analyticsService.ts:22-24](file://src/services/analyticsService.ts#L22-L24)
- [PredictiveInsight.tsx:59-69](file://src/components/ai/PredictiveInsight.tsx#L59-L69)

## Conclusion
The AI Assistant provides a robust, user-friendly natural language interface for inventory queries and predictive insights, now powered by Qwen API integration. It integrates advanced AI models for contextual responses, uses deterministic fallbacks for reliability, and pulls real-time inventory data from n8n webhooks. The enhanced system offers predictive analytics, anomaly detection, automated report summarization, and smart recommendations with improved accuracy and performance. The modular design ensures maintainability, while Redux and RTK Query provide efficient state and caching. Users can ask questions about inventory, receive actionable insights, and benefit from sophisticated automated forecasting and pattern recognition capabilities.

## Appendices

### AI Model Configuration
- **Endpoint**: Read from environment variable for Qwen model endpoint with enhanced security.
- **API key**: Authorization header for Qwen model endpoint with proper token management.
- **Model name**: Defaults to 'qwen3.5-122b-a10b' for optimal performance and accuracy.
- **Temperature**: Set to 0.7 for balanced creativity and determinism with Qwen.
- **Max tokens**: Limited to 500 for responsive and concise Qwen responses.

**Section sources**
- [aiService.ts:23-27](file://src/services/aiService.ts#L23-L27)
- [aiService.ts:51-53](file://src/services/aiService.ts#L51-L53)

### Environment Variables
- **AI_MODEL_ENDPOINT**: Qwen model endpoint URL with enhanced security.
- **AI_API_KEY**: API key for Qwen model endpoint with proper access control.
- **AI_MODEL_NAME**: Qwen model identifier ('qwen3.5-122b-a10b') for optimal performance.
- **N8N_WEBHOOK_URL**: n8n webhook URL for inventory data with enhanced reliability.
- **N8N_API_KEY**: API key for n8n webhook access with secure credential management.

**Section sources**
- [aiService.ts:24-26](file://src/services/aiService.ts#L24-L26)
- [site.config.ts:28-32](file://src/config/site.config.ts#L28-L32)

### Practical Examples of Common AI Queries
- **Inventory overview**: "Show me top 10 fast-moving raw materials with confidence scores"
- **Reorder assistance**: "What materials need reordering and why?"
- **Contextual analysis**: "Which materials are approaching their reorder points with risk assessment?"
- **Predictive insights**: "Forecast demand for the next quarter with confidence intervals"
- **Anomaly detection**: "Identify unusual consumption patterns in the last month"

These queries leverage Qwen's advanced reasoning capabilities for contextual responses with enhanced accuracy and confidence scoring.

**Section sources**
- [AIAssistant.tsx:75-76](file://src/components/ai/AIAssistant.tsx#L75-L76)
- [aiService.ts:205-215](file://src/services/aiService.ts#L205-L215)

### Conversation Patterns and Insight Generation
- **Pattern**: User submits a natural language query with Qwen context; AIAssistant records the query; aiService processes the query with Qwen API and returns a response with confidence scores; response is displayed to the user with enhanced formatting.
- **Enhanced insight generation**: PredictiveInsights fetch inventory data via analyticsService, which calls aiService to generate Qwen-powered structured insights with confidence levels; risks and recommendations are derived from enhanced confidence scoring and pattern recognition.

**Section sources**
- [AIAssistant.tsx:29-46](file://src/components/ai/AIAssistant.tsx#L29-L46)
- [analyticsService.ts:17-41](file://src/services/analyticsService.ts#L17-L41)
- [aiService.ts:79-109](file://src/services/aiService.ts#L79-L109)

### Response Quality Considerations and Limitations
- **Temperature and token limits**: aiService uses moderate temperature (0.7) and constrained tokens (500) to balance helpfulness and brevity with Qwen model.
- **Structured parsing**: Predictive insights are parsed from Qwen responses with enhanced validation; fallback logic ensures resilience when parsing fails.
- **Deterministic fallbacks**: When Qwen responses are invalid or unavailable, deterministic logic (e.g., reorder-point-based predictions) is used with enhanced accuracy.
- **Confidence scoring**: Qwen provides confidence scores for predictions; aiService validates and normalizes confidence values for consistent risk assessment.
- **Limitations**: Qwen API may have rate limits, token constraints, and occasional service availability issues requiring enhanced error handling.

**Section sources**
- [aiService.ts:51-53](file://src/services/aiService.ts#L51-L53)
- [aiService.ts:95-104](file://src/services/aiService.ts#L95-L104)
- [aiService.ts:114-124](file://src/services/aiService.ts#L114-L124)

### Error Handling and Fallback Mechanisms
- **AI query errors**: aiService throws a standardized error with Qwen-specific error types; AIAssistant displays a friendly message and resets processing state.
- **Parsing failures**: aiService attempts to parse Qwen responses with enhanced validation; on failure, it falls back to deterministic insights with improved accuracy.
- **Webhook failures**: n8nService throws descriptive errors with detailed logging; analyticsService returns mock predictions with enhanced fallback mechanisms.
- **Empty data**: analyticsService returns mock predictions with improved realism; PredictiveInsights renders a loading state with enhanced user experience.
- **Qwen API connectivity**: Comprehensive error handling for network issues, authentication failures, and service unavailability with graceful degradation strategies.

**Section sources**
- [AIAssistant.tsx:40-45](file://src/components/ai/AIAssistant.tsx#L40-L45)
- [aiService.ts:70-74](file://src/services/aiService.ts#L70-L74)
- [aiService.ts:101-104](file://src/services/aiService.ts#L101-L104)
- [n8nService.ts:43-50](file://src/services/n8nService.ts#L43-L50)
- [analyticsService.ts:22-24](file://src/services/analyticsService.ts#L22-L24)
- [PredictiveInsight.tsx:59-69](file://src/components/ai/PredictiveInsight.tsx#L59-L69)