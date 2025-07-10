import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto max-w-screen-xl px-4 py-16 md:py-20">
        <div className="bg-black rounded-lg p-10 md:p-16 text-center shadow-2xl">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white tracking-wide">
            Your Transformation Starts Today.
          </h2>
          <p className="mt-4 text-lg text-gray-300 font-inter max-w-xl mx-auto">
            Stop waiting. Start doing. Join the strongest legacy in fitness and unlock your true potential.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-[var(--baseYellow)] text-black font-bold uppercase text-lg px-10 py-7 hover:bg-yellow-400 transform hover:scale-105 transition-transform duration-200"
          >
            <Link href="/signup">Daftar Sekarang</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}