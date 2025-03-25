export default function mainLayout({
    childeren,
}: {
    childeren: React.ReactNode;
}) {
    return (
        <html>
            <body>
                <header />
                <body>{childeren}</body>
            </body>
        </html>
    );
}
