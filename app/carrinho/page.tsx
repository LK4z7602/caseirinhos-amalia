"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProductById } from "@/data/products"

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

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [observations, setObservations] = useState("")

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
  }

  const updateItemSize = (id: number, newSize: string) => {
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, size: newSize } : item))
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
  }

  const updateItemObservations = (id: number, newObservations: string) => {
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, observations: newObservations } : item))
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
  }

  const updateItemDeliveryOption = (id: number, newOption: string) => {
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, deliveryOption: newOption } : item))
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
  }

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
    // Disparar evento para atualizar contadores do carrinho
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "CASEIRINHOS10") {
      setDiscount(0.10)
      alert("Cupom aplicado com sucesso! 10% de desconto.")
    } else {
      setDiscount(0)
      alert("Cupom inválido ou expirado.")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!")
      return
    }

    const itemsList = cartItems
      .map((item) => {
        const deliveryText = item.deliveryOption === "delivery" ? "Entrega" : "Retirada no local"

        return `*${item.quantity}x ${item.name}*
*Tamanho:* ${item.size}
*Opção:* ${deliveryText}${
          item.observations
            ? `
*Observações:* ${item.observations}`
            : ""
        }
*Valor:* ${(item.price * item.quantity).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`
      })
      .join("\n\n")

    const message = encodeURIComponent(
      `Olá! Gostaria de finalizar meu pedido:

${itemsList}

${
  discount > 0
    ? `*Subtotal:* ${subtotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
*Desconto:* ${discountAmount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
`
    : ""
}*Valor Total:* ${total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}

${
  observations
    ? `*Observações Gerais:* ${observations}

`
    : ""
}Poderia me informar sobre as opções de pagamento?`,
    )

    // Clear cart after checkout
    setCartItems([])
    localStorage.removeItem("cartItems")
    // Disparar evento para atualizar contadores do carrinho
    window.dispatchEvent(new Event("cartUpdated"))

    window.open(`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank")
  }

  // Obter as opções de tamanho para cada produto
  const getSizesForProduct = (productId: number) => {
    const product = getProductById(productId)
    return product ? product.sizes : ["Pequeno", "Médio", "Grande"]
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
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
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-900 md:text-3xl">Meu Carrinho</h1>
            <Link href="/catalogo">
              <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
                Continuar Comprando
              </Button>
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed py-12">
              <div className="rounded-full bg-pink-100 p-3">
                <ShoppingCart className="h-6 w-6 text-purple-800" />
              </div>
              <h2 className="text-xl font-medium text-purple-900">Seu carrinho está vazio</h2>
              <p className="text-center text-gray-500">
                Parece que você ainda não adicionou nenhum item ao seu carrinho.
              </p>
              <Link href="/catalogo">
                <Button className="mt-2 bg-purple-800 text-white hover:bg-purple-700">Ver Catálogo</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-lg border">
                  <div className="p-6">
                    <h2 className="mb-4 text-lg font-medium text-purple-900">Itens do Carrinho</h2>
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="space-y-4 border-b pb-6 last:border-0 last:pb-0">
                          <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-medium text-purple-900">{item.name}</h3>
                                </div>
                                <p className="font-medium text-purple-900">
                                  {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-purple-200"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                    <span className="sr-only">Diminuir quantidade</span>
                                  </Button>
                                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-purple-200"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                    <span className="sr-only">Aumentar quantidade</span>
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="mr-1 h-4 w-4" />
                                  Remover
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-sm font-medium text-gray-700">Tamanho</label>
                              <Select value={item.size} onValueChange={(value) => updateItemSize(item.id, value)}>
                                <SelectTrigger className="w-full border-purple-200">
                                  <SelectValue placeholder="Selecione o tamanho" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getSizesForProduct(item.productId).map((size) => (
                                    <SelectItem key={size} value={size}>
                                      {size}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-sm font-medium text-gray-700">Opção de Entrega</label>
                              <RadioGroup
                                value={item.deliveryOption}
                                onValueChange={(value) => updateItemDeliveryOption(item.id, value)}
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="delivery" id={`delivery-${item.id}`} />
                                  <Label htmlFor={`delivery-${item.id}`}>Entrega (Frete à Cobrar)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="pickup" id={`pickup-${item.id}`} />
                                  <Label htmlFor={`pickup-${item.id}`}>Retirada no local</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="space-y-1">
                              <label className="text-sm font-medium text-gray-700">Observações (opcional)</label>
                              <Textarea
                                placeholder="Alguma observação especial para este item?"
                                value={item.observations}
                                onChange={(e) => updateItemObservations(item.id, e.target.value)}
                                className="min-h-[60px] border-purple-200 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border p-6">
                  <h2 className="mb-4 text-lg font-medium text-purple-900">Observações Gerais</h2>
                  <Textarea
                    placeholder="Alguma observação adicional para o seu pedido?"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    className="min-h-[100px] border-purple-200"
                  />
                </div>
              </div>
              <div>
                <div className="sticky top-20 rounded-lg border">
                  <div className="p-6">
                    <h2 className="mb-4 text-lg font-medium text-purple-900">Resumo do Pedido</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-purple-900">
                          {subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Desconto</span>
                          <span>-{discountAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-lg font-medium text-purple-900">Total</span>
                        <span className="text-lg font-bold text-purple-900">
                          {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Código do cupom"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="border-purple-200"
                        />
                        <Button
                          variant="outline"
                          className="border-purple-800 text-purple-800 hover:bg-purple-50"
                          onClick={applyCoupon}
                        >
                          Aplicar
                        </Button>
                      </div>
                      <Button
                        className="w-full bg-purple-800 text-white hover:bg-purple-700"
                        onClick={handleWhatsAppCheckout}
                      >
                        Finalizar Compra
                      </Button>
                      <div className="rounded-md bg-green-50 p-3">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-green-600"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-green-700">
                              Ao finalizar, você será redirecionado para o WhatsApp para concluir seu pedido.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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

