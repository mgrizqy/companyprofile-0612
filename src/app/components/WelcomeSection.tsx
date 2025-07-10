import Image from "next/image";
import { Button } from "@/components/ui/button";





export function WelcomeSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-8 md:gap-12">
          
          
          <div className="w-full md:w-6/12 text-center md:text-left">
            
            <p className="font-inter font-semibold text-lg text-[var(--baseYellow)] uppercase tracking-widest">
              Welcome to the Family
            </p>

            
            <h2 className="mt-2 font-oswald text-4xl md:text-5xl font-bold uppercase text-black tracking-wide">
              Stronger Together
            </h2>

            
            <p className="mt-6 text-base md:text-lg text-gray-700 font-inter leading-relaxed">
              {"Gold's Gym Indonesia telah beroperasi di bawah perwakilan perusahaan PT Fit and Health Indonesia sejak 2007. Gold's Gym dibangun untuk membantu para member mewujudkan tujuan dan menemukan kekuatan mereka."}
            </p>

            
            <Button asChild className="mt-8 bg-black text-white font-bold uppercase hover:bg-gray-800 px-8 py-6">
              <a href="/about">Kisah Kami</a>
            </Button>
          </div>

         
          <div className="w-full md:w-6/12">
            <Image
              src="/images/kalibata-anniversary-1.webp"
              alt="A diverse group of members smiling and working out at a Gold's Gym facility in Indonesia"
              width={1600}
              height={1200}
              className="rounded-3xl shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}