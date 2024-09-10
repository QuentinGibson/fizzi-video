"use client";

import FloatingCan from "@/app/components/FloatingCan";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { Content, isFilled } from "@prismicio/client";
import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SkyDiveProps = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
};

const Scene = ({ sentence, flavor }: SkyDiveProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

  const getXYPosition = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(distance),
  });

  useGSAP(() => {
    if (
      !cloudsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current ||
      !canRef.current ||
      !wordsRef.current
    )
      return;

    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, { ...getXYPosition(-4) });
    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPosition(7), z: 2 },
    );
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPosition(DISTANCE),
    });

    //Move clouds
    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * 2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * 2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
      delay: DURATION / 2
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
      },
    });
    scrollTl.to("body", { backgroundColor: "#C0F0F5", overwrite: "auto", duration: 0.1 });
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        {isFilled.select(flavor) ? (
          <FloatingCan
            flavor={flavor}
            rotationIntensity={0}
            floatIntensity={3}
            floatSpeed={3}
            ref={canRef}
          >
            {" "}
          </FloatingCan>
        ) : (
          <FloatingCan ref={canRef}> </FloatingCan>
        )}
      </group>

      {/* Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      {/* Text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315" />}
      </group>

      {/* <OrbitControls /> */}

      {/* Light */}
      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
};

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");

  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words.map((word, index) => (
    <Text
      key={`${word}-${index}`}
      color={color}
      scale={isDesktop ? 1 : 0.5}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,- "
    >
      {word}
    </Text>
  ));
}

export default Scene;
