// Arquivo de configuração de produtos
// Adicione, edite ou remova produtos facilmente editando este arquivo

export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  sizes: string[]
  available: boolean
}

// Adicione seus produtos aqui
export const products: Product[] = [
  {
    id: 1,
    name: "Bolo de Chocolate com Brigadeiro",
    description: "Delicioso bolo de chocolate com cobertura de brigadeiro.",
    price: 49.9,
    image: "/Brigadeiro.jpg",
    category: "Chocolate",
    sizes: ["Único"],
    available: true,
  },
  {
    id: 2,
    name: "Bolo de Iogurte com Mousse de Limão",
    description: "Delicioso bolo de iogurte c/ raspas de limão e mousse limão.",
    price: 39.9,
    image: "/IogurteLimao.jpg",
    category: "Iogurte",
    sizes: ["Único"],
    available: true,
  },
  {
    id: 3,
    name: "Bolo Brownie com Ganache",
    description: "Delicioso bolo Brownie com cobertura de ganache de chocolate meio-amargo.",
    price: 49.9,
    image: "/BrownieBolo.jpg",
    category: "Chocolate",
    sizes: ["Único"],
    available: true,
  },
  {
    id: 4,
    name: "Bolo de Cenoura com Cobertura",
    description: "Delicioso bolo de cenoura com cobertura de ganache de chocolate ao leite.",
    price: 36.9,
    image: "/CenouraChocolate.jpg",
    category: "Chocolate",
    sizes: ["Único"],
    available: true,
  },
  {
    id: 5,
    name: "Bolo de Fubá com Goiabada Gourmet",
    description: "Delicioso bolo de fubá com pedaços de goiabada gourmet.",
    price: 44.9,
    image: "/FubaGoiabada.jpg",
    category: "Outros",
    sizes: ["Único"],
    available: true,
  },
  {
    id: 6,
    name: "Bolo Mesclado - Chocolate e Baunilha",
    description: "Delicioso bolo de Chocolate e Baunilha. Juntos!",
    price: 39.9,
    image: "/Mesclado.jpg",
    category: "Outros",
    sizes: ["Único"],
    available: true,
  },
  {
    id: 7,
    name: "Bolo Piscina de Morango + Brigadeiro",
    description: "Delicioso Bolo Piscina Recheado com morangos coberto com brigadeiro",
    price: 49.9,
    image: "/PiscinaMorBriga.jpg",
    category: "Piscina",
    sizes: ["Médio"],
    available: true,
  },
  {
    id: 8,
    name: "Bolo Salgado de Pizza - Presunto e Muçarela",
    description: "Delicioso Bolo Salgado de Presunto e Queijo, Pizza!",
    price: 37.9,
    image: "/SalgadoPizza.jpg",
    category: "Salgado",
    sizes: ["Forma de 19x16x7cm"],
    available: true,
  },
  {
    id: 9,
    name: "Bolo de Iogurte Gourmet - Iogurte Grego",
    description: "Delicioso Bolo de Iogurte Grego. Gourmet, do seu jeito!",
    price: 31.9,
    image: "/IogurtePuro.jpg",
    category: "Iogurte",
    sizes: ["Forma de 19x17x5cm"],
    available: true,
  },
  {
    id: 10,
    name: "Bolo de Iogurte com Raspas de Laranja",
    description: "Delicioso Bolo de Iogurte com raspas de laranja fresca!",
    price: 33.9,
    image: "/IogurteLaranja.jpg",
    category: "Iogurte",
    sizes: ["Forma de 19x17x5cm"],
    available: true,
  },
  {
    id: 11,
    name: "Bolo de Milho e Coco Gourmetizado",
    description: "Delicioso Bolo de Milho e Coco Gourmetizado",
    price: 37.9,
    image: "/MilhoCoco.jpg",
    category: "Outros",
    sizes: ["Forma de 19x17x5cm"],
    available: true,
  },
  {
    id: 12,
    name: "Bolo Fondue de Chocolate ao leite",
    description: "Delicioso Bolo Fondue de Chocolate ao leite!",
    price: 37.9,
    image: "/FondueChoc.jpg",
    category: "Chocolate",
    sizes: ["Forma de 19x17x5cm"],
    available: true,
  },
  {
    id: 13,
    name: "Bolo de Chocolate ao Ninho - Choconinho",
    description: "Delicioso Bolo de Chocolate com cobertura de Ninho!",
    price: 42.9,
    image: "/Choconinho.jpg",
    category: "Chocolate",
    sizes: ["Forma de 19x17x5cm"],
    available: true,
  },
  {
    id: 14,
    name: "Bolo de Banana com Doce de Leite",
    description: "Delicioso Bolo de Banana com cobertura de Doce de Leite!",
    price: 32.9,
    image: "/BananaDoceLeite.jpg",
    category: "Outros",
    sizes: ["Forma de 19x17x5cm"],
    available: true,
  },
  {
    id: 15,
    name: "Bolo Salgado de Calabresa e Muçarela",
    description: "Delicioso Bolo Salgado de Calabresa e Muçarela!",
    price: 34.9,
    image: "/CalabresaMussarela.jpg",
    category: "Salgado",
    sizes: ["Forma de 19x17x5cm"],
    available: true,
  },
  {
    id: 16,
    name: "Bolo Piscina Tropical de Frutas",
    description: "Delicioso Bolo Piscina Tropical de Frutas!",
    price: 36.9,
    image: "/Tropical.jpg",
    category: "Piscina",
    sizes: ["P - Valor pode Alterar", "G - Valor pode Alterar"],
    available: true,
  },
  {
    id: 17,
    name: "Buquê na caixa, com 6 UN. Cake Donuts de baunilha",
    description: "Deliciosos cake donuts com buquê para o seu Amor!",
    price: 19.9,
    image: "/BuqueDonuts.jpg",
    category: "Donuts",
    sizes: ["Único"],
    available: true,
  },
  {
    id: 18,
    name: "Copo com 6 UN. cake donuts baunilha (misto)",
    description: "Deliciosos cake donuts no copo, massa de baunilha com cobertura ao leite ou branco!",
    price: 12.9,
    image: "/CopoDonuts.jpg",
    category: "Donuts",
    sizes: ["Único"],
    available: true,
  },
  {
    id: 19,
    name: "Caixa craft com 12 UN. cake donuts baunilha",
    description: "Deliciosos cake donuts na caixa, massa de baunilha com cobertura ao leite ou branco!",
    price: 23.9,
    image: "/CaixaDonuts.jpg",
    category: "Donuts",
    sizes: ["Único"],
    available: true,
  }
  // Adicione mais produtos seguindo o mesmo formato
]

// Obter todas as categorias únicas dos produtos
export const getCategories = (): string[] => {
  const categories = products.filter((product) => product.available).map((product) => product.category)
  return ["Todos", ...Array.from(new Set(categories))]
}

// Obter produtos por categoria
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "Todos") {
    return products.filter((product) => product.available)
  }
  return products.filter((product) => product.category === category && product.available)
}

// Obter produto por ID
export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id && product.available)
}

