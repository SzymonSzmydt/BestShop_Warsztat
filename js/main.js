const form = {
    products: document.querySelector("#products"),
    orders: document.querySelector("#orders"),
    package: document.querySelector(".select__input")
}

const summary = {
    products: document.querySelector("[data-id='products']"),
    orders: document.querySelector("[data-id='orders']"),
    package: document.querySelector("[data-id='package']"),
    total: document.querySelector("#total-price")
}

const prices = {
    products: 0.5,
    orders: 0.5,
    package: 10,
    accounting: 10,
    terminal: 10
}
let totalSum = [];  // Array of prices

function renderProduct() {      //  input ID products
    if (this.value.length > 0) {
        summary.products.style.display = "flex";
        summary.products.children[1].innerHTML = `${this.value} x $${prices.products}`;
        summary.products.children[2].innerHTML = `$${this.value * prices.products}`;
        totalSum[0] = this.value * prices.products;
    }
    else {
        summary.products.style.display = "none";
        totalSum[0] = 0;
    }
    total();
}

function renderOrders() {       // input ID orders
    if (this.value.length > 0) {
        summary.orders.style.display = "flex";
        summary.orders.children[1].innerHTML = `${this.value} x $${prices.orders}`;
        summary.orders.children[2].innerHTML = `$${this.value * prices.orders}`;
        totalSum[1] = this.value * prices.orders;
    }
    else {
        summary.orders.style.display = "none";
        totalSum[1] = 0;
    }
    total();
}

function renderPackages() {     // selected menu dropdown
    const dropPackage = document.querySelector(".select__dropdown");
    dropPackage.style.display = "block";
    let price = 0;

    function show() {
        document.querySelector(".select__input").innerText = this.innerText;

        if (this.dataset.value === 'basic') price = 1;
        else if (this.dataset.value === 'professional') price = 3;
        else if (this.dataset.value === 'premium') price = 6;

        summary.package.style.display = "flex";
        summary.package.children[1].innerHTML = `${this.innerText}`;
        summary.package.children[2].innerHTML = `$${price * prices.package}`;
        totalSum[2] = price * prices.package;

        dropPackage.style.display = "none";
        total();
    }

    dropPackage.children[0].addEventListener("click", show);
    dropPackage.children[1].addEventListener("click", show);
    dropPackage.children[2].addEventListener("click", show);
}

function total() {      //      summary all prices from totalSum array
    let result = totalSum.reduce((a, b) => a + b);
    if (result > 0) {
            summary.total.style.display = "flex";
            summary.total.children[1].innerHTML = `$${result}`;
        }
    else summary.total.style.display = "none";
}

form.products.addEventListener("keyup", renderProduct);     // all input -> start
form.orders.addEventListener("keyup", renderOrders);
form.package.addEventListener("click", renderPackages);
form.accounting.addEventListener("check", renderCheckbox);      // stop / input