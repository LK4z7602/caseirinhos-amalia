"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

// Sample data for cake customization
const cakeBases = [
  { id: "chocolate", name: "Chocolate", price: 40 },
  { id: "vanilla", name: "Baunilha", price: 35 },
  { id: "redvelvet", name: "Red Velvet", price: 45 },
  { id: "carrot", name: "Cenoura", price: 38 },
  { id: "lemon", name: "Limão", price: 38 },
  { id: "coconut", name: "Coco", price: 40 },
]

const fillings = [
  { id: "chocolate", name: "Chocolate", price: 15 },
  { id: "strawberry", name: "Morango", price: 18 },
  { id: "dulcedeleche", name: "Doce de Leite", price: 20 },
  { id: "brigadeiro", name: "Brigadeiro", price: 18 },
  { id: "whitechocolate", name: "Chocolate Branco", price: 20 },
  { id: "coconut", name: "Coco", price: 15 },
  { id: "lemon", name: "Limão", price: 15 },
  { id: "passion", name: "Maracujá", price: 18 },
]

const toppings = [
  { id: "ganache", name: "Ganache de Chocolate", price: 25 },
  { id: "chantilly", name: "Chantilly", price: 20 },
  { id: "fondant", name: "Pasta Americana", price: 30 },
  { id: "buttercream", name: "Buttercream", price: 25 },
  { id: "nakedcake", name: "Naked Cake", price: 15 },
  { id: "fruits", name: "Frutas Frescas", price: 25 },
]

const decorations = [
  { id: "flowers", name: "Flores de Açúcar", price: 20 },
  { id: "sprinkles", name: "Confeitos Coloridos", price: 10 },
  { id: "chocolate", name: "Raspas de Chocolate", price: 15 },
  { id: "macarons", name: "Macarons", price: 25 },
  { id: "berries", name: "Frutas Vermelhas", price: 20 },
  { id: "gold", name: "Folhas de Ouro", price: 30 },
]

const sizes = [
  { id: "small", name: "Pequeno (1kg)", serves: "8-10 pessoas", price: 0 },
  { id: "medium", name: "Médio (2kg)", serves: "15-20 pessoas", price: 50 },
  { id: "large", name: "Grande (3kg)", serves: "25-30 pessoas", price: 100 },
  { id: "xlarge", name: "Extra Grande (4kg)", serves: "35-40 pessoas", price: 150 },
]

