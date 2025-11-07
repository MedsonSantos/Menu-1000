// script.js

// --- Variáveis de Dados (assumindo que vêm de cardapio.js e knowledgeBase.js) ---
// Certifique-se de que 'products', 'categoriesData', 'chatbotKnowledgeBase',
// 'photos', 'DEFAULT_LOTTIE_JSON', 'DEFAULT_CATEGORY_IMAGE', 'DEFAULT_PLACEHOLDER_IMAGE'
// estão definidos em 'cardapio.js' e 'knowledgeBase.js' e são globais ou importados.

/**
 * Função para verificar o dia e atualizar o status de funcionamento na tela principal.
 * @returns {string} true se a loja estiver aberta, false se estiver fechada.
 */
function getStoreStatus() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentMinutes = currentHour * 60 + currentMinute; // Minutos totais do dia

    const openTime = operatingHours.openTime.split(':').map(Number);
    const closeTime = operatingHours.closeTime.split(':').map(Number);
    const openMinutes = openTime[0] * 60 + openTime[1];
    const closeMinutes = closeTime[0] * 60 + closeTime[1];

    // 1. Verifica se é o dia de fechamento (ex: Segunda-feira)
    if (dayOfWeek === operatingHours.closedDay) {
        return 'CLOSED_DAY'; // Estamos fechados hoje
    }

    // 2. Verifica se a hora atual está DENTRO do horário de funcionamento (mas não é dia de fechamento)
    if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
        return 'OPEN'; // Estamos abertos
    }

    // 3. Verifica se a hora atual está ANTES do horário de abertura (mas em um dia de funcionamento)
    if (currentMinutes < openMinutes) {
        return 'AWAITING_OPENING'; // Em breve abriremos
    }

    // 4. Se não é dia de fechamento, não está aberto e não está esperando abrir, então já passou do horário de fechamento.
    return 'CLOSED'; // Fechado (já passou do horário)
}

// --- Elementos do DOM ---
const menuSections = document.getElementById('menu-sections');
const categoryNavigation = document.getElementById('category-navigation');
const cartIconContainer = document.getElementById('cart-icon-container');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsModal = document.getElementById('cart-items-modal');
const cartTotalModal = document.getElementById('cart-total-modal');
const checkoutWhatsappModalBtn = document.getElementById('checkout-whatsapp-modal');
const summaryModal = document.getElementById('summary-modal');
const summaryContentDiv = document.getElementById('summary-content');
const sendOrderBtn = document.getElementById('send-order-btn');
const cartItemsScrollContainer = document.getElementById('cart-items-scroll-container'); // Container para rolagem
const statusFuncionamentoMainElement = document.getElementById('status-funcionamento-main'); // Elemento de status

// --- Elementos do Carrinho ---
const orderTypeSelect = document.getElementById('order-type');
const deliveryOptions = document.getElementById('delivery-options');
const pickupOptions = document.getElementById('pickup-options');
const deliveryAddressInput = document.getElementById('delivery-address');
const pickupNameInput = document.getElementById('pickup-name');
const notesTextarea = document.getElementById('notes');
const orderDetailsContainer = document.getElementById('order-details-container');

// --- Elementos do Chatbot ---
const openChatBtn = document.getElementById('openChatBtn');
const chatModal = document.getElementById('chatModal');
const closeChatModalBtn = document.getElementById('closeChatModalBtn');
const chatbox = document.getElementById('chatbox');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');

// --- Elementos do Carrossel de Fotos ---
const photosModal = document.getElementById('photos-modal');
const carouselTrackPhotos = document.getElementById('carousel-track-photos');
const prevPhotoBtn = document.getElementById('prev-photo-btn');
const nextPhotoBtn = document.getElementById('next-photo-btn');

// --- Elementos do Botão de Rolagem do Carrinho ---
const scrollUpBtn = document.getElementById('scroll-up-btn');
const scrollDownBtn = document.getElementById('scroll-down-btn');

// --- Elementos do Modal de Reserva ---
const reservationModal = document.getElementById('reservation-modal');
const reservationIcon = document.getElementById('reservation-icon'); // Alterado para usar o ícone diretamente
const sendReservationWhatsappBtn = document.getElementById('send-reservation-whatsapp');

