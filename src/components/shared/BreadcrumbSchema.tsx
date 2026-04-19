'use client';

interface BreadcrumbItem {
    name: string;
    item: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const breadcrumbList = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item.startsWith('http') ? item.item : `https://iofest.com${item.item}`,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
        />
    );
}
