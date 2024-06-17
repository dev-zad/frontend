"use client";
import { Typography } from "../Typography";
import { useEffect, useState } from "react";

export function ConnectsCard() {
  const [profileData, setProfileData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:1337/api/messages?populate=*')
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setProfileData(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data');
      });
  }, []);

  return (
    <div className="w-[367px] bg-glass rounded-2xl p-6 shadow-sm border overflow-y-auto">
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className='py-2'>
        <Typography variant="paragraph" className="font-bold">Connected</Typography>
      </div>
      {profileData.slice(0, 3).map((profile) => (
        <div
          key={profile.id}
          className='flex-col flex hover:bg-[#fecaca] px-4 rounded-lg cursor-pointer'
        >
          <div className='flex flex-row items-center'>
            {profile.attributes.profile_picture?.data ? (
              <img
                src={`http://127.0.0.1:1337${profile.attributes.profile_picture.data.attributes.url}`}
                alt={`${profile.attributes.name}'s profile`}
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
            <div className="gap-1">
              <Typography variant="paragraph" className="font-bold">{profile.attributes.name}</Typography>
              <div className='flex flex-row gap-2'>
                <Typography variant="paragraph_md">{profile.attributes.tribe},</Typography>
                <Typography variant="paragraph_md">{profile.attributes.gender}</Typography>
              </div>
            </div>
          </div>
          <style jsx>{`
        .bg-glass {
          background: rgba(255, 255, 255, 0.2); /* Light white background with transparency */
          backdrop-filter: blur(10px); /* Blur effect */
          -webkit-backdrop-filter: blur(10px); /* For Safari */
          border-radius: 20px; /* Rounded border */
          border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border */
        }
      `}</style>
        </div>

      ))}
    </div>
  );
}
