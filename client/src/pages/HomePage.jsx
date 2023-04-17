import { useSelector } from "react-redux"

const HomePage = () => {
    const user = useSelector((state) => state.user);

    return(
        <>
            <h1>Bienvenido {user.firstName} {user.lastName}</h1>
        </>
    )
}

export default HomePage;