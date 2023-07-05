

//************************ DOM ELEMENTS ************************************** */
let phoneNumber, totalAmountDue
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
const paymentFormDiv = document.querySelector('#makePayment');
const payBtn = document.getElementById('btn-pay');
const btnCheckOut = document.querySelector(".btn-checkOut")
const shopContainer = document.querySelector('.shop-container') 
const makePaymentBtnClose = document.querySelector('#close-payment')
const phoneNumberInput = document.getElementById('phoneNumberInput')
const amountInput = document.getElementById('amountInput')
const scrollContainer = document.querySelector(".gallery")
const backBtn = document.getElementById("backBtn")
const nextBtn = document.getElementById("nextBtn")
const JewellerContainer = document.getElementById('jewellerTitles')
const jewelShopContent = document.querySelector('.shop-content')







//*************************** FUNCTIONS *********************************** */

//create Jeweller Card
    function createJewellerCard(jeweller){
        const JewellerCard = document.createElement('div');
        JewellerCard.setAttribute("class","jewellerDetails" )
        JewellerCard.setAttribute("id",`jewellerDetails-${jeweller.id}`)
        JewellerContainer.append(JewellerCard)
        JewellerCard.innerHTML = ` 
            <img src="${jeweller.poster}" alt="">
            <h1 class="JewellerName" id="JewellerName-${jeweller.id}">${jeweller.name}</h1>
    `
    let jewellerID = jeweller.id

    JewellerCard.addEventListener("click", ()=>{
        jewelShopContent.innerHTML = ''
        filterJeweller(jewellerID)
            
        })
    }

//filter Jewels by JewellerID
    async function filterJeweller(jewellerID){
        const res = await fetch(`http://localhost:3000/Jewellers/${jewellerID}`)
        const jeweller = await res.json()
        console.log(jeweller);

        createCollectionItemcard(jeweller)
    }
    
//create Collection Item Card 
    function createCollectionItemcard(jeweller){
        //console.log(jeweller);
        let jewels = jeweller.collection
        //console.log(jewels.length);
        for (const jewel of jewels) {
            const jewelryCard = document.createElement('div')
            jewelryCard.setAttribute("class", "product-box")
            jewelShopContent.append(jewelryCard)
            jewelryCard.setAttribute("id", `${jeweller.code}-${jewel.id}`)
            jewelryCard.innerHTML = `
            <img src="${jewel.productImage}" alt=""class="product-img">
            <h2 class="product-title">${jewel.category}-${jewel.name}</h2>
            <span class="price">${jewel.price}</span>
            <i class="bx bx-shopping-bag add-cart">Add To Cart</i>
        `
        }
        var addCart = document.getElementsByClassName("add-cart");
        for (var i = 0; i< addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    }

   
//fetch jeweller Collection
    async function fetchJewellerCollection(){
        try {
        const res = await fetch('http://localhost:3000/Jewellers')
            if(!res.ok){
                console.log("Fetch failed");
                return
            }
            console.log("fetch successful!")
            const jewellers = await res.json()
            //console.log(jewellers);
            for (const jeweller of jewellers) {
                createCollectionItemcard(jeweller)
            } 
            return (fullCollection);
        
        } catch (error) {
            console.log("Failed:" + error);
            
        }
       
    } fetchJewellerCollection()  

//fetch Jewellry Data
    function fetchJewelryData(){
    fetch('http://localhost:3000/Jewellers')
    .then(res => res.json())
    .then(jewellers => {
        for (const jeweller of jewellers) {
            //console.log(jeweller.poster);
            createJewellerCard(jeweller)
        }
    })
    } fetchJewelryData()

//check cart ready
    function ready(){
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    //console.log(removeCartButtons);
    for(let i = 0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem)
    }
    //Updating the quantity
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for(let i = 0; i < quantityInputs.length; i++){
        input = quantityInputs[i];
        console.log(input);
        input.addEventListener("change", quantityChanged)
    }

    //Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i< addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    }ready();


//Buy button
    function buyButtonClicked(){
        // alert("Your Order is Placed");
        var cartContent = document.getElementsByClassName("cart-content")[0];
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }


        updateTotal();
    }

