
import React, { useEffect, useState } from 'react'

/* кастомный хук, чтобы при наборе сёрч не торопился производить поиск, не перегружал серевер */
/* можно использовать отложенный старт или setTimeout */
export const useDebounce = (path) => {
  // 'мягкая'
  const [debounceValue, setDebounceValue] = useState(path);

  // console.log({ path });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(path)
    }, 400);

    // обращается к предыдущему таймауту
    return () => clearTimeout(timeout)
  }, [path])

  return debounceValue
}