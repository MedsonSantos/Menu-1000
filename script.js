// script.js

// Dados dos produtos
//--------------------------------------PRATOS-------------------------------------//
const products = [
    {
        id: 'pp-1',
        category: 'Pratos',
        name: 'Jantinha Completa',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, vinagrete e 1 espeto a escolha',
        price: 22.00,
        imageUrl: 'https://imgur.com/j8KuBRF.png'
    },
    {
        id: 'pp-2',
        category: 'Pratos',
        name: 'Jantinha Nota 1000',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, estrogonofe de frango, batata palha, vinagrete e 1 espeto a escolha',
        price: 25.00,
        imageUrl: 'https://imgur.com/j8KuBRF.png'
    },
    {
        id: 'pp-3',
        category: 'Pratos',
        name: 'Jantinha sem Espeto',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, vinagrete sem espeto',
        price: 19.00,
        imageUrl: 'https://imgur.com/j8KuBRF.png'
    },
    {
        id: 'pp-4',
        category: 'Pratos',
        name: 'Jantinha de Estrogonofe',
        description: 'Estrogonofe de frango, batata palha e Arroz branco',
        price: 22.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'pp-5',
        category: 'Pratos',
        name: 'Jantinha Kids',
        description: '(somente consumo no local) um pouco de arroz, um pouco de estrogonofe e batata palha',
        price: 22.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },

    //--------------------------------------ESPETOS-------------------------------------//
    {
        id: 'esp-1',
        category: 'Espetos',
        name: 'Frango com Bacon',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-2',
        category: 'Espetos',
        name: 'Frango sem Bacon',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-3',
        category: 'Espetos',
        name: 'Contra Filé',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },

    {
        id: 'esp-4',
        category: 'Espetos',
        name: 'Picanha Montada',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-5',
        category: 'Espetos',
        name: 'Asinha',
        description: 'Tulipa',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },

     {
        id: 'esp-6',
        category: 'Espetos',
        name: 'Cupim',
        description: 'Grill',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-7',
        category: 'Espetos',
        name: 'Coração',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-8',
        category: 'Espetos',
        name: 'Coxinha da Asa',
        description: 'Drumette',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-9',
        category: 'Espetos',
        name: 'Linguiça Caipira',
        description: 'Linguiça Suína da fazenda sem pimenta',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-10',
        category: 'Espetos',
        name: 'Linguiça Caipira Apimentada',
        description: 'Linguiça Suína com um toque de pimenta',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },

    {
        id: 'esp-11',
        category: 'Espetos',
        name: 'Cafta',
        description: 'Carne bovina recheada com queijo',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-12',
        category: 'Espetos',
        name: 'Cafta 1000',
        description: 'Carne bovina envolta em bacon, recheada com queijo',
        price: 14.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-13',
        category: 'Espetos',
        name: 'Provolone',
        description: 'Queijo provolone bola defumado no espeto',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
      {
        id: 'esp-14',
        category: 'Espetos',
        name: 'Coalho',
        description: 'Queijo Coalho no espeto',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
//--------------------------------------CERVEJAS-------------------------------------//
    {
        id: 'cev-1',
        category: 'Cervejas',
        name: 'Amstel Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploSkol.jpg'
    },
    {
        id: 'cev-2',
        category: 'Cervejas',
        name: 'Brahma Duplo Malte Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },
    {
        id: 'cev-3',
        category: 'Cervejas',
        name: 'Antartica Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },
    {
        id: 'cev-4',
        category: 'Cervejas',
        name: 'Império lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },
    //--------------------------------------CALDOS-------------------------------------//
    {
        id: 'cald-1',
        category: 'Caldos',
        name: 'Caldo de Feijão',
        description: '500ml',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoFeijao.jpg'
    },
    {
        id: 'cald-2',
        category: 'Caldos',
        name: 'Caldo de Frango',
        description: '500ml',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoVerde.jpg'
    },
    {
        id: 'cald-3',
        category: 'Caldos',
        name: 'Caldo de Costela',
        description: '500ml, com pedaços de costela e mandioca',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoVerde.jpg'
    },
    //--------------------------------------GUARNIÇÕES-------------------------------------//
    {
        id: 'guar-1',
        category: 'Guarnições',
        name: 'Arroz Branco',
        description: 'Arroz soltinho e fresquinho.',
        price: 8.00,
        imageUrl: 'https://i.imgur.com/ExemploArroz.jpg'
    },
    {
        id: 'guar-2',
        category: 'Guarnições',
        name: 'Mandioca',
        description: 'Mandioca cozida no ponto certo, macia por dentro.',
        price: 7.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'guar-3',
        category: 'Guarnições',
        name: 'Vinagrete',
        description: 'Tomates selecionados fresquinho.',
        price: 7.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'guar-4',
        category: 'Guarnições',
        name: 'feijão Tropeiro (P)',
        description: 'Porção de feijão tropeiro pequena, mas grande no sabor!',
        price: 10.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
     {
        id: 'guar-5',
        category: 'Guarnições',
        name: 'feijão Tropeiro (G)',
        description: 'Porção de feijão tropeiro grande, para quem quer dividir!',
        price: 15.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    //--------------------------------------LANCHES-------------------------------------//
    {
        id: 'lan-1',
        category: 'Lanches',
        name: 'Pastel Frango com Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
     {
        id: 'lan-2',
        category: 'Lanches',
        name: 'Pastel Presunto e Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
     {
        id: 'lan-3',
        category: 'Lanches',
        name: 'Pastel Carne com Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
];

// Definição de categorias com suas imagens e URLs LottieD
const categoriesData = [
    {
        name: 'Pratos',
        imageUrl: 'https://thumbs2.imgbox.com/a5/41/fTXQM9Hn_t.gif',
        lottieJsonUrl: 'iconsJSON/cookingsafe.json',
        type: 'category'
    },

    {
        name: 'Espetos',
        imageUrl: 'https://thumbs2.imgbox.com/a5/41/fTXQM9Hn_t.gif',
        lottieJsonUrl: 'iconsJSON/espetos.json',
        type: 'category'
    },

    {
        name: 'Cervejas',
        imageUrl: 'https://i.imgur.com/BannerCervejas.jpg',
        lottieJsonUrl: 'iconsJSON/cerveja.json',
        type: 'category'
    },
    {
        name: 'Caldos',
        imageUrl: 'https://i.imgur.com/BannerCaldos.jpg',
        lottieJsonUrl: 'iconsJSON/caldos.json',
        type: 'category'
    },
    {
        name: 'Guarnições',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/guarnicao.json',
        type: 'category'
    },
    {
        name: 'Bebidas',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/bebidas sucos.json',
        type: 'category'
    },
    {
        name: 'Porções',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/porcoes.json',
        type: 'category'
    },
    {
        name: 'Lanches',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/lanches.json',
        type: 'category'
    },
    {
        name: 'WhatsApp',
        imageUrl: 'https://i.imgur.com/ExemploWhatsapp.png',
        lottieJsonUrl: 'iconsJSON/whatsapp.json',
        type: 'link',
        url: 'https://wa.me/5562992020331'
    },
    {
        name: 'Instagram',
        imageUrl: 'https://i.imgur.com/ExemploInstagram.png',
        lottieJsonUrl: 'iconsJSON/instagram.json',
        type: 'link',
        url: 'https://www.instagram.com/jantinhanota1000/'
    },
    {
        name: 'Mapa',
        imageUrl: 'https://i.imgur.com/ExemploMaps.png',
        lottieJsonUrl: 'iconsJSON/localizacao.json',
        type: 'link',
        url: 'https://maps.app.goo.gl/zoV6bZ6LjkFXQHsu8'
    },
    {
        name: 'Fotos',
        imageUrl: 'https://i.imgur.com/ExemploFotos.png',
        lottieJsonUrl: 'iconsJSON/fotos.json',
        type: 'modal',
        targetModalId: 'photos-modal'
    }
];

const photos = [
    'https://via.placeholder.com/600x400?text=Sua+Foto+1',
    'https://via.placeholder.com/600x400?text=Sua+Foto+2',
    'https://via.placeholder.com/600x400?text=Sua+Foto+3',
    'https://via.placeholder.com/600x400?text=Sua+Foto+4'
];

const DEFAULT_PLACEHOLDER_IMAGE = 'https://via.placeholder.com/180x180?text=Jantinha+Nota+1000';
const DEFAULT_CATEGORY_IMAGE = 'https://via.placeholder.com/600x200?text=Categoria';
const DEFAULT_LOTTIE_JSON = 'iconsJSON/KnifeForkie.json';

// Carrinho de compras. Cada item pode ser:
// - Jantinha Completa: { id: 'pp-1', espeto: 'Carne', feijao: 'Tropeiro', quantity: 1 }
// - Jantinha Nota 1000: { id: 'pp-2', espeto: 'Carne', feijao: 'Tropeiro', quantity: 1 }
// - Jantinha sem Espeto: { id: 'pp-3', feijao: 'Tropeiro', quantity: 1 }
// - Outros produtos: { id: 'produto_id', quantity: X }
let cart = [];

// Elementos do DOM
const menuSections = document.getElementById('menu-sections');

// Elementos do Modal do Carrinho
const cartModal = document.getElementById('cart-modal');
const closeCartModalBtn = cartModal.querySelector('.close-button');
const cartItemsModalContainer = document.getElementById('cart-items-modal');
const cartTotalModalSpan = document.getElementById('cart-total-modal');
const checkoutWhatsappModalBtn = document.getElementById('checkout-whatsapp-modal');

// NOVOS ELEMENTOS PARA ENTREGA/RETIRADA
const orderTypeSelect = document.getElementById('order-type');
const deliveryOptionsDiv = document.getElementById('delivery-options');
const pickupOptionsDiv = document.getElementById('pickup-options');
const deliveryAddressInput = document.getElementById('delivery-address');
const pickupNameInput = document.getElementById('pickup-name');
const deliveryFeeInfo = document.getElementById('delivery-fee-info'); // Referência ao parágrafo de aviso da taxa

const notesTextarea = document.getElementById('notes');

// Elementos do Modal de Informações
const infoModal = document.getElementById('info-modal');
const closeInfoModalBtn = infoModal.querySelector('.close-button');
const infoToggleContainer = document.getElementById('info-toggle-container');

// Elementos do Modal de Fotos
const photosModal = document.getElementById('photos-modal');
const closePhotosModalBtn = photosModal.querySelector('.close-button');
const modalPhotosGrid = document.getElementById('modal-photos-grid');

// Elementos do Ícone do Carrinho no Header
const cartIconContainer = document.getElementById('cart-icon-container');
const cartCountSpan = document.getElementById('cart-count');

// Elementos do Tema
const themeToggleContainer = document.getElementById('theme-toggle-container');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

// Elemento para a navegação de categorias
const categoryNavigation = document.getElementById('category-navigation');


// --- Funções de Manipulação do Tema ---
/**
 * Define o tema da aplicação (claro ou escuro).
 * @param {string} theme - 'light' para tema claro, 'dark' para tema escuro.
 */
function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleIcon.classList.remove('fa-sun');
        themeToggleIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

/**
 * Alterna entre o tema claro e escuro.
 */
function toggleTheme() {
    if (document.body.classList.contains('light-theme')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

/**
 * Inicializa o tema com base na preferência salva no localStorage.
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setTheme('light');
    } else {
        // Padrão para escuro se não houver preferência salva ou for 'dark'
        setTheme('dark');
    }
}
// --- Fim Funções de Manipulação do Tema ---


// --- Funções de Manipulação de Modais (Generalizadas) ---
/**
 * Abre um modal específico.
 * @param {HTMLElement} modalElement - O elemento DOM do modal a ser aberto.
 */
function openModal(modalElement) {
    modalElement.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Impede o scroll do body
}

/**
 * Fecha um modal específico.
 * @param {HTMLElement} modalElement - O elemento DOM do modal a ser fechado.
 */
function closeModal(modalElement) {
    modalElement.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura o scroll do body
}

// Fechar modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        closeModal(cartModal);
    } else if (event.target === infoModal) {
        closeModal(infoModal);
    } else if (event.target === photosModal) {
        closeModal(photosModal);
    }
});
// --- Fim Funções de Manipulação de Modais ---
// Script para o botão "Voltar ao Topo"
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Mostra ou esconde o botão baseado na posição de rolagem
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "flex"; // Mostra o botão
            scrollToTopBtn.style.opacity = "1"; // Torna visível
        } else {
            scrollToTopBtn.style.opacity = "0"; // Torna invisível
            // Usa um pequeno atraso para esconder completamente após a transição de opacidade
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === "0") {
                    scrollToTopBtn.style.display = "none";
                }
            }, 300); // Deve ser igual ao tempo de transition no CSS
        }
    };

    // Quando o usuário clica no botão, rola para o topo da página
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Adiciona rolagem suave
        });
    });
});
/**
 * Função auxiliar para normalizar nomes de categoria para IDs HTML.
 * @param {string} name - O nome da categoria.
 * @returns {string} O nome normalizado para uso como ID HTML.
 */
