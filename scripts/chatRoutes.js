const urlApi = "https://chat-crng.onrender.com"

async function entrar(nick) {
    try {
        const response = await fetch(`${urlApi}/entrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nick }),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao entrar:', error);
        throw error;
    }
}

async function entrarSala(idSala, token, nick, idUser, timestamp = 0) {
    try {
        const entrarResponse = await fetch(`https://chat-crng.onrender.com/sala/entrar?idsala=${idSala}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                'idUser': idUser,
                'nick': nick
            }
        });

        if (!entrarResponse.ok) {
            throw new Error(`Erro ao entrar na sala: ${entrarResponse.statusText}`);
        }

        const entrarData = await entrarResponse.json();
        console.log('Resposta ao entrar na sala:', entrarData);

        const mensagensResponse = await fetch(`https://chat-crng.onrender.com/sala/mensagens?idSala=${idSala}&timestamp=${timestamp}`, {
            method: 'GET',
            headers: {
                'token': token,
                'nick': nick,
                'idUser': idUser
            }
        });

        if (!mensagensResponse.ok) {
            throw new Error(`Erro ao buscar mensagens: ${mensagensResponse.statusText}`);
        }

        const mensagens = await mensagensResponse.json();

        return {
            mensagens: mensagens,
        };
    } catch (error) {
        console.error('Erro:', error.message);
        throw error;
    }
}


async function listarSalas(token, nick, idUser) {
    try {
        const response = await fetch(`${urlApi}/salas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                'nick': nick,
                'idUser': idUser, 
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao listar salas: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        const salasFiltradas = data.map((sala) => ({
            id: sala._id,
            nome: sala.nome,
        }));
        return salasFiltradas;
    } catch (error) {
        console.error('Erro ao listar salas:', error.message);
        throw error;
    }
}

async function enviarMensagem(idSala, mensagem, token, nick, idUser) {
    console.log(idSala, mensagem, token, nick, idUser)
        const response = await fetch(`${urlApi}/sala/mensagem?idsala=${idSala}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                'nick': nick,
                'idUser': idUser,
            },
            body: JSON.stringify({
                msg: mensagem,
                idSala: idSala,
            }),
        });

        return;
}


export { entrar, entrarSala, listarSalas, enviarMensagem };
