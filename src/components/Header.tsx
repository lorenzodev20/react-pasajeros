type HeaderProps = {
    title?: string
}

export default function Header({ title }: Readonly<HeaderProps>) {
    return (
        <header className="bg-white shadow p-4 text-center text-xl font-bold">
            {title ?? ' --- '}
        </header>
    )
}
