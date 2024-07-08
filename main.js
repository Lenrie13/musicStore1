document.addEventListener('DOMContentLoaded', function() {
    const shoppingList = document.getElementById('shoppingList');
    const itemsInput = document.getElementById('itemsInput');
    const addItemButton = document.getElementById('addItemButton');
    const clearListButton = document.getElementById('clearListButton');

    // Initialize empty array to store shopping list items
    let items = [];

    // Function to render shopping list
    function renderShoppingList() {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            if (item.purchased) {
                li.classList.add('purchased');
            }
            li.addEventListener('click', () => {
                markPurchased(index);
            });
            shoppingList.appendChild(li);
        });
    }

    // Function to add item to the list
    function addItem() {
        const itemsName = itemsInput.value.trim();
        if (itemsName !== '') {
            items.push({ name: itemsName, purchased: false });
            renderShoppingList();
            itemsInput.value = '';
        }
    }

    // Function to mark item as purchased
    function markPurchased(index) {
        items[index].purchased = !items[index].purchased;
        renderShoppingList();
    }

    // Event listeners
    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', () => {
        items = [];
        renderShoppingList();
    });

    //Load items from local storage if available
    if (localStorage.getItem('shoppingList')) {
        items = JSON.parse(localStorage.getItem('shoppingList'));
        renderShoppingList();
    }

    // Save items to local storage whenever the list changes
    function saveItemsToLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    shoppingList.addEventListener('click', saveItemsToLocalStorage);
});
