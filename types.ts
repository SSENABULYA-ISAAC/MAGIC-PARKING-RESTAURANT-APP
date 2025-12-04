export interface StockItem {
  id: string;
  name: string;
  category: 'Food' | 'Drink';
  price: number; // Unit price in UGX
  opening: number;
  added: number;
  damaged: number;
  closing: number;
  imageQuery: string; // Search query for the image
}

export interface DailySummary {
  totalRevenue: number;
  totalSalesCount: number;
  mostPopularItem: string;
  itemsLowStock: string[];
}

export type ItemUpdateField = 'opening' | 'added' | 'damaged' | 'closing' | 'price';