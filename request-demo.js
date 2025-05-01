// GET
function get_product (id) {
    fetch(`http://localhost:8080/produtos/${id}`)
        .then(response => response.text())
        .then(data => console.log(data))
}

function get_products () {
    fetch("http://localhost:8080/produtos")
        .then(response => response.text())
        .then(data => console.log(data))
}

// POST
function add_product () {
    fetch("http://localhost:8080/produtos", {
        method: "POST",
        body: JSON.stringify({
            product: [
                "Product #1", //product_name
                123,          //product_price
                90,           //product_stock,
                "12345678",   //product_barcode
                "/"           //product_image_path
            ]
        })
    })
        .then(response => response.text())
        .then(data => console.log(data))
}

// PATCH
function patch_product (id) {
    fetch(`http://localhost:8080/produtos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            updates: [
              //[key       ,        value]
                ["product_name", "Cool Tshirt"],
                ["product_price", 18.99]
            ]
        })
    })
        .then(response => response.text())
        .then(data => console.log(data))
}

// DELETE
function delete_product (id) {
    fetch(`http://localhost:8080/produtos/${id}`, {
        method: "DELETE"
    })
        .then(response => response.text())
        .then(data => console.log(data))
}
