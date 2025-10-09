import  { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type CarouselcnProps = {
  slides: string[]
}

export default function Carouselcn({ slides }: CarouselcnProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  // ⏱️ Auto-slide cada 4 segundos
  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 8000) // 8 segundos

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="relative w-full mx-auto">
      {/* Carousel viewport */}
      <div className="overflow-hidden h-96 " ref={emblaRef}>
        <div className="flex">
          {slides.map((src, index) => (
            <div key={index} className="flex-none w-full h-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <Button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white"
        onClick={scrollPrev}
      >
        <ArrowLeft />
      </Button>
      <Button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white"
        onClick={scrollNext}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}
