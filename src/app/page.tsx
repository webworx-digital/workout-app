import Image from "next/image";
import { PrismaClient } from "./generated/prisma";
import { withOptimize } from "@prisma/extension-optimize";
import Link from "next/link";
import Button from "./ui/Button/Button";
import { logout } from "./actions/auth";

export default function Home() {


  // const prisma = new PrismaClient().$extends(
  //   withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY! })
  // )

  return (
    <div className="text-2xl gap-4 container flex mx-auto h-dvh justify-center items-center">
      <Button onClick={logout}>Logout</Button>
      Hello World!! This is a workout app
    </div>
  );
}
