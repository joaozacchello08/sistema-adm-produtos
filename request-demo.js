fetch("http://localhost:8080/produtos", {
    method: "POST",
    body: JSON.stringify({
        product: [
            
        ]
    }),
    headers: { "Content-Type": "application/json" }
})
    .then(resp => resp.text())
    .then(data => console.log(data))
