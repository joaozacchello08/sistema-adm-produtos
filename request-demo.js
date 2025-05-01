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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            product: [
                "Product #1", //product_name
                123,          //product_price
                90,           //product_stock,
                "12345678",   //product_barcode
                '/'           //product_image_path
            ]
        })
    })
        .then(response => response.text())
        .then(data => console.log(data))
}

function add_products() {
    const products = [
        ["Smartphone X1", 1999.99, 50, "0012345678901", "/images/smartphone-x1.jpg"],
        ["Notebook Pro 15", 4599.00, 30, "0023456789012", "/images/notebook-pro-15.jpg"],
        ["Smartwatch Fit", 899.90, 100, "0034567890123", "/images/smartwatch-fit.jpg"],
        ["Headphones Bass+", 299.00, 75, "0045678901234", "/images/headphones-bass.jpg"],
        ["TV 50\" 4K UHD", 2599.99, 20, "0056789012345", "/images/tv-50-4k.jpg"],
        ["Câmera DSLR 3000", 3499.50, 15, "0067890123456", "/images/camera-dslr.jpg"],
        ["Tablet Max 10", 1599.00, 40, "0078901234567", "/images/tablet-max.jpg"],
        ["Console GameStation 5", 3999.90, 25, "0089012345678", "/images/console-gamestation.jpg"],
        ["Monitor 27\" UltraWide", 1399.99, 35, "0090123456789", "/images/monitor-ultrawide.jpg"],
        ["Teclado Mecânico RGB", 499.00, 60, "0101234567890", "/images/teclado-rgb.jpg"]
    ]

    products.forEach(product => {
        fetch("http://localhost:8080/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product })
        })
        .then(response => response.text())
        .then(data => console.log("Produto adicionado:", data))
        .catch(err => console.error("Erro ao adicionar produto:", err))
    })
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

// POST venda de 1 unidade (padrão)
function sell_product_default(id) {
    fetch(`http://localhost:8080/vender/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => console.log("Venda realizada:", data))
    .catch(err => console.error("Erro ao vender produto:", err))
}

// POST venda com quantidade específica
function sell_product_with_quantity(id, quantidade) {
    fetch(`http://localhost:8080/vender/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantidade })
    })
    .then(response => response.json())
    .then(data => console.log("Venda realizada:", data))
    .catch(err => console.error("Erro ao vender produto:", err))
}

// GET todas as vendas
function get_sales_history() {
    fetch("http://localhost:8080/vendas")
        .then(response => response.json())
        .then(data => console.log("Histórico de vendas:", data))
        .catch(err => console.error("Erro ao obter histórico de vendas:", err))
}


