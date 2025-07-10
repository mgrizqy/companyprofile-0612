"use client"; 


import { services, Service } from "@/data/servicesData";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const showedServices = services.slice(0, 3); // take only 3 items from the array

export function ServicesPreview() {
  return (
    <section className="bg-white py-16 md:py-24 flex justify-center">
      <div className="container  max-w-screen-xl px-4">
        
        <div className="text-center mb-12">
          <p className="font-inter font-semibold text-lg text-[var(--baseYellow)] uppercase tracking-widest">
            Our Programs
          </p>
          <h2 className="mt-2 font-oswald text-4xl md:text-5xl font-bold uppercase text-black tracking-wide">
            Designed For Your Goals
          </h2>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showedServices.map((service: Service) => (
            <Card
              key={service.id}
              className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`Image for ${service.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-oswald text-2xl font-bold text-black uppercase">
                  {service.title}
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600 font-inter text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-[var(--baseYellow)] text-black font-bold uppercase hover:bg-yellow-400 px-10 py-6"
          >
            <Link href="/services">Lihat Semua Layanan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}