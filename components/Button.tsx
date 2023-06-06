import { Loader2 } from "lucide-react";

import { ButtonProps, ButtonUI } from "@/components/ui/button";

export function Button(
  props: ButtonProps & {
    isLoading?: boolean;
    loadingMessage?: string;
  }
) {
  return (
    <ButtonUI {...props} disabled={props?.isLoading}>
      {props?.isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {props?.loadingMessage ?? "Please Wait"}
        </>
      ) : (
        props?.children
      )}
    </ButtonUI>
  );
}
