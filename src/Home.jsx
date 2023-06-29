import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <>
                <main>
                    <div className="container p-4 bg-body-tertiary pb-2">
                        <div className="shadow-lg p-3 mb-5 rounded pb-4">
                            <h1 className="display-3">Bem vindo a Projeto-Loja</h1>
                            <p className="fs-4 p-4">
                                Aqui na Projeto-loja, você pode abrir o catálogo de produtos, adicionar produtos ao carrinho, deletar produtos do carrinho, verificar o carrinho, e finalizar uma compra. Registre-se já para fazer suas compras!
                            </p>
                            <Link className="btn btn-primary ms-4" to={"/loja"}>Acessar Loja »</Link>
                        </div>
                        <div className="row p-4">
                            <div className="col-md-4">
                                <h2>Firebase</h2>
                                <p>
                                    O webapp possui serviços da Firebase Authentication (Google) para registrar e logar o usuário, e Cloud Firestore (Google) para as funcionalidades CRUD.
                                </p>
                            </div>
                            <div className="col-md-4">
                                <h2>React + Bootstrap</h2>
                                <p>
                                    Projeto-Loja foi feita usando a biblioteca React para a criação e navegação entre as interfaces de usuário. O estilo foi feito usando classes do framework Bootstrap, para deixar um visual bonito e uniforme para todos os tipos de telas.
                                </p>
                            </div>
                            <div className="col-md-4">
                                <h2>Produtos</h2>
                                <p>
                                    Os produtos foram puxados do API 'fakestoreapi' para deixar a loja com cara de loja de verdade. <a className="link-secondary" target="_blank" rel="noreferrer" href="https://fakestoreapi.com/">Clique aqui para saber mais</a>
                                </p>
                            </div>
                        </div>
                        <hr />
                        <p>
                            @ Vitor Chaves Araujo - IESB - Análise e Desenvolvimento de Sistemas - Projeto Front-End - <a target="_blank" rel="noreferrer" href="https://github.com/vitoriesb1/projeto-frontend">Github</a>
                        </p>
                        
                    </div>

                </main>
            </>
        )
    }
}
export default Home