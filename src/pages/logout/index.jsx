import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/actions/auth";
import Loader from "../../components/Loader";

const Logout = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    useEffect(() => {
        dispatch(logout())
        if (userInfo) {
            document.location.href = '/'
        }
    }, [dispatch, userInfo])

    return (
        <div>
            <Loader />
        </div>
    )
}

export default Logout