// --- Variáveis Globais ---
let cart = [];
let currentSlideIndex = 0;
let photoSlides = [];

// --- Funções para o Carrinho ---

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    };

    // Verifica se o item já está no carrinho
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(newItem);
    }

    updateCartDisplay();
    flashCartIcon();
}

function addCustomizableJantinhaToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        espeto: '', // Inicializa a opção de Espeto
        feijao: '',  // Inicializa a opção de Feijão
        salada: '' // ✅ ADIÇÃO: Inicializa a opção de Salada
    };

    // Lógica específica para pp-3 (Jantinha sem Espeto)
    if (productId === 'pp-3') {
        newItem.feijao = '';
        newItem.salada = ''; // ✅ ADIÇÃO: Inicializa a opção de Salada
    }

    // Lógica para as misturas dos caldos //
    if (productId === 'cald-1' || productId === 'cald-2' || productId === 'cald-3') {
        newItem.acompanhamento = ''; // Inicializa a opção de acompanhamento
    }

    cart.push(newItem);
    updateCartDisplay();
    flashCartIcon();
}

function removeItemFromCart(cartIndex) {
    if (cartIndex >= 0 && cartIndex < cart.length) {
        cart.splice(cartIndex, 1);
        updateCartDisplay();
        flashCartIcon();
    }
}

function updateCartDisplay() {
    if (!cartItemsModal || !cartTotalModal) return;

    cartItemsModal.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        // Adiciona botão de remoção
        const removeButton = document.createElement('button');
        removeButton.textContent = '🗑️';
        removeButton.className = 'remove-item-btn';
        removeButton.onclick = () => removeItemFromCart(index);
        itemElement.appendChild(removeButton);

        // Adiciona detalhes do item
        const details = document.createElement('div');
        details.className = 'cart-item-details';
        details.innerHTML = `
            <span class="cart-item-name">${item.quantity}x ${item.name}</span>
            <span class="cart-item-price">R$ ${(itemTotal).toFixed(2).replace('.', ',')}</span>
        `;

        // Adiciona opções personalizadas se existirem
        if (item.espeto || item.feijao || item.salada || item.acompanhamento) {
            const optionsList = document.createElement('ul');
            optionsList.className = 'item-options-list';

            if (item.espeto) optionsList.innerHTML += `<li>Espeto: ${item.espeto}</li>`;
            if (item.feijao) optionsList.innerHTML += `<li>Feijão: ${item.feijao}</li>`;
            if (item.salada) optionsList.innerHTML += `<li>Salada: ${item.salada}</li>`;
            if (item.acompanhamento) optionsList.innerHTML += `<li>Acompanhamento: ${item.acompanhamento}</li>`;

            details.appendChild(optionsList);
        }

        itemElement.appendChild(details);
        cartItemsModal.appendChild(itemElement);
    });

    cartTotalModal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0); // Conta total de itens
}

function flashCartIcon() {
    if (cartIconContainer) {
        cartIconContainer.classList.add('flash');
        setTimeout(() => {
            cartIconContainer.classList.remove('flash');
        }, 800);
    }
}

// --- Funções para Modais ---

function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
    }
}

// --- Funções para Opções de Pedido ---

function handleOrderTypeChange() {
    if (!orderTypeSelect || !deliveryOptions || !pickupOptions || !orderDetailsContainer) return;

    const type = orderTypeSelect.value;
    if (type === 'delivery') {
        deliveryOptions.style.display = 'block';
        pickupOptions.style.display = 'none';
    } else if (type === 'pickup') {
        deliveryOptions.style.display = 'none';
        pickupOptions.style.display = 'block';
    }
    orderDetailsContainer.style.display = 'block'; // Mostra o container de detalhes quando o tipo é selecionado
}

// --- Funções para o Carrossel de Fotos ---

function renderPhotosInModal() {
    if (!carouselTrackPhotos || typeof photos === 'undefined' || !Array.isArray(photos)) {
        console.error("Erro no Script: Elementos ou dados de fotos para o carrossel não encontrados.");
        return;
    }

    carouselTrackPhotos.innerHTML = '';
    photoSlides = [];

    photos.forEach(photoUrl => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = "Foto do Estabelecimento";
        img.loading = 'lazy';

        slide.appendChild(img);
        carouselTrackPhotos.appendChild(slide);
        photoSlides.push(slide);
    });

    updateCarouselButtons();
}

