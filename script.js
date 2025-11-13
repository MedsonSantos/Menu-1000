document.addEventListener('DOMContentLoaded', function() {
    // Carrinho de compras. Cada item pode ser:
    // - Jantinha Completa: { id: 'pp-1', espeto: '', feijao: '', salada: '', quantity: 1 }
    // - Jantinha Nota 1000: { id: 'pp-2', espeto: '', feijao: '', salada: '', quantity: 1 }
    // - Jantinha sem Espeto: { id: 'pp-3', feijao: '', salada: '', quantity: 1 }
    // - Caldo: { id: 'cald-X', acompanhamento: '', quantity: 1 }
    // - Outros produtos: { id: 'produto_id', quantity: X }
    let cart = [];
    // --- Elementos do DOM ---
    const body = document.body;
    const menuSections = document.getElementById('menu-sections');
    // Modal do Carrinho
    const cartModal = document.getElementById('cart-modal');
    const cartItemsScrollContainer = document.getElementById('cart-items-scroll-container');
    const cartItemsModalContainer = document.getElementById('cart-items-modal');
    const cartTotalModalSpan = document.getElementById('cart-total-modal');
    const checkoutWhatsappModalBtn = document.getElementById('checkout-whatsapp-modal');
    const orderDetailsContainer = document.getElementById('order-details-container');
    const orderTypeSelect = document.getElementById('order-type');
    const deliveryOptionsDiv = document.getElementById('delivery-options');
    const pickupOptionsDiv = document.getElementById('pickup-options');
    const deliveryAddressInput = document.getElementById('delivery-address');
    const pickupNameInput = document.getElementById('pickup-name');
    const deliveryFeeInfo = document.getElementById('delivery-fee-info');
    const notesTextarea = document.getElementById('notes');
    // Modal de Resumo
    const summaryModal = document.getElementById('summary-modal');
    const summaryContentDiv = document.getElementById('summary-content');
    const sendOrderBtn = document.getElementById('send-order-btn');
    // Modal de Informações
    const infoModal = document.getElementById('info-modal');
    const infoToggleContainer = document.getElementById('info-toggle-container');
    // Ícone do Carrinho no Header
    const cartIconContainer = document.getElementById('cart-icon-container');
    const cartCountSpan = document.getElementById('cart-count');
    // Tema
    const themeToggleContainer = document.getElementById('theme-toggle-container');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    // Navegação de Categorias
    const categoryNavigation = document.getElementById('category-navigation');
    // Chatbot
    const openChatBtn = document.getElementById('openChatBtn');
    const chatModal = document.getElementById('chatModal');
    const closeChatModalBtn = document.getElementById('closeChatModalBtn');
    const chatbox = document.getElementById('chatbox');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    // Botão "Voltar ao Topo"
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    // Modal de Reserva
    const reservationModal = document.getElementById('reservation-modal');
    const reservationIcon = document.getElementById('reservation-icon');
    const sendReservationWhatsappBtn = document.getElementById('send-reservation-whatsapp');
    // Status de funcionamento
    const statusFuncionamentoMainElement = document.getElementById('status-funcionamento-main');
    const operatingHours = {
        openTime: '18:00',
        closeTime: '23:59',
        closedDay: 1 // Segunda-feira
    };

    // --- Funções auxiliares ---
    function getStoreStatus() {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const [openHour, openMinute] = operatingHours.openTime.split(':').map(Number);
        const [closeHour, closeMinute] = operatingHours.closeTime.split(':').map(Number);
        const openTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openHour, openMinute);
        const closeTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeHour, closeMinute);
        if (dayOfWeek === operatingHours.closedDay) return 'CLOSED';
        if (now >= openTimeToday && now <= closeTimeToday) return 'OPEN';
        if (now < openTimeToday) return 'AWAITING_OPENING';
        return 'CLOSED';
    }

    function updateMainScreenOperatingStatus() {
        if (!statusFuncionamentoMainElement) return;
        const status = getStoreStatus();
        statusFuncionamentoMainElement.textContent = status === 'OPEN'
            ? "🥳 Estamos abertos! Faça seu pedido!"
            : "❌ Olá! Estamos fechados hoje. Nosso horário de funcionamento é de TERÇA a DOMINGO, das 18:00h às 00:00h.";
        statusFuncionamentoMainElement.classList.toggle('aberto-main', status === 'OPEN');
        statusFuncionamentoMainElement.classList.toggle('fechado-main', status === 'CLOSED');
        statusFuncionamentoMainElement.style.display = 'block';
    }

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }

    function toggleTheme() {
        setTheme(body.classList.contains('light-theme') ? 'dark' : 'light');
    }

    function initializeTheme() {
        setTheme(localStorage.getItem('theme') || 'dark');
    }

    function openModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'flex';
            body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
            body.style.overflow = 'auto';
        }
    }

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) closeModal(cartModal);
        else if (event.target === summaryModal) closeModal(summaryModal);
        else if (event.target === infoModal) closeModal(infoModal);
        else if (event.target === chatModal) {
            closeModal(chatModal);
            if (chatbox) {
                chatbox.innerHTML = '';
                delete chatbox.dataset.initialMessageShown;
            }
        }
    });

    // --- Carrinho ---
    function addToCart(productId) {
        const existingItemIndex = cart.findIndex(item => item.id === productId && !['pp-1', 'pp-2', 'pp-3', 'cald-1', 'cald-2', 'cald-3'].includes(item.id));
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        updateCartDisplay();
        flashCartIcon();
    }

    function addCustomizableJantinhaToCart(productId) {
        const item = { id: productId, quantity: 1 };
        if (['pp-1', 'pp-2'].includes(productId)) {
            item.espeto = '';
            item.feijao = '';
            item.salada = '';
        } else if (productId === 'pp-3') {
            item.feijao = '';
            item.salada = '';
        } else if (['cald-1', 'cald-2', 'cald-3'].includes(productId)) {
            item.acompanhamento = ''; // ✅ Mesmo padrão: string vazia
        }
        cart.push(item);
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

    function flashCartIcon() {
        if (cartIconContainer) {
            cartIconContainer.classList.add('flash');
            setTimeout(() => cartIconContainer.classList.remove('flash'), 500);
        }
    }

    function updateCartDisplay() {
        if (!cartItemsModalContainer || !cartTotalModalSpan || !cartCountSpan) return;

        cartItemsModalContainer.innerHTML = '';
        let total = 0, itemCount = 0;

        if (cart.length === 0) {
            cartItemsModalContainer.innerHTML = '<p>❌ Nenhum item no carrinho.</p>';
            if (orderDetailsContainer) orderDetailsContainer.style.display = 'none';
            if (checkoutWhatsappModalBtn) checkoutWhatsappModalBtn.style.display = 'none';
        } else {
            if (orderDetailsContainer) orderDetailsContainer.style.display = 'block';
            if (checkoutWhatsappModalBtn) checkoutWhatsappModalBtn.style.display = 'block';

            cart.forEach((cartItem, index) => {
                const product = products.find(p => p.id === cartItem.id);
                if (!product) return;

                const itemTotal = product.price * cartItem.quantity;
                total += itemTotal;
                itemCount += cartItem.quantity;

                let optionsHtml = '';

                // ✅ LÓGICA DOS ESPETOS/FEIJÃO/SALADA (REFERÊNCIA)
                if (['pp-1', 'pp-2'].includes(product.id)) {
                    optionsHtml += `
                        <div class="input-group-inline">
                            <label for="espeto-${index}">Espeto:</label>
                            <select id="espeto-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="espeto">
                                <option value="" disabled ${cartItem.espeto === '' ? 'selected' : ''}>Selecione</option>
                                <option value="ASINHA (TULIPA)" ${cartItem.espeto === 'ASINHA (TULIPA)' ? 'selected' : ''}>ASINHA (TULIPA)</option>
                                <option value="COXINHA DA ASA" ${cartItem.espeto === 'COXINHA DA ASA' ? 'selected' : ''}>COXINHA DA ASA</option>
                                <option value="CORAÇÃO" ${cartItem.espeto === 'CORAÇÃO' ? 'selected' : ''}>CORAÇÃO</option>
                                <option value="CONTRA FILÉ" ${cartItem.espeto === 'CONTRA FILÉ' ? 'selected' : ''}>CONTRA FILÉ</option>
                                <option value="CUPIM GRILL" ${cartItem.espeto === 'CUPIM GRILL' ? 'selected' : ''}>CUPIM GRILL</option>
                                <option value="PICANHA MONTADA" ${cartItem.espeto === 'PICANHA MONTADA' ? 'selected' : ''}>PICANHA MONTADA</option>
                                <option value="FRANGO COM BACON" ${cartItem.espeto === 'FRANGO COM BACON' ? 'selected' : ''}>FRANGO COM BACON</option>
                                <option value="FRANGO SEM BACON" ${cartItem.espeto === 'FRANGO SEM BACON' ? 'selected' : ''}>FRANGO SEM BACON</option>
                                <option value="LINGUIÇA CAIPIRA" ${cartItem.espeto === 'LINGUIÇA CAIPIRA' ? 'selected' : ''}>LINGUIÇA CAIPIRA</option>
                                <option value="LINGUIÇA C. APIMENTADA" ${cartItem.espeto === 'LINGUIÇA C. APIMENTADA' ? 'selected' : ''}>LINGUIÇA C. APIMENTADA</option>
                            </select>
                        </div>
                    `;
                }

                if (['pp-1', 'pp-2', 'pp-3'].includes(product.id)) {
                    optionsHtml += `
                        <div class="input-group-inline">
                            <label for="feijao-${index}">Feijão:</label>
                            <select id="feijao-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="feijao">
                                <option value="" disabled ${cartItem.feijao === '' ? 'selected' : ''}>Selecione</option>
                                <option value="Tropeiro" ${cartItem.feijao === 'Tropeiro' ? 'selected' : ''}>Tropeiro</option>
                                <option value="Caldo" ${cartItem.feijao === 'Caldo' ? 'selected' : ''}>Caldo</option>
                            </select>
                        </div>
                        <div class="input-group-inline">
                            <label for="salada-${index}">Salada:</label>
                            <select id="salada-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="salada">
                                <option value="" disabled ${cartItem.salada === '' ? 'selected' : ''}>Selecione</option>
                                <option value="Salada de macarrão" ${cartItem.salada === 'Salada de macarrão' ? 'selected' : ''}>Salada de macarrão</option>
                                <option value="Vinagrete" ${cartItem.salada === 'Vinagrete' ? 'selected' : ''}>Vinagrete</option>
                                <option value="Alface com tomate" ${cartItem.salada === 'Alface com tomate' ? 'selected' : ''}>Alface com tomate</option>
                            </select>
                        </div>
                    `;
                }

                // ✅ LÓGICA DOS CALDOS — REESCRITA PARA SER IDÊNTICA À DOS CAMPOS ACIMA
                if (['cald-1', 'cald-2', 'cald-3'].includes(product.id)) {
                    let options = [];
                    switch (product.id) {
                        case 'cald-1':
                            options = [
                                { value: "Sem mistura", label: "Sem mistura" },
                                { value: "Feijão com Costela", label: "Feijão com Costela" },
                                { value: "Feijão com Frango", label: "Feijão com Frango" }
                            ];
                            break;
                        case 'cald-2':
                            options = [
                                { value: "Sem mistura", label: "Sem mistura" },
                                { value: "Frango com Feijão", label: "Frango com Feijão" },
                                { value: "Frango com Costela", label: "Frango com Costela" }
                            ];
                            break;
                        case 'cald-3':
                            options = [
                                { value: "Sem mistura", label: "Sem mistura" },
                                { value: "Costela com Feijão", label: "Costela com Feijão" },
                                { value: "Costela com Frango", label: "Costela com Frango" }
                            ];
                            break;
                    }

                    let optionsHtmlSelect = options.map(opt => 
                        `<option value="${opt.value}" ${cartItem.acompanhamento === opt.value ? 'selected' : ''}>${opt.label}</option>`
                    ).join('');

                    optionsHtml += `
                        <div class="input-group-inline">
                            <label for="acompanhamento-${index}">Acompanha:</label>
                            <select id="acompanhamento-${index}" class="order-input small-select" data-cart-index="${index}" data-option-type="acompanhamento">
                                <option value="" disabled ${cartItem.acompanhamento === '' ? 'selected' : ''}>Selecione</option>
                                ${optionsHtmlSelect}
                            </select>
                        </div>
                    `;
                }

                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <div class="cart-item-info">
                        <span class="item-name">${product.name} ${['pp-1','pp-2','pp-3','cald-1','cald-2','cald-3'].includes(product.id) ? '' : `(x${cartItem.quantity})`}</span>
                        <span class="item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                        <div class="jantinha-options-individual">
                            ${optionsHtml}
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item-btn" data-cart-index="${index}">Remover</button>
                    </div>
                `;
                cartItemsModalContainer.appendChild(div);
            });
        }

        cartTotalModalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartCountSpan.textContent = itemCount;

        // ✅ Mesmo padrão de listener — funcional para você
        cartItemsModalContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.cartIndex);
                removeItemFromCart(idx);
            });
        });

        cartItemsModalContainer.querySelectorAll('.jantinha-options-individual select').forEach(select => {
            select.addEventListener('change', (event) => {
                const cartIndex = parseInt(event.target.dataset.cartIndex);
                const optionType = event.target.dataset.optionType;
                const value = event.target.value;
                if (cart[cartIndex]) {
                    cart[cartIndex][optionType] = value;
                }
            });
        });
    }

    function handleOrderTypeChange() {
        const type = orderTypeSelect?.value;
        if (!type) return;

        if (type === 'delivery') {
            deliveryOptionsDiv.style.display = 'block';
            pickupOptionsDiv.style.display = 'none';
            deliveryFeeInfo.style.display = 'block';
            deliveryAddressInput.required = true;
            pickupNameInput.required = false;
            pickupNameInput.value = '';
        } else {
            deliveryOptionsDiv.style.display = 'none';
            pickupOptionsDiv.style.display = 'block';
            deliveryFeeInfo.style.display = 'none';
            deliveryAddressInput.required = false;
            pickupNameInput.required = true;
            deliveryAddressInput.value = '';
        }
    }

    // --- Geração da mensagem do pedido ---
    function generateOrderMessage() {
        if (cart.length === 0) return null;

        const orderType = orderTypeSelect?.value;
        const deliveryAddress = deliveryAddressInput?.value.trim() || '';
        const pickupName = pickupNameInput?.value.trim() || '';
        const notes = notesTextarea?.value.trim() || '';

        if (orderType === 'delivery' && !deliveryAddress) {
            alert('Por favor, digite o endereço de entrega.');
            return null;
        }
        if (orderType === 'pickup' && !pickupName) {
            alert('Por favor, digite o nome para retirada.');
            return null;
        }

        let whatsappMessage = `*Boa noite!! Novo Pedido*\n`;
        let htmlSummary = `
            <div class="summary-section">
                <h3>Detalhes do Pedido</h3>
                <p><strong>Tipo:</strong> ${orderType === 'delivery' ? 'Entrega 🏍️' : 'Retirada no Local 📦'}</p>
                ${orderType === 'delivery' ? `<p><strong>Endereço:</strong> ${deliveryAddress}</p>` : `<p><strong>Nome Retirada:</strong> ${pickupName}</p>`}
                ${notes ? `<p><strong>Observações:</strong> ${notes}</p>` : ''}
            </div>
            <div class="summary-section">
                <h3>Itens</h3>
                <ul class="summary-items-list">
        `;

        let total = 0;
        let validationFailed = false;

        cart.forEach((cartItem, index) => {
            const product = products.find(p => p.id === cartItem.id);
            if (!product) return;

            if (['pp-1', 'pp-2', 'pp-3'].includes(product.id)) {
                const itemPrice = product.price;
                total += itemPrice;
                let details = `1x ${product.name} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n`;
                let html = `<li><strong>1x ${product.name}</strong> (R$ ${itemPrice.toFixed(2).replace('.', ',')})<br><ul class="item-options-list">`;

                if (['pp-1', 'pp-2'].includes(product.id)) {
                    if (cartItem.espeto === '') {
                        alert(`⚠️ Selecione o espeto para "${product.name}" (Item #${index + 1}).`);
                        validationFailed = true;
                        return;
                    }
                    details += `    - Espeto: ${cartItem.espeto}\n`;
                    html += `<li>Espeto: ${cartItem.espeto}</li>`;
                }

                if (cartItem.feijao === '') {
                    alert(`⚠️ Selecione o feijão para "${product.name}" (Item #${index + 1}).`);
                    validationFailed = true;
                    return;
                }
                details += `    - Feijão: ${cartItem.feijao}\n`;
                html += `<li>Feijão: ${cartItem.feijao}</li>`;

                if (cartItem.salada === '') {
                    alert(`⚠️ Selecione a salada para "${product.name}" (Item #${index + 1}).`);
                    validationFailed = true;
                    return;
                }
                details += `    - Salada: ${cartItem.salada}\n`;
                html += `<li>Salada: ${cartItem.salada}</li>`;

                html += `</ul></li>`;
                whatsappMessage += details;
                htmlSummary += html;

            } else if (['cald-1', 'cald-2', 'cald-3'].includes(product.id)) {
                // ✅ VALIDAÇÃO IDÊNTICA À DOS OUTROS CAMPOS
                if (cartItem.acompanhamento === '') {
                    alert(`⚠️ Selecione a mistura para "${product.name}" (Item #${index + 1}).`);
                    validationFailed = true;
                    return;
                }

                const itemPrice = product.price;
                total += itemPrice;
                whatsappMessage += `1x ${product.name} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n    - Mistura: ${cartItem.acompanhamento}\n`;
                htmlSummary += `
                    <li><strong>1x ${product.name}</strong> (R$ ${itemPrice.toFixed(2).replace('.', ',')})<br>
                        <ul class="item-options-list">
                            <li>Mistura: ${cartItem.acompanhamento}</li>
                        </ul>
                    </li>
                `;

            } else {
                const itemPrice = product.price * cartItem.quantity;
                total += itemPrice;
                whatsappMessage += `${cartItem.quantity}x ${product.name} - R$ ${itemPrice.toFixed(2).replace('.', ',')}\n`;
                htmlSummary += `<li><strong>${cartItem.quantity}x ${product.name}</strong> - R$ ${itemPrice.toFixed(2).replace('.', ',')}</li>`;
            }
        });

        if (validationFailed) return null;

        htmlSummary += `</ul></div>`;
        whatsappMessage += `\n*Tipo de Pedido:* ${orderType === 'delivery' ? 'Entrega' : 'Retirada no Local'}\n`;

        if (orderType === 'delivery') {
            whatsappMessage += `*Endereço de Entrega:*\n${deliveryAddress}\n`;
        } else {
            whatsappMessage += `*Nome para Retirada:*\n${pickupName}\n`;
        }

        if (notes) {
            whatsappMessage += `\n*Observações:*\n${notes}\n`;
            htmlSummary += `<div class="summary-section"><p><strong>Observações:</strong> ${notes}</p></div>`;
        }

        whatsappMessage += `\n*Total dos Produtos: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
        if (orderType === 'delivery') {
            whatsappMessage += `_Atenção: Taxa de entrega será calculada conforme o endereço._\n`;
            htmlSummary += `<p class="delivery-fee-info"><strong>Atenção:</strong> Taxa de entrega será calculada conforme o endereço.</p>`;
        }

        whatsappMessage += `\nObrigado por pedir na Jantinha Nota 1000!`;
        htmlSummary += `<div class="summary-section final-total"><h3>Total dos Produtos: R$ ${total.toFixed(2).replace('.', ',')}</h3></div>`;

        return {
            message: whatsappMessage,
            total,
            htmlSummary,
            whatsappNumber: '5562992020331'
        };
    }

    function showOrderSummary() {
        const orderData = generateOrderMessage();
        if (!orderData) return;

        if (!sendOrderBtn) {
            alert('Erro: botão de envio não encontrado.');
            return;
        }

        sendOrderBtn.dataset.whatsappMessage = orderData.message;
        sendOrderBtn.dataset.whatsappNumber = orderData.whatsappNumber;
        summaryContentDiv.innerHTML = orderData.htmlSummary;

        closeModal(cartModal);
        openModal(summaryModal);
    }

    function sendFinalOrderToWhatsapp(event) {
        const msg = event.currentTarget.dataset.whatsappMessage;
        const num = event.currentTarget.dataset.whatsappNumber;
        if (!msg || !num) {
            alert('Erro: mensagem não gerada.');
            return;
        }

        const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');

        closeModal(summaryModal);
        cart = [];
        updateCartDisplay();
    }

    // --- Renderização do menu (mantida intacta) ---
    function normalizeCategoryName(name) {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    function handleAddButtonClick(event) {
        const id = event.target.dataset.id;
        if (['pp-1', 'pp-2', 'pp-3', 'cald-1', 'cald-2', 'cald-3'].includes(id)) {
            addCustomizableJantinhaToCart(id);
        } else {
            addToCart(id);
        }
    }

    function renderProductCards(categoryName, products) {
        const section = document.createElement('section');
        section.className = 'category';
        section.id = normalizeCategoryName(categoryName);

        const title = document.createElement('h2');
        title.textContent = categoryName;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'products-grid';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const img = document.createElement('img');
            img.src = product.imageUrl || DEFAULT_PLACEHOLDER_IMAGE;
            img.alt = product.name;
            img.loading = 'lazy';
            card.appendChild(img);

            const name = document.createElement('h3');
            name.textContent = product.name;
            card.appendChild(name);

            const descContainer = document.createElement('div');
            descContainer.className = 'description-container';

            const desc = document.createElement('p');
            desc.className = 'product-description';
            desc.innerHTML = product.description;
            descContainer.appendChild(desc);

            const btn = document.createElement('button');
            btn.className = 'read-more-button';
            btn.textContent = 'Ler Mais';
            btn.addEventListener('click', () => {
                desc.classList.toggle('expanded');
                btn.textContent = desc.classList.contains('expanded') ? 'Ler Menos' : 'Ler Mais';
            });
            descContainer.appendChild(btn);

            card.appendChild(descContainer);

            const price = document.createElement('div');
            price.className = 'price';
            price.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
            card.appendChild(price);

            const addBtn = document.createElement('button');
            addBtn.className = 'add-to-cart';
            addBtn.textContent = 'Adicionar ➕';
            addBtn.dataset.id = product.id;
            addBtn.addEventListener('click', handleAddButtonClick);
            card.appendChild(addBtn);

            grid.appendChild(card);
        });

        section.appendChild(grid);
        return section;
    }

    function renderMenu() {
        if (!menuSections || !categoryNavigation || !products || !categoriesData) return;

        menuSections.innerHTML = '';
        categoryNavigation.innerHTML = '';

        const categories = products.reduce((acc, p) => {
            (acc[p.category] = acc[p.category] || []).push(p);
            return acc;
        }, {});

        Object.entries(categories).forEach(([catName, items]) => {
            const section = renderProductCards(catName, items);
            menuSections.appendChild(section);

            const btn = document.createElement('button');
            btn.className = 'category-button';

            const categoryDataEntry = categoriesData.find(
                item => item.name === catName && item.type === 'category'
            );
            let lottieContainer;
            if (categoryDataEntry) {
                lottieContainer = document.createElement('div');
                lottieContainer.classList.add('lottie-icon-container');
                const lottieJsonUrlToUse = categoryDataEntry.lottieJsonUrl || DEFAULT_LOTTIE_JSON || '';
                const imageUrlToUseForFallback = categoryDataEntry.imageUrl || DEFAULT_CATEGORY_IMAGE || '';
                if (lottieJsonUrlToUse && typeof lottie !== 'undefined') {
                    lottie.loadAnimation({
                        container: lottieContainer,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: lottieJsonUrlToUse
                    });
                } else if (imageUrlToUseForFallback) {
                    const fallbackImage = document.createElement('img');
                    fallbackImage.src = imageUrlToUseForFallback;
                    lottieContainer.appendChild(fallbackImage);
                }
                btn.appendChild(lottieContainer);
            }

            const text = document.createElement('span');
            text.className = 'button-text';
            text.textContent = catName;
            btn.appendChild(text);

            btn.onclick = () => {
                const el = document.getElementById(normalizeCategoryName(catName));
                el?.scrollIntoView({ behavior: 'smooth' });
            };

            categoryNavigation.appendChild(btn);
        });

        categoriesData
            .filter(item => item.type === 'link')
            .forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'category-button';

                const lottieContainer = document.createElement('div');
                lottieContainer.classList.add('lottie-icon-container');
                const lottieJsonUrlToUse = item.lottieJsonUrl || DEFAULT_LOTTIE_JSON || '';
                const imageUrlToUseForFallback = item.imageUrl || DEFAULT_CATEGORY_IMAGE || '';
                if (lottieJsonUrlToUse && typeof lottie !== 'undefined') {
                    lottie.loadAnimation({
                        container: lottieContainer,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: lottieJsonUrlToUse
                    });
                } else if (imageUrlToUseForFallback) {
                    const fallbackImage = document.createElement('img');
                    fallbackImage.src = imageUrlToUseForFallback;
                    lottieContainer.appendChild(fallbackImage);
                }
                btn.appendChild(lottieContainer);

                const text = document.createElement('span');
                text.className = 'button-text';
                text.textContent = item.name;
                btn.appendChild(text);

                btn.onclick = () => {
                    if (item.targetModalId) {
                        openModal(document.getElementById(item.targetModalId));
                    } else if (item.url) {
                        window.open(item.url, '_blank');
                    }
                };

                categoryNavigation.appendChild(btn);
            });
    }

    // --- Reserva (mantida) ---
    function openReservationModal() {
        if (!reservationModal) return;
        reservationModal.style.display = 'flex';
        ['reservation-name', 'reservation-people', 'reservation-date', 'reservation-time', 'reservation-notes']
            .forEach(id => document.getElementById(id).value = '');
        document.getElementById('reservation-date').min = new Date().toISOString().split('T')[0];
    }

    function closeReservationModal() {
        if (reservationModal) reservationModal.style.display = 'none';
    }

    function validateReservationData() {
        const name = document.getElementById('reservation-name').value.trim();
        const people = document.getElementById('reservation-people').value.trim();
        const date = document.getElementById('reservation-date').value;
        const time = document.getElementById('reservation-time').value.trim();

        if (!name || !people || !date || !time) {
            alert('Preencha todos os campos obrigatórios.');
            return false;
        }

        const resDate = new Date(date + 'T' + time);
        const now = new Date();
        if (resDate < now) {
            alert('Não é possível reservar para data/horário passado.');
            return false;
        }
        if (resDate.getDay() === 1) {
            alert('Não fazemos reservas às segundas-feiras.');
            return false;
        }
        return true;
    }

    function generateReservationMessage() {
        if (!validateReservationData()) return null;

        const name = document.getElementById('reservation-name').value.trim();
        const people = document.getElementById('reservation-people').value.trim();
        const date = document.getElementById('reservation-date').value;
        const time = document.getElementById('reservation-time').value.trim();
        const notes = document.getElementById('reservation-notes').value.trim();

        const fmtDate = new Date(date).toLocaleDateString('pt-BR');

        return encodeURIComponent(
            `*NOVA RESERVA*\n*Nome:* ${name}\n*Pessoas:* ${people}\n*Data:* ${fmtDate}\n*Horário:* ${time}${notes ? `\n*Observações:* ${notes}` : ''}\n\n*Importante:* Esta reserva será analisada para confirmação.`
        );
    }

    function sendReservationToWhatsApp() {
        const msg = generateReservationMessage();
        if (!msg) return;
        window.open(`https://wa.me/5562992020331?text=${msg}`, '_blank');
        closeReservationModal();
    }

    // --- Event listeners ---
    if (cartIconContainer) {
        cartIconContainer.addEventListener('click', () => {
            if (cartItemsScrollContainer) cartItemsScrollContainer.style.maxHeight = '40vh';
            openModal(cartModal);
            updateCartDisplay();
            handleOrderTypeChange();
        });
    }

    document.querySelectorAll('.close-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    if (checkoutWhatsappModalBtn) {
        checkoutWhatsappModalBtn.addEventListener('click', showOrderSummary);
    }

    if (sendOrderBtn) {
        sendOrderBtn.addEventListener('click', sendFinalOrderToWhatsapp);
    }

    if (themeToggleContainer) {
        themeToggleContainer.addEventListener('click', toggleTheme);
    }

    if (infoToggleContainer && infoModal) {
        infoToggleContainer.addEventListener('click', () => openModal(infoModal));
    }

    if (orderTypeSelect) {
        orderTypeSelect.addEventListener('change', handleOrderTypeChange);
    }

    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            openModal(chatModal);
            if (chatbox && !chatbox.dataset.initialMessageShown) {
                const today = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'][new Date().getDay()];
                const msg = `👋 Olá! Feliz ${today}! Como posso ajudar?\nVocê pode perguntar sobre:\n- 🍢 Espetos\n- 🍛 Jantinhas\n- 🥤 Bebidas\n- 🛵 Entrega\n- ⏰ Horários\n- 📞 Contato`;
                chatbox.innerHTML = `<div class="message bot-message">${msg.replace(/\n/g, '<br>')}</div>`;
                chatbox.dataset.initialMessageShown = 'true';
            }
        });
    }

    if (closeChatModalBtn) {
        closeChatModalBtn.addEventListener('click', () => {
            closeModal(chatModal);
            if (chatbox) {
                chatbox.innerHTML = '';
                delete chatbox.dataset.initialMessageShown;
            }
        });
    }

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', () => {
            const msg = chatInput.value.trim();
            if (!msg) return;
            chatbox.innerHTML += `<div class="message user-message">${msg}</div>`;
            chatInput.value = '';
            setTimeout(() => {
                chatbox.innerHTML += `<div class="message bot-message">Desculpe, não entendi. Pergunte sobre menu, entrega, horários, etc.</div>`;
                chatbox.scrollTop = chatbox.scrollHeight;
            }, 500);
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') sendChatBtn.click();
        });
    }

    if (reservationIcon) reservationIcon.addEventListener('click', openReservationModal);
    if (sendReservationWhatsappBtn) sendReservationWhatsappBtn.addEventListener('click', sendReservationToWhatsApp);
    reservationModal?.addEventListener('click', e => {
        if (e.target === reservationModal) closeReservationModal();
    });

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            const pos = window.scrollY || document.documentElement.scrollTop;
            if (pos > 200) {
                scrollToTopBtn.style.display = 'flex';
                scrollToTopBtn.style.opacity = '1';
            } else {
                scrollToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (scrollToTopBtn.style.opacity === '0') {
                        scrollToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Inicialização ---
    initializeTheme();
    updateMainScreenOperatingStatus();
    renderMenu();
    updateCartDisplay();
    handleOrderTypeChange();
});