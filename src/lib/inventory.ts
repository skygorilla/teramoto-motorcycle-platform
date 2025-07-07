import { EnhancedProduct } from '@/types/enhanced';

export class InventoryManager {
  private static instance: InventoryManager;
  private inventory: Map<string, EnhancedProduct> = new Map();
  private lowStockThreshold = 5;

  static getInstance(): InventoryManager {
    if (!InventoryManager.instance) {
      InventoryManager.instance = new InventoryManager();
    }
    return InventoryManager.instance;
  }

  async updateStock(productId: string, quantity: number): Promise<void> {
    const product = this.inventory.get(productId);
    if (product) {
      product.stockQuantity = quantity;
      product.inStock = quantity > 0;
      
      if (quantity <= this.lowStockThreshold) {
        await this.triggerLowStockAlert(product);
      }
    }
  }

  async reserveStock(productId: string, quantity: number): Promise<boolean> {
    const product = this.inventory.get(productId);
    if (product && product.stockQuantity >= quantity) {
      product.stockQuantity -= quantity;
      return true;
    }
    return false;
  }

  async releaseReservedStock(productId: string, quantity: number): Promise<void> {
    const product = this.inventory.get(productId);
    if (product) {
      product.stockQuantity += quantity;
      product.inStock = true;
    }
  }

  getAvailableProducts(): EnhancedProduct[] {
    return Array.from(this.inventory.values()).filter(p => p.inStock);
  }

  getLowStockProducts(): EnhancedProduct[] {
    return Array.from(this.inventory.values())
      .filter(p => p.stockQuantity <= this.lowStockThreshold);
  }

  private async triggerLowStockAlert(product: EnhancedProduct): Promise<void> {
    // Implement notification system for low stock
    console.log(`Low stock alert: ${product.name} - Only ${product.stockQuantity} left`);
  }

  async predictDemand(productId: string): Promise<number> {
    // AI-powered demand prediction
    const product = this.inventory.get(productId);
    if (!product) return 0;

    // Simplified prediction based on historical data
    const baselineDemand = 10;
    const seasonalMultiplier = this.getSeasonalMultiplier(product);
    const trendMultiplier = this.getTrendMultiplier(product);

    return Math.round(baselineDemand * seasonalMultiplier * trendMultiplier);
  }

  private getSeasonalMultiplier(product: EnhancedProduct): number {
    const month = new Date().getMonth();
    
    // Higher demand for maintenance items in spring/summer
    if (product.tags.includes('maintenance') && (month >= 3 && month <= 8)) {
      return 1.5;
    }
    
    // Higher demand for winter gear in fall/winter
    if (product.tags.includes('winter') && (month >= 9 || month <= 2)) {
      return 2.0;
    }
    
    return 1.0;
  }

  private getTrendMultiplier(product: EnhancedProduct): number {
    // Based on product rating and review trends
    if (product.rating >= 4.5 && product.reviewCount > 50) {
      return 1.3;
    }
    if (product.rating >= 4.0) {
      return 1.1;
    }
    return 0.9;
  }
}