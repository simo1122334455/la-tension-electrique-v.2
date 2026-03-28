declare module "react-katex" {
  import type { ReactNode } from "react";

  export function InlineMath(props: { math: string; children?: ReactNode }): JSX.Element;
  export function BlockMath(props: { math: string; children?: ReactNode }): JSX.Element;
}

