# Guia de Gerenciamento do Site Caseirinhos da Amália

Este guia explica como gerenciar facilmente o conteúdo do seu site de bolos.

## Como adicionar novos produtos

Para adicionar novos produtos ao catálogo, siga estes passos simples:

1. Abra o arquivo `data/products.ts`
2. Localize o array `products` 
3. Adicione um novo objeto seguindo o modelo abaixo:

```typescript
{
  id: 2, // Use um número único e sequencial
  name: "Nome do Bolo", // Nome do produto
  description: "Descrição do bolo...", // Descrição curta
  price: 79.9, // Preço (sem o símbolo R$)
  image: "/caminho/para/imagem.jpg", // Caminho da imagem
  category: "Categoria", // Categoria (ex: Chocolate, Frutas, etc.)
  sizes: ["Pequeno", "Médio", "Grande"], // Tamanhos disponíveis
  available: true // true = produto disponível, false = produto indisponível
}

