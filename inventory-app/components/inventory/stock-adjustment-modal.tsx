"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "../../types"

interface StockAdjustmentModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onSubmit: (data: {
    type: "in" | "out" | "adjustment"
    stock: number
    reason: string
  }) => void
  isSubmitting: boolean
}

export function StockAdjustmentModal({ isOpen, onClose, product, onSubmit, isSubmitting }: StockAdjustmentModalProps) {
  const [formData, setFormData] = useState({
    type: "in" as "in" | "out" | "adjustment",
    stock: 0,
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const calculateNewStock = () => {
    if (!product) return 0

    switch (formData.type) {
      case "in":
        return product.stock + formData.stock
      case "out":
        return Math.max(0, product.stock - formData.stock)
      case "adjustment":
        return formData.stock
      default:
        return product.stock
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
        </DialogHeader>

        {product && (
          <Card className="mb-2">
            <CardContent className="">
              <div className="font-medium  ">{product.name}</div>
              <div className="text-sm text-muted-foreground">Current stock: {product.stock}</div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Movement Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "in" | "out" | "adjustment") => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">Stock In</SelectItem>
                <SelectItem value="out">Stock Out</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">{formData.type === "adjustment" ? "New Quantity" : "Quantity"}</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              required
              rows={3}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="e.g., Received shipment, Sale, Inventory count..."
            />
          </div>

          {product && formData.type !== "adjustment" && (
            <Card>
              <CardContent className="p-3">
                <div className="text-sm text-muted-foreground">
                  New stock: <span className="font-medium text-black">{calculateNewStock()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Confirm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
