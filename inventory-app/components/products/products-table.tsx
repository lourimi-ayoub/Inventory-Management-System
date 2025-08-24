"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

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
  onProductDeleted: () => void
}

export function ProductsTable({ products, onProductDeleted }: ProductsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    setDeletingId(productId)
    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        onProductDeleted()
      } else {
        const error = await response.json()
        alert(error.error || "Failed to delete eproduct")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product")
    } finally {
      setDeletingId(null)
    }
  }

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
            <TableHead className="text-gray-600 font-medium pl-4 ">PRODUCT</TableHead>
            <TableHead className="text-gray-600 font-medium ">SKU</TableHead>
            <TableHead className="text-gray-600 font-medium">PRICE</TableHead>
            <TableHead className="text-gray-600 font-medium">STOCK</TableHead>
            <TableHead className="text-gray-600 font-medium">STATUS</TableHead>
            <TableHead className="text-gray-600 font-medium ">
              <div className="flex items-center justify-end gap-1">
                ACTIONS
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </TableHead>
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
                <TableCell className="pl-4">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{product.category}</div>
                  </div>
                </TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>€{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{getStatusBadge(product.stock)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-700"
                      disabled={deletingId === product._id}
                    >
                      {deletingId === product._id ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
