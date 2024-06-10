"use client";
import React, { useEffect, useState } from 'react';
import { fetchTithesData, fetchOfferingsData } from '@/lib/api';
import TithesAndOfferingsChart from '@/components/TithesAndOffering';
import { Typography } from '@/components/Typography';
import { ConnectsCard } from '@/components/custom/ConnectsCard';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import { date } from 'zod';

export default function DashboardRoute() {
  const [tithesData, setTithesData] = useState<{ label: string, date: string, value: number }[]>([]);
  const [offeringsData, setOfferingsData] = useState<{ label: string, date: string, value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tithes = await fetchTithesData();
        const offerings = await fetchOfferingsData();
        setTithesData(tithes);
        setOfferingsData(offerings);
      } catch (error) {
        console.error('Failed to fetch tithes and offerings data:', error);
      }
    };

    fetchData();
  }, []);

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
        <div className="px-4 py-10 ">
          <Typography variant="h2">Dashboard</Typography>
          < div className='flex flex-row gap-4' >
            <TithesAndOfferingsChart tithesData={tithesData} offeringsData={offeringsData} />
            <ConnectsCard />
          </div >

        </div >
      </motion.div>
    </AuroraBackground >
  );
}
