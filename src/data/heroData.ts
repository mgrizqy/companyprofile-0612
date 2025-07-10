
export interface HeroSlide {
  id: number;
  image: string;
  headline: string;
  subheadline?: string; 
  descText: string;
  link: string;
  isBrandSlide?: boolean; 
  alt:string;
}

export const heroSlidesData: HeroSlide[] = [
 
  {
    id: 1,
    image: "/images/testYellow3.webp", 
    headline: "Gold's Gym",
    descText: "Gabung Sekarang",
    link: "/signup",
    isBrandSlide: true, 
    alt: "A group of people doing exercise together"
  },
  {
    id: 2,
    image: "/images/hero-image-1.webp",
    headline: "STRENGTH FOR LIFE",
    subheadline: "Nama paling dikenal di dunia kebugaran. Tempat terbaik untuk membangun legasi Anda.",
    descText: "Kisah Kami",
    link: "/about",
    alt: "A man sitting, getting ready for exercise"
  },
  {
    id: 3,
    image: "/images/hero-image-2-1.webp",
    headline: "YOUR LEGACY STARTS HERE",
    subheadline: "Peralatan terbaik, pelatih ahli, dan komunitas yang selalu mendukung Anda.",
    descText: "Lihat Membership",
    link: "/services",
    alt: "Gold's gym room"
  },
  
];
