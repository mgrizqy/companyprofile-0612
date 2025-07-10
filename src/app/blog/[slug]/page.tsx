import { apiCall } from "@/helper/apiCall";
import Image from "next/image";
import { notFound } from "next/navigation";
import parse from 'html-react-parser';
import { Post } from "@/types/types"; 
import { Footer } from "@/app/components/Footer";


interface BlogParamSlug  {
  params: Promise<{
   slug:string
  }>;
}


async function getPost(slug: string): Promise<Post | null> {
  try {
    
    const urlWhere = `slug = '${slug}'`;
    const response = await apiCall.get(`/posts`, { params: { where: urlWhere } });

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error(error);
  
    return null;
  }
}


export default async function BlogPostPage({ params }: BlogParamSlug ) {
  
  const {slug} = await params
  
  const postData = await getPost(slug);

  if (!postData) {
    notFound(); 
  }

  return (
    <main className="pt-24 bg-white">
      <section className='flex flex-col items-center px-4'>
        
       
        <div className="text-center max-w-3xl mx-auto">
            {postData.category && (
                <div className='inline-block bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm font-semibold mb-4'>
                    <p>{postData.category}</p>
                </div>
            )}
            <h1 className='text-3xl md:text-5xl mb-4 font-bold text-center font-oswald uppercase'>
                {postData.title}
            </h1>
            <p className="text-gray-500">
                 {postData.authorName || 'Admin'} - {new Date(postData.created).toLocaleDateString('id-ID')}
            </p>
        </div>

        
        {postData.thumbnail && (
            <div className='relative w-full max-w-4xl h-64 md:h-[500px] mt-12 mb-12 rounded-lg overflow-hidden shadow-lg'>
                <Image 
                    src={postData.thumbnail} 
                    alt={postData.title} 
                    fill
                    className='object-cover object-center'  
                />
            </div>
        )}
        
       
        <div className=' max-w-3xl mx-auto w-full mb-25'>
            <p>{parse(postData.content)}</p>
        </div>
      </section>
        <Footer></Footer>
    </main>
  );
}