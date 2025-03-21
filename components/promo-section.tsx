import Image from "next/image"
import Link from "next/link"
import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PromoSection() {
  return (
    <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-purple-200 md:-left-6 md:-top-6 md:h-32 md:w-32"></div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-pink-200 md:-bottom-6 md:-right-6 md:h-32 md:w-32"></div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Promoção Especial"
                width={400}
                height={400}
                className="relative rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-purple-800">
              <Sparkles className="mr-1 h-4 w-4" />
              Oferta Especial
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl">
                15% OFF em Bolos de Aniversário
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Use o cupom <span className="font-bold text-purple-800">ANIVERSARIO15</span> e ganhe 15% de desconto em
                qualquer bolo de aniversário. Válido até o final do mês!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/catalogo/aniversario">
                <Button className="bg-purple-800 text-white hover:bg-purple-700">Aproveitar Agora</Button>
              </Link>
              <Link href="/promocoes">
                <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
                  Ver Todas as Promoções
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

