
let addTarefa = document.querySelector('#addTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let jnl_edição = document.querySelector('#jnl_edição');
let jnl_edição_fundo = document.querySelector('#jnl_edição_fundo');
let btn_sair_jnl_edição = document.querySelector('#btn_sair_jnl_edição');
let btn_salvar_edição = document.querySelector('#btn_salvar_edição');
let id_Tarefa_edição = document.querySelector('#id_Tarefa_edição');
let editar_tarefa = document.querySelector('#editar_tarefa');


addTarefa.addEventListener('keypress', (e) => {

    if(e.keyCode == 13){
        let tarefa = {
            nome: addTarefa.value,
            id: gerarID(),
        }
        adicionarTarefa(tarefa);
    }
});

btnAddTarefa.addEventListener('click', (e) => {

    let tarefa = {
        nome: addTarefa.value,
        id: gerarID(),
    }
    adicionarTarefa(tarefa);

});  
 
function gerarID(){
    return Math.floor(Math.random() *1000);
}

function adicionarTarefa(tarefa){
    let li = gerarTagLI(tarefa);
    listaTarefas.appendChild(li);
    addTarefa.value = '';
}

btn_sair_jnl_edição.addEventListener('click', (e) =>{
    alternarJanelaEdição();
})

btn_salvar_edição.addEventListener('click', (e) => {
    e.preventDefault();
    
    let idTarefa = id_Tarefa_edição.innerHTML.replace('#', '');
    let tarefa = {
        nome: editar_tarefa.value,
        id: idTarefa
    }

    let tarefa_atual = document.getElementById(''+idTarefa+'');

    if(tarefa_atual){
        let li = gerarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefa_atual);
        alternarJanelaEdição(); 
    } else {
        alert('Elemento não encontrado.');
    }
    
})

function gerarTagLI(tarefa){
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('Tarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnExecutar');
    btnEditar.innerHTML = '!';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnExecutar');
    btnExcluir.innerHTML = '-';
    btnExcluir.setAttribute('onclick', 'remover('+tarefa.id+')');

    let checkbox = document.createElement('checkbox');
    checkbox.classList.add('check');
    checkbox.innerHTML = '<input type="checkbox" id="check" class="check">'

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);
    div.appendChild(checkbox);

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

function remover(idTarefa){
    let confirmacao = window.confirm('Tem certeza que quer remover esta tarefa?');
    if(confirmacao){
        let li = document.getElementById(''+idTarefa+'');
        if(li){
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento não encontrado.');
        }
    }
}

function editar(idTarefa){
    let li = document.getElementById(''+idTarefa+'');
        if(li){
            id_Tarefa_edição.innerHTML = '#'+ idTarefa;
            editar_tarefa.value = li.innerText; 
            alternarJanelaEdição();
        } else {
            alert('Elemento não encontrado.');
        }
}

function alternarJanelaEdição() {
    jnl_edição.classList.toggle('abrir');
    jnl_edição_fundo.classList.toggle('abrir');
}