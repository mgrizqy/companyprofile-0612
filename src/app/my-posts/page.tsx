"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/lib/redux/hooks';
import { apiCall } from '@/helper/apiCall';
import { PageHeader } from '../components/PageHeader';
import { Button } from '@/components/ui/button';
import { Loader2, Edit, Trash2, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent,CardTitle } from '@/components/ui/card';

interface Post {
  objectId: string;
  title: string;
  category?: string;
  published: boolean;
  created: number;
}

export default function MyPostsPage() {
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.userReducer);
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  
  useEffect(() => {


    const getAllPosts = async () => {
      setIsLoading(true);
      try {
        const response = await apiCall.get('/posts');
        
        const sortedPosts = response.data.sort((a: Post, b: Post) => b.created - a.created);
        setPosts(sortedPosts);
      } catch (error) {
        setMessage("Could not load posts.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuth) {
      getAllPosts();
    }
  }, [isAuth, router]);

   const handleDelete = async (postIdToDelete: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      
      await apiCall.delete(`/posts/${postIdToDelete}`);
      
     
      setPosts(currentPosts => currentPosts.filter(p => p.objectId !== postIdToDelete));
      setMessage('Post deleted successfully.');
    } catch (error) {
      console.error('Failed to delete post:', error);
      setMessage('Failed to delete post.');
    }
  };
  


  return (
    <main>
      <PageHeader title="Admin Dashboard" subtitle="Kelola artikel-artikel anda disini" />
      <div className="container mx-auto max-w-screen-xl py-12 px-4">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-oswald font-bold">Your Articles</h2>
            <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
                <Link href="/blog/create"><PlusCircle className="mr-2 h-4 w-4" /> Create New Post</Link>
            </Button>
        </div>

        {isLoading && <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}
        {message && <p className="text-center text-sm text-red-500 mb-4">{message}</p>}

        {!isLoading && posts.length === 0 && (
          <div className="text-center  border-gray-300 rounded-lg p-12">
            <h3 className="text-xl font-semibold text-gray-700">No Posts Found</h3>
            <p className="mt-2 text-gray-500">Anda belum membuat postingan apa pun</p>
            <Button asChild className="mt-4">
                <Link href="/blog/create">Buat Post Pertama Anda</Link>
            </Button>
          </div>
        )}

        {!isLoading && posts.length > 0 && (
          <>
           
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map(post => (
                    <TableRow key={post.objectId}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category || 'N/A'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" size="icon" asChild><Link href={`/my-posts/edit/${post.objectId}`}><Edit className="h-4 w-4" /></Link></Button>
                            <Button variant="destructive" className='hover:cursor-pointer hover:bg-red-700' size="icon" onClick={() => handleDelete(post.objectId)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

          
            <div className="md:hidden space-y-4">
              {posts.map(post => (
                <Card key={post.objectId}>
                  <CardContent className="p-4 flex flex-col gap-3">
                    <CardTitle className="text-lg font-oswald">{post.title}</CardTitle>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{post.category || 'N/A'}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 border-t pt-3 mt-2">
                        <Button variant="outline" size="sm" className="w-full" asChild><Link href={`/my-posts/edit/${post.objectId}`}><Edit className="mr-2 h-4 w-4" /> Edit</Link></Button>
                        <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDelete(post.objectId)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}