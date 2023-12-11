"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActionTooltipProps } from "@/interfaces/components-interface";

export const ActionTooltip = ({
  label,
  children,
  align,
  side,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
            <p className="font-semibold capitalize text-sm">{label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
