import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";


export type TypographyProps = {
    children: React.ReactNode;
    variant: keyof typeof variantClassName;
} & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export function Typography(props: TypographyProps) {
    const { children, variant } = props;

    const className = variantClassName[variant];

    return <span {...props} className={
        cn("text-baseblack-900",
            className,
            props?.className ? props.className : ""
        )}>
        {children}
    </span>;
}

const variantClassName = {

    h6: "lg:text-[20px] lg:leading-[32px] text-[18px] leading-[24px] text-[#3D3D3D] font-anton",
    h5: "lg:text-[26px] lg:leading-[40px] text-[20px] leading-[32px] text-[#3D3D3D] font-anton",
    h4: "lg:text-[34px] lg:leading-[48px] text-[24px] leading-[32px] text-[#3D3D3D] font-anton",
    h3: "lg:text-[40px] lg:leading-[56px] text-[28px] leading-[40px] text-[#3D3D3D] font-anton",
    h2: "lg:text-[46px] lg:leading-[64px] text-[32px] leading-[40px] text-[#3D3D3D] font-anton",
    h1: "lg:text-[86px] lg:leading-[128px] text-[36px] leading-[48px] text-[#3D3D3D] font-anton",
    stronger: "lg:text-[180px] text-[36px] lg:leading-[328px] leading-[48px] font-anton",

    paragraph: `
    text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-6 md:leading-8 xl:leading-10 font-inter
  `,
    paragraph_xs: "text-[12px] leading-6 font-inter",
    paragraph_sm: "text-[14px] leading-6 font-inter",
    paragraph_md: "text-[16px] leading-6 font-inter",
    paragraph_lg: "text-[18px] leading-8 font-inter",
    paragraph_xl: "text-[24px] leading-10 font-inter",

    header: `
  text-[12px] md:text-[12px] lg:text-[16px] leading-6 md:leading-8 xl:leading-10 
  font-inter uppercase font-medium
  `,

    overline: "text-[14px] lg:text-[16px] text-[#3D3D3D] leading-[24px] font-bold tracking-[3.2px] font-inter uppercase",
};