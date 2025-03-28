import Header from '@/components/Headers';
import ThemeProvider from '@/components/providers/ThemeProvider';

export default function ArticleLayout({
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
