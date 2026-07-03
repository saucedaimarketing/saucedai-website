"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type TouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-shiny-text";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  /**
   * Headline. Use a `|` to control where the text splits into the two
   * halves that slide apart as the media expands; without one, it splits
   * after the first word (original behavior).
   */
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth < 768,
    () => false
  );
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const isMobileState = useIsMobile();

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: ReactWheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005; // Higher sensitivity for scrolling back
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    // Keyboard support: the original component only advances on wheel or
    // touch while snapping scroll back to the top, which traps
    // keyboard-only users. Map scroll keys onto the same expansion path.
    const KEY_DELTAS: Record<string, number> = {
      ArrowDown: 250,
      PageDown: 800,
      " ": 800,
      End: 1200,
      ArrowUp: -250,
      PageUp: -800,
      Home: -1200,
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      const delta = KEY_DELTAS[e.key];
      if (delta === undefined) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return;
      if (!mediaFullyExpanded || (delta < 0 && window.scrollY <= 5)) {
        e.preventDefault();
        window.dispatchEvent(
          new WheelEvent("wheel", {
            deltaY: delta,
            bubbles: false,
            cancelable: true,
          })
        );
      }
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener("scroll", handleScroll as EventListener);
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener
      );
      window.removeEventListener("scroll", handleScroll as EventListener);
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const [firstWord, restOfTitle] = title
    ? title.includes("|")
      ? [title.split("|")[0].trim(), title.split("|").slice(1).join("|").trim()]
      : [title.split(" ")[0], title.split(" ").slice(1).join(" ")]
    : ["", ""];

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority
            />
            <div className="absolute inset-0 bg-void/60" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(201, 168, 76, 0.15)",
                }}
              >
                {mediaType === "video" ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover rounded-xl"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <div
                      className="absolute inset-0 z-10"
                      style={{ pointerEvents: "none" }}
                    ></div>

                    <motion.div
                      className="absolute inset-0 bg-void/40 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                    />

                    <motion.div
                      className="absolute inset-0 bg-void/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p
                      className="text-xs font-semibold tracking-[0.3em] text-gold uppercase"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="mt-2 text-sm font-medium text-fg-dim text-center"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <AnimatedText
                  text="SAUCED"
                  hoverEffect
                  className="justify-center py-0"
                  textClassName="font-display text-xl font-bold tracking-[0.3em] uppercase sm:text-2xl lg:text-3xl"
                />
                <motion.h1
                  className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-fg transition-none"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h1>
                <motion.h1
                  className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-center text-fg transition-none"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h1>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