//remove items from cart
    function removeCartItem(event){
        let buttonClicked = event.target
        buttonClicked.parentElement.remove();
        updateTotal();
    }

//update function total
    function updateTotal(){
        let cartContent = document.getElementsByClassName("cart-content")[0];
        let cartBoxes = cartContent.getElementsByClassName("cart-box");
        var total = 0;
        for (let i = 0; i < cartBoxes.length; i++){
            let cartBox = cartBoxes[i];
            let priceElement = cartBox.getElementsByClassName("cart-price")[0];
            let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            let price = parseFloat(priceElement.innerText.replace("$", ""))
            var quantity = quantityElement.value;
            total = total + (price * quantity);
        }
            total = Math.round(total * 100) /100;
            document.getElementsByClassName('total-price')[0].innerText = '$ '+ total
            totalAmountDue = total;

    }

//update quantity
    function quantityChanged(event){
        var input = event.target;
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1;
        }
        updateTotal();
    } 

//Add cart button clicked
    function addCartClicked(event){
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
        var price = shopProducts.getElementsByClassName("price")[0].innerText;
        var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
        console.log(title, price, productImg);
        addProductToCart(title, price, productImg);
        updateTotal();
    }  

//Add product to cart
    function addProductToCart(title, price,productImg){
        let cartShopBox = document.createElement("div");
        let cartItems = document.getElementsByClassName("cart-content")[0];
        let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        cartShopBox.classList.add("cart-box")
        
        for(var i =0; i< cartItemsNames.length; i++){
            if (cartItemsNames[i].innerText == title) {
                alert("This item is already added to the cart");
                return;
            } 
        } 

    var cartBoxContent = `
        <img src="${productImg}" class="cart-img" alt="">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
            
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox
            .getElementsByClassName('cart-remove')[0]
            .addEventListener("click", removeCartItem);
        cartShopBox
            .getElementsByClassName('cart-quantity')[0]
            .addEventListener("change", quantityChanged);

    }

//Make payment
    function pay() {
    console.log(`amount=${totalAmountDue}&msisdn=${phoneNumber}&account_no=2`);
        var url = "https://tinypesa.com/api/v1/express/initialize";
        fetch(url, {
            body: `amount=${totalAmountDue}&msisdn=${phoneNumber}&account_no=2`,
            headers: {
                Apikey: "TnfBPxXIGWe",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })
        .then(res => res.json())
        // .then(respose =>{
        //     if (respose.ok) {
        //         console.log("SUCCESSFUL");
        //     }
        // })
        console.log("Pay request sent");

    }

//************************ EVENT LISTENERS ************************************** */

nextBtn.addEventListener("click", ()=>{
    scrollContainer.style.scrollBehavior = "smooth"
    scrollContainer.scrollLeft += 900
})

backBtn.addEventListener("click", ()=>{
    scrollContainer.style.scrollBehavior = "smooth"
    scrollContainer.scrollLeft -= 900
})
    
btnCheckOut.addEventListener("click", () => {
    console.log(totalAmountDue);
    if (totalAmountDue <= 0 || totalAmountDue == undefined) {
        amountInput.value = "Ksh 0"
        
    }else{
        amountInput.value = totalAmountDue
    }
    
    buyButtonClicked()
    // Toastify({
    //     text: "Btn checkout was clicked!",
    //     duration: 3000
    //     }).showToast();
    //console.log("Btn checkout was clicked!");
    paymentFormDiv.classList.toggle('visibleActive')
    shopContainer.classList.toggle('blurActive')

});


payBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    phoneNumber =  phoneNumberInput.value
    totalAmountDue = amountInput.value
    console.log(`PhoneNumber: ${phoneNumber}, Amount Due: ${totalAmountDue}`);
    //pay()   
})


cartIcon.addEventListener("click",() =>{
    cart.classList.remove("cart-inactive");
    console.log('Icon clicked!');
}) ;

closeCart.addEventListener("click", () =>{
    cart.classList.add("cart-inactive");
});

makePaymentBtnClose.addEventListener('click', ()=>{
    paymentFormDiv.classList.toggle('visibleActive')
    shopContainer.classList.toggle('blurActive')
})


if (document.readyState =="loading") {
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready();
}




