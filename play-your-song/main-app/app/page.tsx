import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//@ts-ignore
import { Users, Radio, Headphones } from "lucide-react";
import Image from "next/image";
import { Appbar } from "./components/Appbar";

export default function Home() {
  return (
    // <div>
    //   <Appbar />
    // </div>
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      <header className="px-4 lg:px-6 h-14 flex items-center"></header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Let Your Audience Choose the Best
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Empower your audience to curate your music stream. Connect with
                fans like never before.
              </p>
            </div>
            <div className="space-x-4">
              <Button className="bg-green-600 text-white hover:bg-green-700">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="text-green-400 border-green-400 hover:bg-green-500 hover:text-gray-400"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
