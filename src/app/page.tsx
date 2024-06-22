"use client";
import qs from "qs";
import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes } from "@/lib/utils";
import React, { useEffect, useState } from 'react';
import { FeatureSection } from "@/components/custom/FeaturesSection";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://127.0.0.1:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}

export default function Home() {
  const [strapiData, setStrapiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStrapiData("/api/home-page");
      setStrapiData(data);
    };

    fetchData();
  }, []);

  if (!strapiData) {
    return <div>Loading...</div>; // or your custom loading component
  }

  const { title, description, blocks } = strapiData;

  console.dir(blocks, { depth: null });

  return (
    <main>
      <HeroSection data={blocks[0]} />
      <FeatureSection data={blocks[0]} />
    </main>
  );
}