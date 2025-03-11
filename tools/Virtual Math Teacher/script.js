let inputBox = document.querySelector("#upld-box")
let input = inputBox.querySelector("input")
let image= inputBox.querySelector("#img")
let loading= document.querySelector("#loading")
let btn= document.querySelector("#btn")
let text= document.querySelector("#text")
let output= document.querySelector(".output")

const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA52yY0fzAaj2wGv47PKxoAhZc6vRS7j7A"
let filesDetails = {
    mime_type: null,
    data: null
};

async function generateResponce() {
    const RequestOption={
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            "contents" : [{ 
        "parts":[
            {"text": "Solve the Mathametical Problem with proper steps and solution"},
            {
              "inline_data": {
                "mime_type":filesDetails.mime_type,
                "data":filesDetails.data
              }
            }
        ]
        }]
    })
    }
    try{
    let responce= await fetch(Api_url,RequestOption)
    let data=await responce.json()
    let apiResponce= data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
    let apiResponse1 =apiResponce.replace(/([^\s]+)\/([^\s]+)/g, "<sup>$1</sup>&frasl;<sub>$2</sub>");
    // console.log(apiResponce);
    text.innerHTML=apiResponse1
    output.style.display="block"
    }
    catch(e){
        console.log(e)
    }
    finally{
        loading.style.display="none"
    }
}


input.addEventListener("change", (e) => {
    const file = input.files[0]
    console.log(file)
    if (!file) return
    let reader = new FileReader()
    reader.onload = (e) => {
        let base64=e.target.result.split(",")[1]
        filesDetails.mime_type = file.type
        filesDetails.data = base64
         
        image.src=`data:${filesDetails.mime_type};base64,${filesDetails.data}`
        inputBox.querySelector("span").style.display="none"
        inputBox.querySelector("#icon").style.display="none"
        image.style.display="block"
        output.style.display="none"
    }
    reader.readAsDataURL(file)
});

inputBox.addEventListener("click", () => {
    input.click();
})

btn.addEventListener("click",()=>{
    loading.style.display="block"
    generateResponce()
})


