 export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const placeholder1 : string = `/images/gymillus.webp`

 
 export const services: Service[] = [
  {
    id: 1,
    title: "Personal Training",
    description: "Raih target kebugaran Anda dengan program latihan yang dirancang khusus dan panduan ahli dari pelatih pribadi kami yang bersertifikat.",
    image: placeholder1,
  },
  {
    id: 2,
    title: "Group Classes",
    description: "Ikuti kelas grup penuh energi kami seperti High-Intensity Interval Training (HIIT), Yoga, dan Latihan Kardio untuk semua level kebugaran.",
    image: placeholder1,
  },
  {
    id: 3,
    title: "Strength Training",
    description: "Bangun kekuatan dan massa otot dengan jajaran lengkap free weights, squat rack, dan peralatan latihan beban khusus dari kami.",
    image: placeholder1,
  },
    {
    id: 4,
    title: "Cardio & Endurance",
    description: "Tingkatkan kesehatan kardiovaskular Anda dengan berbagai pilihan treadmill, elliptical, sepeda statis, dan banyak lagi.",
    image: placeholder1,
  },
  {
    id: 5,
    title: "Nutrition Counseling",
    description: "Lengkapi latihan Anda dengan saran nutrisi ahli untuk memberi energi pada tubuh, mengoptimalkan pemulihan, dan mencapai hasil.",
    image: placeholder1,
  },
  {
    id: 6,
    title: "Recovery Zone",
    description: "Rileks dan pulihkan diri dengan fasilitas seperti sauna, ruang uap, dan tempat tidur hydromassage untuk menenangkan otot Anda.",
    image: placeholder1,
  },
];
