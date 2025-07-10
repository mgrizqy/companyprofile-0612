"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';
import { apiCall } from '@/helper/apiCall';
import { PageHeader } from '@/app/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';
import { blogCategories } from '@/data/categoriesData';


import { Post } from '@/types/types';
import { generateSlug } from '@/helper/generateSlug';

type EditParamObjId = {

  params: {

    objectId: string;

  }

}

export default function EditPostPage({ params }: EditParamObjId) {
  const { objectId } = params
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.userReducer);




  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const shortSumRef = useRef<HTMLTextAreaElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {


    const getPostData = async () => {
      setIsLoading(true);
      try {
        const response = await apiCall.get(`/posts/${objectId}`);
        const postData: Post = response.data;


        if (titleRef.current) titleRef.current.value = postData.title;
        if (contentRef.current) contentRef.current.value = postData.content;
        if (shortSumRef.current) shortSumRef.current.value = postData.shortSum || '';
        if (thumbnailRef.current) thumbnailRef.current.value = postData.thumbnail || '';

        setCategory(postData.category || '');
        setIsPublished(postData.isPublished || false);

      } catch (error) {
        setMessage("Failed to load post data for editing.");
      } finally {
        setIsLoading(false);
      }
    };

    getPostData();
  }, [isAuth, objectId, router]);


  const handleUpdate = async (e: React.FormEvent) => {



    e.preventDefault();

    const title = titleRef.current?.value || '';
    const content = contentRef.current?.value || '';
    const shortSum = shortSumRef.current?.value || '';
    const thumbnail = thumbnailRef.current?.value || '';

    if (!title || !content || !category) {
      setMessage("Title, Content, and Category are required.");
      return;
    }
    setIsLoading(true);
    setIsSaving(true)
    setMessage('');

    try {

      await apiCall.put(`/posts/${objectId}`, {
        title,
        slug: generateSlug(title),
        content,
        shortSum,
        category,
        thumbnail,
        published: isPublished
      });

      setMessage("Post updated successfully!");
      setTimeout(() => router.push('/my-posts'), 1500);

    } catch (error) {
      setMessage("Failed to update post.");
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading && !isSaving) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  return (
    <main>
      <PageHeader title="Edit Post" subtitle="Refine your content." />
      <div className="container mx-auto max-w-2xl py-12 px-4">
        <form onSubmit={handleUpdate} className="space-y-6">

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" ref={titleRef} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                {blogCategories.map((category, index) => {

                  return <SelectItem key={index} value={category}>{category}</SelectItem>

                })}

              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortSum">Short Summary</Label>
            <Textarea id="shortSum" ref={shortSumRef} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
            <Input id="thumbnail" ref={thumbnailRef} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" ref={contentRef} rows={15} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isPublished" checked={isPublished} onCheckedChange={(checked) => setIsPublished(Boolean(checked))} />
            <Label htmlFor="isPublished">Publish this post</Label>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          {message && <p className={`text-center text-sm mt-4 ${message.includes("successfully") ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </form>
      </div>
    </main>
  );
}