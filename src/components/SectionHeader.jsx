import { useReveal } from './useReveal'

export default function SectionHeader({ heading, sub }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal text-center mb-12 md:mb-16">
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="h-px w-10 bg-orange-500 block" />
        <span className="text-orange-400 text-xs uppercase tracking-[0.2em] font-medium">Shiv Kamgar Sena</span>
        <span className="h-px w-10 bg-orange-500 block" />
      </div>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
        {heading}
      </h2>
      {sub && (
        <p className="text-orange-200/60 text-sm md:text-base max-w-xl mx-auto">{sub}</p>
      )}
      <div className="saffron-divider mt-6 max-w-xs mx-auto" />
    </div>
  )
}