function normalizeCategoryName(name) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Renderiza o cardápio principal e os botões de atalho/categorias.
 */
function renderMenu() {
    menuSections.innerHTML = '';
    categoryNavigation.innerHTML = '';

    // Agrupa os produtos por categoria
    const categories = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    // Renderiza os botões de categoria e os botões de atalho
    categoriesData.forEach(item => {
        const normalizedId = normalizeCategoryName(item.name);

        const categoryButton = document.createElement('button');
        categoryButton.classList.add('category-button');

        // Define o target (ID da seção, URL ou ID do modal)
        if (item.type === 'category') {
            categoryButton.dataset.targetId = `category-${normalizedId}`;
            categoryButton.dataset.type = 'category';
        } else if (item.type === 'link') {
            categoryButton.dataset.url = item.url;
            categoryButton.dataset.type = 'link';
        } else if (item.type === 'modal') {
            categoryButton.dataset.targetModalId = item.targetModalId;
            categoryButton.dataset.type = 'modal';
        }

        const lottieContainer = document.createElement('div');
        lottieContainer.classList.add('lottie-icon-container');
        categoryButton.appendChild(lottieContainer);

        // Define a URL Lottie ou imagem de fallback
        const lottieJsonUrlToUse = item.lottieJsonUrl || DEFAULT_LOTTIE_JSON;
        const imageUrlToUseForFallback = item.imageUrl || DEFAULT_CATEGORY_IMAGE;

        // Tenta carregar Lottie, se não, usa imagem de fallback
        if (lottieJsonUrlToUse && typeof lottie !== 'undefined') {
            lottie.loadAnimation({
                container: lottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: lottieJsonUrlToUse,
                rendererSettings: {
                    className: 'lottie-svg'
                }
            });
        } else {
            const fallbackImage = document.createElement('img');
            fallbackImage.src = imageUrlToUseForFallback;
            fallbackImage.alt = `Ícone da categoria ${item.name}`;
            lottieContainer.appendChild(fallbackImage);
        }

        const buttonText = document.createElement('span');
        buttonText.classList.add('button-text');
        buttonText.textContent = item.name;
        categoryButton.appendChild(buttonText);

        categoryButton.addEventListener('click', (event) => {
            const targetType = event.currentTarget.dataset.type;
            if (targetType === 'category') {
                const targetId = event.currentTarget.dataset.targetId;
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (targetType === 'link') {
                const url = event.currentTarget.dataset.url;
                window.open(url, '_blank'); // Abre em nova aba
            } else if (targetType === 'modal') {
                const targetModalId = event.currentTarget.dataset.targetModalId;
                const targetModal = document.getElementById(targetModalId);
                if (targetModal) {
                    openModal(targetModal);
                    // Apenas renderiza fotos se for o modal de fotos
                    if (targetModalId === 'photos-modal') {
                        renderPhotosInModal();
                    }
                }
            }
        });
        categoryNavigation.appendChild(categoryButton);
    });

    // Renderiza as seções de produtos (apenas para as categorias 'type: category')
    for (const categoryName in categories) {
        const normalizedId = normalizeCategoryName(categoryName);

        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.id = `category-${normalizedId}`;

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = categoryName;
        categoryDiv.appendChild(categoryTitle);

        const productsGrid = document.createElement('div');
        productsGrid.classList.add('products-grid');

        categories[categoryName].forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id;

            const imageUrlToUse = (product.imageUrl && !product.imageUrl.includes('link_da_sua_imagem_'))
                ? product.imageUrl
                : DEFAULT_PLACEHOLDER_IMAGE;

            productCard.innerHTML = `
                <img src="${imageUrlToUse}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <button class="add-to-cart" data-id="${product.id}">Adicionar</button>
            `;
            productsGrid.appendChild(productCard);
        });
        categoryDiv.appendChild(productsGrid);
        menuSections.appendChild(categoryDiv);
    }

    // Adiciona event listeners aos botões "Adicionar" dos produtos
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            // Verifica se o produto é uma jantinha que precisa de personalização
            if (['pp-1', 'pp-2', 'pp-3'].includes(productId)) {
                addCustomizableJantinhaToCart(productId);
            } else {
                addToCart(productId); // Outros itens são agrupados
            }
        });
    });
}

