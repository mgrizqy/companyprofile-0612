"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';
import { apiCall } from '@/helper/apiCall';
import { PageHeader } from '@/app/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { blogCategories } from '@/data/categoriesData';
import { generateSlug } from '@/helper/generateSlug';



export default function CreateBlogPage() {
    const router = useRouter();
    const { isAuth, email } = useAppSelector((state) => state.userReducer);

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const shortSumRef = useRef<HTMLTextAreaElement>(null);
    const thumbnailRef = useRef<HTMLInputElement>(null);


    const [category, setCategory] = useState('');
    const [isPublished, setIsPublished] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {

    }, [isAuth, router]);

    const handleSubmit = async (e: React.FormEvent) => {
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
        setMessage('');

        try {


            await apiCall.post('/posts', {
                title,
                slug: generateSlug(title),
                content,
                shortSum,
                category,
                thumbnail,
                published: isPublished,
                authorName: email || 'Admin',
            });


            if (titleRef.current) titleRef.current.value = '';
            if (contentRef.current) contentRef.current.value = '';
            if (shortSumRef.current) shortSumRef.current.value = '';
            if (thumbnailRef.current) thumbnailRef.current.value = '';
            setCategory('');
            setMessage('The post has been published/saved successfully');
            setTimeout(() => router.push('/my-posts'), 1500);

        } catch (error: any) {
            console.error("Failed to create post:", error);
            setMessage(error.response?.data?.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <main>
            <PageHeader title="Create New Post" subtitle="Share your thoughts with the community." />
            <div className="container mx-auto max-w-2xl py-12 px-4">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-lg">Title</Label>
                        <Input id="title" ref={titleRef} required />
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-lg">Category</Label>
                        <Select onValueChange={setCategory} value={category}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {blogCategories.map((category, index) => {

                                    return <SelectItem key={index} value={category}>{category}</SelectItem>

                                })}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="shortSum" className="text-lg">Short Summary</Label>
                        <Textarea
                            id="shortSum"
                            ref={shortSumRef}
                            placeholder="A short summary for the blog list page..."
                            rows={3}
                            maxLength={250}
                        />
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="thumbnail" className="text-lg">Thumbnail Image URL</Label>
                        <Input
                            id="thumbnail"
                            ref={thumbnailRef}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-lg">Content</Label>
                        <Textarea id="content" ref={contentRef} rows={15} required />
                    </div>


                    <div className="flex items-center space-x-2">
                        <Checkbox id="isPublished" checked={isPublished} onCheckedChange={(checked) => setIsPublished(Boolean(checked))} />
                        <Label htmlFor="isPublished">Publish this post immediately</Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Publishing...' : 'Publish Post'}
                    </Button>
                    {message && <p className={`text-center text-sm mt-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                </form>
            </div>
        </main>
    );
}