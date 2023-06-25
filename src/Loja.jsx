import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Loja = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const fetchedProdutos = querySnapshot.docs.map((doc) => doc.data());
            setProdutos(fetchedProdutos);
        };

        fetchProdutos();
    }, []);
    return (
        <>
            <div className="container-fluid bg-secondary">
                <h1>Produtos</h1>
                <div className="row row-cols-3 g-3">
                    {produtos.map((produto) => (
                        <div className="col" key={produto.id}>
                            <div className="card h-100">
                                <img src={produto.imagem} className="card-img-top imagemCard" alt="produto" />
                                <div className="card-body">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <p className="card-text">R${produto.preco}</p>
                                    <Link className="btn btn-success" to={{pathname: `/produto/${produto.id}`}}>Abrir Produto</Link>
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