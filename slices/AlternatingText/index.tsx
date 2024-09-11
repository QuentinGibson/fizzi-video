"use client";
import { Bounded } from "@/app/components/Bounded";
import { asText } from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { div } from "three/webgpu";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative text-sky-950"
    >
      <div>
        <div className="grid relative">
          {/* View Goes Here */}
          {slice.primary.text_group.map((item, index) => {
            return (
              <div
                key={asText(item.heading)}
                className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
              >
                <div className={index % 2 === 0 ? "col-start-1" : "md:col-start-2"}>
                  <PrismicRichText field={item.heading} />

                  <PrismicRichText field={item.body} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
