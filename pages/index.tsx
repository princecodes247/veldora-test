import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/ui/label";
import {  useState } from "react";
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

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   waitlistMutation.mutate({ email, name });
  // };

  // const subscribersCount = useQuery({
  //   queryKey: ["subscribers-count"],
  //   queryFn: async () => {
  //     const res = await getSubscribersCount();
  //     setTargetCount(res.data.data);
  //     return res.data.data;
  //   },
  // });
  return (
    <>
      <main
        className={`flex relative min-h-screen text-white flex-col py-12 items-center font-body  px-2 md:px-8 ${inter.className}`}
      >
  
        <Head>
          <title>
            Veldora test
          </title>
          <meta
            name="description"
            content="Testing veldora"
          />
          <link rel="icon" href="/favicon.jpg" />
        </Head>

  
        <div
          className={clsx(
            isSubmitted ? "bg-black/40" : " bg-black/20",
            "max-w-[540px] waitlist-card backdrop-blur-sm text-white rounded-sm  w-full px-8 p-12"
          )}
        >
          {!isSubmitted ? (
            <>
              <h1 className="mb-4 text-3xl font-semibold text-center md:text-4xl font-heading">
                Veldora test
              </h1>
              <p className="my-4 text-sm text-center text-gray-300">
                Try out veldora here
              </p>

              <p className="flex justify-center gap-2 my-4 mb-2 font-semibold text-center text-gray-200 ">
                <UserCheck2 className="text-center text-green-400" />
                <span className="text-green-400">{subCount}</span> TRIES
                
              </p>
              <form
                // onSubmit={handleSubmit}
                method="POST"
                action="https://veldora-server.onrender.com/api/v1/buckets/649b432a12ce587bdc84fdcd"
                className="flex flex-col gap-2 mt-12"
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="text-black rounded-sm bg-white/80"
                    id="email"
                    type="email"
                    name="email"
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
                    name="full name"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <Button
                  // isLoading={waitlistMutation.isLoading}
                  variant={"default"}
                  className="rounded-sm "
                >
                  Test Form
                </Button>
           
              </form>
            </>
          ) : (
            <div>
              <p className="mb-4 text-center text-white">
                Thanks for trying veldora out! We&apos;ll let you know when
                we&apos;re fully up.
                <br />
                
              </p>

            </div>
          )}
        </div>
      </main>
      <footer className="flex items-center justify-center gap-2 p-4 text-sm text-gray-700 bg-gray-100">
        <p>© 2023 Veldora. All rights reserved</p>
      </footer>
    </>
  );
}
