import Image from "next/image";


interface HeaderProps {
    label: string;
};

export const Header = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-1 items-center justify-center">
                <Image
                src="/logo.webp"
                alt="Logo"
                className="w-25 h-20"
                width={80}
                height={50}
                />
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    );
};