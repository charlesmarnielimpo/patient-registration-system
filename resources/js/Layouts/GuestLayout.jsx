export default function GuestLayout({ children }) {
    return (
        <main className="relative h-full w-full bg-white dark:bg-gray-900">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>

            <div className="relative mx-auto flex min-h-screen max-w-xl items-center justify-between px-4 sm:px-12">
                {children}
            </div>
        </main>
    );
}