/**
 * Renderiza as fotos dentro do modal de fotos.
 */
function renderPhotosInModal() {
    if (modalPhotosGrid) {
        modalPhotosGrid.innerHTML = ''; // Limpa antes de adicionar
        photos.forEach(photoUrl => {
            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = 'Foto da Jantinha Nota 1000';
            modalPhotosGrid.appendChild(img);
        });
    }
}

/**
 * Adiciona um item genérico (não-jantinha personalizável) ao carrinho,
 * agrupando se o item já existir.
 * @param {string} productId - O ID do produto a ser adicionado.
 */
function addToCart(productId) {
    // Procura por um item existente no carrinho que tenha o mesmo ID E não seja uma jantinha personalizável
    const existingItemIndex = cart.findIndex(item => item.id === productId && !['pp-1', 'pp-2', 'pp-3'].includes(item.id));

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCartDisplay();
    flashCartIcon();
}

/**
 * Adiciona uma nova instância de uma jantinha personalizável (pp-1, pp-2, pp-3) ao carrinho.
 * Cada jantinha é um item separado no carrinho para permitir personalização individual.
 * @param {string} productId - O ID do produto da jantinha.
 */
function addCustomizableJantinhaToCart(productId) {
    const newItem = { id: productId, quantity: 1 }; // quantity será sempre 1 para essas jantinhas personalizadas

    // Adiciona as opções de personalização baseadas no ID do produto
    if (productId === 'pp-1' || productId === 'pp-2') { // Jantinha Completa e Jantinha Nota 1000
        newItem.espeto = '';
        newItem.feijao = '';
    } else if (productId === 'pp-3') { // Jantinha sem Espeto
        newItem.feijao = '';
    }

    cart.push(newItem);
    updateCartDisplay();
    flashCartIcon();
}

