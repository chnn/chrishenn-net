import { ProseLayout } from "@/app/ProseLayout";
import { ReactNode } from "react";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <ProseLayout>{children}</ProseLayout>;
}
