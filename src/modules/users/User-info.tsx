import {type UserId, usersSlice} from "./users.slice.ts";
import {useAppDispatch, useAppSelector} from "../../app/store.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchUser} from "./model/fetch-user.ts";

export function UserInfo() {
  const {id = ""} = useParams<{id: UserId}>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUserPending)
  const user = useAppSelector(state => usersSlice.selectors.selectUserById(state, id))

  console.log("status:", isPending)
  console.log("user:", user)
  console.log(id)


  useEffect(() => {
    dispatch(fetchUser(id))
  }, [dispatch, id])

  const handleBackButtonClick = () => {
    navigate("..", {relative: "path"}) // возврат на prev страницу
  }

  if (isPending || !user) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}
