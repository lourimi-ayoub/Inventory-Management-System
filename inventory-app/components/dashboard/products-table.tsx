"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


interface Product {
  _id: string
  name: string
  sku: string
  price: number
  stock: number
  category: string
  description?: string
  status: string
}

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {



  const getStatusBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>
    if (stock < 10)
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Low Stock
        </Badge>
      )
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        In Stock
      </Badge>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow className="border-b">
            <TableHead className="text-gray-600 font-medium">PRODUCT</TableHead>
            <TableHead className="text-gray-600 font-medium">SKU</TableHead>
            <TableHead className="text-gray-600 font-medium">PRICE</TableHead>
            <TableHead className="text-gray-600 font-medium">STOCK</TableHead>
            <TableHead className="text-gray-600 font-medium">STATUS</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{product.category}</div>
                  </div>
                </TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>€{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{getStatusBadge(product.stock)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
