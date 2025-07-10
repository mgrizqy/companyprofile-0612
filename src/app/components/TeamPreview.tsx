import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


import { team } from "@/data/teamData";

export function TeamsPreview() {
  return (
    <section className="bg-black text-white py-16 md:py-24 flex justify-center">
      <div className="container  max-w-screen-xl px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase tracking-wide">
              Guided by Experts
            </h2>
            <p className="mt-6 text-lg text-gray-300 font-inter leading-relaxed">
              Tim pelatih kami yang bersertifikat dan berpengalaman siap memandu Anda dalam perjalanan kebugaran Anda, memberikan dukungan yang dipersonalisasi untuk membantu Anda mencapai hasil dengan aman dan efektif.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-8 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold uppercase"
            >
              <Link href="/teams">Meet The Full Team</Link>
            </Button>
          </div>

         
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.id} className="text-center group">
                  <div className="relative h-80 w-full overflow-hidden rounded-xl border-1 border-white/18">
                    <Image
                      src={member.image}
                      alt={`Photo of ${member.name}`}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <h3 className="mt-4 font-oswald text-2xl font-semibold uppercase">
                    {member.name}
                  </h3>
                  <p className="text-yellow-400 font-inter uppercase text-sm tracking-wider">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}