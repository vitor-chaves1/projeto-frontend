import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const Produto = ({ adicionar }) => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const fetchDetalhesProdutos = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setProduto({ id: docSnapshot.id, ...data });
                } else {
                    console.log("Produto não encontrado");
                }
            } catch (error) {
                console.log("Erro ao obter os detalhes do produto", error);
            }
        };

        fetchDetalhesProdutos();
    }, [id]);

    if (!produto) {
        return <div className="container-fluid bg-secondary carregandoProduto">
            <p>
                Carregando detalhes do produto...
            </p>
        </div>;
    }
    return (
        <>
            <div className="container-fluid bg-secondary containerProduto">
                <div className="container bg-white">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0 imagemProduto" src={produto.imagem} alt="..." /></div>
                        <div className="col-md-6">
                            <div className="small mb-1">{produto.categoria}</div>
                            <h1 className="display-5 fw-bolder">{produto.nome}</h1>
                            <div className="fs-5 mb-5">
                                <span>R${produto.preco}</span>
                            </div>
                            <p className="">{produto.descricao}</p>

                            <div className="small mb-1 mt-5">Quantidade</div>
                            <div className="d-grid gap-2">
                                <input className="form-control text-center mb-1" id="quantidadeProduto" type="num" defaultValue="1" />
                                <button className="btn btn-success flex-shrink-0" type="button" onClick={() => adicionar(produto)}>Adicionar ao Carrinho</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Produto