"use client";

import { type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { useMotion } from "@/components/providers/MotionProvider";

interface InfinityButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "light" | "ghost" | "terra" | "ink";
  withArrow?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  disabled?: boolean;
}

function ArrowSvg() {
  return (
    <svg className="btn__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 10.9h11.05L9.3 6.15 10.85 4.6 18.25 12l-7.4 7.4-1.55-1.55 4.75-4.75H3z"
        fill="currentColor"
      />
    </svg>
  );
}

const VARIANT_CLASS = {
  light: "btn--light",
  ghost: "btn--ghost",
  terra: "btn--terra",
  ink: "btn--ink",
} as const;

export function InfinityButton({
  children,
  href,
  onClick,
  variant = "terra",
  withArrow = true,
  className = "",
  target,
  rel,
  type = "button",
  "aria-label": ariaLabel,
  disabled,
}: InfinityButtonProps) {
  const { scrollTo } = useMotion();
  const combinedClass = `btn ${VARIANT_CLASS[variant]} ${withArrow ? "btn--icon" : ""} ${className}`.trim();

  const innerContent = (
    <>
      <span className="btn__bg">
        <span className="btn__bg-hover" />
      </span>
      <span className="btn__inner">
        <span className="btn__mask">
          <span className="btn__text">{children}</span>
        </span>
        {withArrow && (
          <span className="btn__icon-wrap">
            <span className="btn__icon-bg" />
            <span className="btn__icon-mask">
              <span className="btn__icon-list">
                <ArrowSvg />
                <ArrowSvg />
                <ArrowSvg />
              </span>
            </span>
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    // In-page anchors scroll through the shared Lenis instance instead of jumping.
    if (href.startsWith("#")) {
      const handleAnchor = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        scrollTo(href, { offset: -72 });
        onClick?.();
      };
      return (
        <a href={href} onClick={handleAnchor} className={combinedClass} aria-label={ariaLabel}>
          {innerContent}
        </a>
      );
    }

    if (/^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a
          href={href}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={combinedClass}
          aria-label={ariaLabel}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <Link href={href} target={target} className={combinedClass} aria-label={ariaLabel}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClass} aria-label={ariaLabel} disabled={disabled}>
      {innerContent}
    </button>
  );
}
