import type { FC, ReactElement, CSSProperties } from 'react'
import { useEffect, useState, cloneElement } from 'react'
import s from './Transition.module.scss'

export const TransitionStates = {
    entered: 'entered',
    entering: 'entering',
    exited: 'exited',
    exiting: 'exiting'
} as const
export type TransitionStateType = (typeof TransitionStates)[keyof typeof TransitionStates]
export type TransitionEffectType = 'none' | 'opacity' | 'translateTop' | 'scaleIn'
export type TransitionTimingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | `cubic-bezier(${string}, ${string}, ${string}, ${string})`
const classnames = (...classes: any) => classes.filter((classname: any) => !!classname).join(' ')

interface Props {
    children: ReactElement
    isOpen: boolean
    duration?: number
    timingFunction?: TransitionTimingFunction
    delay?: number
    classNames?: Record<TransitionStateType, string>
    styles?: Record<TransitionStateType, CSSProperties>
    effect?: TransitionEffectType
    unMountOnExited?: boolean
}

const Transition: FC<Props> = ({ children, isOpen: initialOpen = false, duration = 300, timingFunction = 'ease', delay = 20, classNames, styles, effect = 'translateTop', unMountOnExited = false }) => {
    const [isOpen, setIsOpen] = useState(initialOpen)
    const [transitionStates, setTransitionStates] = useState<Array<TransitionStateType>>(!unMountOnExited ? ['exited'] : [])
    const transitionClasses = transitionStates.map((state) => (classNames ? classNames[state] : s[TransitionStates[state]]))
    const transitionStyles = transitionStates.map((state) => styles && styles[state]).reduce((acc, styles) => ({ ...acc, ...styles }), {})
    const withCSSEffect = effect !== 'none' && !classNames && !styles


    useEffect(() => {
        const timeoutIds: NodeJS.Timeout[] = []
        const clearTimeouts = () => {
            timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId))
            timeoutIds.length = 0
        }

        if (initialOpen) {
            setIsOpen(true)
            setTransitionStates(['entered'])
            const enteringTimeoutId = setTimeout(() => setTransitionStates(['entered', 'entering']), delay)
            const exitTimeoutId = setTimeout(() => setTransitionStates([]), duration)

            timeoutIds.push(enteringTimeoutId, exitTimeoutId)
        } else {
            setTransitionStates(['exiting'])
            const exitingTimeoutId = setTimeout(() => setTransitionStates(['exiting', 'exited']), delay)
            const closeTimeoutId = setTimeout(() => {
                setIsOpen(false)
                setTransitionStates(['exited'])
            }, duration)

            timeoutIds.push(exitingTimeoutId, closeTimeoutId)
        }

        return () => clearTimeouts()
    }, [initialOpen, duration, delay])

    if (!isOpen && unMountOnExited) {
        return null
    }

    return (
        <>
            {cloneElement(children, {
                className: classnames(withCSSEffect && transitionStates.length && s[effect], ...transitionClasses, children.props.className),
                style: { ...children.props.style, transition: transitionStates.length && `all ${duration}ms ${timingFunction}`, ...transitionStyles }
            })}
        </>
    )
}

export default Transition
