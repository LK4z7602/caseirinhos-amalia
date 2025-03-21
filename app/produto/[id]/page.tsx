"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// Sample product data - fully customizable
const product = {
  id: 1,
  name: "Bolo de Chocolate com Morango",
  description:
    "Delicioso bolo de chocolate com recheio de morango e cobertura de ganache. Feito com ingredientes selecionados e muito amor para tornar seu momento ainda mais especial.",
  longDescription:
    "Nosso bolo de chocolate com morango é uma combinação perfeita de sabores. A massa de chocolate é feita com cacau de alta qualidade, resultando em um sabor intenso e marcante. O recheio de morango é preparado com frutas frescas e selecionadas, trazendo um toque de acidez que equilibra perfeitamente com a doçura do chocolate. A cobertura de ganache é feita com chocolate meio amargo, proporcionando um acabamento brilhante e um sabor irresistível. Cada camada é cuidadosamente montada para garantir a harmonia perfeita de sabores em cada mordida.",
  price: 89.9,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  sizes: ["Pequeno", "Médio", "Grande"],
  relatedProducts: [
    {
      id: 2,
      name: "Bolo Red Velvet",
      price: 99.9,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Bolo de Cenoura com Chocolate",
      price: 69.9,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Bolo de Brigadeiro",
      price: 84.9,
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
}

export default function ProductPage() {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [observations, setObservations] = useState("")
  const [deliveryOption, setDeliveryOption] = useState("delivery")
  const [cartItems, setCartItems] = useState<any[]>([])

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    const newItem = {
      id: Date.now(), // Unique ID for the cart item
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      observations,
      deliveryOption,
    }

    const updatedCart = [...cartItems, newItem]
    setCartItems(updatedCart)

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))

    alert(`Adicionado ao carrinho: ${quantity}x ${product.name} - ${selectedSize}`)
  }

  const handleWhatsAppCheckout = () => {
    const deliveryText = deliveryOption === "delivery" ? "Opção: Entrega\n" : "Opção: Retirada no local\n"

    const observationsText = observations ? `\n*Observações:* ${observations}\n` : ""

    const message = encodeURIComponent(
      `Olá! Gostaria de encomendar:\n\n*${quantity}x ${product.name}*\n*Tamanho:* ${selectedSize}\n*${deliveryText}*${observationsText}\n*Valor Total:* ${(
        product.price * quantity
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}\n\nPoderia me informar sobre as opções de pagamento?`,
    )
    window.open(`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank")

    // Clear cart after checkout
    localStorage.removeItem("cartItems")
    setCartItems([])
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
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-800">
              Início
            </Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-purple-800">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-purple-800">{product.name}</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="order-1 lg:col-span-3">
              <div className="grid gap-4">
                <div className="overflow-hidden rounded-lg border">
                  <Image
                    src={mainImage || "/placeholder.svg"}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative min-w-[80px] overflow-hidden rounded-lg border ${
                        mainImage === image ? "ring-2 ring-purple-800" : ""
                      }`}
                      onClick={() => setMainImage(image)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - Imagem ${index + 1}`}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-2 lg:col-span-2">
              <div className="sticky top-20 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-purple-900 md:text-3xl">{product.name}</h1>
                  <p className="text-2xl font-bold text-purple-900">
                    {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <p className="text-gray-600">{product.description}</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="size" className="text-sm font-medium text-gray-700">
                      Tamanho
                    </label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger id="size" className="w-full border-purple-200">
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                      Quantidade
                    </label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-purple-200"
                        onClick={decreaseQuantity}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Diminuir quantidade</span>
                      </Button>
                      <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                        min="1"
                        className="h-9 w-16 border-y border-gray-200 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-purple-200"
                        onClick={increaseQuantity}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Aumentar quantidade</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Opção de Entrega</label>
                    <RadioGroup
                      value={deliveryOption}
                      onValueChange={setDeliveryOption}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery">Entrega</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup">Retirada no local</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="observations" className="text-sm font-medium text-gray-700">
                      Observações (opcional)
                    </label>
                    <Textarea
                      id="observations"
                      placeholder="Alguma observação especial para o seu pedido?"
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      className="min-h-[80px] border-purple-200"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-purple-800 text-white hover:bg-purple-700" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={handleWhatsAppCheckout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Comprar pelo WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="pt-4">
              <p className="text-gray-600">{product.longDescription}</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-purple-900">Você também pode gostar</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {product.relatedProducts.map((relatedProduct) => (
                <Link href={`/produto/${relatedProduct.id}`} key={relatedProduct.id}>
                  <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-md">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-purple-900">{relatedProduct.name}</h3>
                      <p className="mt-1 text-lg font-bold text-purple-900">
                        {relatedProduct.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
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

