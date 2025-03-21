export default function mainLayout({
    childeren,
}: {
    childeren: React.ReactNode;
}) {
    return (
        <html lang="kr">
            <header />
            <body>{childeren}</body>
        </html>
    );
}
