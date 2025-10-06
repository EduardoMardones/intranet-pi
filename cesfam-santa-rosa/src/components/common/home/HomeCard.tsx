// src/components/common/home/HomeCard.tsx
import React from "react"

interface HomeCardProps {
  title: string
  value?: string | number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  bgColor?: string
  textColor?: string
  iconColor?: string
}

export const HomeCard: React.FC<HomeCardProps> = ({
  title,
  value,
  icon: Icon,
  bgColor = "bg-white",
  textColor = "text-gray-800",
  iconColor = "text-blue-500",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-sm ${bgColor} transition-transform hover:scale-105 hover:shadow-md cursor-pointer w-40`}
    >
      <Icon className={`w-10 h-10 mb-3 ${iconColor}`} />
      <h3 className={`text-base font-semibold text-center ${textColor}`}>{title}</h3>
      {value && <p className={`text-sm mt-1 ${textColor}`}>{value}</p>}
    </div>
  )
}
