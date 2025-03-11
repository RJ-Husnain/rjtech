let prompt= document.querySelector('#prompt');
let chatcontainer = document.querySelector('.container');
let start_text=document.querySelector('.start_text');
let imgbtn= document.querySelector('.image');
let imageinput=document.querySelector(".image input");


const Api_url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCKz6aIvv6pGikRqBErOGnWoem-G8VZgOw"


let user={
    data:null,
}

async function generateresponse(aichatbox) {
    let text=aichatbox.querySelector(".ai-chat-area")
    
    let RequestOption={
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({"contents":[{"parts":[{"text":user.data}]}]})
    }
    
    try{
        let response= await fetch(Api_url,RequestOption)
        let data=await response.json()
        let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        text.innerHTML=apiResponse
        
    }
    catch(error){
        console.log(error);
        
    }
    finally{
        chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
    }
    
    
}


function createchatbox(html,classes){
    start_text.style.display="none"
    let div = document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div;
}
function chatresponse(message){
    user.data=message
    let html=`<div class="user-chat-area">${user.data}</div>
    <img src="user.png" alt="user" width="50px" id="user">`
    prompt.value=""
    let userchatbox=createchatbox(html,"user-chatbox")
    chatcontainer.appendChild(userchatbox)
    
    chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
    
    setTimeout(()=>{
        let html=`<img src="robot.png" alt="ai" width="50px" id="ai">
        <div class="ai-chat-area"><img src="loading gif.webp" alt="loading" width="70px"></div> `
        let aichatbox= createchatbox(html,"ai-chatbox")
        chatcontainer.appendChild(aichatbox)
        generateresponse(aichatbox)
    },200)
}

prompt.addEventListener("keydown",(e)=>{
    // if (e.key=="Enter") {
        //   chatresponse(prompt.value)     
        // }
        if (e.key === "Enter") {
            let inputValue = prompt.value.trim();
            if (inputValue) {
                chatresponse(inputValue);
                prompt.value = ""; // Clear input field after sending
            }
        }
    })
send.addEventListener("click",(e)=>{
    // if (e.key=="Enter") {
        //   chatresponse(prompt.value)     
        // }
            let inputValue = prompt.value.trim();
            if (inputValue) {
                chatresponse(inputValue);
                prompt.value = ""; // Clear input field after sending
            }
    })
    imageinput.addEventListener("change",()=>{
        const file= imageinput.files[0]
        if(!file) return
        let reader= new FileReader()
        reader.onload=(e)=>{
            console.log(e)
        }
        reader.readAsDataURL(file)
    })
    
    imgbtn.addEventListener("click",()=>{
        imgbtn.querySelector("input").click()
    })
