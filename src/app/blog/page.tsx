"use client";

import { useEffect, useState } from "react";
import { apiCall } from "@/helper/apiCall";
import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";;
import { Button } from "@/components/ui/button";
import { Post } from "@/types/types";
import { blogCategories } from "@/data/categoriesData";
import Image from "next/image";

export default function BlogPage() {

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<string[]>(blogCategories);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getPosts = async () => {
            setCategories(blogCategories)
            setIsLoading(true);
            try {
                const response = await apiCall.get('/posts?where=%60published%60%20%3D%20TRUE&sortBy=%60created%60%20desc');
                const posts: Post[] = response.data;


                setAllPosts(posts);
                setFilteredPosts(posts);



            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        getPosts();
    }, []);


    const handleFilterChange = (category: string) => {
        setSelectedCategory(category);
        if (category === "All") {

            setFilteredPosts(allPosts);
        } else {

            const filtered = allPosts.filter(post => post.category === category);
            setFilteredPosts(filtered);
        }
    };

    return (
        <main>
            <PageHeader
                title="Our Blog"
                subtitle="Wawasan tentang pelatihan, nutrisi, dan gaya hidup Gold's Gym."
            />
            <div className="container mx-auto max-w-screen-xl py-16 px-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
                    </div>
                ) : (
                    <>

                        <div className="flex justify-center flex-wrap gap-2 mb-12">
                            <Button key={"All"} variant={selectedCategory === "All" ? 'default' : 'outline'} onClick={() => handleFilterChange("All")} className={selectedCategory === "All" ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}>All</Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'default' : 'outline'}
                                    onClick={() => handleFilterChange(category)}
                                    className={selectedCategory === category ? 'bg-yellow-400 text-black hover:bg-yellow-500' : ''}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {filteredPosts.map((post) => (



                               
                                <Link href={`/blog/${post.slug}`} key={post.objectId} className="group block h-full">
                                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">

                                       
                                        <CardHeader className="p-0 border-b">
                                            <div className="relative h-48 w-full">
                                                <Image
                                                    src={post.thumbnail || "/images/placeholder.jpg"}
                                                    alt={`Thumbnail for ${post.title}`}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        </CardHeader>

                                       
                                        <CardContent className="p-6 flex-grow">
                                            {post.category && (
                                                <p className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm font-semibold mb-4 w-fit">
                                                    {post.category}
                                                </p>
                                            )}
                                            <CardTitle className="font-oswald text-xl font-bold text-black uppercase group-hover:text-yellow-600 transition-colors">
                                                {post.title}
                                            </CardTitle>
                                            <CardDescription className="mt-2 text-gray-600 font-inter text-sm line-clamp-3">
                                                {post.shortSum || 'Click to read more...'}
                                            </CardDescription>
                                        </CardContent>

                                        
                                        <CardFooter className="p-6 pt-0 text-xs text-gray-500">
                                            <p>
                                                  {new Date(post.created).toLocaleDateString('id-ID')}
                                            </p>
                                        </CardFooter>

                                    </Card>
                                </Link>


                            ))}
                        </div>


                        {filteredPosts.length === 0 && selectedCategory !== "All" && (
                            <div className="text-center col-span-full mt-8">
                                <p className="text-gray-500">No posts found in the &quot;{selectedCategory}&quot; category.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}