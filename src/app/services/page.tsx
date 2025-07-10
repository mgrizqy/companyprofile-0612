import { services,Service } from "@/data/servicesData";


import { PageHeader } from "../components/PageHeader";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card" 
import { Footer } from "../components/Footer";

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        title="Our Services"
        subtitle="Jelajahi berbagai layanan dan fasilitas kelas dunia yang dirancang untuk membantu Anda mencapai sasaran kebugaran Anda."
        
      />
      
      <div className="container mx-auto max-w-screen-xl py-16 px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: Service) => (
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
              <CardFooter className="p-6 pt-0">
                {/* Can add a button here later if needed */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </main>
  );
}