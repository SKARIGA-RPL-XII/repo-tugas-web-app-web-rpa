export default function UserHeader() {
  return (
    <div
      className="relative mb-8 h-45 overflow-hidden rounded-3xl bg-cover bg-center px-8 py-10 text-white"
      style={{
        backgroundImage: "url('/images/img_bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        <h1 className="text-3xl font-bold">
          Hallo, Steve Harrington!
        </h1>
        <p className="mt-1 text-sm opacity-90">
          Sabtu, 25 Desember 2026
        </p>
      </div>
    </div>
  )
}
