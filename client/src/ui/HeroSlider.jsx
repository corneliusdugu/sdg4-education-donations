import { useEffect, useMemo, useState } from "react";

export default function HeroSlider({ slides = [], intervalMs = 3500 }) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [safeSlides.length, intervalMs]);

  if (safeSlides.length === 0) {
    return (
      <div className="h-[360px] w-full rounded-2xl bg-green-50 border border-green-100 grid place-items-center text-sm text-green-800">
        Add images to <b className="mx-1">client/src/assets/</b> to enable the slideshow.
      </div>
    );
  }

  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      {safeSlides.map((s, i) => (
        <img
          key={s.alt + i}
          src={s.src}
          alt={s.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

      {/* dots */}
      {safeSlides.length > 1 && (
        <div className="absolute bottom-4 left-4 flex gap-2">
          {safeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full border border-white/70 ${
                i === index ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`Slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}
