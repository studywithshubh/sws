import Link from 'next/link';
import { Separator } from './ui/Separator';
import { Twitter } from '@/icons/Twitter';
import { Instagram } from '@/icons/Instagram';
import { Github } from '@/icons/Github';
import Image from 'next/image';

const Footer = () => {
    return (
        <>
            <Separator className="mx-auto my-2" />
            <div className="wrapper bottom-0 mx-auto mb-16 flex w-full flex-col items-center gap-2">
                <div className="mx-auto flex w-full flex-col justify-around gap-12 p-4 md:flex-row">
                    <div className="flex flex-col gap-12 text-primary">
                        <Link href={'/'} className="flex cursor-pointer items-center gap-2">
                            {/* <Image src="/shubhPassport.png" alt="SWS logo" width={200} height={200} className="size-16 rounded-full" /> */}

                            <div className="flex flex-col">
                                <Image src="/SWSBGREMOVEDLOGO.png" alt="SWS logo" width={400} height={400} className="size-16 w-24 h-24 rounded-full" />                            
                            </div>
                        </Link>
                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold tracking-tight text-foreground">
                                Follow us
                            </h4>
                            <div className="flex gap-4">

                                {/* X Button */}
                                <Link
                                    target="_blank"
                                    href={'https://x.com/__Shubhashish__'}
                                    className="rounded-lg bg-blue-500/10 p-2 text-primary"
                                >
                                    <Twitter />
                                </Link>

                                {/* Instagram Button */}
                                <Link
                                    target="_blank"
                                    href={'https://www.instagram.com/___shubhashish___'}
                                    className="rounded-lg bg-blue-500/10 p-2 text-primary"
                                >
                                    <Instagram />
                                </Link>


                                {/* Github Button */}
                                <Link
                                    target="_blank"
                                    href={'https://github.com/studywithshubh'}
                                    className="rounded-lg bg-blue-500/10 p-2 text-primary"
                                >
                                    <Github />
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg tracking-tighter text-primary">
                            Quick Links
                        </h4>
                        <div className="flex flex-col gap-1 text-lg tracking-tighter">
                            <Link
                                href={'https://shubhlinks.vercel.app/'}
                                target="_blank"
                                className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
                            >
                                Contact
                            </Link>

                            <Link
                                href={'https://studywithshubh.vercel.app'}
                                target="_blank"
                                className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
                            >
                                Old Website
                            </Link>
                            <Link
                                href={'/'}
                                target="_blank"
                                className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
                            >
                                About
                            </Link>
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-2">
                        <h4 className="text-lg tracking-tighter text-primary">
                            SWS Legal
                        </h4>
                        <div className="flex flex-col gap-1 text-lg tracking-tighter">
                            <Link
                                href={'/tnc'}
                                className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
                            >
                                Terms & Conditions
                            </Link>
                            <Link
                                href={'/privacy-policy'}
                                className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href={'/refund'}
                                className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
                            >
                                Refund & Cancellation
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Footer;