 import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'

    // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
    import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js'

    // Add Firebase products that you want to use
    import { getAuth } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'
    import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js'
    import { getDatabase, set, ref, get, update, remove} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js'

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

   //const message = document.getElementById('data-list');
   //const notificacao = document.getElementById('age');
   const enviar = document.getElementById('submit');
    
    function AddItem(){
    
      var name = document.getElementById('name').value;
      var bairro = document.getElementById('bairro').value; 
      var cidade = document.getElementById('cidade').value; 
      var cep = document.getElementById('cep').value;
      var uf = document.getElementById('uf').value; 
      var endereco = document.getElementById('endereco').value;   
      var cel = document.getElementById('cel').value;
      var email = document.getElementById('email').value;       
       
      const numeroAleatorio = Math.floor(Math.random() * 100000);
         
        set(ref(db,'items/'+ numeroAleatorio),{
          name:name,
          bairro:bairro,
          cidade:cidade,
          cep:cep,
          uf:uf,
          endereco:endereco,
          email:email,
          cel:cel,
          cod:numeroAleatorio
        })
    
          document.getElementById('name').value = ""; 
          document.getElementById('cel').value = "";
          document.getElementById('email').value = "";
          document.getElementById('cidade').value = "";
          document.getElementById('endereco').value = "";
          document.getElementById('bairro').value = ""; 
          document.getElementById('uf').value = "";
          document.getElementById('cep').value = ""; 

          alert("Cadastrado com Suceso!  Codigo "+numeroAleatorio);
    }
        
     enviar.addEventListener('click',AddItem);

     //ler dados

 

      function LerDados(status,nome){

        const userRef = ref(db, 'orcamentos/')
        get(userRef).then((snapshot)=>{

          console.log(snapshot.val());
          const data = snapshot.val();
          const table = document.querySelector('table');
          
         
          
          //alert(inputOrcStatus.value);
          
          let html = '';
          let htmlPen = '';
          let htmlTot = '';
          let htmlName = '';
          let nomeInputPesquisar = nome;

          for (const key in data){
                const {codclient, textoNomeCliente, produtoNome, produtoLargura,produtoAltura,totArea,produtoPreco,produtoQuantidade,listItens,codOrc,statusOrcamento} = data[key];
                //console.log(name+cel+email,cod );
               //if(statusOrcamento == status){ 
               //html +='<thead><tr><th scope="col">CODIGO</th><th scope="col">CLIENTE</th><th scope="col">ORÇAMENTO</th><th scope="col">STATUS</th></thead><tbody><tr><th scope="row">'+codclient+'</th> <td>'+textoNomeCliente+'</td><td><form action="/Orcamentos/orcamentoCliente.html" method="get"><input type="hidden" id="custIdCodclient" name="custId" value="'+codclient+'"><input type="hidden" id="custIdCodOrc" name="custIdCodOrc" value="'+codOrc+'"><button class="btn btn-primary" type="submit" value="Submit">Visualizar</button></form></td><td><button type="submit" class="btn btn-danger">Pendente</button></td></tr></tbody>';
               //}
                let corBtn;
              if(statusOrcamento == "PENDENTE"){
                corBtn = "btn btn-warning";
                }
              if(statusOrcamento == "FINALIZADO"){
                corBtn = "btn btn-success";
                } 

              if(statusOrcamento !== "PENDENTE" && statusOrcamento !== "FINALIZADO"){
                corBtn = "btn btn-info";
                }
              
              switch(statusOrcamento){
              case "PENDENTE":
              htmlPen +='<thead><tr><th scope="col">CODIGO</th><th scope="col">CLIENTE</th><th scope="col">ORÇAMENTO</th><th scope="col">STATUS</th></thead><tbody><tr><th scope="row">'+codclient+'</th> <td>'+textoNomeCliente+'</td><td><form action="/Orcamentos/orcamentoCliente.html" method="get"><input type="hidden" id="custIdCodclient" name="custId" value="'+codclient+'"><input type="hidden" id="custIdCodOrc" name="custIdCodOrc" value="'+codOrc+'"><button class="btn btn-primary" type="submit" value="Submit">Visualizar</button></form></td><td><button type="submit" class="'+corBtn+'" id="btnStatusOrc" onclick="atualizaStatus('+codOrc+')">'+statusOrcamento+'</button></td><td><button type="submit" class="btn btn-danger" id="btnStatusOrc" onclick="excluirOrcamento('+codOrc+')">Excluir</button></td></tr></tbody>';
               break;

              case "FINALIZADO":
               html +='<thead><tr><th scope="col">CODIGO</th><th scope="col">CLIENTE</th><th scope="col">ORÇAMENTO</th><th scope="col">STATUS</th></thead><tbody><tr><th scope="row">'+codclient+'</th> <td>'+textoNomeCliente+'</td><td><form action="/Orcamentos/orcamentoCliente.html" method="get"><input type="hidden" id="custIdCodclient" name="custId" value="'+codclient+'"><input type="hidden" id="custIdCodOrc" name="custIdCodOrc" value="'+codOrc+'"><button class="btn btn-primary" type="submit" value="Submit">Visualizar</button></form></td><td><button type="submit" class="'+corBtn+'" id="btnStatusOrc">'+statusOrcamento+'</button></td><td><button type="submit" class="btn btn-danger" id="btnStatusOrc" onclick="excluirOrcamento('+codOrc+')">Excluir</button></td></tr></tbody>';
               break;

               default:
               htmlTot +='<thead><tr><th scope="col">CODIGO</th><th scope="col">CLIENTE</th><th scope="col">ORÇAMENTO</th><th scope="col">STATUS</th></thead><tbody><tr><th scope="row">'+codclient+'</th> <td>'+textoNomeCliente+'</td><td><form action="/Orcamentos/orcamentoCliente.html" method="get"><input type="hidden" id="custIdCodclient" name="custId" value="'+codclient+'"><input type="hidden" id="custIdCodOrc" name="custIdCodOrc" value="'+codOrc+'"><button class="btn btn-primary" type="submit" value="Submit">Visualizar</button></form></td><td><button type="submit" class="'+corBtn+'" id="btnStatusOrc" onclick="atualizaStatus('+codOrc+')">'+statusOrcamento+'</button></td><td><button type="submit" class="btn btn-danger" id="btnStatusOrc" onclick="excluirOrcamento('+codOrc+')">Excluir</button></td></tr></tbody>';
              
              }

              if(textoNomeCliente == nomeInputPesquisar){
                  
                  htmlName +='<thead><tr><th scope="col">CODIGO</th><th scope="col">CLIENTE</th><th scope="col">ORÇAMENTO</th><th scope="col">STATUS</th></thead><tbody><tr><th scope="row">'+codclient+'</th> <td>'+textoNomeCliente+'</td><td><form action="/Orcamentos/orcamentoCliente.html" method="get"><input type="hidden" id="custIdCodclient" name="custId" value="'+codclient+'"><input type="hidden" id="custIdCodOrc" name="custIdCodOrc" value="'+codOrc+'"><button class="btn btn-primary" type="submit" value="Submit">Visualizar</button></form></td><td><button type="submit" class="'+corBtn+'" id="btnStatusOrc" onclick="atualizaStatus('+codOrc+')">'+statusOrcamento+'</button></td><td><button type="submit" class="btn btn-danger" id="btnStatusOrc" onclick="excluirOrcamento('+codOrc+')">Excluir</button></td></tr></tbody>';
              
                  //alert("aqui!!")
                }

               
        


         }


          //table.innerHTML = html

            if(status == 'PENDENTE'){
            table.innerHTML = htmlPen
            }
            if(status == 'FINALIZADO'){
            table.innerHTML = html
            }
            if(status == 'TODOS'){
            table.innerHTML = htmlTot
            }
            if(nomeInputPesquisar){
            table.innerHTML = htmlName
            }
           
        })


    }


 window.exibirDadosTable = function(){


  var inputOrcStatus = document.querySelector('input[name="options-outlined-1"]:checked');
  var pesquisarOrc = document.getElementById('pesquisarOrc').value;
  //alert(pesquisarOrc)

  LerDados(inputOrcStatus.value,pesquisarOrc);
}



window.atualizaStatus = function(codOrcamento){

 update(ref(db,'orcamentos/'+codOrcamento),{
          

          statusOrcamento:'FINALIZADO'
      
        })

}

window.excluirOrcamento = function(codOrcamento){

 remove(ref(db,'orcamentos/'+codOrcamento)).then(()=>{

   alert("Excluido com sucesso!");
 }).catch((erro)=>{

  alert("Excluido com sucesso!");
  console.log(erro);
 })

}
 

  

  







  