function updateCarouselButtons() {
    if (prevPhotoBtn && nextPhotoBtn && photoSlides.length > 0) {
        prevPhotoBtn.disabled = currentSlideIndex === 0;
        nextPhotoBtn.disabled = currentSlideIndex === photoSlides.length - 1;
    }
}

function goToSlide(index) {
    if (index >= 0 && index < photoSlides.length) {
        const offset = -index * 100;
        carouselTrackPhotos.style.transform = `translateX(${offset}%)`;
        if (index !== currentSlideIndex) {
            currentSlideIndex = index;
            updateCarouselButtons();
        }
    }
}

// --- Funções para o Modal de Reserva ---

/**
 * Abre o modal de reserva.
 */
function openReservationModal() {
    if (reservationModal) {
        reservationModal.style.display = 'flex';
        // Limpa o formulário ao abrir
        document.getElementById('reservation-name').value = '';
        document.getElementById('reservation-people').value = '';
        document.getElementById('reservation-date').value = '';
        document.getElementById('reservation-time').value = '';
        document.getElementById('reservation-notes').value = '';

        // Define a data mínima como hoje
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('reservation-date').min = today;
    }
}

/**
 * Fecha o modal de reserva.
 */
function closeReservationModal() {
    if (reservationModal) {
        reservationModal.style.display = 'none';
    }
}

/**
 * Valida os dados da reserva antes de gerar a mensagem.
 * @returns {boolean} True se os dados forem válidos, false caso contrário.
 */
function validateReservationData() {
    const name = document.getElementById('reservation-name').value.trim();
    const people = document.getElementById('reservation-people').value.trim();
    const dateInput = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value.trim();

    if (!name || !people || !dateInput || !time) {
        alert('Por favor, preencha todos os campos obrigatórios: Nome, Quantidade de Pessoas, Data e Horário.');
        return false;
    }

    const reservationDate = new Date(dateInput);
    const today = new Date();
    const reservationDayOfWeek = reservationDate.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

    // Verifica se a data selecionada é anterior à data atual
    if (reservationDate < today) {
        alert('Desculpe, não é possível fazer reservas para datas passadas. Por favor, escolha uma data futura.');
        return false;
    }

    // Verifica se a data selecionada é uma Segunda-feira
    if (reservationDayOfWeek === 1) { // 1 representa Segunda-feira
        alert('Desculpe, não fazemos reservas às segundas-feiras, pois estamos fechados. Por favor, escolha outro dia.');
        return false;
    }

    return true;
}

/**
 * Gera a mensagem de reserva formatada para o WhatsApp.
 * @returns {string} A mensagem pronta para ser enviada.
 */
function generateReservationMessage() {
    if (!validateReservationData()) {
        return null; // Retorna null se a validação falhar
    }

    const name = document.getElementById('reservation-name').value.trim();
    const people = document.getElementById('reservation-people').value.trim();
    const dateInput = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value.trim();
    const notes = document.getElementById('reservation-notes').value.trim();

    // Formata a data para DD/MM/YYYY
    const reservationDate = new Date(dateInput);
    const formattedDate = reservationDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    let message = `*NOVA RESERVA*\n\n`;
    message += `*Nome:* ${name}\n`;
    message += `*Pessoas:* ${people}\n`;
    message += `*Data:* ${formattedDate}\n`;
    message += `*Horário:* ${time}\n`;
    if (notes) {
        message += `*Observações:* ${notes}\n`;
    }
    message += `\n*Importante:* Esta reserva será analisada para confirmar a disponibilidade.`;

    return encodeURIComponent(message);
}

/**
 * Envia a mensagem de reserva para o WhatsApp.
 */
function sendReservationToWhatsApp() {
    const message = generateReservationMessage();

    if (message === null) { // Verifica se a validação falhou
        return; // Sai da função se a validação falhar
    }

    const whatsappNumber = '5562992020331'; // Seu número de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
    closeReservationModal(); // Fecha o modal após enviar
}

// --- Funções para o Resumo do Pedido e WhatsApp ---

