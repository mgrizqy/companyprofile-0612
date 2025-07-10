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
import { toast } from 'react-toastify';
import { totalmem } from 'os';



export default function EditSection({ objectId }: { objectId: string }) {

    const router = useRouter();
    const { isAuth } = useAppSelector((state) => state.userReducer);
    
    
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [shortSum, setShortSum] = useState("")
    const [thumbnail, setThumnbnail] = useState("")
    
    const [category, setCategory] = useState('');
    const [isPublished, setIsPublished] = useState(true);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    
    useEffect(() => {
        
        const tkn = localStorage.getItem("tkn")
        const signOutfromNavbar = sessionStorage.getItem('logout_in_progress') === 'true';

        if (signOutfromNavbar && (!isAuth && !tkn)) {
            sessionStorage.removeItem('logout_in_progress')
            router.replace('/')
            return
        }


        if (!isAuth && !tkn) {
            router.replace('/signin')
            return
        }

        const getPostData = async () => {
            setIsLoading(true);
            try {
                const response = await apiCall.get(`posts/${objectId}`);


                const postData: Post = response.data;



                setTitle(postData.title)
                setContent(postData.content)
                setShortSum(postData.shortSum || '')
                setThumnbnail(postData.thumbnail || '')

                setCategory(postData.category || '');
                setIsPublished(postData.published);

            } catch (error) {
                toast.error("Failed to load post data for editing")
            } finally {
                setIsLoading(false);
            }
        };

        getPostData();
    }, [isAuth, objectId, router]);


    const handleUpdate = async (e: React.FormEvent) => {



        e.preventDefault();

        if (!title || !content || !category) {
            toast.warn("Title, Content, and Category are required.")
            return;
        }
        setIsLoading(true);
        setIsSaving(true)

        try {

            await apiCall.put(`posts/${objectId}`, {
                title,
                slug: generateSlug(title),
                content,
                shortSum,
                category,
                thumbnail,
                published: isPublished
            });

            toast.success("Post updated successfully!")
            setTimeout(() => router.push('/my-posts'), 1500);

        } catch (error) {
            toast.error("Failed to update post")
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading && !isSaving) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    return (
        <div>
            <PageHeader title="Edit Post" subtitle="Perbarui konten anda." />
            <div className="container mx-auto max-w-2xl py-12 px-4">
                <form onSubmit={handleUpdate} className="space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
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
                        <Textarea id="shortSum" value={shortSum} onChange={e => setShortSum(e.target.value)} rows={3} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
                        <Input id="thumbnail" value={thumbnail} onChange={e => setThumnbnail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={15} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="isPublished" checked={isPublished} onCheckedChange={(checked) => setIsPublished(Boolean(checked))} />
                        <Label htmlFor="isPublished">Publish this post</Label>
                    </div>
                    <Button type="submit" className="w-full hover:cursor-pointer " disabled={isLoading}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </div>
        </div>

    );
}