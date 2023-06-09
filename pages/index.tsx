import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import wordmarkLogo from "@/public/wordmark.png";
import logo from "@/public/logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  Mail,
  TwitterIcon,
  UserCheck2,
} from "lucide-react";
import Link from "next/link";
import useIncrementalCounter from "@/hooks/useIncrementalCounter";
import { ShareDialog } from "@/components/ShareDialog";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  getSubscribersCount,
  postSubscribeToWaitlist,
} from "@/services/WaitlistService";
import { useMutate } from "@/hooks/useMutate";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();
  const [targetCount, setTargetCount] = useState(0);
  const subCount = useIncrementalCounter(0, targetCount, 6000);

  const { copy } = useCopyToClipboard();

  const waitlistMutation = useMutate(postSubscribeToWaitlist, {
    onSuccessFunction: (data) => {
      console.log({ data });
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: data.data.data,
      });
    },
    onErrorFunction: () => {
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again later.",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    waitlistMutation.mutate({ email, name });
  };

  const subscribersCount = useQuery({
    queryKey: ["subscribers-count"],
    queryFn: async () => {
      const res = await getSubscribersCount();
      setTargetCount(res.data.data);
      return res.data.data;
    },
  });
  return (
    <>
      <main
        className={`flex min-h-screen text-white flex-col py-12 items-center font-body  px-2 md:px-8 ${inter.className}`}
      >
        <Head>
          <title>Punteer.com</title>
          <meta
            name="description"
            content="Curious about the next big thing in the betting industry? Want to get fast betting codes from your favourite punters through email, in-app alerts, then secure your spot now!"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Image
          src={logo}
          className="w-[180px] md:w-[200px] mb-2 md:mb-8 mx-auto"
          alt="Punteer Logo"
        />
        <div
          className={clsx(
            isSubmitted ? "bg-black/40" : " bg-black/20",
            "max-w-[540px] waitlist-card backdrop-blur-sm text-white rounded-sm  w-full px-8 p-12"
          )}
        >
          {/* <WaitlistForm /> */}
          {!isSubmitted ? (
            <>
              <h1 className="mb-4 text-3xl font-semibold text-center md:text-4xl font-heading">
                Punteer is coming!
              </h1>
              <p className="my-4 text-sm text-center text-gray-300">
                Curious about the next big thing in social media? Secure your
                spot on our waitlist and be the first to explore our innovative
                platform!
              </p>

              <p className="flex justify-center gap-2 my-4 mb-2 font-semibold text-center text-gray-200 ">
                <UserCheck2 className="text-center text-green-400 " />
                <span className="text-green-400">{subCount}</span> PEOPLE
                WAITING
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 mt-12"
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="text-black rounded-sm bg-white/80"
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    className="text-black rounded-sm bg-white/80"
                    id="full-name"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <Button
                  isLoading={waitlistMutation.isLoading}
                  variant={"default"}
                  className="rounded-sm "
                >
                  Join the waitlist
                </Button>
                <div className="flex flex-col gap-4 p-2 px-4 mx-auto text-xs font-semibold bg-white md:flex-row text-primary">
                  <Link
                    href="mailto:info@punteer.com"
                    className="flex items-center gap-2"
                  >
                    <span className="p-1 border rounded-full border-secondary text-secondary">
                      <Mail size={14} />
                    </span>
                    <p>info@punteer.com</p>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="p-1 border rounded-full border-secondary text-secondary">
                      <FacebookIcon size={14} />
                    </span>
                    <span className="p-1 border rounded-full border-secondary text-secondary">
                      <InstagramIcon size={14} />
                    </span>
                    <span className="p-1 border rounded-full border-secondary text-secondary">
                      <TwitterIcon size={14} />
                    </span>

                    <p>mypunteer</p>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div>
              <p className="mb-4 text-center text-white">
                Thanks for joining the waitlist! We&apos;ll let you know when
                we&apos;re up.
                <br />
                Share with your friends who are interested in getting betting
                codes fast!
              </p>

              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => {
                    copy("https://punteer.com");
                    toast({
                      title: "Copied!",
                      description: "Link copied to clipboard.",
                    });
                  }}
                  variant={"outline"}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="flex items-center justify-center gap-2 p-4 text-sm text-gray-700 bg-gray-100/80">
        <Image src={wordmarkLogo} className="w-[100px]" alt="Punteer Logo" />
        <p>© 2023 Punteer. All rights reserved</p>
      </footer>
    </>
  );
}
