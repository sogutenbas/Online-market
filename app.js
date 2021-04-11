// Urünü Sepetten silmek Icin eventleri dinliyor
let removeBoxItmes = document.getElementsByClassName("btn-danger")
for (let i = 0; i < removeBoxItmes.length; i++) {
    removeBoxItmes[i].addEventListener("click", removeItems)
}
// inputtaki adet degisikliginı belırleme eventi
let quantityInputs = document.getElementsByClassName("cart-quantity-input")
for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", quantityChanged)
}

// bu kisim sepete ekleme eventi
let addToBuyButtons = document.getElementsByClassName("shop-item-button")
for (let i = 0; i < addToBuyButtons.length; i++) {
    addToBuyButtons[i].addEventListener("click", addToClicked)
}

// Urünü Sepetten silmek Icin eventleri functionu
function removeItems(event) {
    event.target.parentElement.parentElement.remove()
    updateBoxPriceTotal()
}
// inputtaki adet degisikligi eventi functionu
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateBoxPriceTotal()
}

// bu kisim sepete ekleme eventi functionu
function addToClicked(event) {
    let shopItem = event.target.parentElement.parentElement
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
    addToBox(title, price, imageSrc)
}

//bu function sepete eklenen urunu sepete yazdirmak icin html kodlarini ıcınde barindiriyor
function addToBox(title, price, imageSrc) {
    let boxRow = document.createElement("div")
    boxRow.classList.add("cart-row")
    let cartItems = document.getElementsByClassName("cart-items")[0]

    let footItemNames = cartItems.getElementsByClassName("cart-item-title")
    for (let i = 0; i < footItemNames.length; i++) {
        if (footItemNames[i].innerText == title) {
            alert("this food is alredy box")
            return
        }
    }

    let cartRowConnents = ` <div class="cart-item cart-column">
<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
<span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price} </span>
<div class="cart-quantity cart-column">
<input class="cart-quantity-input" type="number" value="1">
<button class="btn btn-danger" type="button">REMOVE</button>
</div>`
    boxRow.innerHTML = cartRowConnents
    cartItems.append(boxRow)
    boxRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeItems)
    boxRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)

}
//bu function total fiyati degistirmek icin
function updateBoxPriceTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0].getElementsByClassName("cart-row")
    let total = 0
    for (let i = 0; i < cartItemContainer.length; i++) {
        let cartRow = cartItemContainer[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(priceElement.innerText.replace("fr", ""))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = total + " fr"
}