// write your code here!


// document.addEventListener("DOMContentLoaded", )


fetch("http://localhost:3000/ducks")
.then((response) => response.json())
.then((ducks) => {
    // let duckNav = document.querySelector("#duck-nav")
    duckDetails(ducks[0])
    for (let duck of ducks) {
        renderDuck(duck)
    }
})

let renderDuck = (duckObject) => {

    let duckNav = document.querySelector("#duck-nav")

    let h2 = document.querySelector("h2")

    let img = document.createElement("img")
    img.src = duckObject.img_url

    duckNav.append(img)

    img.addEventListener("click", () => {
        duckDetails(duckObject)
    })
    
} 
let likes = 0;
let button = document.getElementById("duck-display-likes");

let duckId = 0

button.addEventListener("click", () => {
    likes = likes + 1
    fetch(`http://localhost:3000/ducks/${duckId}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            likes: likes
        })
    })
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('something went wrong')
        }
    })
    .then((resp) => {
        console.log(resp)
        likes = resp.likes;
        button.textContent = `${likes} likes`;
})
    // TODO:    Implement PATCH request back to duck data to 
    //          update current duck's `likes` to new value.

    // ducksLike(likes)
})

let duckDetails = (duckObject) => {
    likes = duckObject.likes

    duckId = duckObject.id

    let display = document.getElementById("duck-display-image")
    display.src = duckObject.img_url

    
    button.textContent = `${likes} likes`

    let name = document.getElementById("duck-display-name")
    name.textContent = duckObject.name

    
}


// let ducksLike = (like) => {
//     let button = document.getElementById("duck-display-likes")
//     button.textContent = `${like} likes`
// }

let form = document.getElementById("new-duck-form")
console.log(form)

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let newDuck = {
        name: e.target[0].value,
        img_url: e.target[1].value,
        likes: 0
    }

    fetch("http://localhost:3000/ducks", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(newDuck)
    })
    .then((response) => {
        console.log(response)
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('something went wrong')
        }
    })
    .then((resp) => {
        console.log(resp)
        renderDuck(resp)
})
    })

