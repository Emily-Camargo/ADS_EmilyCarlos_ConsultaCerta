declare module 'react-say' {
  interface SayProps {
    text: string
    pitch?: number
    rate?: number
    volume?: number
    voice?: SpeechSynthesisVoice | undefined
    onEnd?: () => void
  }
  const Say: ({ ...rest }: SayProps) => React.JSX.Element | null

  interface SayUtteranceProps {
    utterance: string
  }
  const SayUtterance: ({
    ...rest
  }: SayUtteranceProps) => React.JSX.Element | null

  export default Say
  export { SayUtterance }
}
