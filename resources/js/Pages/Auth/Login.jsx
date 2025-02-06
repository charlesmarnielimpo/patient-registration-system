import { Head, Link, useForm } from "@inertiajs/react";
import { TriangleAlert } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import DOHLogo from "../../../../public/images/doh-logo.png";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center space-x-2 mb-6">
                        <img
                            src={DOHLogo}
                            alt="Department of Health Official Logo"
                            className="h-16 w-16 select-none"
                        />
                    </div>

                    <CardTitle className="text-3xl">Welcome,</CardTitle>
                    <CardDescription>Login to continue</CardDescription>
                </CardHeader>

                <CardContent>
                    {errors[0] && (
                        <div className="relative mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                            <div className="flex items-start space-x-3">
                                <div className="inline-flex items-center rounded-md border border-red-200 bg-red-100 p-2">
                                    <TriangleAlert
                                        size={20}
                                        className="shrink-0 text-red-600"
                                    />
                                </div>

                                <div className="flex flex-col text-sm">
                                    <p className="mb-1 font-semibold">Error!</p>
                                    <p>{errors[0]}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="flex flex-col space-y-4" onSubmit={submit}>
                        <div className="grid gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full"
                                autoComplete="username"
                                isFocused={true}
                                hasError={errors.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full"
                                autoComplete="current-password"
                                isFocused={false}
                                hasError={errors.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex flex-col items-start md:items-center md:justify-between md:flex-row space-y-2 md:space-y-0">
                            <div className="flex items-center">
                                <Checkbox id="remember" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm text-muted-foreground ms-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>

                            {canResetPassword && (
                                <div>
                                    <Button
                                        asChild
                                        variant="link"
                                        className="font-normal"
                                    >
                                        <Link
                                            href={route("password.request")}
                                            className="!p-0 h-0 focus-visible:ring-0"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        <Button disabled={processing}>Login</Button>

                        <p className="text-muted-foreground text-xs">
                            PRS v.1.0.0
                        </p>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
