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
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';

import { Post } from '@/types/types';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle } from '@/components/ui/alert-dialog';


export default function MyPostsPage() {
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const [dialog, setDialog] = useState<{objectId : string, isOpen : boolean}>({objectId : "", isOpen : false});
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);






  useEffect(() => {

    const tkn = localStorage.getItem("tkn")
    const signOutfromNavbar = sessionStorage.getItem('logout_in_progress') == 'true';


    const getAllPosts = async () => {
      setIsLoading(true);
      try {
        const response = await apiCall.get('posts');

        const sortedPosts = response.data.sort((a: Post, b: Post) => b.created - a.created);
        setPosts(sortedPosts);
      } catch (error) {
        toast.error("Could not load posts.")
      } finally {
        setIsLoading(false);
      }
    };

    if (signOutfromNavbar && (!isAuth && !tkn)) {
      sessionStorage.removeItem('logout_in_progress')
      router.replace('/')
      return
    }

    if (!isAuth && !tkn) {
      router.replace('/signin')
    } else {
      getAllPosts();
    }
  }, [isAuth, router]);


  const openDeleteDialog = (postObjectId: string) => {
    setDialog({objectId : postObjectId, isOpen : true });
  }

  const handleDelete = async (postIdToDelete: string) => {

    try {
      setIsDeleting(true)
      await apiCall.delete(`/posts/${postIdToDelete}`)
      setPosts(currentPosts => currentPosts.filter(p => p.objectId !== postIdToDelete));
      
      toast.success('Post deleted successfully')
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post')
    } finally {
      
      setDialog({objectId : "", isOpen : false})
      setIsDeleting(false)
      

    }
  };



  return (
    <main>
      <PageHeader title="Admin Dashboard" subtitle="Kelola artikel-artikel anda disini." />
      <div className="container mx-auto max-w-screen-xl py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-oswald font-bold">Your Articles</h2>
          <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
            <Link href="/blog/create"><PlusCircle className="mr-2 h-4 w-4" /> Create New Post</Link>
          </Button>
        </div>

        {isLoading && <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}


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
                          <Button variant="destructive" className='hover:cursor-pointer hover:bg-red-700' size="icon" onClick={() => openDeleteDialog(post.objectId)}><Trash2 className="h-4 w-4" /></Button>
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
                    <div className="flex items-center justify-around  gap-2 border-t pt-3 mt-2">
                      <Button variant="outline" size="sm" className="w-[50%]" asChild><Link href={`/my-posts/edit/${post.objectId}`}><Edit className="mr-2 h-4 w-4" /> Edit</Link></Button>
                      <Button variant="destructive" size="sm" className="w-[50%]" onClick={() => openDeleteDialog(post.objectId)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <AlertDialog open={dialog.isOpen} onOpenChange={() => setDialog}>
              <AlertDialogContent className='transition-all'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                  Do you want to delete this post?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDialog({objectId : "", isOpen : false})} className='hover:cursor-pointer'>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(dialog.objectId)} className="hover:cursor-pointer bg-red-600 text-white hover:bg-red-700 transition-all">{isDeleting ? "Deleting.." : "Delete"}  {isDeleting && <div className="flex justify-center transition-all"><Loader2 className="h-8 w-8 animate-spin transition-all" /></div>}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>


          </>
        )}
      </div>
    </main>
  );
}