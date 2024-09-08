"use client"

import FloatingCan from "@/app/components/FloatingCan"
import { Environment } from "@react-three/drei"
import { useRef } from "react"
import { Group } from "three"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

// type Props = {}

const Scene = () => {
  const can1Ref = useRef<Group>(null)
  const can2Ref = useRef<Group>(null)
  const can3Ref = useRef<Group>(null)
  const can4Ref = useRef<Group>(null)
  const can5Ref = useRef<Group>(null)

  const can1GroupRef = useRef<Group>(null)
  const can2GroupRef = useRef<Group>(null)

  const groupRef = useRef<Group>(null)

  const FLOAT_SPEED = 1.5

  useGSAP(() => {
    // Check if all refs are defined
    if (
      !can1Ref.current
      || !can2Ref.current
      || !can3Ref.current
      || !can4Ref.current
      || !can5Ref.current
      || !can1GroupRef.current
      || !can2GroupRef.current
    ) return

    // Set can initial positions
    gsap.set(can1Ref.current.position, {})
  })

  return (
    <group>
      <group ref={can1GroupRef} >
        <FloatingCan ref={can1Ref}  flavor="blackCherry" floatSpeed={FLOAT_SPEED}/>
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan ref={can2Ref}  flavor="lemonLime" floatSpeed={FLOAT_SPEED}/>
      </group>
      <FloatingCan ref={can3Ref}  flavor="grape" floatSpeed={FLOAT_SPEED}/>
      <FloatingCan ref={can4Ref}  flavor="strawberryLemonade" floatSpeed={FLOAT_SPEED}/>
      <FloatingCan ref={can5Ref}  flavor="watermelon" floatSpeed={FLOAT_SPEED}/>
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  )
}

export default Scene