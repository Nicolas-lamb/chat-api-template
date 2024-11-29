import { entrar, entrarSala, listarSalas, enviarMensagem } from './chatRoutes.js';

let menu = document.querySelector('.side_bar > ul');
let humb = document.querySelector('.icon_menu');
humb.addEventListener('click', () => {
    menu.classList.toggle('disable');
    document.querySelector('.icon').classList.toggle('act');
    document.querySelector('.side_bar').classList.toggle('disable');
    document.querySelector('.block_menu').classList.toggle('act');
});

async function carregarSalas() {
    try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const nick = JSON.parse(sessionStorage.getItem("nick"));
        const idUser = JSON.parse(sessionStorage.getItem("idUser"));

        const salas = await listarSalas(token, nick, idUser);
        const menu = document.querySelector('.side_bar > ul');
        
        const salasLimitadas = salas.slice(0, 12);
        
        menu.innerHTML = '<span class="salas">Salas Disponíveis</span>';
        salasLimitadas.forEach(sala => {
            const li = document.createElement('li');
            li.setAttribute('data-id', sala.id);
            li.innerHTML = `<span class="opc_text">${sala.nome}</span>`;
            menu.appendChild(li);

            li.addEventListener('click', () => {
                selecionarSala(sala.id, li);
            });
        });
    } catch (error) {
        console.error('Erro ao carregar salas:', error.message);
    }

    
}

async function selecionarSala(idSala, liElement) {
        const salas = document.querySelectorAll('.side_bar > ul > li');
        salas.forEach(sala => {
            sala.classList.remove('act');
        });

        liElement.classList.add('act');

        document.querySelector('.bem_vindo').innerHTML = '';

        const token = JSON.parse(sessionStorage.getItem("token"));
        const nick = JSON.parse(sessionStorage.getItem("nick"));
        const idUser = JSON.parse(sessionStorage.getItem("idUser"));
        
        const mensagenss = await entrarSala(idSala, token, nick, idUser);
        let abaMensagens = document.querySelector('#mensagens')
        let tamanho = mensagenss.mensagens.msgs.length
        for(let i = 1; i < tamanho; i++){
            let mensagens = mensagenss.mensagens
            let teste = document.createElement('div')
            let mensagem = document.createElement('div')
            abaMensagens.appendChild(teste)
            teste.appendChild(mensagem)
            teste.style.width='100%'
            let nick = document.createElement('div')
            mensagem.appendChild(nick)
            nick.innerText = mensagens.msgs[i].nick
            nick.style.fontSize = '20px'
            nick.style.borderBottom = 'solid 1px white'
            nick.style.textAlign = 'left'
            let conteudo = document.createElement('div')
            mensagem.appendChild(conteudo)
            conteudo.innerText = mensagens.msgs[i].msg

            mensagem.classList.add('mensagem', 'recebida');
            teste.style.display = 'flex'
            abaMensagens.style.display = 'flex'
            abaMensagens.style.flexWrap = 'wrap'
            if (mensagens.msgs[i].nick == JSON.parse(sessionStorage.getItem("nick"))) {
                nick.innerText = ""
                nick.style.border = 'none'
                teste.style.justifyContent = 'flex-end'
                teste.childNodes[0].style.backgroundColor = "var(--color)"

            } else {
                teste.style.justifyContent = 'flex-start'
            }
        }
        submitForm(idSala);
        rolarFinal();
}

function submitForm(idSala) {
    const formulario = document.getElementById('meuFormulario');
    formulario.style.display = 'flex';

    formulario.addEventListener('submit', async function (event) {
        event.preventDefault(); 

        const textoInput = document.querySelector('#texto');
        const texto = textoInput.value.trim();

        if (texto) {
                const token = JSON.parse(sessionStorage.getItem("token"));
                const nick = JSON.parse(sessionStorage.getItem("nick"));
                const idUser = JSON.parse(sessionStorage.getItem("idUser"));

                await enviarMensagem(idSala, texto, token, nick, idUser);

                const mensagensDiv = document.querySelector('#mensagens');
                const mensagemDiv = document.createElement('div');
                mensagemDiv.classList.add('mensagem', 'enviada');
                mensagemDiv.textContent = texto;
                mensagensDiv.appendChild(mensagemDiv);

                textoInput.value = ''; 
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const nick = params.get('nome');
        
        if (!nick) {
            alert('Nome de usuário não informado!');
            return;
        }

        document.querySelector('.user_name').innerHTML = nick;

        const { idUser, token } = await entrar(nick);
        sessionStorage.setItem("idUser", JSON.stringify(idUser));
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("nick", JSON.stringify(nick));

        carregarSalas();
    } catch (error) {
        console.error('Erro ao inicializar o app:', error.message);
    }
});

function checkBodyWidth() {
    var bodyWidth = document.body.clientWidth;

    if (bodyWidth < 1000) {
        document.querySelector('.block_menu').classList.add('act2');
        document.querySelector('.side_bar').style.width = "0";
    } else {
        document.querySelector('.block_menu').classList.remove('act2');
        document.querySelector('.side_bar').style.width = "min-content";
    }
}

checkBodyWidth();
window.addEventListener('resize', checkBodyWidth);

function rolarFinal() {
    window.scrollTo(0, document.body.scrollHeight);
};