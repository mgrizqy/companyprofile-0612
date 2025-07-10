"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { apiCall } from "@/helper/apiCall";
import { setSignIn } from "@/lib/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearTimeout, setTimeout } from "timers";
import { toast } from "react-toastify";

export default function SignInPage() {


    const [isLoading, setIsLoading] = useState(false)

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
    const router = useRouter()







    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        const urlWhere: string = `email = '${email}' AND password = '${password}'`

        try {
            const res = await apiCall.get(`accounts`, { params: { where: urlWhere } })

            if (res.data.length === 0) {
                toast.warning("Account doesn't exist or password is wrong")
                setIsLoading(false)
                return
            } else {

                const user = res.data[0]

                toast.success(`Sign In successful!`)

                dispatch(setSignIn({ ObjectId: user.objectId, isAuth: true, email: user.email }))
                console.log(res.data);

                localStorage.setItem("tkn", res.data[0].objectId)
                localStorage.setItem("userEmail", res.data[0].email)
                const routerNav = setTimeout(() => router.replace('/'), 1000)
                return () => clearTimeout(routerNav)


            }



        } catch (error) {
            console.log(error)
            toast.error("An error occured")
        } finally {
            setIsLoading(false);
        }

        console.log("Submitting:", { email, password })
    }

    return (
        <main>
            <PageHeader title="Sign In" subtitle="Masukkan akun Anda untuk mengakses program dan komunitas Gold's Gym." />
            <div className="container mx-auto max-w-md py-12 px-4">
                <Card className="drop-shadow-xl">
                    <CardHeader>
                        <CardTitle className="">Sign In</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignIn} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" >Email</Label>
                                <Input id="email" type="email" placeholder="mail@example.com" required ref={emailRef} ></Input>

                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" >Password</Label>
                                <Input id="password" type="password" required ref={passwordRef}></Input>

                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>


                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}