export const siteConfig = {
    name: "I/O FESTIVAL 2026",
    shortName: "IOFEST",
    description: "The ultimate futuristic tech competition bringing together visionaries, developers, and creators to redefine the boundaries of what is possible.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://iofest.com",
    ogImage: "/og-image.jpg",
    links: {
        twitter: "https://twitter.com/iofestival",
        github: "https://github.com/iofestival",
        instagram: "https://instagram.com/iofest.untar",
    },
    contact: {
        email: "iobemftiuntar@gmail.com",
        address: "Universitas Tarumanagara, Jl. Letjen S. Parman No.1, Jakarta Barat",
        mapLocation: {
            lng: 106.7888,
            lat: -6.1678
        }
    },
    metadata: {
        keywords: [
            "hackathon",
            "tech festival",
            "coding competition",
            "Indonesia",
            "technology",
            "innovation",
            "Bauhaus",
            "cyberpunk",
            "Web Development",
            "Data Science",
            "UI/UX Design"
        ]
    }
};

export type SiteConfig = typeof siteConfig;
