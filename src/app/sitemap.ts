import { MetadataRoute } from 'next';
import { competitions } from '@/lib/competitions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iofest.com';

  const competitionPages: MetadataRoute.Sitemap = competitions.map((comp) => ({
    url: `${baseUrl}/kompetisi/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...competitionPages,
  ];
}
