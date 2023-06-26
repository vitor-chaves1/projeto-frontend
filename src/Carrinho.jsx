import React, { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { AuthGoogleContext } from "./authGoogle";

const Carrinho = () => {
    const { user } = useContext(AuthGoogleContext)
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {
        const fetchCarrinho = async () => {
            const idCliente = user.uid;

            const q = query(collection(db, "compra"), where("ID_cliente", "==", idCliente));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const compraDoc = querySnapshot.docs[0];
                const compraId = compraDoc.id;
                const compraProdutos = compraDoc.data().produtos;
                //console.log(compraProdutos)

                const produtosSnapshot = await getDocs(collection(db, "products"));
                const produtos = [];

                for (const elemento of compraProdutos){
                    const compraProdutoId = elemento.ID_produto
                    const compraProdutoQuantidade = elemento.quantidade
                    for (const x of produtosSnapshot.docs){
                        const produtoId = x.id
                        const produtoData = x.data();
                        // verifica quais produtos estao dentro da compra
                        if( compraProdutoId == produtoId){
                            const produto = {
                                id: produtoId,
                                nome: produtoData.nome,
                                preco: produtoData.preco,
                                imagem: produtoData.imagem,
                                quantidade: compraProdutoQuantidade,
                            }
                            produtos.push(produto)
                        }
                    }
                }
                setCarrinho(produtos);
            } else {
                console.log('query vazio')
            }
        };

        fetchCarrinho();
    }, []);

    const calcularPrecoTotal = () => {
        let precoTotal = 0;
        for (const produto of carrinho) {
            precoTotal += produto.preco * produto.quantidade;
        }
        return precoTotal.toFixed(2);
    };

    return (
        <div className="container-fluid bg-secondary pb-2">
            <div className='container'>
                <h1>Meu Carrinho</h1>
                {carrinho.length === 0 ? (
                    <p>O carrinho está vazio.</p>
                ) : (
                    <>
                        <ul className="list-group">
                            {carrinho.map((produto) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={produto.id}>
                                    <div className="d-flex align-items-center">
                                        <img src={produto.imagem} alt={produto.nome} className="img-thumbnail mr-3 imagemCarrinho" />
                                        <div>
                                            <h5>{produto.nome}</h5>
                                            <p>Quantidade: {produto.quantidade}</p>
                                            <p>Preço unitario: R$ {produto.preco}</p>
                                            <p>Subtotal R$ {(produto.quantidade * produto.preco).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger">Remover</button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3">
                            <h4>Preço Total: R$ {calcularPrecoTotal()}</h4>
                            <button className="btn btn-success">Finalizar Compra</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Carrinho