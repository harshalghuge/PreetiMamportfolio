

export default function ProfileCard() {
  return (
    <div className="relative flex justify-center items-center perspective-[1200px]">
      {/* Glow background */}
            <div className="
            absolute
            w-72 h-96
            rounded-3xl
            bg-gradient-to-tr
            bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500
            blur-3xl
            opacity-30
            animate-pulse
            -z-10
            mt-10 lg:mt-40
            hidden lg:block
            " />

      {/* Card */}
      <div
        className="
            mt-10 lg:mt-40
            relative
            rounded-3xl
            overflow-hidden
            bg-white/30 backdrop-blur-xl border border-white/20
            w-92 md:w-140
            shadow-2xl
            animate-float
            transition-transform
            duration-500
            hover:scale-105
            hover:[transform:rotateX(10deg)_rotateY(-8deg)_scale(1.05)]
  "
      >
        <img
          src={"/HeroSectionBg/profile.JPEG"}
          alt="Profile Card"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
