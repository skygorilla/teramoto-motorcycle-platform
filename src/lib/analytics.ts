export class AnalyticsManager {
  private static instance: AnalyticsManager;
  private events: Array<{
    event: string;
    timestamp: Date;
    userId?: string;
    data?: Record<string, any>;
  }> = [];

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  track(event: string, data?: Record<string, any>, userId?: string) {
    this.events.push({
      event,
      timestamp: new Date(),
      userId,
      data,
    });

    // In production, send to analytics service
    console.log('Analytics Event:', { event, data, userId });
  }

  trackPageView(page: string, userId?: string) {
    this.track('page_view', { page }, userId);
  }

  trackBooking(serviceType: string, estimatedCost: number, userId?: string) {
    this.track('booking_created', { serviceType, estimatedCost }, userId);
  }

  trackPurchase(productId: string, price: number, userId?: string) {
    this.track('purchase', { productId, price }, userId);
  }

  trackSearch(query: string, results: number, userId?: string) {
    this.track('search', { query, results }, userId);
  }

  getInsights() {
    const totalEvents = this.events.length;
    const uniqueUsers = new Set(this.events.map(e => e.userId).filter(Boolean)).size;
    const topEvents = this.getTopEvents();
    
    return {
      totalEvents,
      uniqueUsers,
      topEvents,
      conversionRate: this.calculateConversionRate(),
    };
  }

  private getTopEvents() {
    const eventCounts = this.events.reduce((acc, event) => {
      acc[event.event] = (acc[event.event] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(eventCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  }

  private calculateConversionRate() {
    const pageViews = this.events.filter(e => e.event === 'page_view').length;
    const purchases = this.events.filter(e => e.event === 'purchase').length;
    return pageViews > 0 ? (purchases / pageViews) * 100 : 0;
  }
}