/**
 * Atualiza a quantidade de um item no carrinho com base no seu índice no array 'cart'.
 * Para jantinhas personalizáveis, remove ou adiciona instâncias.
 * Para outros itens, apenas ajusta a quantidade.
 * @param {number} cartIndex - O índice do item no array `cart`.
 * @param {number} change - O valor da mudança (+1 para aumentar, -1 para diminuir).
 */
function updateCartItemQuantity(cartIndex, change) {
    // Verifica se o índice é válido
    if (cartIndex < 0 || cartIndex >= cart.length) {
        console.error('Índice do carrinho inválido:', cartIndex);
        return;
    }

    const item = cart[cartIndex];
    // Verifica se é uma jantinha personalizável
    if (['pp-1', 'pp-2', 'pp-3'].includes(item.id)) {
        if (change < 0) { // Tentando diminuir
            cart.splice(cartIndex, 1); // Remove esta instância de jantinha
        } else { // Tentando aumentar (adicionar outra jantinha)
            addCustomizableJantinhaToCart(item.id); // Adiciona uma nova instância do mesmo tipo de jantinha
        }
    } else {
        // Para outros produtos, ajusta a quantidade do item existente
        item.quantity += change;
        if (item.quantity <= 0) {
            cart.splice(cartIndex, 1);
        }
    }
    updateCartDisplay();
    flashCartIcon();
}

