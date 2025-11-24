import { type MutableRefObject, type Ref, useCallback } from 'react'

const useMergeRefs = <T>(refs: Array<Ref<T> | undefined>) => {
  return useCallback(
    (node: T) => {
      refs.forEach((ref) => {
        if (!ref) return
        if (typeof ref === 'function') {
          ref(node)
        } else if ('current' in ref) {
          ;(ref as MutableRefObject<T | null>).current = node
        }
      })
    },
    [refs]
  )
}

export default useMergeRefs
