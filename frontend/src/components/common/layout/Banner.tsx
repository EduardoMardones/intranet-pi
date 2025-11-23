import React from "react";

// Props opcionales para poder reutilizar el banner con distintos títulos o imagen
interface BannerProps {
  title?: string;
  subtitle?: string;
  imageSrc: string;
  height?: string; // Por defecto 400px
}

export const Banner: React.FC<BannerProps> = ({
  title = "",
  subtitle = "",
  imageSrc,
  height = "400px",
}) => {
  return (
    <div className="relative w-full" style={{ height }}>
      <img
        src={imageSrc}
        alt="Banner principal"
        className="object-cover object-[center_-40px] w-full h-full"
      />

      {/* Overlay opcional */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Contenido centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-cyan-500 text-4xl font-bold">{title}</h1>
        <h1 className="text-cyan-500 text-4xl font-bold mt-2">{subtitle}</h1>
      </div>
    </div>
  );
};

export default Banner;
