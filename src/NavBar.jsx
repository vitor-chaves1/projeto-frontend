import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthGoogleContext } from "./authGoogle";

const NavBar = () => {
    const { signInGoogle, signed, signOut } = useContext(AuthGoogleContext)
    async function loginGoogle() {
        await signInGoogle();
    }
    if (!signed) {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Projeto Loja</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                <Link className="nav-link" to="/loja">Produtos</Link>
                                <button className="btn btn-success" onClick={() => loginGoogle()}>Logar com Google</button>
                                <button className="btn btn-outline-secondary ms-2 disabled">Meu Carrinho</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Projeto Loja</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                <Link className="nav-link" to="/loja">Produtos</Link>
                                <Link className="btn btn-outline-danger" to="/" onClick={() => signOut()}>Sair</Link>
                                <Link to="/carrinho" className="btn btn-success ms-2">Meu Carrinho</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}
export default NavBar;