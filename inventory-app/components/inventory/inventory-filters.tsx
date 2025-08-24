"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "../../types"

interface InventoryFiltersProps {
  products: Product[]
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

export function InventoryFilters({ products, selectedFilter, onFilterChange }: InventoryFiltersProps) {
  const filterCounts = {
    all: products.length,
    out: products.filter((p) => p.stock === 0).length,
    low: products.filter((p) => p.stock < 10 && p.stock > 0).length,
    medium: products.filter((p) => p.stock >= 10 && p.stock < 50).length,
    high: products.filter((p) => p.stock >= 50).length,
  }

  const filters = [
    { key: "all", label: "All", variant: "default" as const },
    { key: "out", label: "Out of Stock", variant: "destructive" as const },
    { key: "low", label: "Low Stock", variant: "secondary" as const },
    { key: "medium", label: "Medium Stock", variant: "default" as const },
    { key: "high", label: "High Stock", variant: "default" as const },
  ]

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={selectedFilter === filter.key ? filter.variant : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
            >
              {filter.label} ({filterCounts[filter.key as keyof typeof filterCounts]})
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
