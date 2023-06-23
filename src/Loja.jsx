import React, { useState, useEffect } from "react";
import produtos from './produtos.json';
import { Link } from "react-router-dom";

const Loja = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(produtos);
    }, []);

    return (
        <>
            <div className="container-fluid bg-secondary">
                <h1>Produtos</h1>
                <div className="row row-cols-3 g-3">
                    {items.map((produto) => (
                        <div className="col">
                            <div className="card h-100">
                                <img src={produto.imagem} className="card-img-top imagemCard" alt="produto" />
                                <div className="card-body">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <p className="card-text">R${produto.preco}</p>
                                    <Link className="btn btn-success">Abrir Produto</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Loja