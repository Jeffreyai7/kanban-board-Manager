import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export const Tooltip = ({
  children,
  content,
  disabled,
  side = "top",
}: {
  children: React.ReactElement;
  content: ReactNode;
  disabled?: boolean;
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root disableHoverableContent>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <AnimatePresence>
          {!disabled && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content
                side={side}
                sideOffset={8}
                className="z-[100]"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    rounded bg-blue-700 px-2 py-1.5 text-sm text-white
                    shadow-md
                  `}
                >
                  {content}
                  <TooltipPrimitive.Arrow
                    className="fill-blue-700"
                    width={8}
                    height={4}
                  />
                </motion.div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
