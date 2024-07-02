import Image from "next/image";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ModeToggle } from "@/components/ThemeToggler";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default async function Home() {

  return (
    <main>
      <section
        className="relative bg-[url(https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
      >
        <div
          className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
        ></div>

        <div
          className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
        >
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Discover Your Voice

              <strong className="block font-extrabold text-nav"> Share Your Stories </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Join our community of writers and readers. Create, explore, and connect through the power of words.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">

              <RegisterLink className="block w-full rounded bg-nav px-12 py-3 text-sm font-medium text-black shadow hover:bg-nav focus:outline-none focus:ring active:bg-nav sm:w-auto"
              >Get Started</RegisterLink>

              <a
                href="#"
                className="block w-full rounded bg-gray-950 px-12 py-3 text-sm font-medium text-white shadow hover:tet-white focus:outline-none focus:ring active:text-white sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