function showOrderSummary() {
    const orderType = orderTypeSelect.value;
    const deliveryAddress = deliveryAddressInput.value.trim();
    const pickupName = pickupNameInput.value.trim();
    const notes = notesTextarea.value.trim();

    if (orderType === 'delivery' && !deliveryAddress) {
        alert('Por favor, digite o endereço de entrega para prosseguir.');
        return null;
    }
    if (orderType === 'pickup' && !pickupName) {
        alert('Por favor, digite o nome para retirada para prosseguir.');
        return null;
    }

    let whatsappMessage = `*Boa noite!! Novo Pedido*`;
    let htmlSummary = `<div class="summary-section"><h3>Detalhes do Pedido</h3><p><strong>Tipo:</strong> ${orderType === 'delivery' ? 'Entrega 🏍️' : 'Retirada no Local 📦'}</p>${orderType === 'delivery' ? `<p><strong>Endereço:</strong> ${deliveryAddress}</p>` : `<p><strong>Nome Retirada:</strong> ${pickupName}</p>`}${notes ? `<p><strong>Observações:</strong> ${notes}</p>` : ''}</div><div class="summary-section"><h3>Itens</h3><ul class="summary-items-list">`;

    let total = 0;
    let validationFailed = false;

    cart.forEach((cartItem, index) => {
        const itemTotal = cartItem.price * cartItem.quantity;
        total += itemTotal;

        // Validação de opções personalizadas
        if (['pp-1', 'pp-2', 'pp-3'].includes(cartItem.id)) {
            if (!cartItem.espeto && cartItem.id !== 'pp-3') { // pp-3 não precisa de espeto
                alert(`Por favor, selecione o espeto para a ${cartItem.name} antes de finalizar.`);
                validationFailed = true;
                return; // Sai do loop forEach para parar a validação
            }
            if (!cartItem.feijao) {
                alert(`Por favor, selecione o feijão para a ${cartItem.name} antes de finalizar.`);
                validationFailed = true;
                return;
            }
             if (!cartItem.salada) { // ✅ ADIÇÃO: Validação para salada
                alert(`Por favor, selecione a salada para a ${cartItem.name} antes de finalizar.`);
                validationFailed = true;
                return;
            }
        }

         // Validação para caldos
         if (['cald-1', 'cald-2', 'cald-3'].includes(cartItem.id)) {
            if (!cartItem.acompanhamento) {
                alert(`Por favor, selecione o acompanhamento para o ${cartItem.name} antes de finalizar.`);
                validationFailed = true;
                return;
            }
        }

        whatsappMessage += `\n\n*${cartItem.quantity}x ${cartItem.name}* - R$ ${itemTotal.toFixed(2).replace('.', ',')}`;
        if (cartItem.espeto) whatsappMessage += `\n- Espeto: ${cartItem.espeto}`;
        if (cartItem.feijao) whatsappMessage += `\n- Feijão: ${cartItem.feijao}`;
        if (cartItem.salada) whatsappMessage += `\n- Salada: ${cartItem.salada}`; // ✅ ADIÇÃO: Adiciona salada à mensagem
        if (cartItem.acompanhamento) whatsappMessage += `\n- Acompanhamento: ${cartItem.acompanhamento}`; // ✅ ADIÇÃO: Adiciona acompanhamento à mensagem
        if (notes) whatsappMessage += `\n- Obs: ${notes}`;

        htmlSummary += `<li><strong>${cartItem.quantity}x ${cartItem.name}</strong> - R$ ${itemTotal.toFixed(2).replace('.', ',')}`;
        const optionsList = [];
        if (cartItem.espeto) optionsList.push(`Espeto: ${cartItem.espeto}`);
        if (cartItem.feijao) optionsList.push(`Feijão: ${cartItem.feijao}`);
        if (cartItem.salada) optionsList.push(`Salada: ${cartItem.salada}`); // ✅ ADIÇÃO: Adiciona salada ao resumo HTML
        if (cartItem.acompanhamento) optionsList.push(`Acompanhamento: ${cartItem.acompanhamento}`); // ✅ ADIÇÃO: Adiciona acompanhamento ao resumo HTML
        if (optionsList.length > 0) {
            htmlSummary += `<ul class="item-options-list">`;
            optionsList.forEach(opt => {
                htmlSummary += `<li>${opt}</li>`;
            });
            htmlSummary += `</ul>`;
        }
        htmlSummary += `</li>`;
    });

    if (validationFailed) {
        return; // Interrompe se houver erro de validação
    }

    if (cart.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
        return;
    }

    whatsappMessage += `\n\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

    // Fecha o carrinho e abre o resumo
    if (!sendOrderBtn) {
        console.error("Erro no Script: Botão de envio final (ID 'send-order-btn') não encontrado no HTML.");
        alert("Erro ao preparar o pedido. Por favor, verifique o HTML para garantir que o botão com ID 'send-order-btn' exista.");
        return;
    }

    // Armazena a mensagem final no botão de envio para uso posterior
    sendOrderBtn.dataset.whatsappMessage = whatsappMessage; // LINHA CORRIGIDA PELA VERIFICAÇÃO ACIMA
    sendOrderBtn.dataset.whatsappNumber = '5562992020331'; // Seu número
    summaryContentDiv.innerHTML = htmlSummary + `</ul><div class="final-total">Total: R$ ${total.toFixed(2).replace('.', ',')}</div>`;
    closeModal(cartModal);
    openModal(summaryModal);
}

function sendOrderToWhatsApp() {
    const whatsappNumber = sendOrderBtn.dataset.whatsappNumber;
    const message = sendOrderBtn.dataset.whatsappMessage;

    if (!whatsappNumber || !message) {
        // Não deve acontecer, pois o botão deve estar desabilitado/oculto
        console.error("Erro: Número ou mensagem do WhatsApp não encontrados no botão.");
        return null;
    }

    const encodedMessage = encodeURIComponent(message);
    // Ele carrega mais rápido, mas não impede a edição nem envia automaticamente.
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    console.log('Mensagem final do WhatsApp:', decodeURIComponent(encodedMessage));
    // Abre a URL, levando o usuário para o WhatsApp com a mensagem pronta.
    window.open(whatsappUrl, '_blank');
    closeModal(summaryModal);
    // Opcional: Limpar carrinho após o envio
    cart = [];
    updateCartDisplay();
}

// --- Funções para Renderização do Menu ---

function normalizeCategoryName(name) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Handler para o clique no botão "Adicionar".
 * @param {Event} event - O evento de clique.
 */
function handleAddButtonClick(event) {
    const productId = event.target.dataset.id;
    if (['pp-1', 'pp-2', 'pp-3'].includes(productId)) {
        addCustomizableJantinhaToCart(productId);
    } else {
        addToCart(productId);
    }
}

// =========================================================
// NOVO CÓDIGO DO CARROSSEL DE FOTOS - INÍCIO
// =========================================================
// (Código para renderizar e navegar pelas fotos no modal - já implementado acima)
// =========================================================
// NOVO CÓDIGO DO CARROSSEL DE FOTOS - FIM
// =========================================================

function renderMenu() {
    if (!menuSections || !categoryNavigation || typeof products === 'undefined' || typeof categoriesData === 'undefined') return;

    menuSections.innerHTML = '';
    categoryNavigation.innerHTML = '';

    const categories = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    // Renderiza categorias e botões de navegação
    Object.keys(categories).forEach(categoryName => {
        const categoryProducts = categories[categoryName];
        const categorySection = renderProductCards(categoryName, categoryProducts);
        menuSections.appendChild(categorySection);

        const navButton = document.createElement('button');
        navButton.className = 'category-button';
        navButton.textContent = categoryName;
        navButton.onclick = () => {
            const element = document.getElementById(normalizeCategoryName(categoryName));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };
        categoryNavigation.appendChild(navButton);
    });

    // Adiciona botões de link e outros itens da categoriesData
    categoriesData.forEach(item => {
        if (item.type === 'link') {
            const navButton = document.createElement('button');
            navButton.className = 'category-button';
            navButton.textContent = item.name;
            if (item.url) {
                navButton.onclick = () => {
                    if (item.targetModalId) {
                        openModal(document.getElementById(item.targetModalId));
                    } else {
                        window.open(item.url, '_blank');
                    }
                };
            }
            categoryNavigation.appendChild(navButton);
        }
    });

    // Adiciona event listeners para os botões de adicionar ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddButtonClick);
    });
}

function renderProductCards(categoryName, products) {
    const section = document.createElement('section');
    section.className = 'category';
    section.id = normalizeCategoryName(categoryName); // Cria um ID baseado no nome da categoria

    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = categoryName;
    section.appendChild(categoryTitle);

    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Criar a imagem do produto
        const img = document.createElement('img');
        img.src = product.imageUrl || DEFAULT_PLACEHOLDER_IMAGE;
        img.alt = product.name;
        img.loading = 'lazy'; // Para melhor desempenho
        productCard.appendChild(img);

        // Criar o título do produto
        const title = document.createElement('h3');
        title.textContent = product.name;
        productCard.appendChild(title);

        // Criar a descrição do produto
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'description-container';

        const descriptionText = document.createElement('p');
        descriptionText.className = 'product-description';
        descriptionText.innerHTML = product.description; // Usando innerHTML para manter as quebras de linha (<br>)
        descriptionContainer.appendChild(descriptionText);

        // Criar o botão "Ler Mais"
        const readMoreButton = document.createElement('button');
        readMoreButton.className = 'read-more-button';
        readMoreButton.textContent = 'Ler Mais';
        readMoreButton.addEventListener('click', function() {
            if (descriptionText.classList.contains('expanded')) {
                descriptionText.classList.remove('expanded');
                readMoreButton.textContent = 'Ler Mais';
            } else {
                descriptionText.classList.add('expanded');
                readMoreButton.textContent = 'Ler Menos';
            }
        });

        descriptionContainer.appendChild(readMoreButton);
        productCard.appendChild(descriptionContainer);

        // Criar o preço do produto
        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
        productCard.appendChild(price);

        // Criar o botão "Adicionar ao Carrinho"
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart';
        addToCartBtn.textContent = 'Adicionar ➕';
        addToCartBtn.dataset.id = product.id; // Armazena o ID do produto no botão
        productCard.appendChild(addToCartBtn);

        productsGrid.appendChild(productCard);
    });

    section.appendChild(productsGrid);
    return section;
}

// --- Funções para Tema ---

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    document.body.classList.toggle('light-theme', savedTheme === 'light');
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    document.body.className = ''; // Remove todas as classes de tema
    document.body.classList.add(`${newTheme}-theme`);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const iconElement = document.getElementById('theme-toggle-icon');
    if (iconElement) {
        iconElement.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// --- Funções para Status de Funcionamento ---

function updateMainScreenOperatingStatus() {
    if (statusFuncionamentoMainElement) {
        const status = getStoreStatus(); // Pega o status atual

        if (status === 'OPEN') {
            statusFuncionamentoMainElement.textContent = "🥳 Estamos abertos! Faça seu pedido!";
            statusFuncionamentoMainElement.classList.add('aberto-main');
            statusFuncionamentoMainElement.classList.remove('fechado-main');
            statusFuncionamentoMainElement.style.display = 'block';
        } else if (status === 'CLOSED') {
            statusFuncionamentoMainElement.textContent = "❌ Olá! Já passamos do horário de funcionamento. Volte amanhã!";
            statusFuncionamentoMainElement.classList.add('fechado-main');
            statusFuncionamentoMainElement.classList.remove('aberto-main');
            statusFuncionamentoMainElement.style.display = 'block';
        } else if (status === 'AWAITING_OPENING') {
             statusFuncionamentoMainElement.textContent = "⏰ Olá! Ainda não abrimos. Volte mais tarde!";
             statusFuncionamentoMainElement.classList.add('fechado-main'); // Pode usar uma classe diferente se desejar
             statusFuncionamentoMainElement.classList.remove('aberto-main');
             statusFuncionamentoMainElement.style.display = 'block';
        } else { // CLOSED_DAY
             statusFuncionamentoMainElement.textContent = "😔 Olá! Estamos fechados às segundas-feiras. Volte amanhã!";
             statusFuncionamentoMainElement.classList.add('fechado-main');
             statusFuncionamentoMainElement.classList.remove('aberto-main');
             statusFuncionamentoMainElement.style.display = 'block';
        }
    }
}

// --- Event Listeners ---

// Event listener para alternar o tema
document.getElementById('theme-toggle-container')?.addEventListener('click', toggleTheme);

// Event listener para abrir o modal de informações
document.getElementById('info-toggle-container')?.addEventListener('click', () => {
    openModal(document.getElementById('info-modal'));
});

// Event listener para abrir o modal de fotos
document.getElementById('photos-toggle-container')?.addEventListener('click', () => {
    renderPhotosInModal(); // Renderiza as fotos ao abrir o modal
    openModal(photosModal);
});

// Event listener para o botão de rolagem do carrinho
if (scrollUpBtn && cartItemsScrollContainer) {
    scrollUpBtn.addEventListener('click', () => {
        const scrollAmount = cartItemsScrollContainer.clientHeight * 0.5;
        cartItemsScrollContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    });
}

if (scrollDownBtn && cartItemsScrollContainer) {
    scrollDownBtn.addEventListener('click', () => {
        const scrollAmount = cartItemsScrollContainer.clientHeight * 0.5;
        cartItemsScrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    });
}

// Event listener para o ícone do carrinho
if (cartIconContainer) {
    cartIconContainer.addEventListener('click', () => {
        // ADIÇÃO: Ajusta o tamanho do container de itens do carrinho (máximo 40% da altura da viewport)
        if (cartItemsScrollContainer) {
            cartItemsScrollContainer.style.maxHeight = '40vh';
        }
        openModal(cartModal);
        updateCartDisplay();
        handleOrderTypeChange();
    });
}

// Adiciona event listeners para todos os botões de fechar modal (classe '.close-button')
document.querySelectorAll('.modal .close-button').forEach(button => {
    button.addEventListener('click', () => {
        const modalElement = button.closest('.modal');
        if (modalElement) {
            closeModal(modalElement);
            if (modalElement.id === 'chatModal' && chatbox) {
                chatbox.innerHTML = '';
                delete chatbox.dataset.initialMessageShown;
            }
        }
    });
});

// Event listener para o botão de checkout do WhatsApp (MODIFICADO para abrir o resumo)
if (checkoutWhatsappModalBtn) {
    // Correção do erro anterior: a remoção da função indefinida foi mantida fora.
    checkoutWhatsappModalBtn.addEventListener('click', showOrderSummary); // Nova função que abre o resumo
}

// Event listener para o botão de envio final no modal de resumo (ADIÇÃO)
if (sendOrderBtn) {
    sendOrderBtn.addEventListener('click', sendOrderToWhatsApp);
}

// Event listener para mudanças no tipo de pedido
orderTypeSelect?.addEventListener('change', handleOrderTypeChange);

// Event listener para o botão de fechar do modal de fotos


// Event listener para navegar pelas fotos (anterior)
prevPhotoBtn?.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
        goToSlide(currentSlideIndex - 1);
    }
});

// Event listener para navegar pelas fotos (próximo)
nextPhotoBtn?.addEventListener('click', () => {
    if (currentSlideIndex < photoSlides.length - 1) {
        goToSlide(currentSlideIndex + 1);
    }
});

// =========================================================
// NOVO CÓDIGO DO CARROSSEL DE FOTOS - INÍCIO
// =========================================================
// (Event listeners para navegação do carrossel - já implementados acima)
// =========================================================
// NOVO CÓDIGO DO CARROSSEL DE FOTOS - FIM
// =========================================================

// --- Event Listeners para o Modal de Reserva ---

// Event listener para abrir o modal de reserva
if (reservationIcon) {
    reservationIcon.addEventListener('click', openReservationModal);
}

// Event listener para fechar o modal de reserva
if (reservationModal) {
    reservationModal.addEventListener('click', function(event) {
        if (event.target === reservationModal) {
            closeReservationModal();
        }
    });
}

// Event listener para o botão de envio da reserva
if (sendReservationWhatsappBtn) {
    sendReservationWhatsappBtn.addEventListener('click', sendReservationToWhatsApp);
}

// Event listener para o botão de fechar do modal de reserva
document.querySelectorAll('.close-button[data-modal="reservation"]').forEach(button => {
    button.addEventListener('click', closeReservationModal);
});

// - Inicializações ao carregar o DOM -
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    renderMenu();
    updateCartDisplay();
    handleOrderTypeChange();
    updateMainScreenOperatingStatus(); // Atualiza o status ao carregar
});

// Função auxiliar para obter o nome do dia da semana em português
function getWeekdayName(dayIndex) {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return days[dayIndex];
}
