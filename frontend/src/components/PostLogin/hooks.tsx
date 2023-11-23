import { useEffect } from "react";
import { toast } from "sonner";

export function useErrorToast(hasErrors: boolean, errors: string) {
    useEffect(() => {
      console.log(hasErrors && errors.length > 0)
      toast.dismiss();
      if (hasErrors && errors.length > 0) {
        toast.error(errors);
      }
    }, [hasErrors, errors]);
}
  
export function useLoadingToast(loading: boolean, hasErrors: boolean) {
    useEffect(() => {
      if (loading && !hasErrors) {
        toast.dismiss();
        toast.loading("Updating your profile");
      }
    }, [loading, hasErrors]);
  }