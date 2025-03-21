"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"

// Carousel speed in seconds (lower = faster)
const CAROUSEL_SPEED = 5

// Get featured products (only available products)
const featuredProducts = products.filter((product) => product.available).slice(0, 18) // numero de produtos que aparecerão

export function FeaturedCakes() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(featuredProducts.length / itemsPerPage)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Setup auto-scroll
  useEffect(() => {
    // Only setup auto-scroll if there are enough items
    if (featuredProducts.length <= itemsPerPage) return

    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }

      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
      }, CAROUSEL_SPEED * 1000)
    }

    startAutoScroll()

    // Cleanup on unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [totalPages])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  // If there are no products or not enough for a carousel, show all products
  const visibleProducts =
    featuredProducts.length <= itemsPerPage
      ? featuredProducts
      : featuredProducts.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)

  // If there are no products, don't render the section
  if (featuredProducts.length === 0) return null

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-purple-800">Destaques</div>
            <h2 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl">
              Nossos Bolos Mais Amados
            </h2>
            <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Conheça os bolos que fazem mais sucesso entre nossos clientes
            </p>
          </div>
        </div>
        <div className="relative mt-8">
          <div className="grid gap-6 md:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Only show navigation buttons if there are enough items for a carousel */}
          {featuredProducts.length > itemsPerPage && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-4 top-1/2 hidden -translate-y-1/2 transform md:flex"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Anterior</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-4 top-1/2 hidden -translate-y-1/2 transform md:flex"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Próximo</span>
              </Button>
              <div className="mt-6 flex justify-center gap-2 md:hidden">
                <Button variant="outline" size="icon" onClick={prevSlide}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Anterior</span>
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Próximo</span>
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/catalogo">
            <Button className="bg-purple-800 text-white hover:bg-purple-700">Ver Catálogo Completo</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

