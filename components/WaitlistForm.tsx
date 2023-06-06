"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ButtonUI } from "@/components/ui/button";
import {
  Form as FormUI,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/formUI";
import { InputUI } from "@/components/ui/input";
import { Button } from "./Button";
import { Form, useForm } from "react-hook-form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function WaitlistForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              {/* 
              <FormLabel>Username</FormLabel>
              <FormControl>
                <InputUI placeholder="shadcn" {...field} />
              </FormControl> */}
              {/* <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage /> */}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
