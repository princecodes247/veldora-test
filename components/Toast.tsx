"use client";

import { ButtonUI } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function ToastSimple() {
  const { toast } = useToast();

  return (
    <ButtonUI
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        });
      }}
    >
      Show Toast
    </ButtonUI>
  );
}
