import React, {useState} from "react";
import produtos from './produtos.json';
import { useParams } from "react-router-dom";

const Produto = ({adicionar}) => {
    const { id } = useParams();
    let p = produtos[id - 1];
    return (
        <>
            <div className="container-fluid bg-secondary containerProduto">
                <div className="container bg-white">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0 imagemProduto" src={p.imagem} alt="..." /></div>
                        <div className="col-md-6">
                            <div className="small mb-1">{p.categoria}</div>
                            <h1 className="display-5 fw-bolder">{p.nome}</h1>
                            <div className="fs-5 mb-5">
                                <span>R${p.preco}</span>
                            </div>
                            <p className="">{p.descricao}</p>

                            <div className="small mb-1 mt-5">Quantidade</div>
                            <div className="d-grid gap-2">
                                <input className="form-control text-center mb-1" id="quantidadeProduto" type="num" defaultValue="1" />
                                <button className="btn btn-success flex-shrink-0" type="button" onClick={() => adicionar(p)}>Adicionar ao Carrinho</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Produto