"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { apiCall } from "@/helper/apiCall";

export default function SignUpPage() {


    const [isLoading, SetLoading] = useState(false)
    const [message, SetMessage] = useState("")

    

     const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)


    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        SetLoading(true);
        SetMessage("")

        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        try {
            const res = await apiCall.post("accounts", { email, password })
            SetMessage(`Registration successful!`)

        } catch (error) {
            console.log(error)
            SetMessage("An error occured")
        } finally {
            SetLoading(false);
        }

        console.log("Submitting:", { email, password })
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


                            {message && (<p className={`text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                                {message}
                            </p>)}

                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}