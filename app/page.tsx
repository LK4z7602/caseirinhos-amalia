"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedCakes } from "@/components/featured-cakes"
import { TestimonialSection } from "@/components/testimonial-section"
import { siteConfig } from "@/data/site-config"
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  const [cartItems, setCartItems] = useState<any[]>([])

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
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100/90 to-pink-100/70"></div>
          <div className="container relative px-4 py-12 md:px-6 md:py-24">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
                    Bolos Caseiros com <br></br>Amor e Carinho
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {siteConfig.slogan}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/catalogo">
                    <Button className="bg-purple-800 text-white hover:bg-purple-700">Ver Catálogo</Button>
                  </Link>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
                      Fale Conosco
                    </Button>
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/AmaliaCaseirinhos1.jpg"
                  alt="Bolo Caseiro"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <FeaturedCakes />

        <TestimonialSection />
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

