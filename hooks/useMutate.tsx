import { useMutation } from "@tanstack/react-query";

import { useRef } from "react";
import { AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";

type ApiFunction<ResultType, ArgType> = (
  arg: ArgType
) => Promise<AxiosResponse<ResultType>>;

export const useMutate = <ResultType, ArgType>(
  api: ApiFunction<ResultType, ArgType>,
  {
    onSuccessFunction = (data: any) => {},
    onErrorFunction = (error: Error) => {},
    onLoadingFunction = () => {},
    successMessage = "Successfully updated",
    loadingMessage = "Updating...",
    errorMessage = "Failed to update",
    showToast = true,
  }
) => {
  const toastId = useRef<string | undefined>(undefined);
  return useMutation(api, {
    onSuccess: (data) => {
      // if (toastId.current && showToast)
      //   toast().update({
      //     id: toastId.current,

      //   })(toastId.current, {
      //     render: successMessage,
      //     type: toast.TYPE.SUCCESS,
      //     isLoading: false,
      //     autoClose: 2000,
      //   });
      onSuccessFunction(data);
    },
    onError: (error: any) => {
      console.log(error);
      // if (toastId.current && showToast)
      //   toast().update({
      //     id: toastId.current,
      //     description:
      //       errorMessage +
      //       ": " +
      //       (error?.response?.data?.message
      //         ? error.response?.data?.message
      //         : error?.response?.data?.data[0]),
      //   });
      console.log(JSON.stringify(error));
      onErrorFunction(error);
    },

    onMutate: () => {
      // if (showToast)
      //   toastId.current = toast(loadingMessage, {
      //     type: toast.TYPE.INFO,
      //     autoClose: false,
      //   });

      onLoadingFunction();
    },
  });
};
