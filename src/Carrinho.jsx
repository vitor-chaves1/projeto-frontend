import React from 'react'

const Carrinho = ({ cartItems }) => {
    const precoTotal = cartItems.reduce((total, item) => total + item.preco, 0);
    return (
        <div className="container-fluid bg-secondary pb-2">
            <div className='container'>
                <h1>Meu Carrinho</h1>
                {cartItems.length === 0 ? (
                    <p>O carrinho está vazio.</p>
                ) : (
                    <>
                        <ul className="list-group">
                            {cartItems.map((produto) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={produto.id}>
                                    <div className="d-flex align-items-center">
                                        <img src={produto.imagem} alt={produto.nome} className="img-thumbnail mr-3 imagemCarrinho" />
                                        <div>
                                            <h5>{produto.nome}</h5>
                                            <p>Preço: R$ {produto.preco}</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger">Remover</button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3">
                            <h4>Preço Total: R$ {precoTotal}</h4>
                            <button className="btn btn-success">Finalizar Compra</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Carrinho