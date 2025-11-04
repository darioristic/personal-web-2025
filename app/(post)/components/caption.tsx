import Balancer from "react-wrap-balancer";
import type { ReactNode } from "react";

export function Caption({ children }: { children: ReactNode }) {
  return (
    <span className="block w-full text-xs my-3 font-mono text-neutral-900 dark:text-gray-100 text-center leading-normal">
      <Balancer>
        <span className="[&>a]:post-link">{children}</span>
      </Balancer>
    </span>
  );
}
