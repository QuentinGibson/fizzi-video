import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

export default function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const slices = getSlices(searchParams.state);

  return (
    <SliceSimulator zIndex={10} background="">
      <div className="max-h-[900px]">
        <SliceZone slices={slices} components={components} />
      </div>
    </SliceSimulator>
  );
}
