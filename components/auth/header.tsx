import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
};

export const Header = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-1 items-center justify-center">
                <img
                src="/logo.webp"
                alt="Logo"
                className="w-25 h-20"
                />
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    );
};