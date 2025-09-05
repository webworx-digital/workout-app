import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

export default function Home() {


  const prisma = new PrismaClient().$extends(
    withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY! })
  )
  
  return (

    <div className="text-2xl container flex mx-auto h-dvh justify-center items-center">Hello World!! This is a workout app</div>
  );
}
