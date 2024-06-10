import { Typography } from "@/components/Typography";
import { AuroraBackground } from "../ui/aurora-background";
import { motion } from 'framer-motion';

export function HeroSection({ data }: { readonly data: any }) {
  // Kunin ang data ng HeroSection mula sa API response
  const heroSectionData = data.attributes.blocks.find((block: any) => block.__component === "layout.hero-section");

  // Siguraduhing mayroong data para sa HeroSection
  if (!heroSectionData) {
    return null; // Iwasan ang pag-render ng component kung walang available na data
  }

  // Kunin ang mga kinakailangang impormasyon para sa HeroSection
  const { heading, subHeading, overline } = heroSectionData;

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex lg:flex-row flex-col  items-center justify-center px-4 lg:py-0"
      >
        <div className=" flex lg:flex-row flex-col justify-between lg:px-40 md:px-10 px-4 lg:py-[200px] md:py-2 py-4">
          <div className="flex flex-col lg:py-0">
            <Typography variant="overline" className="lg:text-start md:text-center text-start">{overline}</Typography> {/* overline */}
            <Typography variant="h1" className="flex ">{/* heading */}
              {heading}
            </Typography>
            <Typography variant='paragraph_md' className="">{/* subHeading */}
              {subHeading}
            </Typography>
          </div>
        </div>
        <img className={`py-2 px-4`} src="/uploads/hislife.png" alt="Description of the image" /> {/* image */}
      </motion.div>
    </AuroraBackground >
  );
}
