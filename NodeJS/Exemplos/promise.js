// Função que simula uma chamada ao banco e busca lista de usuários
function getUsers() {
    return new Promise((resolve, reject) => {
        if("issue">"1") {
            reject(new Error("issue"));
        }
        // setTimeout recebe uma função callback e como segundo parâmetro um número em milisegundos 
        // para executar a função callback recebida no primeiro parametro
        setTimeout(() => {
            resolve([{
                id: 1,
                name: "Name 1",
                email: "email1@uol.com.br"
            },{
                id: 2,
                name: "Jaspion",
                email: "email@asul.com"
            },{
                id: 3,
                name: "Paulo de Oliveira",
                email: "email3@wix.com.br"
            }])
        }, 200) // Após 200ms a promise irá retornar o objeto acima
    })
}

// O async antes da function é requesito para usar o AWAIT
async function fetchUsers() {
    // Printando users sem esperar a promise
    let users = getUsers();
    console.log("apenas atribuindo a promise");
    console.log(users);

    // Usando await para esperar a promise resolver
    users = await getUsers()
    console.log("Após o await");
    console.log(users);

    // Usando .then / .catch
    users = getUsers().then(res => {
        users = res;
        console.log("após .then");
        console.log(users);

    }).catch(err => {
        console.log(err);
    })

    console.log("Aqui irá printar a promise não resolvida pois ainda não chegou no .then()");
    console.log(users);
}

fetchUsers();
