
// === КОРЗИНА ===
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция отображения корзины
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const proceedCheckoutButton = document.getElementById('proceed-checkout');
    const clearCartButton = document.getElementById('clear-cart');

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Корзина пуста. Добавьте товары из меню.</li>';
        proceedCheckoutButton.style.display = 'none';
        clearCartButton.style.display = 'none';
        totalPriceElement.textContent = '';
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.price} KZT x 
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            = ${item.price * item.quantity} KZT
            <button onclick="removeItem(${index})">Удалить</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Общая стоимость: ${total} KZT`;
    proceedCheckoutButton.style.display = 'inline-block';
    clearCartButton.style.display = 'inline-block';
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Обновление количества
function updateQuantity(index, quantity) {
    if (quantity < 1) {
        alert('Количество должно быть не меньше 1.');
        return;
    }
    cart[index].quantity = parseInt(quantity);
    displayCart();
}

// Удаление товара
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

// Очистка корзины
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
});

// Покупка
const checkoutModal = document.getElementById('checkout-modal');
const confirmPurchaseButton = document.getElementById('confirm-purchase');
const cancelCheckoutButton = document.getElementById('cancel-checkout');

document.getElementById('proceed-checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста.');
        return;
    }
    checkoutModal.classList.remove('hidden');
});

confirmPurchaseButton.addEventListener('click', () => {
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    if (!address) {
        alert('Введите адрес доставки.');
        return;
    }

    alert(`Спасибо за ваш заказ! Доставка по адресу: ${address}. Оплата: ${payment === 'card' ? 'Картой' : 'Наличными'}.`);
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
    checkoutModal.classList.add('hidden');
});

cancelCheckoutButton.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
});

// Отображение корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', displayCart);









// === ФУНКЦИИ ДЛЯ БЛЮД ===
// Добавление блюда в корзину
function addToCart(name, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    if (quantity <= 0) {
        alert('Выберите корректное количество.');
        return;
    }
    const item = cart.find((item) => item.name === name);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} добавлен в корзину! (${quantity} шт.)`);
}

// Фильтрация блюд по категории
function filterDishes(category) {
    const dishes = document.querySelectorAll('.dish');
    dishes.forEach((dish) => {
        if (category === 'all' || dish.dataset.category === category) {
            dish.style.display = 'flex';
        } else {
            dish.style.display = 'none';
        }
    });
}

















// Автоматическая прокрутка галереи
// const gallery = document.querySelector('.gallery-images');
// const galleryImages = document.querySelectorAll('.gallery-images img');
// let autoScrollInterval;

// // Запуск автоматической прокрутки
// function startAutoScroll() {
//     autoScrollInterval = setInterval(() => {
//         gallery.scrollLeft += 1;
//         if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
//             gallery.scrollLeft = 0;
//         }
//     }, 20); // Скорость прокрутки
// }

// // Остановка автоматической прокрутки
// function stopAutoScroll() {
//     clearInterval(autoScrollInterval);
// }

// // Запуск автоматической прокрутки при загрузке
// startAutoScroll();

// // Наведение останавливает прокрутку
// gallery.addEventListener('mouseover', stopAutoScroll);

// // Уход мыши возобновляет прокрутку
// gallery.addEventListener('mouseout', startAutoScroll);

// // Лайтбокс
// const lightbox = document.getElementById('lightbox');
// const lightboxImage = document.querySelector('#lightbox img');
// const prevButton = document.getElementById('prev-photo');
// const nextButton = document.getElementById('next-photo');

// let currentIndex = 0;

// // Открытие изображения в лайтбоксе
// galleryImages.forEach((img, index) => {
//     img.addEventListener('click', () => {
//         currentIndex = index;
//         lightboxImage.src = img.src;
//         lightbox.classList.remove('hidden');
//     });
// });

// // Закрытие лайтбокса при клике на фон
// lightbox.addEventListener('click', (e) => {
//     if (e.target === lightbox) {
//         lightbox.classList.add('hidden');
//     }
// });

// // Переключение изображений
// function showImage() {
//     lightboxImage.src = galleryImages[currentIndex].src;
// }

// prevButton.addEventListener('click', (e) => {
//     e.stopPropagation();
//     currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
//     showImage();
// });

// nextButton.addEventListener('click', (e) => {
//     e.stopPropagation();
//     currentIndex = (currentIndex + 1) % galleryImages.length;
//     showImage();
// });

// // Навигация с клавиатуры
// document.addEventListener('keydown', (e) => {
//     if (lightbox.classList.contains('hidden')) return;

//     if (e.key === 'Escape') {
//         lightbox.classList.add('hidden');
//     } else if (e.key === 'ArrowLeft') {
//         currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
//         showImage();
//     } else if (e.key === 'ArrowRight') {
//         currentIndex = (currentIndex + 1) % galleryImages.length;
//         showImage();
//     }
// });


const gallery = document.querySelector('.gallery-images');
let isDragging = false;
let startX;
let scrollLeft;

// Запуск перетаскивания
gallery.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
    gallery.classList.add('dragging');
});

gallery.addEventListener('mouseleave', () => {
    isDragging = false;
    gallery.classList.remove('dragging');
});

gallery.addEventListener('mouseup', () => {
    isDragging = false;
    gallery.classList.remove('dragging');
});

gallery.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 2; // Скорость прокрутки
    gallery.scrollLeft = scrollLeft - walk;
});

// Автоматическая прокрутка
let autoScrollInterval;
const scrollStep = 1; // Скорость автоматической прокрутки
const autoScroll = () => {
    autoScrollInterval = setInterval(() => {
        gallery.scrollLeft += scrollStep;

        // Возвращение к началу, если достигнут конец
        if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
            gallery.scrollLeft = 0;
        }
    }, 20);
};

// Запуск автоматической прокрутки
autoScroll();

// Остановка автоматической прокрутки при взаимодействии
gallery.addEventListener('mouseover', () => clearInterval(autoScrollInterval));

// Перезапуск автоматической прокрутки при уходе мыши
gallery.addEventListener('mouseout', autoScroll);
