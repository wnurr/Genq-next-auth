import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
    <div className="space-y-6 text-center">
      <div className="w-full flex flex-col gap-y-1 items-center justify-center">
          <Image
                src="/logo.webp"
                alt="Logo"
                className="w-40 h-40"
                width={160}
                height={160}
                />  
      </div>
      <p className="text-white text-2xl">
        Welcome to GenQ 
      </p>
      <div>
        <LoginButton asChild>
        <Button 
        variant="secondary"
        size="lg"
        >
          Sign in
        </Button>
        </LoginButton>
    </div>
    </div>
    </main>

  )
}
