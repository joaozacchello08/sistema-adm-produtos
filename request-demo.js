fetch("http://localhost:8080/produtos/1", {
    method: "PATCH",
    body: JSON.stringify({
        updates: [
            ["product_price", 32.99],
            ["product_image_path", "/imagem/a.png"]
        ]
    }),
    headers: { "Content-Type": "application/json" }
})
    .then(resp => resp.json())
    .then(data => console.log(data))

// fetch("http://localhost:8080/produtos")
//     .then(response => response.text())
//     .then(data => console.log(data))
