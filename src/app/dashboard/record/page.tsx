"use client";
import React, { useEffect, useState } from 'react';
import WorshipsPage, { Worship } from '@/components/custom/AudioPlayer';
import { date } from 'zod';

const baseUrl = 'http://localhost:1337';

const WorshipRoute: React.FC = () => {
  const [worships, setWorships] = useState<Worship[] | undefined>(undefined);

  useEffect(() => {
    fetch(`${baseUrl}/api/worships?populate=audio`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log fetched data
        const transformedData = data.data.map((item: any) => ({
          id: item.id,
          title: item.attributes.title,
          date: item.attributes.date,
          audio: {
            data: item.attributes.audio.data.map((audioItem: any) => ({
              ...audioItem,
              attributes: {
                ...audioItem.attributes,
                url: baseUrl + audioItem.attributes.url,
              },
            })),
          },
        }));
        console.log('Transformed data:', transformedData); // Log transformed data
        setWorships(transformedData);
      })
      .catch(error => console.error('Error fetching worships:', error));
  }, []);

  return <WorshipsPage worships={worships} />;
};

export default WorshipRoute;
