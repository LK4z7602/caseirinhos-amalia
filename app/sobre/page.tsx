"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/data/site-config"

export default function AboutPage() {
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
        <section className="bg-pink-50 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
                  Sobre Nós
                </h1>
                <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {siteConfig.slogan}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter text-purple-900">Nossa História</h2>
                  <p className="text-gray-600">
                    Tudo começou na pandemia, visando que ninguém podia sair de casa para ir em uma padaria ou supermercado comprar seus pães e bolos. Descobri minha paixão em fazer bolos fresquinhos caseiros. Fundada em 2020, a Caseirinhos da Amália nasceu na cozinha de casa, com receitas de
                    família passadas de geração em geração.
                  </p>
                  <p className="text-gray-600">
                    O que começou como um hobby se transformou em um negócio de sucesso, sempre mantendo o compromisso
                    com a qualidade e o sabor caseiro que nos tornaram conhecidos. Cada bolo é preparado com carinho e
                    atenção aos detalhes, como se estivéssemos fazendo para nossa própria família.
                  </p>
                  <p className="text-gray-600">
                    Hoje, continuamos com a mesma dedicação e amor pela confeitaria, trazendo para você bolos caseiros e
                    cake donuts sempre fresquinhos, direto da minha casa para a sua casa!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-purple-200 md:-left-6 md:-top-6 md:h-32 md:w-32"></div>
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-pink-200 md:-bottom-6 md:-right-6 md:h-32 md:w-32"></div>
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Nossa História"
                    width={400}
                    height={400}
                    className="relative rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-pink-50 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900">Nossos Valores</h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Princípios que guiam nosso trabalho todos os dias
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg bg-white p-6 shadow-sm">
                <div className="rounded-full bg-purple-100 p-3">
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
                    className="h-6 w-6 text-purple-800"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-900">Amor</h3>
                <p className="text-center text-gray-600">
                  Cada bolo é feito com amor e dedicação, como se fosse para nossa própria família.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg bg-white p-6 shadow-sm">
                <div className="rounded-full bg-purple-100 p-3">
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
                    className="h-6 w-6 text-purple-800"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-900">Qualidade</h3>
                <p className="text-center text-gray-600">
                  Utilizamos apenas ingredientes selecionados e de alta qualidade em nossas receitas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg bg-white p-6 shadow-sm">
                <div className="rounded-full bg-purple-100 p-3">
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
                    className="h-6 w-6 text-purple-800"
                  >
                    <path d="M12 8a2 2 0 0 0-2 2c0 .9.5 1.67 1.2 2.07A3 3 0 0 0 9 15v1h6v-1a3 3 0 0 0-2.2-2.93c.7-.4 1.2-1.17 1.2-2.07a2 2 0 0 0-2-2" />
                    <path d="M5 3a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 0h14" />
                    <path d="M12 19v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-900">Autenticidade</h3>
                <p className="text-center text-gray-600">
                  Mantemos o sabor caseiro e autêntico em todos os nossos produtos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="order-2 md:order-1 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Nosso Processo"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="order-1 md:order-2 flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter text-purple-900">Nosso Processo</h2>
                  <p className="text-gray-600">
                    Cada bolo é preparado com cuidado e atenção aos detalhes. Utilizamos técnicas tradicionais
                    combinadas com toques modernos para criar bolos que são verdadeiras obras de arte.
                  </p>
                  <p className="text-gray-600">
                    Nosso processo começa com a seleção dos melhores ingredientes. Em seguida, seguimos receitas
                    testadas e aprovadas, algumas delas passadas de geração em geração em nossa família.
                  </p>
                  <p className="text-gray-600">
                    Todos os bolos são feitos no dia do pedido, garantindo frescor e qualidade. Nosso compromisso é
                    entregar sempre o melhor para você e sua família.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/catalogo">
                    <Button className="bg-purple-800 text-white hover:bg-purple-700">Ver Nossos Bolos</Button>
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
            </div>
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

