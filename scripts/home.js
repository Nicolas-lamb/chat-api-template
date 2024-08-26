let menu = document.querySelector('.side_bar > ul')
let humb = document.querySelector('.icon_menu')
humb.addEventListener('click' ,()=>{
    menu.classList.toggle('disable')
    document.querySelector('.icon').classList.toggle('act')
    document.querySelector('.side_bar').classList.toggle('disable')
    document.querySelector('.block_menu').classList.toggle('act')
})

let teste = document.querySelectorAll('.side_bar > ul > li')

teste.forEach(element => {
    element.addEventListener('click', ()=>{
       for(i = 0; i < teste.length; i++ ){
        teste[i].classList.remove('act')
       }
        element.classList.add('act')
    })
});


const params = new URLSearchParams(window.location.search);
const nome = params.get('nome');
document.querySelector('.user_name').innerHTML = nome
document.querySelector('.boas_vindas').innerHTML = `Bem-vindo ${nome}`


const mensagens = [
    "Esta é uma mensagem que se ajusta ao conteúdo",
    "Sim, e você?",
    "Estou ótimo, obrigado!",
    "Que bom saber!",
    "Que bom saber!",
    "Que bom saber!",
    "Que bom saber!",
    "Que bom saber!",
    "Que bom saber!",
     "Que bom saber!",
     "Que bom saber!",
     "Que bom saber!",
     "Que bom saber!",
     "Que bom saber!",
     "Que mal saber!",
   

  ];

  const chatDiv = document.querySelector('.chat');
  const chats = document.querySelectorAll('.side_bar > ul >li')

  chats.forEach(chat => {
    chat.addEventListener('click', function() {
        

        chatDiv.style.justifyContent = 'left';
        

        listarMensagens();
        submitForm()
       
    });
  });

    function submitForm(){
        const formulario = document.getElementById('meuFormulario');

        formulario.style.display='flex'

        formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
    
        const textoInput = document.querySelector('#texto');
        
        const texto = textoInput.value.trim(); // Pega o valor e remove espaços em branco
 
        
        
    
        if (texto) {
            mensagens.push(texto); // Adiciona a mensagem no array
            textoInput.value = ''; // Limpa o campo de texto
            console.log(mensagens)
            listarMensagens(); // Atualiza a exibição das mensagens
        }
        });
    }

    function listarMensagens(){
        const bem_vindo = document.querySelector('.bem_vindo')

        const mensagensDiv = document.querySelector('#mensagens')

        bem_vindo.innerHTML = ''
        mensagensDiv.innerHTML = ''
        
        
        mensagens.forEach(mensagem => {
            const mensagemDiv = document.createElement('div');
            mensagemDiv.classList.add('mensagem');
            mensagemDiv.textContent = mensagem;
            mensagensDiv.appendChild(mensagemDiv)
          });
        
    }
   


  console.log(chats)


function checkBodyWidth() {
    var bodyWidth = document.body.clientWidth;

    if (bodyWidth < 785) {
        document.querySelector('.block_menu').classList.add('act2')
    } else {
        document.querySelector('.block_menu').classList.remove('act2')
    }
}

checkBodyWidth();

window.addEventListener('resize', checkBodyWidth);

  