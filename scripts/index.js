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
    if(nome.value.length >= 3){
        document.querySelector('img').classList.add('act')
        console.log(document.querySelector('img').classList)
        nome.style.color = "white"
    }else{
        document.querySelector('img').classList.remove('act')
        nome.style.color = "rgba(246, 239, 226, 0.514)"
    }
}

function sub(){
    document.querySelector('img').classList.remove('act')
}