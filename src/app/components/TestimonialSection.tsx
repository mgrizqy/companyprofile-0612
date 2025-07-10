import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { testimonials } from "@/data/testimonialData";



export function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 flex justify-center">
      <div className="container  max-w-screen-xl px-4">
        
        <div className="text-center mb-12 flex-col items-center justify-center">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-black tracking-wide">
            What Our Members Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-inter  ">
            Testimoni dari komunitas kami yang berdedikasi.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border border-gray-200/80 shadow-lg rounded-lg overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center text-center">
               
                {/* <svg className="w-10 h-10 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a4 4 0 00-4 4v8a4 4 0 004 4h4a4 4 0 004-4V6a4 4 0 00-4-4H6zm0 2h4a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm10-2a4 4 0 00-4 4v8a4 4 0 004 4h4a2 2 0 002-2V6a4 4 0 00-4-4h-2zm0 2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6a2 2 0 012-2z" clipRule="evenodd" />
                </svg> */}
                
                <p className="text-gray-700 font-inter text-lg italic leading-relaxed">
                  {`"${testimonial.quote}"`}
                </p>
                
                <div className="mt-6 flex flex-col items-center">
                  <div className="rounded-full overflow-hidden ">
                  <Image
                  
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.author}`}
                    width={64}
                    height={64}
                    className=" scale-130 object-cover"
                    
                  />
                  </div>
                  <div className="mt-3">
                    <p className="font-oswald text-xl font-bold text-black">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 font-inter">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}