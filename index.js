//https://jsonplaceholder.typicode.com/users

document.getElementById("btn-get").onclick = getUser


function getUser(){
    const id = document.getElementById("input-id").value

    fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then(res => {
        if(!res.ok){
            return Promise.reject("Error: Could not fetch user")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("id-name").innerText = data.name
        document.getElementById("id-phone").innerText = data.phone
        document.getElementById("id-city").innerText = data.address.city
        document.getElementById("id-street").innerText = data.address.street

    })
    .catch(err => {
        document.getElementById("error").innerText = err
    })
    .finally(e => console.log("Finally Done"))
}

document.getElementById("btn-getall").onclick = getAllUsers
function getAllUsers(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const tableData = data.map(user => `
        <tr> 
            <td>${encode(user.name)}</td>
            <td>${encode(user.phone)}</td>
            <td>${encode(user.address.city)}</td>
            <td>${encode(user.address.street)}</td>
        </tr>
        `).join("\n")
        document.getElementById("tbl-body").innerHTML = tableData
    })
    .catch(err => console.error("Error" + err))
    .finally(e => console.log("Finally Donw"))
}


/**
* The encoder method we have used when inserting untrusted data via the innerHTML property
* Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
* @param {str} str
* @returns the encode string
*/
export function encode(str) {
 let encoded = "" + str
 encoded = encoded.replace(/&/g, "&amp;");
 encoded = encoded.replace(/>/g, "&gt;");
 encoded = encoded.replace(/</g, "&lt;");
 encoded = encoded.replace(/"/g, "&quot;");
 encoded = encoded.replace(/'/g, "&#039;");
 return encoded;
}








/*
const options = {
//fetch("https://jsonplaceholder.typicode.com/users",
method: 'POST',
headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
},
    body: JSON.stringify(
        {
        name: 'Eric'
        }
    )
}
const v = fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => {
        console.log(res.status)
        return res.json()
    })
    .then(data => console.log(data))
    .catch( err => console.error("ups: " + err))
    .finally(() => console.log("Done")) 

*/

/*
const v = fetch('https://jsonplaceholder.typicode.com/users')
.then(res => {
    if(!res.ok){
        return Promise.reject("Error :" + res.status)
    }
    return res.json()
})
.then(data => {
    console.log(data)
})
.catch(err => console.error("Error" + err))
.finally(e => console.log("Finally Donw"))

console.log("Who comes first")
*/
