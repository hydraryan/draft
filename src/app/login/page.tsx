// src/app/login/page.tsx
'use client';

import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const AVATAR_PATHS = {
  cast: '/images/avatar-cast.png',
  crew: '/images/avatar-crew.png',
  admin: '/images/avatar-admin.png',
};

const BACKGROUND_IMAGE_URL = '/images/cinematic-bg.png'; // <-- Updated with the image path

interface ProfileTileProps {
  name: string;
  avatarSrc: string;
  href: string;
}

const ProfileTile = ({ name, avatarSrc, href }: ProfileTileProps) => (
  <Link href={href}>
    <div className="group flex cursor-pointer flex-col items-center">
      {/* Avatar Image */}
      <div className="h-36 w-36 overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:border-4 group-hover:border-white md:h-48 md:w-48">
        <img
          src={avatarSrc}
          alt={`${name} Avatar`}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Profile Name */}
      <p className="mt-4 text-xl text-gray-400 transition-colors duration-300 group-hover:text-white">
        {name}
      </p>
    </div>
  </Link>
);

export default function ProfileSelectionPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-4 text-white"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
    >
      <div className="text-center">
        <h1 className="mb-10 text-4xl font-semibold md:text-5xl">Who's Sneaking In?</h1>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          <ProfileTile name="Cast" avatarSrc={AVATAR_PATHS.cast} href="/auth/login?role=Cast" />
          <ProfileTile name="Crew" avatarSrc={AVATAR_PATHS.crew} href="/auth/login?role=Crew" />
          <ProfileTile name="Admin" avatarSrc={AVATAR_PATHS.admin} href="/auth/login?role=Admin" />
        </div>
      </div>
    </div>
  );
}