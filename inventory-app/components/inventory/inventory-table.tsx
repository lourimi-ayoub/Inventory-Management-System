"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import type { Product } from "../../types"

interface InventoryTableProps {
  products: Product[]
  loading: boolean
  onStockAdjust: (product: Product) => void
}

export function InventoryTable({ products, loading, onStockAdjust }: InventoryTableProps) {
  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: "Out of Stock", variant: "destructive" as const }
    if (quantity < 10) return { text: "Low Stock", variant: "secondary" as const }
    if (quantity < 50) return { text: "Medium Stock", variant: "default" as const }
    return { text: "In Stock", variant: "default" as const }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock)
              return (
                <TableRow key={product._id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={stockStatus.variant}>{stockStatus.text}</Badge>
                  </TableCell>
                  <TableCell>€{(product.price * product.stock).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onStockAdjust(product)}
                      className="flex items-center gap-1"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
