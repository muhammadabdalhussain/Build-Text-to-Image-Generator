// const key = "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";
// const inputText = document.getElementById("input");
// const image = document.getElementById("image");
// const genBtn = document.getElementById("btn");
// const svg = document.getElementById("svg");
// const load = document.getElementById("loading");

// async function query(data) {
//     const response = await fetch(
//         "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
//         {
//             headers: {
//                 Authorization: `Bearer ${key}`

//             },
//             method: "POST",
//             body: JSON.stringify({ "inputs": inputText.value }),
//         }
//     );
//     const result = await response.blob();
//     image.style.display="block"
//     image.style.display="none";
//     return result;
// }

// async function generate() {
// load.style.display= "block";
// query().then((response) => {
//     const objectUrl =URL.createObjectURL(response)
//     image.src = objectUrl;
//     image.style.display = "block";
// });
// }

// genBtn.addEventListener("click", ()=>{
//     generate();
//     svg.style.display="none";
// })

// inputText.addEventListener("keydown", (e)=>{
//     if(e.key == "Enter"){
//         generate();
//         svg.style.display="none";
//     }
// })

const key = "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";
const inputText = document.getElementById("input");
const image = document.getElementById("image");
const genBtn = document.getElementById("btn");
const svg = document.getElementById("svg");
const load = document.getElementById("loading");
const reset =document.getElementById("reset");
const downloadBtn = document.getElementById("download");

async function query(input) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
            headers: {
                Authorization: `Bearer ${key}`
            },
            method: "POST",
            body: JSON.stringify({ "inputs": input }),
        }
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.blob();
}

async function generate() {
    load.style.display = "block"; // Show loading indicator

    try {
        const response = await query(inputText.value); // Pass the input value
        const objectUrl = URL.createObjectURL(response);
        image.src = objectUrl; // Set image source
        downloadBtn.addEventListener("click",()=>{
            download(objectUrl)
        })
        image.style.display = "block"; // Show the image
    } catch (error) {
        console.error('Error generating image:', error);
        image.style.display = "none"; // Hide the image if there is an error
    } finally {
        load.style.display = "none"; // Hide loading indicator
    }
}

genBtn.addEventListener("click", () => {
    generate();
    svg.style.display = "none";
});

inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generate();
        svg.style.display = "none";
    }
});

reset.addEventListener("click", ()=>{
    inputText.value = "";
    window.location.reload();
});

function download(objectUrl){
fetch(objectUrl).then(res=>res.blob())
.then(file=>{
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = new Date().getTime();
    a.click()
})
.catch(()=> alert("Failed Download"))
}
