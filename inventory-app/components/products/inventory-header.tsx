import { Button } from "@/components/ui/button"
import { Plus, User } from "lucide-react"
import { AddProductModal } from "./add-product-modal"

interface InventoryHeaderProps {
  onProductAdded: () => void
}

export function InventoryHeader({ onProductAdded }: InventoryHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
        <p className="text-gray-600 mb-4">Manage your personal product catalog</p>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <User className="w-4 h-4" />
          <span> - Private Products</span>
        </div>
      </div>
      <AddProductModal onProductAdded={onProductAdded}>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      </AddProductModal>
    </div>
  )
}
