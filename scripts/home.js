let menu = document.querySelector('.side_bar > ul')
let humb = document.querySelector('.icon_menu')
humb.addEventListener('click' ,()=>{
    menu.classList.toggle('disable')
    document.querySelector('.side_bar').classList.toggle('disable')
})