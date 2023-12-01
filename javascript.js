const add_bottom = document.getElementById("add");

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/a9e4650c9c3545bea77d3328f0c9b1c3/practice")
        .then((res) => {
            const array = res.data;
            for (let i = 0; i < array.length; i++) {
                show(array[i]);
            }
        })
        .catch(() => {
            console.log("Error fetching data");
        });
});

add_bottom.addEventListener("click", clicker);

let sel;
let product;

function clicker() {
    sel = document.getElementById("selling").value;
    product = document.getElementById("product").value;

    const save = {
        money: sel,
        pro: product,
    };

    axios.post("https://crudcrud.com/api/a9e4650c9c3545bea77d3328f0c9b1c3/practice", save)
        .then((res) => {
            show(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function show(obj) {
    const cre_ele = document.createElement("li");
    cre_ele.innerHTML = `<span id="${obj._id}">${obj.money}--${obj.pro}</span><button onclick="del_user('${obj._id}')">DEL</button>`;
    document.querySelector(".pro").appendChild(cre_ele);
    add_money(obj.money);
}


function del_user(user_id) {
    axios.delete(`https://crudcrud.com/api/a9e4650c9c3545bea77d3328f0c9b1c3/practice/${user_id}`)
        .then(() => {
            let userElement = document.getElementById(user_id);
            if (userElement) {
                let rem_number = parseInt(userElement.textContent.split('--')[0]);
                userElement.remove();
                subtract_from_it(rem_number);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function add_money(money) {
    let num = parseInt(money);
    let totalElement = document.getElementById("total");
    let number = parseInt(totalElement.textContent);

    if (!isNaN(num) && !isNaN(number)) {
        number += num;
        totalElement.textContent = number;
    } else {
        totalElement.textContent = num;
    }
}

function subtract_from_it(rem) {
    let totalElement = document.getElementById("total");
    let total_number = parseInt(totalElement.textContent);

    if (!isNaN(rem) && !isNaN(total_number)) {
        let subtract = total_number - rem;
        totalElement.textContent = subtract < 0 ? 0 : subtract;
    } else {
        totalElement.textContent = 0;
    }
}
