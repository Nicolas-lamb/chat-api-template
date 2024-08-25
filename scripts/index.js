let nome = document.querySelector("#inome")

window.onload = function(){ 
 nome.focus(); 
}

function Input_event(){
    if(nome.value == "")
        nome.style.textAlign = 'left'
    else{
        nome.style.textAlign = 'center'
    }
}
