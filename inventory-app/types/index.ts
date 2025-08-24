export interface Product {
  _id: string
  name: string
  sku: string
  price: number
  stock: number
  category: string
  description?: string
  status: string
}

export interface StockMovement {
  productId: string
  productName: string
  type: "in" | "out" | "adjustment"
  stock: number
  reason: string
  date: string
}

export interface InventoryStats {
  totalProducts: number
  totalValue: number
  lowStockItems: number
  outOfStockItems: number
}
