"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { apiCall } from "@/helper/apiCall";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

    const router = useRouter()
    const [isLoading, SetLoading] = useState(false)



    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)


    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        SetLoading(true);


        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        try {
            const res = await apiCall.post("accounts", { email, password })
            toast.success(`Registration successful!`)

        } catch (error) {
            console.log(error)
            toast.error("An error occured")
        } finally {
            SetLoading(false);
        }

        console.log("Submitting:", { email, password })

        const routerNav = setTimeout(() => router.replace('/signin'), 1000)
        return () => clearTimeout(routerNav)

    }

    return (
        <main>
            <PageHeader title="Sign Up" subtitle="Buat akun Anda untuk bergabung dengan komunitas Gold's Gym." />
            <div className="container mx-auto max-w-md py-12 px-4">
                <Card className="drop-shadow-xl">
                    <CardHeader>
                        <CardTitle className="">Create an Account</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignUp} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" >Email</Label>
                                <Input id="email" type="email" placeholder="mail@example.com" required ref={emailRef}></Input>

                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" >Password</Label>
                                <Input id="password" type="password" required ref={passwordRef}></Input>

                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}