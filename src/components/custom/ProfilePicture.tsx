"use client";
import { useState, useEffect } from 'react';

export function ProfilePicture() {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:1337/api/messages?populate=*')
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setProfileData(data.data[0]);
        }
      })
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  if (!profileData || !profileData.attributes || !profileData.attributes.profile_picture || !profileData.attributes.profile_picture.data || !profileData.attributes.profile_picture.data.attributes) {
    return null; // Return null if any nested attribute is not available
  }

  return (
    <div className="flex items-center">
      <div className="w-24 h-24 rounded-full mb-4 mx-auto bg-gray-200 flex items-center justify-center">
        <img
          src={`http://localhost:1337${profileData.attributes.profile_picture.data.attributes.url}`}
          alt={profileData.attributes.name}
          className="w-20 h-20 rounded-full"
        />
      </div>
    </div>
  );
};
