// src/app/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  const googleFormUrl = "PASTE_YOUR_GOOGLE_FORM_URL_HERE"; // <-- Paste your Google Form link here

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Poster/Video. The background is from the image you provided. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/the-draft-poster.png")' }}
      >
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center">
        {/* Title */}
        <h1 className="font-bebas-neue text-6xl font-bold uppercase tracking-wider text-white md:text-9xl">
          THE DRAFT
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-xl font-semibold italic text-white md:text-3xl">
          “Every Hostel Hides Stories…”
        </p>

        {/* Short Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-300 md:text-lg">
          A gripping student feature film that delves into the untold narratives
          of a bustling hostel, where friendships, rivalries, and life-changing
          decisions are made behind closed doors.
        </p>

        <div className="mt-8 flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
          {/* Login Button with updated styling */}
          <Link href="/login">
            <button className="w-full transform rounded border-2 border-netflix-red bg-transparent px-10 py-4 font-bold uppercase text-netflix-red shadow-lg transition duration-300 hover:scale-105 hover:bg-netflix-red hover:text-white">
              Login
            </button>
          </Link>

          {/* New "Apply for Crew" Button */}
          <a href= "https://forms.gle/vEiQPhJkciqbQQeR6" target="_blank" rel="noopener noreferrer">
            <button className="w-full transform rounded border-2 border-netflix-red bg-transparent px-10 py-4 font-bold uppercase text-netflix-red shadow-lg transition duration-300 hover:scale-105 hover:bg-netflix-red hover:text-white">
              Apply for Crew
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}