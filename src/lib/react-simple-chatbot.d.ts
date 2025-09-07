declare module 'react-simple-chatbot' {
  import * as React from 'react'

  interface OptionsSteps {
    value: number
    label: string
    trigger: string
  }
  interface Steps {
    id: string
    message?: string | React.ReactNode
    trigger?: string
    options?: OptionsSteps[]
    component?: JSX.Element | null
    user?: boolean
    end?: boolean
    waitAction?: boolean
    validator?: (v: any) => boolean | string
  }

  interface HandleEndProps {
    steps: number
    values: string
  }

  export interface ChatBotProps {
    steps: Steps[]
    className?: string
    headerTitle?: string
    botAvatar?: string
    userAvatar?: string
    floating?: boolean
    bubbleStyle?: React.CSSProperties
    inputStyle?: React.CSSProperties
    placeholder?: string
    recognitionEnable?: boolean
    recognitionLang?: string
    recognitionPlaceholder?: string
    onRecognize?: (val: string) => void
    onSteps?: (steps: Steps[], finalStep: boolean) => void
    opened?: boolean
    closeImage?: string
    customDelay?: number
    userDelay?: number
    botDelay?: number
    handleEnd?: ({ steps, values }: HandleEndProps) => void
  }

  export default class ChatBot extends React.Component<ChatBotProps> {}
}
