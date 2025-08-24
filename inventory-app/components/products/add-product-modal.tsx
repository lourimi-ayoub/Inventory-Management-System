"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddProductModalProps {
  children: React.ReactNode
  onProductAdded: () => void
}

export function AddProductModal({ children, onProductAdded }: AddProductModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const productData = {
    name: formData.name,
    sku: formData.sku,
    price: parseFloat(formData.price) || 0,
    stock: parseInt(formData.stock) || 0,
    category: formData.category,
    description: formData.description,
  };

  console.log("Submitting product:", productData);
const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(productData),
    });
    

    console.log("Raw fetch response:", response);

    const responseData = await response.json();
    console.log("Server response data:", responseData);

    if (response.ok) {
      console.log("Product added successfully");
      setIsOpen(false);
      onProductAdded();
      setFormData({
        name: "",
        sku: "",
        price: "",
        stock: "",
        category: "",
        description: "",
      });
    } else {
      console.log("Server returned error:", responseData);
      alert(responseData.message || "Failed to add product");
    }
  } catch (error) {
    console.error("Network or fetch error:", error);
    alert("Failed to add product");
  } finally {
    setIsLoading(false);
  }
};


  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                placeholder="Enter SKU"
                required
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                required
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
