import { useCallback, useRef } from 'react'

type HookParams = {
  skip: boolean
  action: Function
}

/** 화면에 `ref` 요소가 들어오면 `action`을 실행하는 훅 */
export const useInView = ({ skip, action }: HookParams) => {
  const observer = useRef<IntersectionObserver>()
  const ref = useCallback(
    (node) => {
      if (skip) return
      observer.current?.disconnect()
      observer.current = new IntersectionObserver((entreis) => {
        if (entreis[0].isIntersecting) {
          action()
        }
      })

      if (node) observer.current.observe(node)

      console.log('node', node)
    },
    [skip, action]
  )

  return [ref]
}
