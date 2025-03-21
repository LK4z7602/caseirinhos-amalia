"use client"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/data/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    // Adicionar ao carrinho com configurações padrão
    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0], // Tamanho padrão (primeiro da lista)
      observations: "",
      deliveryOption: "delivery",
    }

    // Obter itens existentes do carrinho
    const existingCartItems = localStorage.getItem("cartItems")
    const cartItems = existingCartItems ? JSON.parse(existingCartItems) : []

    // Adicionar novo item
    const updatedCart = [...cartItems, cartItem]

    // Salvar no localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))

    // Disparar evento para atualizar contadores do carrinho
    window.dispatchEvent(new Event("cartUpdated"))

    // Mostrar confirmação
    alert(`Adicionado ao carrinho: ${product.name} - ${product.sizes[0]}`)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-purple-900">{product.name}</h3>
            <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-purple-800">
              {product.category}
            </span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <p className="text-lg font-bold text-purple-900">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-purple-800 text-white hover:bg-purple-700">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}

