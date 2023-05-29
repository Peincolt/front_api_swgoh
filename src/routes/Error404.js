import { useRouteError } from "react-router-dom";

export default function Error404() {
    const error = useRouteError();

    return (
        <div>
            <h1>Oops !</h1>
            <p>Une erreur est survenue lors du chargement de la page</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}