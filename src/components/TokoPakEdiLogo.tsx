function TokoPakEdiLogo({ size }: { size?: 'small' | 'large' }) {
  const sizeClass = size === 'large' ? 'text-3xl' : 'text-2xl'
  return (
    <span className={`flex text-green-500 tracking-widest items-center font-bold ${sizeClass}`}>
      TokoPakEdi
    </span>
  )
}

export default TokoPakEdiLogo
