

export default function ProfileCard() {
  return (
    <div className="relative flex justify-center items-center perspective-[1200px]">
          
      {/* Card */}
      <div
        className="
            mt-2 lg:mt-40
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
          src={"/images/profile.JPEG"}
          alt="Profile Card"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
