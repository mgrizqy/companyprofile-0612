import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  image?: {
    src : string,
    alt : string}
} 

export function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (


    <div className={`mt-21`}>
      {image ? (<Image src={image.src} alt={image.alt} width={5000} height={5000} className="w-full h-60 md:h-150 object-cover object-center" />) : (null) }
      <div className="bg-gray-100 pt-16 pb-16 text-center flex justify-center items-center">
        <div className="  px-4">
          <h1 className="font-oswald text-5xl md:text-6xl font-bold uppercase text-black">
            {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 font-inter max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </div>

  );
}