export default function CustomizePage() {
  const [cakeBase, setCakeBase] = useState(cakeBases[0].id)
  const [cakeFilling, setCakeFilling] = useState(fillings[0].id)
  const [cakeTopping, setCakeTopping] = useState(toppings[0].id)
  const [cakeDecoration, setCakeDecoration] = useState(decorations[0].id)
  const [cakeSize, setCakeSize] = useState(sizes[0].id)
  const [cakeMessage, setCakeMessage] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [currentStep, setCurrentStep] = useState(0)

  const steps = ["Base e Recheio", "Cobertura e Decoração", "Tamanho e Mensagem", "Revisão e Finalização"]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getSelectedItem = (items: any[], selectedId: string) => {
    return items.find((item) => item.id === selectedId) || items[0]
  }

  const calculateTotal = () => {
    const basePrice = getSelectedItem(cakeBases, cakeBase).price
    const fillingPrice = getSelectedItem(fillings, cakeFilling).price
    const toppingPrice = getSelectedItem(toppings, cakeTopping).price
    const decorationPrice = getSelectedItem(decorations, cakeDecoration).price
    const sizePrice = getSelectedItem(sizes, cakeSize).price

    return basePrice + fillingPrice + toppingPrice + decorationPrice + sizePrice
  }

  const handleWhatsAppCheckout = () => {
    const selectedBase = getSelectedItem(cakeBases, cakeBase)
    const selectedFilling = getSelectedItem(fillings, cakeFilling)
    const selectedTopping = getSelectedItem(toppings, cakeTopping)
    const selectedDecoration = getSelectedItem(decorations, cakeDecoration)
    const selectedSize = getSelectedItem(sizes, cakeSize)
    const total = calculateTotal()

    const message = encodeURIComponent(
      `Olá! Gostaria de encomendar um bolo personalizado:\n\n*Detalhes do Bolo:*\n*Base:* ${
        selectedBase.name
      }\n*Recheio:* ${selectedFilling.name}\n*Cobertura:* ${selectedTopping.name}\n*Decoração:* ${
        selectedDecoration.name
      }\n*Tamanho:* ${selectedSize.name} (${selectedSize.serves})\n${
        cakeMessage ? `*Mensagem no Bolo:* ${cakeMessage}\n` : ""
      }${
        specialInstructions ? `*Instruções Especiais:* ${specialInstructions}\n` : ""
      }\n*Valor Total:* ${total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}\n\nPoderia me informar sobre as opções de entrega e pagamento?`,
    )
    window.open(`https://wa.me/5500000000000?text=${message}`, "_blank")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=40&width=40" alt="Logo da Caseirinhos da Amália" width={40} height={40} />
            <span className="text-xl font-semibold text-purple-800">Caseirinhos da Amália</span>
          </Link>
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
            <Link href="/contato" className="text-sm font-medium text-purple-800 hover:text-purple-600">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/carrinho" className="relative">
              <ShoppingCart className="h-5 w-5 text-purple-800" />
              <span className="sr-only">Carrinho</span>
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-800 text-[10px] font-medium text-white">
                0
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
          <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
                Personalize Seu Bolo
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Crie um bolo único para sua ocasião especial. Escolha sabores, coberturas e decorações.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-1 items-center ${index !== steps.length - 1 ? "after:content-[''] after:h-[2px] after:flex-1 after:mx-2 after:bg-gray-200" : ""}`}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                        index < currentStep
                          ? "bg-green-100 text-green-600"
                          : index === currentStep
                            ? "bg-purple-800 text-white"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className="ml-2 hidden text-sm font-medium md:block">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              {currentStep === 0 && (
                <div className="space-y-6 rounded-lg border p-6">
                  <h2 className="text-xl font-semibold text-purple-900">Escolha a Base e o Recheio</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cake-base" className="text-base">
                        Base do Bolo
                      </Label>
                      <RadioGroup
                        id="cake-base"
                        value={cakeBase}
                        onValueChange={setCakeBase}
                        className="mt-2 grid gap-2 sm:grid-cols-2"
                      >
                        {cakeBases.map((base) => (
                          <Label
                            key={base.id}
                            htmlFor={`base-${base.id}`}
                            className="flex cursor-pointer items-center justify-between rounded-md border p-4 [&:has(:checked)]:bg-purple-50 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-purple-800"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id={`base-${base.id}`} value={base.id} />
                              <span>{base.name}</span>
                            </div>
                            <span className="font-medium text-purple-800">
                              +{base.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="cake-filling" className="text-base">
                        Recheio
                      </Label>
                      <RadioGroup
                        id="cake-filling"
                        value={cakeFilling}
                        onValueChange={setCakeFilling}
                        className="mt-2 grid gap-2 sm:grid-cols-2"
                      >
                        {fillings.map((filling) => (
                          <Label
                            key={filling.id}
                            htmlFor={`filling-${filling.id}`}
                            className="flex cursor-pointer items-center justify-between rounded-md border p-4 [&:has(:checked)]:bg-purple-50 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-purple-800"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id={`filling-${filling.id}`} value={filling.id} />
                              <span>{filling.name}</span>
                            </div>
                            <span className="font-medium text-purple-800">
                              +{filling.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-purple-800 text-white hover:bg-purple-700" onClick={nextStep}>
                      Próximo <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6 rounded-lg border p-6">
                  <h2 className="text-xl font-semibold text-purple-900">Escolha a Cobertura e Decoração</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cake-topping" className="text-base">
                        Cobertura
                      </Label>
                      <RadioGroup
                        id="cake-topping"
                        value={cakeTopping}
                        onValueChange={setCakeTopping}
                        className="mt-2 grid gap-2 sm:grid-cols-2"
                      >
                        {toppings.map((topping) => (
                          <Label
                            key={topping.id}
                            htmlFor={`topping-${topping.id}`}
                            className="flex cursor-pointer items-center justify-between rounded-md border p-4 [&:has(:checked)]:bg-purple-50 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-purple-800"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id={`topping-${topping.id}`} value={topping.id} />
                              <span>{topping.name}</span>
                            </div>
                            <span className="font-medium text-purple-800">
                              +{topping.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="cake-decoration" className="text-base">
                        Decoração
                      </Label>
                      <RadioGroup
                        id="cake-decoration"
                        value={cakeDecoration}
                        onValueChange={setCakeDecoration}
                        className="mt-2 grid gap-2 sm:grid-cols-2"
                      >
                        {decorations.map((decoration) => (
                          <Label
                            key={decoration.id}
                            htmlFor={`decoration-${decoration.id}`}
                            className="flex cursor-pointer items-center justify-between rounded-md border p-4 [&:has(:checked)]:bg-purple-50 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-purple-800"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id={`decoration-${decoration.id}`} value={decoration.id} />
                              <span>{decoration.name}</span>
                            </div>
                            <span className="font-medium text-purple-800">
                              +{decoration.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-purple-800 text-purple-800 hover:bg-purple-50"
                      onClick={prevStep}
                    >
                      Voltar
                    </Button>
                    <Button className="bg-purple-800 text-white hover:bg-purple-700" onClick={nextStep}>
                      Próximo <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 rounded-lg border p-6">
                  <h2 className="text-xl font-semibold text-purple-900">Escolha o Tamanho e Adicione uma Mensagem</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cake-size" className="text-base">
                        Tamanho do Bolo
                      </Label>
                      <RadioGroup
                        id="cake-size"
                        value={cakeSize}
                        onValueChange={setCakeSize}
                        className="mt-2 grid gap-2"
                      >
                        {sizes.map((size) => (
                          <Label
                            key={size.id}
                            htmlFor={`size-${size.id}`}
                            className="flex cursor-pointer items-center justify-between rounded-md border p-4 [&:has(:checked)]:bg-purple-50 [&:has(:checked)]:ring-1 [&:has(:checked)]:ring-purple-800"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id={`size-${size.id}`} value={size.id} />
                              <div>
                                <span className="font-medium">{size.name}</span>
                                <p className="text-sm text-gray-500">{size.serves}</p>
                              </div>
                            </div>
                            <span className="font-medium text-purple-800">
                              {size.price > 0
                                ? `+${size.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
                                : "Incluído"}
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cake-message" className="text-base">
                        Mensagem no Bolo (opcional)
                      </Label>
                      <Input
                        id="cake-message"
                        placeholder="Ex: Feliz Aniversário Maria!"
                        value={cakeMessage}
                        onChange={(e) => setCakeMessage(e.target.value)}
                        className="border-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="special-instructions" className="text-base">
                        Instruções Especiais (opcional)
                      </Label>
                      <Textarea
                        id="special-instructions"
                        placeholder="Alguma instrução especial para o preparo do seu bolo?"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="min-h-[100px] border-purple-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-purple-800 text-purple-800 hover:bg-purple-50"
                      onClick={prevStep}
                    >
                      Voltar
                    </Button>
                    <Button className="bg-purple-800 text-white hover:bg-purple-700" onClick={nextStep}>
                      Revisar Pedido <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 rounded-lg border p-6">
                  <h2 className="text-xl font-semibold text-purple-900">Revise seu Pedido</h2>

                  <div className="space-y-4">
                    <div className="rounded-lg bg-purple-50 p-4">
                      <h3 className="mb-2 font-medium text-purple-900">Detalhes do Bolo</h3>
                      <dl className="grid gap-2 text-sm">
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Base:</dt>
                          <dd>{getSelectedItem(cakeBases, cakeBase).name}</dd>
                        </div>
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Recheio:</dt>
                          <dd>{getSelectedItem(fillings, cakeFilling).name}</dd>
                        </div>
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Cobertura:</dt>
                          <dd>{getSelectedItem(toppings, cakeTopping).name}</dd>
                        </div>
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Decoração:</dt>
                          <dd>{getSelectedItem(decorations, cakeDecoration).name}</dd>
                        </div>
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Tamanho:</dt>
                          <dd>{getSelectedItem(sizes, cakeSize).name}</dd>
                        </div>
                        {cakeMessage && (
                          <div className="grid grid-cols-2">
                            <dt className="font-medium text-gray-600">Mensagem:</dt>
                            <dd>{cakeMessage}</dd>
                          </div>
                        )}
                        {specialInstructions && (
                          <div className="grid grid-cols-2">
                            <dt className="font-medium text-gray-600">Instruções Especiais:</dt>
                            <dd>{specialInstructions}</dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    <div className="rounded-lg bg-pink-50 p-4">
                      <h3 className="mb-2 font-medium text-purple-900">Resumo de Preços</h3>
                      <dl className="grid gap-2 text-sm">
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Base:</dt>
                          <dd>
                            {getSelectedItem(cakeBases, cakeBase).price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Recheio:</dt>
                          <dd>
                            {getSelectedItem(fillings, cakeFilling).price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Cobertura:</dt>
                          <dd>
                            {getSelectedItem(toppings, cakeTopping).price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Decoração:</dt>
                          <dd>
                            {getSelectedItem(decorations, cakeDecoration).price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2">
                          <dt className="font-medium text-gray-600">Tamanho:</dt>
                          <dd>
                            {getSelectedItem(sizes, cakeSize).price > 0
                              ? getSelectedItem(sizes, cakeSize).price.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })
                              : "Incluído"}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 border-t pt-2">
                          <dt className="font-bold text-purple-900">Total:</dt>
                          <dd className="font-bold text-purple-900">
                            {calculateTotal().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-purple-800 text-purple-800 hover:bg-purple-50"
                      onClick={prevStep}
                    >
                      Voltar
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50"
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
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.
709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                          />
                        </svg>
                        Finalizar pelo WhatsApp
                      </Button>
                      <Button className="bg-purple-800 text-white hover:bg-purple-700">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Adicionar ao Carrinho
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="sticky top-20 space-y-6">
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-semibold text-purple-900">Seu Bolo Personalizado</h3>
                  <div className="aspect-square overflow-hidden rounded-lg bg-pink-50">
                    <div className="flex h-full items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Bolo Personalizado"
                        width={300}
                        height={300}
                        className="h-auto max-h-full w-auto max-w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base:</span>
                      <span className="font-medium">{getSelectedItem(cakeBases, cakeBase).name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recheio:</span>
                      <span className="font-medium">{getSelectedItem(fillings, cakeFilling).name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cobertura:</span>
                      <span className="font-medium">{getSelectedItem(toppings, cakeTopping).name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Decoração:</span>
                      <span className="font-medium">{getSelectedItem(decorations, cakeDecoration).name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tamanho:</span>
                      <span className="font-medium">{getSelectedItem(sizes, cakeSize).name}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-purple-900">Total:</span>
                        <span className="font-bold text-purple-900">
                          {calculateTotal().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-semibold text-purple-900">Precisa de Ajuda?</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Tem dúvidas sobre como personalizar seu bolo? Entre em contato conosco para obter assistência.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-purple-800 text-purple-800 hover:bg-purple-50"
                    onClick={() => window.open("https://wa.me/5500000000000", "_blank")}
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
                    Falar com um Atendente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/placeholder.svg?height=40&width=40" alt="Logo da Caseirinhos da Amália" width={40} height={40} />
                <span className="text-xl font-semibold text-purple-800">Caseirinhos da Amália</span>
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
                <Link href="/contato" className="text-sm text-gray-500 hover:text-purple-800">
                  Contato
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-900">Contato</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <p>WhatsApp: (00) 00000-0000</p>
                <p>Email: contato@caseirinhosdaamalia.com.br</p>
                <p>Endereço: Rua dos Bolos, 123 - Cidade</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-900">Newsletter</h3>
              <p className="text-sm text-gray-500">Inscreva-se para receber novidades e promoções exclusivas.</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  required
                />
                <Button type="submit" className="bg-purple-800 text-white hover:bg-purple-700">
                  Enviar
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Caseirinhos da Amália. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

