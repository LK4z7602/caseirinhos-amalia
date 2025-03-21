"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { products, getCategories } from "@/data/products"

// Site configuration - fully customizable
const siteConfig = {
  name: "Caseirinhos da Amália",
  logo: "/LogoBolo.jpg?height=40&width=40",
  contact: {
    whatsapp: "+55 12 99775-6182",
     // email: "contato@caseirinhosdaamalia.com.br",
    // address: "Rua dos Bolos, 123 - Cidade",
  },
}

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortOrder, setSortOrder] = useState("relevancia")
  const [cartItems, setCartItems] = useState<any[]>([])
  const categories = getCategories()

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }

    // Set up event listener for storage changes
    const handleStorageChange = () => {
      const updatedCart = localStorage.getItem("cartItems")
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart))
      } else {
        setCartItems([])
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for cart updates
    window.addEventListener("cartUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleStorageChange)
    }
  }, [])

  // Filter products by category
  const filteredProducts =
    selectedCategory === "Todos"
      ? products.filter((product) => product.available)
      : products.filter((product) => product.category === selectedCategory && product.available)

  // Sort products based on selected order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "menor-preco") return a.price - b.price
    if (sortOrder === "maior-preco") return b.price - a.price
    // Default: relevance (original order)
    return 0
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src={siteConfig.logo || "/LogoBolo.jpg"}
             alt={siteConfig.name}
             width={40} 
             height={40}
             style={{ borderRadius: '10px' }} 
             />
            <span className="text-xl font-semibold text-purple-800">{siteConfig.name}</span>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-purple-800 hover:text-purple-600">
                Início
              </Link>
              <Link href="/catalogo" className="text-sm font-medium text-purple-800 hover:text-purple-600">
                Catálogo
              </Link>
              <Link href="/sobre" className="text-sm font-medium text-purple-800 hover:text-purple-600">
                Sobre Nós
              </Link>
            </nav>
            <Link href="/carrinho" className="relative">
              <ShoppingCart className="h-5 w-5 text-purple-800" />
              <span className="sr-only">Carrinho</span>
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-800 text-[10px] font-medium text-white">
                {cartItems.length}
              </span>
            </Link>
            <Button variant="outline" size="sm" className="md:hidden">
              <span className="sr-only">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-pink-50 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
                  Catálogo de Bolos
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore nossa variedade de bolos artesanais feitos com amor e ingredientes selecionados
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-purple-800" />
                  <span className="text-sm font-medium">Filtrar por:</span>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] border-purple-200">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px] border-purple-200">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevância</SelectItem>
                    <SelectItem value="menor-preco">Menor Preço</SelectItem>
                    <SelectItem value="maior-preco">Maior Preço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-pink-100 p-3">
                  <ShoppingCart className="h-6 w-6 text-purple-800" />
                </div>
                <h2 className="mt-4 text-xl font-medium text-purple-900">Nenhum produto encontrado</h2>
                <p className="mt-2 text-gray-500">Não encontramos produtos para os filtros selecionados.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Image 
src={siteConfig.logo || "/LogoBolo.jpg"}
 alt={siteConfig.name} 
width={40} 
height={40} 
  style={{ borderRadius: '10px' }} 
/>
                <span className="text-xl font-semibold text-purple-800">{siteConfig.name}</span>
              </Link>
              <p className="text-sm text-gray-500">
                Bolos artesanais feitos com amor e ingredientes selecionados para tornar seus momentos ainda mais
                especiais.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-900">Links Rápidos</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-gray-500 hover:text-purple-800">
                  Início
                </Link>
                <Link href="/catalogo" className="text-sm text-gray-500 hover:text-purple-800">
                  Catálogo
                </Link>
                <Link href="/sobre" className="text-sm text-gray-500 hover:text-purple-800">
                  Sobre Nós
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-900">Contato</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <p>WhatsApp: {siteConfig.contact.whatsapp}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

