 import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'

    // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
    import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js'

    // Add Firebase products that you want to use
    import { getAuth } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'
    import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js'
    import { getDatabase, set, ref, get } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js'

    const firebaseConfig = {
      // ... apiKey: "AIzaSyCNK4TrtKF2nPwjTo92RrEIjbOSxoV9MN8",
    authDomain: "pdvsimples-132c8.firebaseapp.com",
   // databaseURL: "https://pdvsimples-132c8-default-rtdb.firebaseio.com",
    projectId: "pdvsimples-132c8",
    storageBucket: "pdvsimples-132c8.firebasestorage.app",
    messagingSenderId: "864246319808",
    appId: "1:864246319808:web:7bd4df3bdb971917f67b25"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
   var db = getDatabase(app);



   //===========================
  function LerDadosOptios(){

        const userRef = ref(db, 'items/')
        get(userRef).then((snapshot)=>{

          console.log(snapshot.val());
          const data = snapshot.val();
          const table = document.querySelector('select');

          let html = '<option selected>Selecione o Cliente</option>';

          for (const key in data){
                const {name, cel, email, cod} = data[key];
                console.log(name+cel+email,cod );
                
               html +='<option value="'+cod+'">'+name+'</option>';


         }

          table.innerHTML = html


        })


    }

  LerDadosOptios();

//=================================

// window.calcMetros =  function(){

      //var metroQtd = document.getElementById('inputMetro').value; 
      //var largura = document.getElementById('inputLargura').value;
      //var altura = document.getElementById('inputAtura').value;
      //var entrada = document.getElementById('inputValorEntrada').value;
      //var selecCliente = document.getElementById('selecCliente').value;
      //var checkboxFechado = document.getElementById('checkboxFechado').value;
      //var checkboxPendente = document.getElementById('checkboxPendente').value;
      //var observacoes = document.getElementById('observacoes').value;
      //var total = document.getElementById('inputTotal').value;
      //var statusServico;
      //if(checkboxFechado != null){
       // statusServico = checkboxFechado;
      //}

      //if(checkboxPendente != null){
      //  statusServico = checkboxPendente;
      //}

     // const orc = document.querySelector('section');
      //var orcamento = '';
      //var area = (largura * altura);
      //var valorMetro = 10;
      //var totalMetros = valorMetro * metroQtd;
      //var valorOrcamento = area * totalMetros;
      
      //if (entrada != null) {
       // valorOrcamento = valorOrcamento - entrada;
      //} 
      
//alert(valorOrcamento)
      //orcamento ='<p align="center" style="font-family:Lucida Bright">Cliente: '+selecCliente+'</br>Total Área = '+area+' Metros quadados!</br> Valor Metro = R$ '+valorMetro+'</br>QTD. Metros = '+metroQtd+' </br>Valor Total Metros = R$ '+totalMetros+' </br>Entrada = R$ '+entrada+'</br> Valor do serviço =  R$ '+valorOrcamento+'</br></br><button  class="btn btn-primary"  onclick="AddOrcamentos();">Enviar orçamento</button>';


      //orc.innerHTML = orcamento;
     //document.getElementById('inputTotal').value = total; 
      //alert('<p>Total Área = '+area+'Metros quadados!</br> Valor Metro ='+valorMetro+' QTD. Metros = '+metroQtd+' Valor Total Metros = '+totalMetros+'</ br> Entrada = '+entrada+'</ br> Valor do serviço = '+valorOrcamento);
     

//}


//criar pdv


let carrinho = [];
       /* window.ItemM2 = function(){
          let inputAlt = document.querySelector('#produtoLargura');
          let inputLarg = document.querySelector('#produtoAltura');
          let inputQtde = document.querySelector('#produtoQuantidade');  
          inputAlt.disabled = true;
          inputLarg.disabled = true;
          //inputQtde.disabled = false;
          document.getElementById("produtoQuantidade").style.display = "none";
          //============================
          document.getElementById('produtoLargura').value = "";
          document.getElementById('produtoAltura').value = "";
          document.getElementById('totArea').value = "";   
        }
        window.ItemUnudade = function(){
          let inputAlt = document.querySelector('#produtoLargura');
          let inputLarg = document.querySelector('#produtoAltura');
          let inputQtde = document.querySelector('#produtoQuantidade'); 
          inputQtde.disabled = true;
          inputAlt.disabled = false;
          inputLarg.disabled = false;
          document.getElementById('produtoQuantidade').value = "";  
        
        }*/

        window.calcularArea = function(){
          let produtoLargura = parseFloat(document.getElementById('produtoLargura').value);
          let produtoAltura = parseFloat(document.getElementById('produtoAltura').value);
          let totalArea; 
          let inputQuantidade = document.querySelector('#produtoQuantidade'); 

            if(produtoLargura != null && produtoAltura != null){

              totalArea = produtoLargura * produtoAltura

            }
           document.getElementById('totArea').value = totalArea
           //document.getElementById('produtoQuantidade').value = "";  
           //inputQuantidade.disabled = true;
        } 

       window.adicionarAoCarrinho = function() {
            let itemCod = document.getElementById('produtoNome').value;
            let preco = parseFloat(document.getElementById('produtoPreco').value);
            let quantidade = parseInt(document.getElementById('produtoQuantidade').value);
            let totArea = parseFloat(document.getElementById('totArea').value);
            let select = document.querySelector('#produtoNome');
            let option = select.children[select.selectedIndex];
            let textoItem = option.textContent;


            if (!itemCod || preco <= 0 || quantidade <= 0) {
                alert('Preencha os campos corretamente!');
                return;
            }

           if(totArea){
              quantidade = totArea;
            }
             


            let item = { itemCod,textoItem, preco, quantidade, total: preco * quantidade };
            carrinho.push(item);

            alert(quantidade+' '+preco+' '+totArea);
            atualizarCarrinho();
            
            

          }
        
        
        window.atualizarCarrinho = function() {
            let lista = document.getElementById('carrinho');
            let totalCompra = 0;
            lista.innerHTML = '';

            var select = document.querySelector('#produtoNome');
            var option = select.children[select.selectedIndex];
            var texto = option.textContent;
            
            carrinho.forEach((item, index) => {
                totalCompra += item.total;
                let li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `${item.itemCod} - ${texto} (Preço Unitario R$ ${item.preco} x QTDE. ${item.quantidade}) - R$ ${item.total.toFixed(2)}
                <button class="btn btn-danger btn-sm" onclick="removerItem(${index})">Remover</button>`;
                lista.appendChild(li);
            });
            

            document.getElementById('totalCompra').innerText = totalCompra.toFixed(2);
        }
        
       window.removerItem = function(index) {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        }
        
        window.finalizarCompra = function () {
            if (carrinho.length === 0) {
                alert('Adicione itens ao carrinho antes de finalizar a compra!');
                return;
            }

                var select = document.querySelector('#selecCliente');
                var option = select.children[select.selectedIndex];
                var textoNomeCliente = option.textContent;

               
                var dataNew = new Date();
                var dtaOrc = dataNew.toLocaleString();
                var totalCompra =  document.getElementById('totalCompra').innerText;
                var valorentrada =  document.getElementById('valorentrada').value;
                var selecCliente = document.getElementById('selecCliente').value;
                var produtoNome = document.getElementById('produtoNome').value; 
                var produtoLargura = document.getElementById('produtoLargura').value;
                var produtoAltura = document.getElementById('produtoAltura').value;
                var totArea = document.getElementById('totArea').value;
                var produtoPreco = document.getElementById('produtoPreco').value;
                var produtoQuantidade = document.getElementById('produtoQuantidade').value;
                var statusOrcamento = document.querySelector('input[name="options-outlined-"]:checked');
               
                if (!valorentrada){
                   valorentrada = "Sem entrada!";
                }
                
                if (valorentrada){
                    valorentrada = valorentrada;
                }
                   const numeroAleatorio = Math.floor(Math.random() * 100000);
                  
                  set(ref(db,'orcamentos/'+ numeroAleatorio),{
                    codclient:selecCliente,
                    textoNomeCliente:textoNomeCliente,
                    produtoNome:produtoNome,
                    produtoLargura:produtoLargura,
                    produtoAltura:produtoAltura,
                    totArea:totArea,
                    produtoPreco:produtoPreco,
                    produtoQuantidade:produtoQuantidade,
                    listItens:carrinho,
                    totalCompra:totalCompra,
                    valorentrada: valorentrada,
                    dtaOrc:dtaOrc,
                    statusOrcamento:statusOrcamento.value,
                    codOrc:numeroAleatorio
                  })
                    

            alert('Compra finalizada com sucesso!'+statusOrcamento.value);
            carrinho = [];
            atualizarCarrinho();
        }

       window.calcEntrada =  function(){
           var totalCompra = document.getElementById('totalCompra').innerText;
           var valorentrada =  document.getElementById('valorentrada').value;
            if(valorentrada){
              totalCompra = totalCompra - valorentrada;

              document.getElementById('totalCompra').innerText = totalCompra.toFixed(2);
            }

            
        }




      const produtoSubmit = document.getElementById('produtoSubmit');
    

        function AddProdutos(){
    
      var produtoName = document.getElementById('produtoName').value; 
      var produtopreco = document.getElementById('produtopreco').value;
      //var produtoTipo = document.getElementById('produtoTipo').value;  
      var produtoTipo;    
      var produtoTipoUnidade = document.querySelector('input[name="options-outlined"]:checked');
      var produtoTipoMetro = document.querySelector('input[name="options-outlined"]:checked');
       
        if(produtoTipoUnidade.value){
          produtoTipo = produtoTipoUnidade.value;
        }

        if(produtoTipoMetro.value){
          produtoTipo = produtoTipoMetro.value;
        }

      //alert(produtoTipoUnidade.value+' '+produtoTipoUnidade.value); 

       

      const numeroAleatorio = Math.floor(Math.random() * 100000);
         
        set(ref(db,'produtos/'+ numeroAleatorio),{
          produtoName:produtoName,
          produtopreco:produtopreco,
          produtoTipo:produtoTipo,
          produtoCod:numeroAleatorio
        })
    
          document.getElementById('produtoName').value = ""; 
          document.getElementById('produtopreco').value = "";
          //document.getElementById('produtoTipo').value = "";  

          alert("Cadastrado com Suceso!  Codigo "+numeroAleatorio);
    }
        
     produtoSubmit.addEventListener('click',AddProdutos);



     //============================================
     function getProdutos(){

        const userRef = ref(db, 'produtos/')
        get(userRef).then((snapshot)=>{

          console.log(snapshot.val());
          const data = snapshot.val();
          const table = document.querySelector('#produtoNome');

          let html = '<option selected>Selecione o produto</option>';

          for (const key in data){
                const {produtoName, produtopreco, produtoTipo, produtoCod} = data[key];
                console.log(produtoName+produtopreco+produtoTipo,produtoCod );
                
               html +='<option value="'+produtoCod+'">'+produtoName+'</option>';



         }

          table.innerHTML = html


        })


    }

  getProdutos();

  window.getPreco = function (){
    var produtoNomeValor = document.getElementById('produtoNome').value; 

    const userRefId = ref(db, 'produtos/'+produtoNomeValor)
    get(userRefId).then((snapshot)=>{
        console.log(snapshot.val());
        const data = snapshot.val();
          

          document.getElementById('produtoPreco').value = snapshot.val().produtopreco; 

            if(snapshot.val().produtoTipo == "unidade"){
                document.getElementById("LbLargura").style.display = "none";
                document.getElementById("produtoLargura").style.display = "none";
                document.getElementById("produtoLargura").style.display = "none";
                document.getElementById("totArea").style.display = "none";
                document.getElementById("CalArea").style.display = "none";
                document.getElementById("LbTotArea").style.display = "none";
                document.getElementById("LBAltura").style.display = "none";
                document.getElementById("produtoAltura").style.display = "none";
                document.getElementById("produtoAltura").style.display = "none";
               }

               if(snapshot.val().produtoTipo != "unidade"){
                document.getElementById("LbLargura").style.display = "block";
                document.getElementById("produtoLargura").style.display = "block";
                document.getElementById("produtoLargura").style.display = "block";
                document.getElementById("totArea").style.display = "block";
                document.getElementById("CalArea").style.display = "block";
                document.getElementById("LbTotArea").style.display = "block";
                document.getElementById("LBAltura").style.display = "block";
                document.getElementById("produtoAltura").style.display = "block";
                document.getElementById("produtoAltura").style.display = "block";
               }

               
           

  })

  }


//Buscar cliente pelo nome;
document.getElementById('filtro').addEventListener('input', function () {
    let filtro = this.value.toLowerCase();
    let opcoes = document.getElementById('selecCliente').options;
    
    for (let i = 0; i < opcoes.length; i++) {
      let texto = opcoes[i].text.toLowerCase();
      opcoes[i].style.display = texto.includes(filtro) ? '' : 'none';
    }
  });
//=================================
//window.AddOrcamentos = function() {
    
  //    var selecCliente = document.getElementById('selecCliente').value;
    //  var produtoNome = document.getElementById('produtoNome').value; 
      //var produtoLargura = document.getElementById('produtoLargura').value;
      //var produtoAltura = document.getElementById('produtoAltura').value;
     // var totArea = document.getElementById('totArea').value;
      //var selecCliente = document.getElementById('selecCliente').value;
   //   var produtoPreco = document.getElementById('produtoPreco').value;
   //   var produtoQuantidade = document.getElementById('produtoQuantidade').value;
   //   var observacoes = document.getElementById('observacoes').value;
    //  var total = document.getElementById('inputTotal').value;
      //alert('teste função!!');
     //    const numeroAleatorio = Math.floor(Math.random() * 100000);
        
       // set(ref(db,'orcamentos/'+ numeroAleatorio),{
         // codclient:selecCliente,
          //produtoNome:produtoNome,
         /// produtoLargura:produtoLargura,
          //produtoAltura:produtoAltura,
          //totArea:totArea,
         // produtoPreco:produtoPreco,
          //produtoQuantidade:produtoQuantidade,
         // codOrc:numeroAleatorio
        //})
    
          /*document.getElementById('name').value = ""; 
          document.getElementById('cel').value = "";
          document.getElementById('email').value = ""; */ 

          //alert("Cadastrado com Suceso!  Codigo "+numeroAleatorio);
   // }
