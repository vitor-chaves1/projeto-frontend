import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { AuthGoogleContext } from "./authGoogle";

const Produto = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const { user, signed } = useContext(AuthGoogleContext)
    const [inputQuantidade, setInputQuantidade] = useState(1);
    const [alertaConfirmacao, setAlertaConfirmacao] = useState(false);


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

    const adicionarAoCarrinho = async () => {
        try {
            const idCliente = user.uid;
            const quantidade = parseInt(inputQuantidade);

            const compraRef = collection(db, "compra_ativa");
            const q = query(compraRef, where("ID_cliente", "==", idCliente));
            const querySnapshot = await getDocs(q);

            const productsRef = collection(db, "products");
            const productDoc = await getDoc(doc(productsRef, id));
            const idProduto = productDoc.data().id;


            if (querySnapshot.empty) {
                const novaCompraRef = doc(compraRef);
                const idCompra = novaCompraRef.id;

                await setDoc(novaCompraRef, {
                    ID_compra: idCompra,
                    ID_cliente: idCliente,
                    produtos: [
                        {
                            ID_produto: idProduto,
                            quantidade: quantidade,
                        },
                    ],
                });

                console.log("Nova compra criada e produto adicionado ao carrinho");
            } else {
                // Verificar se o produto já está no carrinho
                const compraDoc = querySnapshot.docs[0];
                const compraId = compraDoc.id;
                const produtos = compraDoc.data().produtos;

                const produtoIndex = produtos.findIndex((produto) => produto.ID_produto === idProduto);

                if (produtoIndex !== -1) {
                    // Atualizar a quantidade do produto
                    produtos[produtoIndex].quantidade = quantidade;

                    await updateDoc(doc(db, "compra_ativa", compraId), {
                        produtos: produtos,
                    });

                    console.log("Quantidade do produto atualizada no carrinho");
                } else {
                    // Adicionar o produto ao carrinho
                    await updateDoc(doc(db, "compra_ativa", compraId), {
                        produtos: arrayUnion({
                            ID_produto: idProduto,
                            quantidade: quantidade,
                        }),
                    });

                    console.log("Produto adicionado ao carrinho existente");
                }
            }
            setAlertaConfirmacao(true)
        } catch (error) {
            console.log("Erro ao adicionar o produto ao carrinho", error);
        }

    };

    if (!produto) {
        return <div className="container-fluid bg-secondary">
            <p>
                Carregando detalhes do produto...
            </p>
        </div>;
    }
    return (
        <>
            <div className="container-fluid bg-secondary">
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
                                <input className="form-control text-center mb-1" type="number" min="1" value={inputQuantidade} onChange={(e) => setInputQuantidade(e.target.value)} />
                                <button className="btn btn-success flex-shrink-0" type="button" onClick={() => {
                                    if (signed) {
                                        adicionarAoCarrinho()
                                    } else {
                                        alert("Para adicionar um produto ao carrinho é necessário fazer Login")
                                    }
                                }}>Adicionar ao Carrinho</button>
                                {alertaConfirmacao && (
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        Produto adicionado ao carrinho!
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertaConfirmacao(false)}></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Produto