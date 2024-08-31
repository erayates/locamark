import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ScrollArea } from "./ui/scroll-area"; // Ensure ScrollArea is correctly imported

export function ResponsiveDialog({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
  isDataTable = false,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  isDataTable?: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dialogClassses = isDataTable ? "w-[900px]" : "sm:w-[420px]";

  if (isDesktop || isDataTable) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={dialogClassses}>
          <DialogHeader className="bg-oxfordBlue rounded-md p-4 ">
            <DialogTitle className="font-semibold text-lg leading-4 text-white">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-muted-foreground font-medium text-xs">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          {isDataTable ? (
            <ScrollArea className="h-[600px] border rounded-lg overflow-auto">
              <div className="">{children}</div>
            </ScrollArea>
          ) : (
            children
          )}
        </DialogContent>
      </Dialog>
    );
  }

  if (!isDataTable) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DrawerHeader>
          <div className="p-4 flex-1 overflow-auto">{children}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}
