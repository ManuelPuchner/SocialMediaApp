import {useRouter} from "next/router"

const User = () => {
  const router = useRouter()
  const {user} = router.query
  return (
    <div>
      {user}
    </div>
  )
}

export default User
