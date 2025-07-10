import { Footer } from "../components/Footer";
import { PageHeader } from "../components/PageHeader";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About Us"
        subtitle="Pelajari tentang sejarah dan misi Gold's Gym Indonesia."
        image={{src:"/images/gymfront.webp",alt:"An image of the front of Gold's gym's gym"}}
      />
      <div className="container mx-auto max-w-screen-md py-12 px-4">
        <p className="text-lg text-gray-800 leading-relaxed mb-5">
          {"Gold's Gym Indonesia telah beroperasi di bawah perwakilan perusahaan PT Fit and Health Indonesia sejak 2007, dibangun untuk membantu para member mewujudkan tujuan dan menemukan kekuatan mereka. Di Gold's Gym, hal terpenting bagi member adalah memberikan lingkungan yang energik dan dukungan yang dipenuhi oleh orang - orang yang ingin berkomitmen untuk mencapai tujuan bersama. "}
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
        {" Sejak tahun 1965 Gold's Gym telah diakui dalam industri kebugaran dan sekarang, setiap kali pengunjung datang, pengunjung dapat melihat mengapa hampir 3 juta orang menjadi member Gold's Gym. Gold's Gym telah tersebar di lebih dari 750 lokasi di 35 negara di seluruh dunia. Member Gold's Gym telah mempercayai Gold's Gym sebagai tempat kesehatan dan Kebugaran terbaik. Mulai daari pelatih, peralatan, program, dan kelas latihan berkelompok yang terbaik."}
        </p>
      </div>
      <Footer></Footer>
    </main>
  );
}