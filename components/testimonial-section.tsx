"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"

// Sample testimonial data - fully customizable
const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Cliente Fiel",
    content:
      "Os bolos da Caseirinhos da Amália são simplesmente divinos! Sempre encomendo para os aniversários da família e todos adoram. O sabor é inconfundível e o atendimento é excelente.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "João Oliveira",
    role: "Cliente",
    content:
      "Encomendei um bolo personalizado para o aniversário da minha esposa e superou todas as expectativas. O sabor, a apresentação, tudo perfeito! Recomendo a todos.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Ana Santos",
    role: "Cliente Frequente",
    content:
      "Já experimentei vários sabores e nunca me decepcionei. Os bolos são sempre fresquinhos, macios e com o sabor caseiro que a gente ama. Parabéns pelo trabalho!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container px-4 md:px-6">
        {/* <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A satisfação dos nossos clientes é nossa maior recompensa
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="relative rounded-lg bg-pink-50 p-6 md:p-8">
            <Quote className="absolute left-4 top-4 h-8 w-8 text-purple-200 md:h-10 md:w-10" />
            <div className="relative z-10">
              <p className="mb-4 text-center text-gray-600 md:text-lg">{currentTestimonial.content}</p>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2 h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={currentTestimonial.avatar || "/placeholder.svg"}
                    alt={currentTestimonial.name}
                    width={60}
                    height={60}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-purple-900">{currentTestimonial.name}</h4>
                  <p className="text-sm text-gray-500">{currentTestimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-purple-800 text-purple-800 hover:bg-purple-50"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Anterior</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-purple-800 text-purple-800 hover:bg-purple-50"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próximo</span>
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  )
}

