"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { InventoryFilters } from "@/components/inventory/inventory-filters";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { StockMovementHistory } from "@/components/inventory/stock-movement-history";
import { StockAdjustmentModal } from "@/components/inventory/stock-adjustment-modal";
import type { Product, StockMovement } from "../../types";
import StatCard from "@/components/dashboard/StatCard";
import { Box, AlertTriangle, TrendingUp, BarChart3 } from "lucide-react";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  // Fetch products for logged-in user
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=100`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching products:", err);
        alert(err.message || "Failed to fetch products");
      } else {
        console.error("Error fetching products:", err);
        alert("Failed to fetch products");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch stock movements for logged-in user
  const fetchMovements = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const res = await fetch("http://localhost:5000/stockMovements", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch stock movements");
      }

      const data = await res.json();
      setStockMovements(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Failed to load stock movements:", err);
        alert(err.message || "Failed to load stock movements");
      } else {
        console.error("Failed to load stock movements:", err);
        alert("Failed to load stock movements");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchMovements();
  }, []);

  const filteredProducts = products.filter((product) => {
    switch (selectedFilter) {
      case "low":
        return product.stock < 10 && product.stock > 0;
      case "out":
        return product.stock === 0;
      case "medium":
        return product.stock >= 10 && product.stock < 50;
      case "high":
        return product.stock >= 50;
      default:
        return true;
    }
  });

  const openStockModal = (product: Product) => {
    setSelectedProduct(product);
    setIsStockModalOpen(true);
  };

  const closeStockModal = () => {
    setIsStockModalOpen(false);
    setSelectedProduct(null);
  };

  const handleStockUpdate = async (data: {
    type: "in" | "out" | "adjustment";
    stock: number;
    reason: string;
  }) => {
    if (!selectedProduct) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      let newStock = selectedProduct.stock;
      switch (data.type) {
        case "in":
          newStock += data.stock;
          break;
        case "out":
          newStock = Math.max(0, newStock - data.stock);
          break;
        case "adjustment":
          newStock = data.stock;
          break;
      }

      // Update product stock
      await fetch(`http://localhost:5000/products/${selectedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...selectedProduct, stock: newStock }),
      });

      // Save movement to DB with owner
      const movement = {
        productId: selectedProduct._id,
        productName: selectedProduct.name,
        type: data.type,
        stock: data.stock,
        reason: data.reason,
        date: new Date().toISOString(),
      };

      await fetch("http://localhost:5000/stockMovements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movement),
      });

      await fetchProducts();
      await fetchMovements();
      closeStockModal();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        alert(err.message || "Error updating stock");
      } else {
        console.error(err);
        alert("Error updating stock");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export CSV
  const exportInventoryReport = () => {
    const csvContent = [
      [
        "Name",
        "SKU",
        "Category",
        "Price",
        "Quantity",
        "Status",
        "Total Value",
      ].join(","),
      ...filteredProducts.map((product) => {
        const status =
          product.stock === 0
            ? "Out of Stock"
            : product.stock < 10
            ? "Low Stock"
            : product.stock < 50
            ? "Medium Stock"
            : "In Stock";

        return [
          `"${product.name}"`,
          product.sku,
          `"${product.category}"`,
          product.price.toFixed(2),
          product.stock,
          `"${status}"`,
          (product.price * product.stock).toFixed(2),
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `inventory_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Inventory</h1>
            <p className="text-muted-foreground">
              Track and manage your personal stock levels
            </p>
          </div>
          <Button onClick={exportInventoryReport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Produits"
            value={products.length}
            icon={Box}
            variant="blue"
          />
          <StatCard
            title="Valeur Totale"
            value={products.reduce((acc, p) => acc + p.price * p.stock, 0)}
            icon={TrendingUp}
            variant="green"
          />
          <StatCard
            title="Stock Faible"
            value={products.filter((p) => p.stock < 10).length}
            icon={AlertTriangle}
            variant="red"
          />
          <StatCard
            title="Out of Stock"
            value={products.filter((p) => p.stock === 0).length}
            icon={BarChart3}
            variant="purple"
          />
        </section>{" "}
        <br />
        {/* Filters */}
        <InventoryFilters
          products={products}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Table */}
          <div className="lg:col-span-2">
            <InventoryTable
              products={filteredProducts}
              loading={loading}
              onStockAdjust={openStockModal}
            />
          </div>

          {/* Stock Movements History */}
          <div className="lg:col-span-1">
            <StockMovementHistory movements={stockMovements} />
          </div>
        </div>
        {/* Stock Adjustment Modal */}
        <StockAdjustmentModal
          isOpen={isStockModalOpen}
          onClose={closeStockModal}
          product={selectedProduct}
          onSubmit={handleStockUpdate}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
