"use client";
import { Typography } from "@/components/Typography";
import { AuroraBackground } from "../ui/aurora-background";
import { motion } from 'framer-motion';

export function HeroSection({ data }: { readonly data: any }) {
  console.dir(data, { depth: null });
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
            <Typography variant="overline" className="lg:text-start md:text-center text-start">His life metro</Typography> {/* overline */}
            <Typography variant="h1" className="flex "> {/* heading */}
              LOVE GOD.<br className="lg:block md:hidden block" /> MAKE DISCIPLES.<br className="lg:block md:hidden" /> IMPACT OUR WORLD.
            </Typography>
            <Typography variant='paragraph_md' className=""> {/* subHeading */}
              This is how we know what love is: Jesus Christ laid down his life for us.
              And we ought to <br className="lg:block hidden " /> lay down our lives for our brothers and sisters.
              <br />- 1 John 3:16 (NIV)
            </Typography>
          </div>
        </div>
        <img className={`py-2 px-4`} src="/uploads/hislife.png" alt="Description of the image" /> {/* image */}
      </motion.div>
    </AuroraBackground >

  );
}