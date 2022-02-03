

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    var address = search.value
    messageOne.textContent = "Loading"
    messageTwo.textContent = ""
    fetch("/weather?address="+address).then((res) => {
        console.log(res);
        res.json().then((data) => {
            console.log(data);
            console.log(address);
            
        messageOne.textContent = address;
        messageTwo.textContent = JSON.stringify(data);
        })
    });
})