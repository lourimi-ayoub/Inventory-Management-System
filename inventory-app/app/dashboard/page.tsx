"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import StatCard from "@/components/dashboard/StatCard";
import { Box, AlertTriangle, TrendingUp, BarChart3 } from "lucide-react";
import { ProductsTable } from "@/components/dashboard/products-table"


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
export default function Dashboard() {
  const router = useRouter();
 const [products, setProducts] = useState<Product[]>([])
  
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);


useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  } else {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    setUser(currentUser);
  }
}, [router]);

// removed misplaced import

 const fetchProducts = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    } else {
      // Token invalid or expired
      router.push("/login");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    router.push("/login");
  }
}, [router]);

    useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

 

  if (!user) return null; 

  return (
    <div className="p-10 min-h-[calc(100vh-72px)] bg-gray-50">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!🙋‍♂️ </h1>
      <p className="text-sm text-muted-foreground">
          this is isisisisiii  
        </p>
        <br></br>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Produits" value={products.length} icon={Box} variant="blue" />
        <StatCard title="Stock Faible" value={products.filter(product => product.stock < 10).length} icon={AlertTriangle} variant="red" />
        <StatCard title="Valeur Totale" value={products.reduce((acc, product) => acc + product.price * product.stock, 0)} icon={TrendingUp} variant="green" />
        <StatCard title="Catégories" value={Array.from(new Set(products.map(product => product.category))).length} icon={BarChart3} variant="purple" />
      </section>
      <br></br>
      

      <ProductsTable products={products}  />
    </div>
  );
}
