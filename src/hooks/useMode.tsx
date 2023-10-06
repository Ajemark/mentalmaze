import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const useMode = () => {
  const [challenger, setChallenger] = useState(false);
  const location = useLocation()

  const locationContainsChallenger = () => {
    let answer = false

    for (let i = 0; i < location.pathname.length - 1; i++) {
      if (location.pathname.slice(i, location.pathname.length) == "challenger") {
        answer = true
      }
    }
    setChallenger(answer)
    //   console.log(answer)
  }

  useEffect(() => {
    locationContainsChallenger()
  }, [location])

  return { challenger }
}

export default useMode