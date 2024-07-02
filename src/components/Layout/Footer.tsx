import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = async () => {

    return (
        <div>


            <footer className="bg-background">
                <div className="mx-auto max-w-screen-xl px-4 relative py-16 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-start lg:gap-8">
                        <div className="bg-nav ">
                            <div className="flex justify-center lg:justify-start">
                                <Image src={"/techsmall.png"} width={100} height={100} alt='logo' />
                            </div>
                            <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
                                <Link
                                    className="inline-block rounded-full bg-nav p-2 text-black dark:hover:text-white shadow transition hover:bg-background hover:text-black sm:p-3 lg:p-4"
                                    href="#MainContent"
                                >
                                    <span className="sr-only">Back to top</span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                            </div>

                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
                            <div className="col-span-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get the latest news!</h2>

                                    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500  dark:text-muted-foreground lg:text-left">
                                        Welcome to our blog! Here we share insightful articles, tips, and stories on a wide range
                                        of topics. Join our community of readers and discover engaging content that inspires and
                                        informs.
                                    </p>
                                </div>
                            </div>

                            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                                {/* <form className="w-full">
                                    <label htmlFor="UserEmail" className="sr-only"> Email </label>

                                    <div
                                        className="border border-gray-100 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4"
                                    >
                                        <input
                                            type="email"
                                            id="UserEmail"
                                            placeholder="john@rhcp.com"
                                            disabled={await isAuthenticated()}
                                            className="w-full border-none  focus:border-transparent focus:ring-transparent sm:text-sm"
                                        />


                                        <button
                                            disabled={await isAuthenticated()}
                                            className="mt-1 w-full disabled:bg-gray-100 bg-nav text-black px-6 py-3 text-sm font-bold uppercase tracking-wide  transition-none hover:bg-nav sm:mt-0 sm:w-auto sm:shrink-0"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form> */}
                            </div>

                            {/* <div className="col-span-2 sm:col-span-1">
                                <p className="font-medium text-gray-900">Services</p>

                                <ul className="mt-6 space-y-4 text-sm">
                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> 1on1 Coaching </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Company Review </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Accounts Review </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> HR Consulting </Link>
                                    </li>

                                    <li>
                                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> SEO Optimisation </Link>
                                    </li>
                                </ul>
                            </div> */}

                            <div className="col-span-2 sm:col-span-1">
                                <p className="font-medium text-gray-900 dark:text-white">Company</p>

                                <ul className="mt-6 space-y-4 text-sm">
                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> About </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Meet the Team </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Accounts Review </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>

                                <ul className="mt-6 space-y-4 text-sm">


                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> FAQs </Link>
                                    </li>

                                    {/* <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Live Chat </Link>
                                    </li> */}
                                </ul>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <p className="font-medium text-gray-900 dark:text-white">Legal</p>

                                <ul className="mt-6 space-y-4 text-sm">
                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Accessibility </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Returns Policy </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Refund Policy </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Hiring Statistics </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* <div className="col-span-2 sm:col-span-1">
                                <p className="font-medium text-gray-900">Downloads</p>

                                <ul className="mt-6 space-y-4 text-sm">
                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> Marketing Calendar </Link>
                                    </li>

                                    <li>
                                        <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"> SEO Infographics </Link>
                                    </li>
                                </ul>
                            </div> */}

                            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">

                                <li>
                                    <Link
                                        href="https://www.instagram.com/markk.i.b.o/"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"
                                    >
                                        <span className="sr-only">Instagram</span>

                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path
                                                fillRule="evenodd"
                                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </li>


                                <li>
                                    <Link
                                        href="https://github.com/mark-kibo"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-gray-700 transition hover:opacity-75 dark:text-muted-foreground"
                                    >
                                        <span className="sr-only">GitHub</span>

                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </li>


                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-8">
                        <div className="sm:flex sm:justify-between">
                            <p className="text-xs text-gray-500 dark:text-muted-foreground">&copy; {new Date().getFullYear()}. KiboTech. All rights reserved.</p>

                            <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                                <li>
                                    <Link href="#" className="text-gray-500   dark:text-muted-foreground transition hover:opacity-75"> Terms & Conditions </Link>
                                </li>

                                <li>
                                    <Link href="#" className="text-gray-500   dark:text-muted-foreground transition hover:opacity-75"> Privacy Policy </Link>
                                </li>

                                <li>
                                    <Link href="#" className="text-gray-500   dark:text-muted-foreground transition hover:opacity-75"> Cookies </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
