# Utilities and Helpers

<cite>
**Referenced Files in This Document**
- [useRedux.ts](file://src/hooks/useRedux.ts)
- [useResponsive.ts](file://src/hooks/useResponsive.ts)
- [formatters.ts](file://src/utils/formatters.ts)
- [store.ts](file://src/store/store.ts)
- [uiSlice.ts](file://src/store/slices/uiSlice.ts)
- [aiSlice.ts](file://src/store/slices/aiSlice.ts)
- [Navbar.tsx](file://src/components/ui/Navbar.tsx)
- [Sidebar.tsx](file://src/components/ui/Sidebar.tsx)
- [AIAssistant.tsx](file://src/components/ai/AIAssistant.tsx)
</cite>

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
This document focuses on the utility functions and helper hooks that support the dashboard-ai project’s UI and data presentation needs. It covers:
- Custom React hooks for Redux integration and responsive design
- A centralized formatter library for numbers, currency, dates, percentages, quantities, and analytics helpers
- Practical usage examples, parameter specifications, return value documentation, and extension guidelines
- Best practices for utility design, performance, and testing strategies

## Project Structure
The utilities and helpers are organized under dedicated folders:
- Hooks: src/hooks/useRedux.ts, src/hooks/useResponsive.ts
- Formatters: src/utils/formatters.ts
- Store configuration and slices: src/store/store.ts, src/store/slices/*.ts
- Example components using these utilities: src/components/ui/Navbar.tsx, src/components/ui/Sidebar.tsx, src/components/ai/AIAssistant.tsx

```mermaid
graph TB
subgraph "Hooks"
UR["useRedux.ts"]
URP["useResponsive.ts"]
end
subgraph "Utils"
FM["formatters.ts"]
end
subgraph "Store"
ST["store.ts"]
UIS["uiSlice.ts"]
AIS["aiSlice.ts"]
end
subgraph "Components"
NAV["Navbar.tsx"]
SIDEBAR["Sidebar.tsx"]
AI["AIAssistant.tsx"]
end
UR --> ST
URP --> NAV
URP --> SIDEBAR
FM --> NAV
FM --> SIDEBAR
FM --> AI
NAV --> ST
SIDEBAR --> ST
AI --> ST
```

**Diagram sources**
- [useRedux.ts:1-6](file://src/hooks/useRedux.ts#L1-L6)
- [useResponsive.ts:1-67](file://src/hooks/useResponsive.ts#L1-L67)
- [formatters.ts:1-89](file://src/utils/formatters.ts#L1-L89)
- [store.ts:1-27](file://src/store/store.ts#L1-L27)
- [uiSlice.ts:1-42](file://src/store/slices/uiSlice.ts#L1-L42)
- [aiSlice.ts:1-56](file://src/store/slices/aiSlice.ts#L1-L56)
- [Navbar.tsx:1-61](file://src/components/ui/Navbar.tsx#L1-L61)
- [Sidebar.tsx:1-133](file://src/components/ui/Sidebar.tsx#L1-L133)
- [AIAssistant.tsx:1-120](file://src/components/ai/AIAssistant.tsx#L1-L120)

**Section sources**
- [useRedux.ts:1-6](file://src/hooks/useRedux.ts#L1-L6)
- [useResponsive.ts:1-67](file://src/hooks/useResponsive.ts#L1-L67)
- [formatters.ts:1-89](file://src/utils/formatters.ts#L1-L89)
- [store.ts:1-27](file://src/store/store.ts#L1-L27)

## Core Components
This section documents the custom hooks and formatter utilities, including their purpose, parameters, return values, and usage patterns.

### useRedux: Simplified Redux Integration
Purpose:
- Provide strongly typed dispatch and selector hooks to reduce boilerplate and improve type safety across components.

Key exports:
- useAppDispatch: Returns a typed dispatch function bound to the store’s AppDispatch type.
- useAppSelector: Returns a typed useSelector hook bound to RootState.

Usage pattern:
- Import useAppDispatch in components that need to dispatch actions.
- Import useAppSelector to select parts of the Redux state with full TypeScript support.

Return values:
- useAppDispatch returns a function compatible with AppDispatch.
- useAppSelector returns the selected state slice with proper typing.

Integration examples:
- Navbar dispatches a UI action to toggle the sidebar.
- Sidebar dispatches navigation-related actions and reads UI state.
- AIAssistant dispatches AI-related actions and reads AI state.

**Section sources**
- [useRedux.ts:1-6](file://src/hooks/useRedux.ts#L1-L6)
- [store.ts:18-27](file://src/store/store.ts#L18-L27)
- [Navbar.tsx:3-21](file://src/components/ui/Navbar.tsx#L3-L21)
- [Sidebar.tsx:3-38](file://src/components/ui/Sidebar.tsx#L3-L38)
- [AIAssistant.tsx:17-27](file://src/components/ai/AIAssistant.tsx#L17-L27)

### useResponsive: Responsive Design Breakpoints
Purpose:
- Provide a convenient way to detect current breakpoint and device category in Material UI-based layouts.

Exports:
- useResponsive(): Returns an object with:
  - Breakpoint flags: xs, sm, md, lg, xl
  - Device categories: isMobile, isTablet, isDesktop
  - currentBreakpoint: the currently active breakpoint key
- useBreakpoint(breakpoint): Returns a boolean indicating if the viewport matches the given breakpoint.
- useBreakpointUp(breakpoint): Returns a boolean indicating if the viewport is at or above the given breakpoint.
- useBreakpointDown(breakpoint): Returns a boolean indicating if the viewport is at or below the given breakpoint.

Usage pattern:
- Use useResponsive() to conditionally render layout elements or adjust component behavior based on screen size.
- Use useBreakpoint* helpers for fine-grained media queries.

Return values:
- Boolean flags for breakpoints and device categories.
- String for currentBreakpoint.

Integration examples:
- Sidebar uses useMediaQuery via MUI theme to decide temporary vs permanent drawer behavior.
- Navbar reads UI state to manage responsive layout logic.

**Section sources**
- [useResponsive.ts:1-67](file://src/hooks/useResponsive.ts#L1-L67)
- [Sidebar.tsx:39-48](file://src/components/ui/Sidebar.tsx#L39-L48)

### formatters: Data Formatting Utilities
Purpose:
- Centralized formatting functions for numbers, currency, dates, percentages, quantities, and analytics helpers.

Exports and behavior:
- formatNumber(num: number): Formats large numbers with thousand separators using locale-aware formatting.
- formatCurrency(amount: number, currency?: string): Formats amounts as localized currency with zero decimals by default.
- formatDate(date: Date | string, format?: 'short' | 'long' | 'relative'): Formats dates in short, long, or relative forms.
- formatPercentage(value: number, decimals?: number): Formats numeric values as percentages with configurable decimals.
- formatQuantity(quantity: number, unit: string): Formats large quantities with K/M suffixes and preserves unit label.
- getTrendDirection(current: number, previous: number): Computes trend direction as 'up', 'down', or 'stable'.
- calculateChange(current: number, previous: number): Computes percentage change with two decimals and handles zero-division.

Return values:
- Strings for formatted output.
- 'up' | 'down' | 'stable' for trend direction.
- Numbers for percentage change.

Integration examples:
- Components can use these functions to present clean, localized data to users.

**Section sources**
- [formatters.ts:1-89](file://src/utils/formatters.ts#L1-L89)

## Architecture Overview
The utilities integrate with the component layer and Redux store as follows:
- Components import useRedux to dispatch actions and select state.
- Components import useResponsive to adapt UI to breakpoints.
- Components import formatters to present data consistently and localized.

```mermaid
sequenceDiagram
participant Comp as "Component"
participant Hook as "useRedux"
participant Store as "Redux Store"
participant Slice as "Slice Reducer"
Comp->>Hook : useAppDispatch()
Hook-->>Comp : AppDispatch
Comp->>Store : dispatch(action)
Store->>Slice : reducer(state, action)
Slice-->>Store : new state
Store-->>Comp : state update (via useSelector)
```

**Diagram sources**
- [useRedux.ts:1-6](file://src/hooks/useRedux.ts#L1-L6)
- [store.ts:1-27](file://src/store/store.ts#L1-L27)
- [uiSlice.ts:1-42](file://src/store/slices/uiSlice.ts#L1-L42)
- [aiSlice.ts:1-56](file://src/store/slices/aiSlice.ts#L1-L56)

## Detailed Component Analysis

### useRedux Hook Analysis
Object model:
```mermaid
classDiagram
class UseRedux {
+useAppDispatch() AppDispatch
+useAppSelector(selector) any
}
class Store {
+getState() RootState
+dispatch(action) void
}
UseRedux --> Store : "typed dispatch/selector"
```

**Diagram sources**
- [useRedux.ts:1-6](file://src/hooks/useRedux.ts#L1-L6)
- [store.ts:18-27](file://src/store/store.ts#L18-L27)

Practical usage:
- Dispatch UI actions (toggle sidebar, set active view) in Navbar and Sidebar.
- Dispatch AI actions (add query, set processing) in AIAssistant.
- Select state slices for rendering and conditional logic.

**Section sources**
- [useRedux.ts:1-6](file://src/hooks/useRedux.ts#L1-L6)
- [store.ts:18-27](file://src/store/store.ts#L18-L27)
- [Navbar.tsx:17-21](file://src/components/ui/Navbar.tsx#L17-L21)
- [Sidebar.tsx:34-48](file://src/components/ui/Sidebar.tsx#L34-L48)
- [AIAssistant.tsx:23-46](file://src/components/ai/AIAssistant.tsx#L23-L46)

### useResponsive Hook Analysis
Object model:
```mermaid
classDiagram
class Breakpoints {
+boolean xs
+boolean sm
+boolean md
+boolean lg
+boolean xl
}
class ResponsiveResult {
+Breakpoints
+boolean isMobile
+boolean isTablet
+boolean isDesktop
+string currentBreakpoint
}
class UseResponsive {
+useResponsive() ResponsiveResult
+useBreakpoint(breakpoint) boolean
+useBreakpointUp(breakpoint) boolean
+useBreakpointDown(breakpoint) boolean
}
UseResponsive --> ResponsiveResult : "returns"
ResponsiveResult --> Breakpoints : "contains"
```

**Diagram sources**
- [useResponsive.ts:3-42](file://src/hooks/useResponsive.ts#L3-L42)

Usage patterns:
- Conditional rendering of drawers and layout adjustments based on device category.
- Fine-grained media queries for specific breakpoints.

**Section sources**
- [useResponsive.ts:14-42](file://src/hooks/useResponsive.ts#L14-L42)
- [Sidebar.tsx:39-48](file://src/components/ui/Sidebar.tsx#L39-L48)

### formatters Utility Analysis
Flowchart for formatDate:
```mermaid
flowchart TD
Start(["Call formatDate"]) --> Parse["Parse input to Date"]
Parse --> ChooseFormat{"Format requested?"}
ChooseFormat --> |short| Short["Return localized short date"]
ChooseFormat --> |long| Long["Return localized long date"]
ChooseFormat --> |relative| Relative["Compute days ago<br/>or fallback to short"]
Short --> End(["Return string"])
Long --> End
Relative --> End
```

**Diagram sources**
- [formatters.ts:23-50](file://src/utils/formatters.ts#L23-L50)

Usage patterns:
- Present readable numbers, currency, dates, and percentages across components.
- Use formatQuantity for scalable units and getTrendDirection/calculateChange for analytics.

**Section sources**
- [formatters.ts:1-89](file://src/utils/formatters.ts#L1-L89)

## Dependency Analysis
- useRedux depends on the store configuration and types to provide typed hooks.
- useResponsive depends on Material UI theme and media queries.
- Components depend on these utilities for consistent behavior and presentation.
- Store slices encapsulate state transitions used by components.

```mermaid
graph LR
UR["useRedux.ts"] --> ST["store.ts"]
URP["useResponsive.ts"] --> NAV["Navbar.tsx"]
URP --> SIDEBAR["Sidebar.tsx"]
FM["formatters.ts"] --> NAV
FM --> SIDEBAR
FM --> AI["AIAssistant.tsx"]
NAV --> ST
SIDEBAR --> ST
AI --> ST
```

**Diagram sources**
- [useRedux.ts:1-6](file://src/hooks/useRedux.ts#L1-L6)
- [useResponsive.ts:1-67](file://src/hooks/useResponsive.ts#L1-L67)
- [formatters.ts:1-89](file://src/utils/formatters.ts#L1-L89)
- [store.ts:1-27](file://src/store/store.ts#L1-L27)
- [Navbar.tsx:1-61](file://src/components/ui/Navbar.tsx#L1-L61)
- [Sidebar.tsx:1-133](file://src/components/ui/Sidebar.tsx#L1-L133)
- [AIAssistant.tsx:1-120](file://src/components/ai/AIAssistant.tsx#L1-L120)

**Section sources**
- [store.ts:1-27](file://src/store/store.ts#L1-L27)
- [uiSlice.ts:1-42](file://src/store/slices/uiSlice.ts#L1-L42)
- [aiSlice.ts:1-56](file://src/store/slices/aiSlice.ts#L1-L56)

## Performance Considerations
- Memoization:
  - Wrap heavy computations inside useMemo/useCallback when used in frequently rendered lists or high-frequency events.
  - Cache formatted strings if identical inputs are reused often.
- Debouncing:
  - Debounce user input handlers that trigger formatting to avoid excessive re-renders.
- Avoid unnecessary re-creations:
  - Keep formatter instances stable across renders when possible.
- Breakpoint detection:
  - Prefer useResponsive for coarse-grained logic; use useBreakpoint* for specific checks only when needed.
- Redux selectors:
  - Use shallow equality checks and memoized selectors to prevent unnecessary re-renders.

## Troubleshooting Guide
Common issues and resolutions:
- Type errors with useAppDispatch/useAppSelector:
  - Ensure RootState and AppDispatch are correctly exported from the store and imported in hooks.
- Breakpoint mismatches:
  - Verify MUI theme breakpoints align with expectations; test with useBreakpoint helpers for specific cases.
- Currency formatting anomalies:
  - Confirm currency codes and locales match target markets; validate minimum/maximum fraction digits.
- Percentage change edge cases:
  - Division-by-zero handling is included; ensure callers account for zero previous values.
- Date parsing:
  - Accepts Date or string; ensure input strings are valid ISO dates or parseable formats.

**Section sources**
- [useRedux.ts:1-6](file://src/hooks/useRedux.ts#L1-L6)
- [useResponsive.ts:1-67](file://src/hooks/useResponsive.ts#L1-L67)
- [formatters.ts:11-18](file://src/utils/formatters.ts#L11-L18)
- [formatters.ts:85-88](file://src/utils/formatters.ts#L85-L88)

## Conclusion
The dashboard-ai project leverages focused utilities to streamline Redux integration, responsive behavior, and data formatting. By centralizing these concerns:
- Components remain concise and type-safe
- UI adapts predictably across devices
- Data presentation remains consistent and localized

Extending these utilities should follow established patterns: strong typing, clear return contracts, and robust edge-case handling.

## Appendices

### Practical Examples and Extension Guidelines
- Extending formatters:
  - Add a new function with a clear name and single responsibility.
  - Define strict parameter types and return types.
  - Include tests for edge cases (zero, negative values, invalid inputs).
  - Example extension: a function to format bytes with units (B, KB, MB, GB).
- Integrating with components:
  - Import the formatter in the component file.
  - Apply formatting in render logic or derived values.
  - Use memoization for expensive formatting operations.
- Testing strategies:
  - Unit tests for pure functions (formatters) covering normal, edge, and error cases.
  - Snapshot tests for UI components that render formatted values.
  - Integration tests for hooks to verify correct store updates and state selection.

[No sources needed since this section provides general guidance]