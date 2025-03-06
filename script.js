document.querySelector("#tools").addEventListener('click',()=>{
    console.log("tools is clicked!")
    let box=document.querySelector("#toolsBox")
    if(box.classList.contains('hidden')){
        box.classList.add('flex');
    box.classList.remove('hidden');
    document.querySelector("#servicesBox").classList.remove('flex')
    document.querySelector("#servicesBox").classList.add('hidden')
} else{
    box.classList.add('hidden');
    box.classList.remove('flex');
    document.querySelector("#servicesBox").classList.remove('flex')
    document.querySelector("#servicesBox").classList.add('hidden')
    }
})
document.querySelector("#services").addEventListener('click',()=>{
    console.log("services is clicked!")
    let box=document.querySelector("#servicesBox")
    if(box.classList.contains('hidden')){
    box.classList.add('flex');
    box.classList.remove('hidden');
    document.querySelector("#toolsBox").classList.remove('flex')
    document.querySelector("#toolsBox").classList.add('hidden')
    } else{
        box.classList.add('hidden');
        box.classList.remove('flex');
        document.querySelector("#toolsBox").classList.remove('flex')
    document.querySelector("#toolsBox").classList.add('hidden')
    }
})