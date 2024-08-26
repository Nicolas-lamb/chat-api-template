let menu = document.querySelector('.side_bar > ul')
let humb = document.querySelector('.icon_menu')


humb.addEventListener('click' ,()=>{
    menu.classList.toggle('disable')
    document.querySelector('.side_bar').classList.toggle('disable')
})

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
    "Que bom saber!",
    "Que bom saber!"

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

        formulario.style.display='block'

        formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
    
        const textoInput = document.getElementById('texto');
        const texto = textoInput.value.trim(); // Pega o valor e remove espaços em branco
    
        if (texto) {
            mensagens.push(texto); // Adiciona a mensagem no array
            textoInput.value = ''; // Limpa o campo de texto
            listarMensagens(); // Atualiza a exibição das mensagens
        }
        });
    }

    function listarMensagens(){
        const chatPar = document.querySelector('.chat > p');
        const mensagensDiv = document.querySelector('#mensagens')

        
        
        chatPar.innerHTML = ''
        mensagensDiv.innerHTML = ''
        
        
        mensagens.forEach(mensagem => {
            const mensagemDiv = document.createElement('div');
            mensagemDiv.classList.add('mensagem');
            mensagemDiv.textContent = mensagem;
            mensagensDiv.appendChild(mensagemDiv)
          });
        
    }
  


  console.log(chats)

  