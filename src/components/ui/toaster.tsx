import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { BadgeInfo, CheckCheck, CircleSlash, OctagonAlert } from "lucide-react";


const toastIcons: { [key: string]: JSX.Element } = {
  success: <CheckCheck className="text-green-800 w-full" />,
  destructive: <CircleSlash className="text-red-800" />,
  info: <BadgeInfo className="w-full" />,
  warning: <OctagonAlert className="text-yellow-800" />,
};

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid grid-cols-12 gap-2 z-40">
              <div className="col-span-1 flex justify-start items-start">
                {variant && toastIcons[variant]}
              </div>
              <div className="col-span-11 grid place-items-start gap-1">
                {title && <ToastTitle className="font-semibold uppercase">{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
