import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image src="/spooky.svg" height={80} width={80} alt={""}></Image>
      </div>
      <div className={cn("flex flex-col items-center ")}>
        <p className="text-xl font-semibold">Pekin Stream</p>
        <p className="text-sm text-muted-foreground "> Let's Stream</p>
      </div>
    </div>
  );
};
