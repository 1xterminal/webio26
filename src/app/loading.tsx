import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="animate-pulse flex flex-col items-center justify-center">
        <Image
          src="/assets/logo/logo-io.webp"
          alt="Loading..."
          width={100}
          height={100}
          priority
          className="opacity-70"
        />
      </div>
    </div>
  );
}
