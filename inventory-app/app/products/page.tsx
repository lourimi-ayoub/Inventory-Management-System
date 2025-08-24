"use client"

import { useState, useEffect } from "react"
import { InventoryHeader } from "@/components/products/inventory-header"
import { SearchFilters } from "@/components/products/search-filters"
import { ProductsTable } from "@/components/products/products-table"

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

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  const fetchProducts = async () => {
  setIsLoading(true);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      setIsLoading(false);
      return;
    }

    const response = await fetch("http://localhost:5000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // send JWT
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProducts(data); // only user's products will come from backend
      setFilteredProducts(data);
    } else {
      const errorData = await response.json();
      console.error("Server error:", errorData);
      alert(errorData.message || "Failed to fetch products");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Failed to fetch products");
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory])

  const handleProductAdded = () => {
    fetchProducts()
  }

  const handleProductDeleted = () => {
    fetchProducts()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <InventoryHeader onProductAdded={handleProductAdded} />

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          productCount={filteredProducts.length}
        />

        <ProductsTable products={filteredProducts} onProductDeleted={handleProductDeleted} />
      </div>
    </div>
  )
}
