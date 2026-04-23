
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



 	var url   = window.location.search.replace("?", "");
    var itens = url.split("&");
    var getCodCliente = itens[0].slice(7); // 5 pois nome= tem 5 caracteres
    var getCodOrc = itens[1].slice(13);
 
  	

	 function lerDadosById(Cod,codOrcm){

    const userRefId = ref(db, 'items/'+Cod);
    get(userRefId).then((snapshot)=>{
        //console.log(snapshot.val());
        //const data = snapshot.val();
           let htmlOrc = '';
           
        const table = document.querySelector('#modalOrc');
       


        htmlOrc +='<div class="nota3" id="banner"><p> </p</div> <figure><blockquote class="blockquote"><section ><div class="notaPai"><div class="nota"><p><b>Endereço</b>: Rua Anfilofio   <b>Bairro</b>: Itapua</p><p><b>Teleforne</b>: 713333333    <b>Email</b>: prpsu1@gmail.com</p><p><b>CEP</b>: 42738200      <b>Ciadade</b>: Salvador     <b>UF</b>: BA</p> </fieldset></div><div class="nota1"><hr><p>PROPOSTA: <b><span id="spCodOrc"></span></b></p><p>Data: <b><span id="spDtaOrc"></span></b></p><hr></div><div class="nota2"><hr><p><b><i>Cliente:</i> '+snapshot.val().name+'</b></p><p><b>Endereço</b>: '+snapshot.val().endereco+'   <b>Bairro</b>: '+snapshot.val().bairro+'</p><p><b>Teleforne</b>: '+snapshot.val().cel+'   <b>Email</b>: '+snapshot.val().email+ '</p><p><b>CEP</b>: '+snapshot.val().cep+'     <b>Ciadade</b>: '+snapshot.val().cidade+'     <b>UF</b>: '+snapshot.val().uf+'</p> <hr></div> <table class="table table-sm" id="tableOrc">';

          
          //document.getElementById('nameOrcamentos').value =snapshot.val().name; 
          //document.getElementById('celOrcamentos').value =snapshot.val().cel;
          //document.getElementById('emailOrcamentos').value =snapshot.val().email;  
      //let codOrcm = snapshot.val().cod;
        let tableHtmlOrc = '';
        tableHtmlOrc +='<tr><th scope="col">ITEM</th><th scope="col">QTDE</th><th scope="col">UNIDADE</th><th scope="col">DESCRIÇÃO MERCADORIAS</th><th scope="col">VALOR UNITARIO</th><th scope="col">VALOR TOTAL</th></tr>';

    const userRefId = ref(db, 'orcamentos/'+codOrcm);
    get(userRefId).then((snapshot01)=>{
        console.log(snapshot01.val());
        //alert(snapshot.val().listItens[0].textoItem)
        const dataOrc = snapshot01.val().listItens;
        
         const tableOrc = document.querySelector('#tableOrc');
          

            for (const key in dataOrc){
                const {itemCod, preco, quantidade, textoItem,total} = dataOrc[key];
                //console.log(name+cel+email,cod );
                
               tableHtmlOrc +='<tbody class="table-group-divider"><tr><th scope="row">'+itemCod+'</th><td>'+quantidade+'</td><td>N/A</td><td>'+textoItem+'</td><td>'+preco+'</td><td>'+total+'</td></tr></tbody>';


         }

        tableHtmlOrc  +='</table><br><h5>Entrada de R$ '+snapshot01.val().valorentrada+'</h5><br><h5>Total serviço R$ ' +snapshot01.val().totalCompra+'</h5><br></section></blockquote><figcaption class="blockquote-footer"> Crie sua marca! <cite title="Source Title">Daniel Bannes----  <p> Orçamento valido por 30 dias!</p><h5>Orçamento '+snapshot01.val().statusOrcamento+'!</h5><a class="nav-link" href="index.html" >Voltar</a><br><button class="btn btn-primary" onclick="window.print()">Imprimir</button></cite></figcaption></figure></div>'; 

          const spCodOrc = document.querySelector('#spCodOrc');        
         
          spCodOrc.innerHTML = snapshot01.val().codOrc

          //INICIO ADICIONAR DATA AO ORCAMENTO
            var now = new Date();

            const spDtaOrc = document.querySelector('#spDtaOrc');
          
            spDtaOrc.innerHTML = snapshot01.val().dtaOrc;

          // FIMADICIONAR DATA AO ORCAMENTO
          
          tableOrc.innerHTML = tableHtmlOrc;


         })
    table.innerHTML = htmlOrc;
    
   });

  }

lerDadosById(getCodCliente,getCodOrc);
