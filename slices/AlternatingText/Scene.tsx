import FloatingCan from "@/app/components/FloatingCan";
import { Environment } from "@react-three/drei";
import React, { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Scene = () => {
  const canRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

  useGSAP(() => {
    if (!canRef.current) return;

    const sections = gsap.utils.toArray(".alternating-section");

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".alternating-text-view",
        endTrigger: ".alternating-text-container",
        pin: true,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    sections.forEach((_, index) => {
      if (!canRef.current) return;
      if (index === 0) return;
      if (!isDesktop) return;

      const isOdd = index % 2 === 1;
      const xPosition = isDesktop ? (isOdd ? "-1" : "1") : "0";

      scrollTl.to(canRef.current.position, {
        x: xPosition,
        ease: "circ.inOut",
        delay: 0.5
      })

      scrollTl.to(canRef.current.position, {
        y: isOdd ? "0.4" : "-0.4",
        ease: "back.inOut",
      }, "<")
      scrollTl.to(".alternating-text-container", {
        backgroundColor: gsap.utils.wrap(bgColors)(index),
      })
    })

  }, {dependencies: [isDesktop]})

  return (
    <group ref={canRef} position-x={isDesktop ? 1 : 0} rotation-y={-0.3}>
      <FloatingCan flavor="strawberryLemonade" />
      <Environment environmentIntensity={1.5} files="/hdr/lobby.hdr" />
    </group>
  );
};

export default Scene;
