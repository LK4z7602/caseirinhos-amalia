// app/sitemap.ts

import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = 3600; // Opcional, mas recomendado

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://caseirinhosdaamalia.vercel.app';

  return [
    {
      url: baseUrl, // URL da página inicial
      lastModified: new Date(), // Data da última modificação
      changeFrequency: 'daily', // Frequência de mudança
      priority: 1, // Prioridade
    },
    {
      url: `${baseUrl}/sobre`, // URL da página "Sobre"
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/catalogo`, // Exemplo de URL para uma página de produtos
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Adicione outras URLs aqui, se necessário
  ];
}