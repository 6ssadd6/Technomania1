const mobileMenu = document.getElementById('mobile-menu');
const navUl = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
    navUl.classList.toggle('show');
});
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        currentIndex = 0; // Вернуться к первому слайду
    } else if (index < 0) {
        currentIndex = slides.length - 1; // Вернуться к последнему слайду
    } else {
        currentIndex = index;
    }
    
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function changeSlide(direction) {
    showSlide(currentIndex + direction);
}

// Автоматическое переключение слайдов каждые 5 секунд
setInterval(() => {
    changeSlide(1);
}, 5000);


document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout-button');

    let total = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.getAttribute('data-price'));

            const cartItem = document.createElement('div');
            cartItem.innerText = `${productName} - ${productPrice}`;
            cartItems.appendChild(cartItem);

            total += productPrice;
            totalAmount.innerText = `Итого: ${total}`;
        });
    });

    checkoutButton.addEventListener('click', () => {
        alert(`Спасибо за покупку! Общая сумма: ${total}`);
        cartItems.innerHTML = '';
        total = 0;
        totalAmount.innerText = `Итого: 0`;
    });
});



document.getElementById('show-register').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.register-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
});


document.getElementById("hamburger").addEventListener("click", function() {
    var nav = document.querySelector(".nav");
    nav.classList.toggle("active");
});



document.getElementById('sort').addEventListener('change', function() {
    var products = document.querySelectorAll('.product');
    var productList = document.getElementById('productList');

    products = Array.from(products);
    var sortOrder = this.value;

    products.sort(function(a, b) {
        var priceA = parseInt(a.getAttribute('data-price'));
        var priceB = parseInt(b.getAttribute('data-price'));
        return (sortOrder === 'asc') ? priceA - priceB : priceB - priceA;
    });

    productList.innerHTML = '';
    products.forEach(function(product) {
        productList.appendChild(product);
    });
});





// Получаем элементы формы и кнопки
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const profileSection = document.querySelector('.profile');
const accountBtn = document.getElementById('account-btn');
const logoutButton = document.getElementById('logout');

// Элементы для отображения личного кабинета
const profileImg = document.getElementById('profile-img');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileDob = document.getElementById('profile-dob');
const profilePhone = document.getElementById('profile-phone');

// Переключение между формами входа и регистрации
document.getElementById('show-register').addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Обработка регистрации
document.getElementById('register').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаем значения из формы регистрации
    const email = document.getElementById('reg-email').value;
    const fullName = document.getElementById('full-name').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('reg-password').value;

    // Сохраняем данные пользователя в localStorage
    const user = {
        email,
        fullName,
        phone,
        dob,
        password,
        profileImage: "img/default-profile.jpg" // Добавляем изображение профиля по умолчанию
    };

    localStorage.setItem('user', JSON.stringify(user));

    // Переход в личный кабинет
    showProfile(user);

    // Скрываем форму регистрации и отображаем личный кабинет
    registerForm.style.display = 'none';
    loginForm.style.display = 'none';
    accountBtn.style.display = 'inline-block'; // Показать кнопку "Аккаунт"
});

// Обработка входа
document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Проверяем, совпадают ли введенные данные с данными в localStorage
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Переход к личному кабинету
        showProfile(storedUser);

        // Скрываем форму входа и отображаем кнопку "Аккаунт"
        loginForm.style.display = 'none';
        accountBtn.style.display = 'inline-block';
    } else {
        alert("Неверный email или пароль.");
    }
});

// Функция для отображения личного кабинета
function showProfile(user) {
    // Отображаем личный кабинет
    profileSection.style.display = 'block';

    // Заполняем данными пользователя
    profileImg.src = user.profileImage;
    profileName.textContent = user.fullName;
    profileEmail.textContent = user.email;
    profileDob.textContent = user.dob;
    profilePhone.textContent = user.phone;
}

// Логика для выхода из аккаунта
logoutButton.addEventListener('click', () => {
    // Удаляем данные из localStorage и скрываем личный кабинет
    localStorage.removeItem('user');
    profileSection.style.display = 'none';
    loginForm.style.display = 'block'; // Показываем форму входа
    accountBtn.style.display = 'none'; // Скрываем кнопку "Аккаунт"
});

// При загрузке страницы проверяем, есть ли данные о пользователе в localStorage
window.onload = function() {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
        // Если пользователь уже зарегистрирован и авторизован, показываем личный кабинет
        showProfile(storedUser);

        // Показать кнопку "Аккаунт"
        accountBtn.style.display = 'inline-block';
    } else {
        loginForm.style.display = 'block'; // Показываем форму входа
    }
};

// Логика для перехода в личный кабинет по нажатию на кнопку "Аккаунт"
accountBtn.addEventListener('click', () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        showProfile(storedUser);
    }
});

