import { MapPin, Phone, Clock } from "lucide-react"; 

export function ContactSection() {
 

  return (
    <section className="bg-white py-16 md:py-24 flex justify-center">
      <div className="container max-w-screen-xl px-4">
        
        <div className="text-center mb-12">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-black tracking-wide">
            Visit Us
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-inter max-w-2xl mx-auto">
            {"We're ready to welcome you. Find our location and opening hours below."}
          </p>
        </div>

        
        <div className="flex  items-center justify-center">
          
         
          <div className="grid grid-cols-3  ">
            <div className="flex-col items-center justify-center gap-4 space-y-2.5">
              <div className="bg-yellow-400 p-3 w-fit rounded-full mx-auto">
                <MapPin className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-oswald font-bold text-center text-black ">Address</h3>
                <p className="text-gray-600 font-inter mt-1 text-center">
                  Jl. Cikini Raya No.2, Cikini, Menteng,<br />
                  Kota Jakarta Pusat, DKI Jakarta 10330, Indonesia
                </p>
              </div>
            </div>

            <div className="flex-col items-center justify-center gap-4 space-y-2.5 ">
              <div className="bg-yellow-400 p-3 rounded-full w-fit mx-auto">
                <Phone className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-oswald font-bold text-black text-center">Phone</h3>
                <p className="text-gray-600 font-inter mt-1 text-center">
                  (021) 123-4567
                </p>
              </div>
            </div>

            <div className="flex-col items-center justify-center gap-4  mb-6 space-y-2.5">
              <div className="bg-yellow-400 p-3 rounded-full w-fit mx-auto">
                <Clock className="h-8 w-8 text-black " />
              </div>
              <div>
                <h3 className="text-xl font-oswald font-bold text-black text-center">Opening Hours</h3>
                <p className="text-gray-600 font-inter mt-1 text-center">
                  Mon - Fri: 06:00 - 22:00<br />
                  Sat - Sun: 08:00 - 20:00
                </p>
              </div>
            </div>
          </div>

          
         

        </div>
      </div>
    </section>
  );
}