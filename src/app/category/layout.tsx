import ThemeProvider from '@/components/providers/ThemeProvider';

export default function CategoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ThemeProvider>
                <main>{children}</main>
            </ThemeProvider>
        </>
    );
}
