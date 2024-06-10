"use client";
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button } from '../ui/button';
import { ProfilePicture } from './ProfilePicture';
import { Typography } from '../Typography';

export interface SelectedRow {
  original: {
    id: string;
    profile_picture?: string;
    name: string;
    date_of_birth: string;
    gender: string;
    number: string;
  };
}

interface ModalProps {
  selectedRow: SelectedRow | null;
}

export function ModalDetails({ selectedRow }: ModalProps) {
  const [modal2Open, setModal2Open] = useState(false);
  console.log(selectedRow);

  return (
    <div>
      <div className='mx-auto mt-2'>
        <Button variant="outline" onClick={() => setModal2Open(true)}>
          Details
        </Button>
      </div>
      <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        {selectedRow && (
          <div className=" h-[712px] bg-white rounded-2xl  overflow-y-auto">
            {selectedRow.original.profile_picture ? (

              <ProfilePicture />

            ) : (
              <div className="w-24 h-24 rounded-full mb-4 mx-auto bg-white flex items-center justify-center">
                No Image
              </div>
            )}
            <Typography variant='h5' className='flex items-center justify-center' >{selectedRow.original.name}</Typography>
            <div className='py-4'>
              <div className='flex flex-row items-center'>
                <img
                  src="/assets/BirthIcon.png"
                  alt="Birth icon"
                  className="w-12 h-12 mr-4"
                />
                <div className='flex flex-col'>
                  <Typography variant='paragraph_md' className="mb-1 text-gray-500">Date of Birth</Typography>
                  <Typography variant='paragraph_sm' className="font-bold text-[#072635]">{selectedRow.original.date_of_birth}</Typography>
                </div>
              </div>
            </div>

            <div className='py-4'>
              <div className='flex flex-row items-center '>
                <img
                  src="/assets/FemaleIcon.png"
                  alt="Gender icon"
                  className="w-12 h-12 mr-4"
                />
                <div className='flex flex-col'>
                  <Typography variant='paragraph_md' className="">Gender</Typography>
                  <Typography variant='paragraph_md' className='font-bold text-[#072635]'> {selectedRow.original.gender}</Typography>
                </div>
              </div>
            </div>
            <div className='py-4'>
              <div className='flex flex-row items-center'>
                <img
                  src="/assets/PhoneIcon.png"
                  alt="Contact icon"
                  className="w-12 h-12 mr-4"
                />
                <div className='flex flex-col'>
                  <Typography variant='paragraph_md' className="">Contact Info</Typography>
                  <Typography variant='paragraph_sm' className='font-bold text-[#072635]'> {selectedRow.original.number}</Typography>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </Modal >
    </div >
  );
};
