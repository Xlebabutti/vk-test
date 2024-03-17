import { cn } from '../shared/ui/utils';
import { AppProvider } from './_providers';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main
            className={cn(
                'min-h-screen bg-background font-sans antialiased flex items-center justify-center',
            )}
        >
            <AppProvider>{children}</AppProvider>
        </main>
    );
}
