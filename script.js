/*

function adicionarAoCarrinho(produto, preco) {
  carrinho.push({ produto, preco });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(produto + " adicionado ao carrinho!");
}

// Página do carrinho
if (document.getElementById('listaCarrinho')) {
  mostrarCarrinho();
}

function mostrarCarrinho() {
  let lista = document.getElementById('listaCarrinho');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    let li = document.createElement('li');
    li.innerHTML = `${item.produto} - R$ ${item.preco.toFixed(2)} 
    <button onclick="removerDoCarrinho(${index})">Excluir</button>`;
    lista.appendChild(li);
    total += item.preco;
  });

  document.getElementById('total').textContent = total.toFixed(2);
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarCarrinho();


}



function enviarPedidoWhatsApp() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const cep = document.getElementById('cep').value;
  const endereco = document.getElementById('endereco').value;
  const numero = document.getElementById('numero').value;
  const pagamento = document.querySelector('input[name="pagamento"]:checked').value;

  let mensagem = `*Novo Pedido*%0A`;
  carrinho.forEach(item => {
    mensagem += `- ${item.produto} - R$ ${item.preco.toFixed(2)}%0A`;
  });
  
  mensagem += `%0ATotal: R$ ${carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2)}`;
  mensagem += `%0AForma de Pagamento: ${pagamento}`;
  mensagem += `%0ACliente: ${nome}, ${telefone}`;
  mensagem += `%0AEndereço: ${endereco}, Nº ${numero}, CEP: ${cep}`;

  const numeroWhats = '5511994116238'; // Ex: 5511999999999
  const url = `https://wa.me/${numeroWhats}?text=${mensagem}`;
  
  window.open(url, '_blank');

   // Aviso ao cliente
  alert("Pedido enviado! O carrinho será esvaziado.");

  function atualizarCarrinho() {
  const carrinhoDiv = document.getElementById('carrinho');
  carrinhoDiv.innerHTML = 'Carrinho vazio.';
  }
}

*/

let carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || [];
const taxaEntregaValor = 4.00;

/* Adiciona ao carrinho */
function adicionarAoCarrinho(produto, preco) {
  carrinho.push({ produto, preco });
  sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(produto + " adicionado ao carrinho!");
}

/* Se estiver na página do carrinho */
if (document.getElementById('listaCarrinho')) {
  mostrarCarrinho();

  const taxaEntregaCheckbox = document.getElementById('taxaEntrega');
  taxaEntregaCheckbox.addEventListener('change', atualizarTotalFinal);
}

/* Mostrar carrinho */
function mostrarCarrinho() {
  let lista = document.getElementById('listaCarrinho');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    let li = document.createElement('li');
    li.innerHTML = `${item.produto} - R$ ${item.preco.toFixed(2)} 
      <button onclick="removerDoCarrinho(${index})">Excluir</button>`;
    lista.appendChild(li);
    total += item.preco;
  });

  document.getElementById('total').textContent = total.toFixed(2);
  atualizarTotalFinal();
}

/* Atualizar total final com taxa */
function atualizarTotalFinal() {
  const totalProdutos = carrinho.reduce((acc, item) => acc + item.preco, 0);
  const taxaEntrega = document.getElementById('taxaEntrega').checked ? taxaEntregaValor : 0;
  const totalFinal = totalProdutos + taxaEntrega;

  document.getElementById('totalFinal').textContent = totalFinal.toFixed(2);
}

/* Remover item do carrinho */
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarCarrinho();
}

/* Enviar pedido via WhatsApp */
function enviarPedidoWhatsApp() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const cep = document.getElementById('cep').value;
  const endereco = document.getElementById('endereco').value;
  const numero = document.getElementById('numero').value;
  const pagamento = document.querySelector('input[name="pagamento"]:checked').value;

  let mensagem = `*Novo Pedido*%0A`;

  carrinho.forEach(item => {
    mensagem += `- ${item.produto} - R$ ${item.preco.toFixed(2)}%0A`;
  });

  const incluirTaxaEntrega = document.getElementById('taxaEntrega').checked;
  const taxaEntrega = incluirTaxaEntrega ? taxaEntregaValor : 0;
  const totalFinal = carrinho.reduce((acc, item) => acc + item.preco, 0) + taxaEntrega;

  if (incluirTaxaEntrega) {
    mensagem += `Taxa de Entrega: R$ ${taxaEntrega.toFixed(2)}%0A`;
  }

  mensagem += `%0ATotal: R$ ${totalFinal.toFixed(2)}`;
  mensagem += `%0AForma de Pagamento: ${pagamento}`;
  mensagem += `%0ACliente: ${nome}, ${telefone}`;
  mensagem += `%0AEndereço: ${endereco}, Nº ${numero}, CEP: ${cep}`;

  const numeroWhats = '11967641921';
  const url = `https://wa.me/${numeroWhats}?text=${mensagem}`;

  window.open(url, '_blank');
  alert("Pedido enviado! O carrinho será esvaziado.");
}