/**
 * Adiciona uma animação de "flash" ao ícone do carrinho.
 */
function flashCartIcon() {
    cartIconContainer.classList.add('flash');
    setTimeout(() => {
        cartIconContainer.classList.remove('flash');
    }, 500);
}

/**
 * Atualiza a exibição do carrinho no modal, incluindo as opções de personalização.
 */
function updateCartDisplay() {
    cartItemsModalContainer.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItemsModalContainer.innerHTML = '<p>Nenhum item no carrinho.</p>';
    } else {
        // Objeto para agrupar produtos não-jantinhas personalizáveis para exibição
        const groupedOtherItems = {};

        cart.forEach((cartItem, index) => {
            const product = products.find(p => p.id === cartItem.id);
            if (!product) {
                console.warn(`Produto com ID ${cartItem.id} não encontrado.`);
                return; // Pula para o próximo item se o produto não for encontrado
            }

            // Verifica se é uma jantinha personalizável
            if (['pp-1', 'pp-2', 'pp-3'].includes(product.id)) {
                const itemTotal = product.price; // O preço da jantinha é para 1 unidade
                total += itemTotal;
                itemCount += 1; // Cada jantinha é contada como 1 item para o total de itens

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                // Usamos o 'index' do array `cart` para identificar essa jantinha única
                let optionsHtml = '';

                if (product.id === 'pp-1' || product.id === 'pp-2') { // Jantinha Completa e Jantinha Nota 1000
                    optionsHtml += `
                        <div class="input-group-inline">
                            <label for="espeto-${index}">Espeto:</label>
                            <select id="espeto-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="espeto">
                                <option value="" disabled ${cartItem.espeto === '' ? 'selected' : ''}>Selecione</option>
                                <option value="Carne" ${cartItem.espeto === 'Carne' ? 'selected' : ''}>Carne</option>
                                <option value="Frango" ${cartItem.espeto === 'Frango' ? 'selected' : ''}>Frango</option>
                                <option value="Linguiça" ${cartItem.espeto === 'Linguiça' ? 'selected' : ''}>Linguiça</option>
                                <option value="Queijo" ${cartItem.espeto === 'Queijo' ? 'selected' : ''}>Queijo</option>
                            </select>
                        </div>
                    `;
                }

                if (product.id === 'pp-1' || product.id === 'pp-2' || product.id === 'pp-3') { // Todas as jantinhas precisam de feijão
                    optionsHtml += `
                        <div class="input-group-inline">
                            <label for="feijao-${index}">Feijão:</label>
                            <select id="feijao-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="feijao">
                                <option value="" disabled ${cartItem.feijao === '' ? 'selected' : ''}>Selecione</option>
                                <option value="Tropeiro" ${cartItem.feijao === 'Tropeiro' ? 'selected' : ''}>Tropeiro</option>
                                <option value="Caldo" ${cartItem.feijao === 'Caldo' ? 'selected' : ''}>Caldo</option>
                            </select>
                        </div>
                    `;
                }


                cartItemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <span class="item-name">${product.name}</span>
                        <span class="item-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        <div class="jantinha-options-individual">
                            ${optionsHtml}
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <button data-cart-index="${index}" data-action="decrease">-</button>
                        <span>1</span>
                        <button data-cart-index="${index}" data-action="increase">+</button>
                    </div>
                `;
                cartItemsModalContainer.appendChild(cartItemDiv);

            } else {
                // Para outros produtos, agrupamos por ID (sem personalização)
                if (!groupedOtherItems[product.id]) {
                    groupedOtherItems[product.id] = { product: product, quantity: 0, cartIndices: [] };
                }
                groupedOtherItems[product.id].quantity += cartItem.quantity;
            }
        });

        // Adiciona os itens agrupados (não-jantinhas personalizáveis)
        for (const productId in groupedOtherItems) {
            const item = groupedOtherItems[productId];
            const product = item.product;
            const quantity = item.quantity;

            const itemTotal = product.price * quantity;
            total += itemTotal;
            itemCount += quantity;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <div class="cart-item-info">
                    <span class="item-name">${product.name}</span>
                    <span class="item-price">R$ ${product.price.toFixed(2).replace('.', ',')} cada</span>
                </div>
                <div class="cart-item-quantity">
                    <button data-product-id="${product.id}" data-action="decrease-grouped">-</button>
                    <span>${quantity}</span>
                    <button data-product-id="${product.id}" data-action="increase-grouped">+</button>
                </div>
            `;
            cartItemsModalContainer.appendChild(cartItemDiv);
        }
    }

    cartTotalModalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartCountSpan.textContent = itemCount;

    // Adiciona event listeners para os botões de quantidade
    cartItemsModalContainer.querySelectorAll('.cart-item-quantity button').forEach(button => {
        button.addEventListener('click', (event) => {
            const action = event.target.dataset.action;

            if (action.includes('grouped')) { // Para itens agrupados (não jantinhas personalizáveis)
                const productId = event.target.dataset.productId;
                const change = action === 'increase-grouped' ? 1 : -1;
                // Encontre o índice do PRIMEIRO item não-jantinha desse tipo no carrinho
                const itemIndex = cart.findIndex(item => item.id === productId && !['pp-1', 'pp-2', 'pp-3'].includes(item.id));
                if (itemIndex !== -1) {
                    updateCartItemQuantity(itemIndex, change);
                }
            } else { // Para jantinhas personalizáveis (individual)
                const cartIndex = parseInt(event.target.dataset.cartIndex);
                const change = action === 'increase' ? 1 : -1;
                updateCartItemQuantity(cartIndex, change);
            }
        });
    });

    // Event listeners para os selects de espeto e feijão das jantinhas individuais
    cartItemsModalContainer.querySelectorAll('.jantinha-options-individual select').forEach(select => {
        select.addEventListener('change', (event) => {
            const cartIndex = parseInt(event.target.dataset.cartIndex);
            const optionType = event.target.dataset.optionType; // 'espeto' ou 'feijao'
            const value = event.target.value;

            // Atualiza a propriedade do item correspondente no array `cart`
            if (cart[cartIndex]) {
                cart[cartIndex][optionType] = value;
            }
            // Não precisa de updateCartDisplay() completo, só armazena o valor
        });
    });
}

/**
 * Controla a visibilidade dos campos de endereço e nome de retirada
 * com base na seleção do tipo de pedido.
 */
function handleOrderTypeChange() {
    const selectedType = orderTypeSelect.value;

    if (selectedType === 'delivery') {
        deliveryOptionsDiv.style.display = 'block';
        pickupOptionsDiv.style.display = 'none';
        deliveryAddressInput.required = true; // Torna o endereço obrigatório
        pickupNameInput.required = false; // Garante que o nome não é obrigatório
        pickupNameInput.value = ''; // Limpa o campo de nome ao mudar para entrega
    } else { // 'pickup'
        deliveryOptionsDiv.style.display = 'none';
        pickupOptionsDiv.style.display = 'block';
        deliveryAddressInput.required = false; // Endereço não é obrigatório
        pickupNameInput.required = true; // Nome de retirada é obrigatório
        deliveryAddressInput.value = ''; // Limpa o campo de endereço ao mudar para retirada
    }
}


/**
 * Envia o pedido para o WhatsApp com todos os detalhes.
 */
function sendOrderToWhatsapp() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio! Adicione itens antes de fazer o pedido.');
        return;
    }

    const orderType = orderTypeSelect.value;
    const deliveryAddress = deliveryAddressInput.value.trim();
    const pickupName = pickupNameInput.value.trim();
    const notes = notesTextarea.value.trim();

    // Validação de campos obrigatórios
    if (orderType === 'delivery' && !deliveryAddress) {
        alert('Por favor, digite o endereço de entrega para prosseguir.');
        return;
    }
    if (orderType === 'pickup' && !pickupName) {
        alert('Por favor, digite o nome para retirada para prosseguir.');
        return;
    }

    let message = `*Jantinha Nota 1000 - Novo Pedido*\n\n`;
    let total = 0;

    // Objeto para agrupar outros itens para a mensagem final de forma legível
    const otherItemsSummary = {};

    let validationFailed = false; // Flag para controlar a validação das jantinhas

    // Processa os itens do carrinho
    cart.forEach((cartItem, index) => {
        const product = products.find(p => p.id === cartItem.id);
        if (!product) {
            console.warn(`Produto com ID ${cartItem.id} não encontrado ao gerar mensagem.`);
            return;
        }

        // Se for uma jantinha personalizável
        if (['pp-1', 'pp-2', 'pp-3'].includes(product.id)) {
            const itemPrice = product.price;
            total += itemPrice;

            let itemDetails = `1x ${product.name}:\n`;

            if (product.id === 'pp-1' || product.id === 'pp-2') { // Jantinha Completa e Jantinha Nota 1000
                const espeto = cartItem.espeto || 'Não selecionado';
                if (espeto === 'Não selecionado') {
                    alert(`Por favor, selecione o espeto para a "${product.name}" (Item #${index + 1} no carrinho).`);
                    validationFailed = true;
                    return;
                }
                itemDetails += `  - Espeto: ${espeto}\n`;
            }

            const feijao = cartItem.feijao || 'Não selecionado';
            if (feijao === 'Não selecionado') {
                alert(`Por favor, selecione o tipo de feijão para a "${product.name}" (Item #${index + 1} no carrinho).`);
                validationFailed = true;
                return;
            }
            itemDetails += `  - Feijão: ${feijao}\n`;
            itemDetails += `  - Preço: R$ ${itemPrice.toFixed(2).replace('.', ',')}\n`;

            message += itemDetails;

        } else { // Outros produtos (agrupáveis)
            const itemKey = product.id;
            if (!otherItemsSummary[itemKey]) {
                otherItemsSummary[itemKey] = {
                    name: product.name,
                    price: product.price,
                    quantity: 0
                };
            }
            otherItemsSummary[itemKey].quantity += cartItem.quantity;
        }
    });

    // Se alguma validação de Jantinha falhou, interrompe o processo
    if (validationFailed) {
        return;
    }

    // Adiciona os itens agrupados (não-jantinhas personalizáveis) à mensagem
    for (const key in otherItemsSummary) {
        const item = otherItemsSummary[key];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.quantity}x ${item.name} (R$ ${item.price.toFixed(2).replace('.', ',')} cada) - Total: R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
    }

    message += `\n*Tipo de Pedido:* ${orderType === 'delivery' ? 'Entrega' : 'Retirada no Local'}\n`;

    if (orderType === 'delivery') {
        message += `*Endereço de Entrega:*\n${deliveryAddress}\n`;
    } else { // 'pickup'
        message += `*Nome para Retirada:*\n${pickupName}\n`;
    }

    if (notes) {
        message += `\n*Observações:*\n${notes}\n`;
    }

    message += `\n*Total dos Produtos: R$ ${total.toFixed(2).replace('.', ',')}*\n`;

    // Adiciona o aviso de taxa de entrega apenas se for entrega
    if (orderType === 'delivery') {
        message += `_Atenção: Taxa de entrega será calculada conforme o endereço._\n`;
    }

    message += `\nObrigado por pedir no Jantinha Nota 1000!`;

    const whatsappNumber = '5562992020331';

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// Event Listeners globais
cartIconContainer.addEventListener('click', () => {
    openModal(cartModal);
    updateCartDisplay(); // Força a atualização do display ao abrir
    handleOrderTypeChange(); // Garante que os campos de entrega/retirada estejam corretos
});

// Adiciona event listeners para todos os botões de fechar modal
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const modalType = event.target.dataset.modal;
        if (modalType === 'cart') {
            closeModal(cartModal);
        } else if (modalType === 'info') {
            closeModal(infoModal);
        } else if (modalType === 'photos') {
            closeModal(photosModal);
        }
    });
});

checkoutWhatsappModalBtn.addEventListener('click', sendOrderToWhatsapp);

themeToggleContainer.addEventListener('click', toggleTheme);

infoToggleContainer.addEventListener('click', () => openModal(infoModal));

// NOVO: Event listener para o select de tipo de pedido
orderTypeSelect.addEventListener('change', handleOrderTypeChange);


// Inicializa a aplicação quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    renderMenu();
    updateCartDisplay(); // Garante que o contador do carrinho esteja correto ao carregar a página
    handleOrderTypeChange(); // Chama ao carregar para definir o estado inicial (Entrega)
});