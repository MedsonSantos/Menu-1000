// Base de Conhecimento do Chatbot
    const chatbotKnowledgeBase = {
    "ola": "", 
    "oi": "",
    "menu": "😋 Nosso menu completo está disponível na página principal, logo abaixo do cabeçalho. Temos categorias como 'Hambúrgueres' 🍔, 'Jantinhas' 🍛, 'Bebidas' 🥤 e muito mais! Prontinho para te dar água na boca! 🤤",
    "cardapio": "😋 Nosso menu completo está disponível na página principal, logo abaixo do cabeçalho. Temos categorias como 'Hambúrgueres' 🍔, 'Jantinhas' 🍛, 'Bebidas' 🥤 e muito mais! Prontinho para te dar água na boca! 🤤",
    "cardápio": "😋 Nosso menu completo está disponível na página principal, logo abaixo do cabeçalho. Temos categorias como 'Hambúrgueres' 🍔, 'Jantinhas' 🍛, 'Bebidas' 🥤 e muito mais! Prontinho para te dar água na boca! 🤤",
    "entrega": "🚀 Fazemos entregas em toda a região! 💵 A taxa de entrega varia conforme a quilometragem sendo a mínima de R$ 4,00 e a distância de 8km. Você pode verificar o valor e exato no carrinho 🛒 ao finalizar seu pedido. Chegaremos rapidinho! 💨",
    "delivery": "🚀 Fazemos entregas em toda a região! 💵 A taxa de entrega varia conforme a quilometragem sendo a mínima de R$ 4,00 e a distância de 8km. Você pode verificar o valor exato no carrinho 🛒 ao finalizar seu pedido. Chegaremos rapidinho! 💨",
    "horário": "⏰ Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 23:30h. Te esperamos! 😉",
    "horario": "⏰ Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 23:30h. Te esperamos! 😉",
    "horários": "⏰ Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 23:30h. Te esperamos! 😉",
    "segunda": "❌ Estamos fechados às segundas-feiras. Mas não se preocupe, voltamos com tudo na Terça! 😉",
    "funcionamento": "⏰ Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 23:30h. Te esperamos! 😉",
    "contato": "📱 Você pode nos contatar pelo WhatsApp clicando no botão verde de WhatsApp no carrinho 🛒, ou em nossas redes sociais. Estamos à disposição! 💬",
    "whatsapp": "📲 Para fazer seu pedido ou tirar dúvidas, clique no botão de WhatsApp (o ícone verde do chat) no canto inferior direito da tela. Ele está disponível quando você visualiza o carrinho. Nos chame lá! 👋",
    "jantinha kids": "👧👦 A Jantinha Kids é perfeita para as crianças! Lembre-se que ela está disponível apenas para consumo no local ou retirada, e não para entrega. Uma delícia para os pequenos! 🌟",
    "jantinhas kids": "👧👦 A Jantinha Kids é perfeita para as crianças! Lembre-se que ela está disponível apenas para consumo no local ou retirada, e não para entrega. Uma delícia para os pequenos! 🌟",
    "jantinhas": "🍽️Temos várias opções de jantinhas: Jantinha Kids👶, Jantinha completa🍲, Jantinha Nota 1000 🥘 e Jantinha de Estrogonofe. Se quiser saber mais sobre cada uma só me dizer escrevendo o tipo exemplo (Jantinha de Estrogonofe)",
    "cancelar": "🚫 Seu pedido ainda não foi enviado. Você pode ajustar os itens no carrinho 🛒 antes de finalizar. Para cancelar um pedido já enviado, por favor, entre em contato via WhatsApp. Fale com a gente! 💬",
    "obrigado": "🎉 De nada! Fico feliz em ajudar. Se precisar de mais alguma coisa, é só perguntar! Estamos aqui para você! 😊",
    "fechar": "👋 Certo, estarei aqui se precisar de mais alguma coisa. Obrigado e até a próxima! ✨",
    "pagamento": "💰 Aceitamos Pix, cartão de crédito/débito e dinheiro. Facilitamos para você! 👍",
    "cartão": "💰 Aceitamos Pix, cartão de crédito/débito e dinheiro. Facilitamos para você! 👍",
    "dinheiro": "💰 Aceitamos Pix, cartão de crédito/débito e dinheiro. Facilitamos para você! 👍",
    "boa noite": "🌃 Boa noite! Como posso ajudar você hoje? Pergunte sobre nosso menu 📓, entrega 🛵, horários ⏰, ou qualquer dúvida sobre nossos produtos. ✨",
    "queijo": "🧀 temos o queojo Coalho e o Provolone um melhor que o outro",
    "queijos": "🧀 temos o queojo Coalho e o Provolone um melhor que o outro",  
    "tem jantinha": "🍛 Temos diversas opções de Jantinhas deliciosas para você! Confira:\n\n" +
                   "- **Jantinha Kids:** Uma pequena porção de arroz e estrogonofe de frango (somente consumo no local). [cite_start]Por R$ 17,00. [cite: 15]\n" +
                   "- **Jantinha S/ Espeto:** Arroz, feijão tropeiro ou de caldo, vinagrete e mandioca (sem espeto). [cite_start]Por R$ 19,00. [cite: 15]\n" +
                   "- **Jantinha Completa:** Arroz, feijão tropeiro ou de caldo, vinagrete, mandioca e 1 espeto. [cite_start]Por R$ 22,00. [cite: 15]\n" +
                   "- **Jantinha Estrogonofe:** Arroz, estrogonofe de frango, batata palha (vinagrete opcional, sem espeto). [cite_start]Por R$ 22,00. [cite: 15]\n" +
                   "- **Jantinha Nota 1000:** Arroz, feijão tropeiro ou de caldo, vinagrete, mandioca, estrogonofe, batata palha e 1 espeto. [cite_start]Por R$ 27,00. [cite: 15]\n\n" +
                   "Qual delas você gostaria de pedir? 😉",
     "tipos de jantinha": "🍛 Temos diversas opções de Jantinhas deliciosas para você! Confira:\n\n" +
                   "- **Jantinha Kids:** Uma pequena porção de arroz e estrogonofe de frango (somente consumo no local). [cite_start]Por R$ 17,00. [cite: 15]\n" +
                   "- **Jantinha S/ Espeto:** Arroz, feijão tropeiro ou de caldo, vinagrete e mandioca (sem espeto). [cite_start]Por R$ 19,00. [cite: 15]\n" +
                   "- **Jantinha Completa:** Arroz, feijão tropeiro ou de caldo, vinagrete, mandioca e 1 espeto. [cite_start]Por R$ 22,00. [cite: 15]\n" +
                   "- **Jantinha Estrogonofe:** Arroz, estrogonofe de frango, batata palha (vinagrete opcional, sem espeto). [cite_start]Por R$ 22,00. [cite: 15]\n" +
                   "- **Jantinha Nota 1000:** Arroz, feijão tropeiro ou de caldo, vinagrete, mandioca, estrogonofe, batata palha e 1 espeto. [cite_start]Por R$ 27,00. [cite: 15]\n\n" +
                   "Qual delas você gostaria de pedir? 😉",
     "jantinha": "🍛 Temos diversas opções de Jantinhas deliciosas para você! Confira:\n\n" +
                   "- **Jantinha Kids:** Uma pequena porção de arroz e estrogonofe de frango (somente consumo no local). [cite_start]Por R$ 17,00. [cite: 15]\n" +
                   "- **Jantinha S/ Espeto:** Arroz, feijão tropeiro ou de caldo, vinagrete e mandioca (sem espeto). [cite_start]Por R$ 19,00. [cite: 15]\n" +
                   "- **Jantinha Completa:** Arroz, feijão tropeiro ou de caldo, vinagrete, mandioca e 1 espeto. [cite_start]Por R$ 22,00. [cite: 15]\n" +
                   "- **Jantinha Estrogonofe:** Arroz, estrogonofe de frango, batata palha (vinagrete opcional, sem espeto). [cite_start]Por R$ 22,00. [cite: 15]\n" +
                   "- **Jantinha Nota 1000:** Arroz, feijão tropeiro ou de caldo, vinagrete, mandioca, estrogonofe, batata palha e 1 espeto. [cite_start]Por R$ 27,00. [cite: 15]\n\n" +
                   "Qual delas você gostaria de pedir? 😉",
   "tipos de espeto": "🍢 Temos uma variedade de espetos deliciosos, além de porções e pastéis! Veja algumas opções:\n\n" +
                  "- Asinha\n" +
                  "- Coxinha da Asa\n" +
                  "- Coração\n" +
                  "- Contra Filé\n" +
                  "- Cupim Grill\n" +
                  "- Picanha Montada\n" +
                  "- Cafta Bovina com Queijo\n" +
                  "- Frango com Bacon\n" +
                  "- Frango Sem Bacon\n" +
                  "- Linguiça Caipira\n" +
                  "- Linguiça C. Apimentada\n" +
                  "- Queijo Coalho\n" +
                  "- Queijo Provolone\n" +
                  "- Romeu e Julieta (Queijo, Goiabada com Bacon)\n\n" +
                  "Para mais opções, como porções e outros, confira nosso cardápio completo! 😊",

    "espeto": "🍢 Temos uma variedade de espetos deliciosos, além de porções e pastéis! Veja algumas opções:\n\n" +
                  "- Asinha\n" +
                  "- Coxinha da Asa\n" +
                  "- Coração\n" +
                  "- Contra Filé\n" +
                  "- Cupim Grill\n" +
                  "- Picanha Montada\n" +
                  "- Cafta Bovina com Queijo\n" +
                  "- Frango com Bacon\n" +
                  "- Frango Sem Bacon\n" +
                  "- Linguiça Caipira\n" +
                  "- Linguiça C. Apimentada\n" +
                  "- Queijo Coalho\n" +
                  "- Queijo Provolone\n" +
                  "- Romeu e Julieta (Queijo, Goiabada com Bacon)\n\n" +
                  "Para mais opções, como porções e outros, confira nosso cardápio completo! 😊",
     "espetos": "🍢 Temos uma variedade de espetos deliciosos, além de porções e pastéis! Veja algumas opções:\n\n" +
                  "- Asinha\n" +
                  "- Coxinha da Asa\n" +
                  "- Coração\n" +
                  "- Contra Filé\n" +
                  "- Cupim Grill\n" +
                  "- Picanha Montada\n" +
                  "- Cafta Bovina com Queijo\n" +
                  "- Frango com Bacon\n" +
                  "- Frango Sem Bacon\n" +
                  "- Linguiça Caipira\n" +
                  "- Linguiça C. Apimentada\n" +
                  "- Queijo Coalho\n" +
                  "- Queijo Provolone\n" +
                  "- Romeu e Julieta (Queijo, Goiabada com Bacon)\n\n" +
                  "Para mais opções, como porções e outros, confira nosso cardápio completo! 😊",
          
                  
    // --- Produtos e Preços do Cardápio ---
    // ESPETOS  
    "asinha": "🍗 O espeto de Asinha (Tulipa) custa R$ 11,00. Uma delícia!",
    "tulipa": "🍗 O espeto de Asinha (Tulipa) custa R$ 11,00. Uma delícia!",
    "coxinha da asa": "🍗 O espeto de Coxinha da Asa custa R$ 11,00. Experimente!",
    "coracao": "❤️ O espeto de Coração custa R$ 11,00. Crocante e saboroso!",
    "contra file": "🥩 O espeto de Contra Filé custa R$ 11,00. Macio e suculento!",
    "cupim": "🥩 O espeto de Cupim Grill custa R$ 11,00. Perfeito para você!",
    "picanha montada": "🥩 O espeto de Picanha Montada custa R$ 11,00. Sabor inigualável!",
    "cafta bovina": "🍖 A Cafta Bovina com Queijo custa R$ 12,00. Imperdível!",
    "frango com bacon": "🥓 O espeto de Frango com Bacon custa R$ 11,00. Uma combinação perfeita!",
    "frango sem bacon": "🍗 O espeto de Frango Sem Bacon custa R$ 11,00. Leve e delicioso!",
    "linguica caipira": "🍢 A Linguiça Caipira custa R$ 11,00. Um toque do interior!",
    "linguica apimentada": "🌶️ A Linguiça C. Apimentada custa R$ 11,00. Para quem gosta de um toque a mais!",
    "queijo coalho": "🧀 O espeto de Queijo Coalho custa R$ 12,00. Derrete na boca!",
    "coalho": "🧀 O espeto de Queijo Coalho custa R$ 12,00. Derrete na boca!",
    "queijo provolone": "🧀 O espeto de Queijo Provolone custa R$ 12,00. Uma opção deliciosa!",
    "provolone": "🧀 O espeto de Queijo Provolone custa R$ 12,00. Uma opção deliciosa!",
    "romeu e julieta": "🍓 O Romeu e Julieta (Queijo, Goiabada com Bacon) custa R$ 13,00. Uma sobremesa incrível no espeto!",
    "romeu:": "🍓 O Romeu e Julieta (Queijo, Goiabada com Bacon) custa R$ 13,00. Uma sobremesa incrível no espeto!",
    "julieta": "🍓 O Romeu e Julieta (Queijo, Goiabada com Bacon) custa R$ 13,00. Uma sobremesa incrível no espeto!",

    // JANTINHAS
    "jantinha": "🍽️Temos várias opções de jantinhas: Jantinha Kids👶, Jantinha completa🍲, Jantinha Nota 1000 🥘 e Jantinha de Estrogonofe. Se quiser saber mais sobre cada uma só me dizer escrevendo o tipo exemplo (Jantinha de Estrogonofe)",
    "pratos": "🍽️Temos várias opções de jantinhas: Jantinha Kids👶, Jantinha completa🍲, Jantinha Nota 1000 🥘 e Jantinha de Estrogonofe. Se quiser saber mais sobre cada uma só me dizer escrevendo o tipo exemplo (Jantinha de Estrogonofe)",
    "jantinha sem espeto": "🍚 A Jantinha Sem Espeto (Arroz, Feijão Tropeiro ou de Caldo, Vinagrete e Mandioca) custa R$ 19,00.",
    "jantinha completa": "🍛 A Jantinha Completa (Arroz, Feijão Tropeiro ou de Caldo, Vinagrete e Mandioca com 1 Espeto) custa R$ 22,00.",
    "jantinha estrogonofe": "🍲 A Jantinha Estrogonofe (Arroz, Estrogonofe de Frango, Batata Palha, Vinagrete Opcional, Sem Espeto) custa R$ 22,00.",
    "jantinha nota 1000": "🌟 A Jantinha Nota 1000 (Arroz, Feijão Tropeiro ou de Caldo, Vinagrete, Mandioca, Estrogonofe, Batata Palha e 1 Espeto) custa R$ 27,00. É a nossa especialidade!",

    // CALDOS 500ML
    "caldo de costela": "🥣 O Caldo de Costela 500ml custa R$ 18,00. Aquece o coração!",
    "caldo de frango": "🥣 O Caldo de Frango 500ml custa R$ 18,00. Leve e saboroso!",
    "caldo de feijao": "🥣 O Caldo de Feijão 500ml custa R$ 18,00. Um clássico!",
    
    // GUARNIÇÕES
    "arroz": "🍚 Uma porção de Arroz custa R$ 8,00.",
    "feijao tropeiro pequeno": "🍛 O Feijão Tropeiro Pequeno custa R$ 10,00.",
    "feijao tropeiro grande": "🍛 O Feijão Tropeiro Grande custa R$ 15,00.",
    "mandioca": "🌿 Uma porção de Mandioca custa R$ 7,00.",
    "vinagrete": "🥗 Uma porção de Vinagrete custa R$ 7,00.",

    // CERVEJAS
    "antartica lata": "🍺 A Cerveja Antártica Lata custa R$ 6,00.",
    "amstel lata": "🍺 A Cerveja Amstel Lata custa R$ 6,00.",
    "petra lata": "🍺 A Cerveja Petra Lata custa R$ 6,00.",
    "brahma dm lata": "🍺 A Cerveja Brahma DM Lata custa R$ 6,00.",
    "imperio lata": "🍺 A Cerveja Império Lata custa R$ 6,00.",
    "budweiser long neck": "🍺 A Budweiser Long Neck custa R$ 9,50. Geladinha!",
    "heineken long neck": "🍺 A Heineken Long Neck custa R$ 10,00. Um clássico!",
    "heineken 600ml": "🍺 A Heineken 600ml custa R$ 14,00. Perfeita para dividir!",
    "antartica 600ml": "🍺 A Antártica 600ml custa R$ 11,00.",
    "amstel 600ml": "🍺 A Amstel 600ml custa R$ 11,00.",

    // REFRIGERANTES
    "coca cola lata": "🥤 A Coca Cola Lata custa R$ 6,00.",
    "coca cola zero lata": "🥤 A Coca Cola Lata Zero custa R$ 6,50.",
    "fanta lata": "🍊 A Fanta Lata custa R$ 6,00.",
    "guarana antarctica lata": "🥤 O Guaraná Antártica Lata custa R$ 6,00.",
    "sprite lata": "🍋 A Sprite Lata custa R$ 6,00.",
    "soda lata": "🍋 A Soda Lata custa R$ 6,00.",
    "coca cola 600ml": "🥤 A Coca Cola 600ml custa R$ 7,50.",
    "fanta 600ml": "🍊 A Fanta 600ml custa R$ 7,50.",
    "guarana antarctica 600ml": "🥤 O Guaraná Antártica 600ml custa R$ 7,50.",
    "coca cola 1l": "🥤 A Coca Cola 1L custa R$ 11,00.",
    "fanta 1l": "🍊 A Fanta 1L custa R$ 11,00.",
    "guarana antarctica 1l": "🥤 O Guaraná Antártica 1L custa R$ 11,00.",
    "coca cola 2l": "🥤 A Coca Cola 2L custa R$ 14,00. Ideal para a família!",
    "coca cola zero 2l": "🥤 A Coca Cola 2L Zero custa R$ 14,50.",
    "fanta 2l": "🍊 A Fanta 2L custa R$ 12,00.",
    "guarana antarctica 2l": "🥤 O Guaraná Antártica 2L custa R$ 13,00.",
    "mineiro 2l": "🥤 O Mineiro 2L custa R$ 11,00.",
    "coca cola": "🥤Temos a coca lata, 600ml, 1 litro e 2 litros além de opções de coca zero",

    // SUCOS E DIVERSOS
    "lafruits sabores": "🍎🍇 O Suco Láfruit 1L Sabores custa R$ 11,00.",
    "suco 200ml": "🍓🍊 O Suco 200ml Sabores custa R$ 4,00.",
    "suco de laranja 500ml": "🍊 O Suco de Laranja 500ml custa R$ 12,00. Fresquinho!",
    "suco de laranja 1l": "🍊 O Suco de Laranja 1L custa R$ 22,00. Perfeito para compartilhar!",
    "suco polpa sabores": "🍍🥭 O Suco Polpa Sabores 1L custa R$ 20,00.",
    "suco":"",

    // PORÇÕES
    "frango a passarinho": "🍗 A porção de Frango a Passarinho 1KG (Serve 2 pessoas) custa R$ 34,99.",
    "passarinho": "🍗 A porção de Frango a Passarinho 1KG (Serve 2 pessoas) custa R$ 34,99.",
    "file tilapia": "🐟 A porção de Filé de Tilápia 500G (Serve 2 pessoas) custa R$ 49,99.",
    "batata simples": "🍟 A porção de Batata Simples 500G custa R$ 26,99.",
    "batata mil": "🧀🥓 A Batata 1000 500G (com Queijo Cheddar e Bacon) custa R$ 33,99. Uma explosão de sabor!",
    "medalhao mil": "🥓🧀 O Medalhão 1000 (Frango com Bacon Recheado com Queijo Provolone) custa R$ 20,00. Irresistível!",
    "costelinha mil": "🍖🌿 A Costelinha 1000 (Costela Suína, acompanha Porção de Mandioca) custa R$ 22,00. Que delícia!",
    "batata 1000": "🧀🥓 A Batata 1000 500G (com Queijo Cheddar e Bacon) custa R$ 33,99. Uma explosão de sabor!",
    "medalhao 1000": "🥓🧀 O Medalhão 1000 (Frango com Bacon Recheado com Queijo Provolone) custa R$ 20,00. Irresistível!",
    "costelinha 1000": "🍖🌿 A Costelinha 1000 (Costela Suína, acompanha Porção de Mandioca) custa R$ 22,00. Que delícia!",

    // PASTÉIS
    "pastel presunto e queijo": "🥟 O Pastel de Presunto e Queijo custa R$ 12,99.",
    "pastel carne e queijo": "🥟 O Pastel de Carne e Queijo custa R$ 12,99.",
    "pastel frango e queijo": "🥟 O Pastel de Frango e Queijo custa R$ 12,99.",
    "pastel": "🥟 temos 3 opções de pastéis descreva qual quer saber: pastel frango e queijo, pastel carne e queijo e presunto e queijo ",

    // DOCES E SOBREMESAS
    "bombom trufado": "🍫 Os Bombons Trufados custam R$ 4,00. Para adoçar sua noite! 🍬",

    // DRINKS
    "caipirinha": "🍹 A Caipirinha custa R$ 8,99. Refrescante!",
    "preparo cozumel": "🍻 O Preparo Cozumel custa R$ 3,99. Perfeito para sua cerveja!,  só consumo no local sem disponibilidade pra entrega,",

    // BEBIDAS DIVERSAS
    "agua": "💧 A Água Sem Gás 500ml custa R$ 3,00. 🫧 A Água Com Gás 500ml custa R$ 4,00.",
    "agua sem gas": "💧 A Água Sem Gás 500ml custa R$ 3,00.",
    "agua com gas": "🫧 A Água Com Gás 500ml custa R$ 4,00.",
    "h2o limoneto": "🍋 A H2O Limoneto 500ml custa R$ 7,00.",
    "energetico lata": "⚡ O Energético Lata 473ml custa R$ 13,00. Para dar um UP!",

    // ADICIONAIS
    "torresmo": "🐷 O Torresmo (Adicional) custa R$ 3,00.",
    "cheiro verde": "🌿 O Cheiro Verde (Adicional) custa R$ 2,00.",
    "torrada": "🍞 A Torrada (Adicional) custa R$ 2,00.",
    "mel": "🍯 O Mel (Adicional) custa R$ 3,00."
};  
  // --- Lógica Principal do Chatbot ---

    // Função principal para obter a resposta do bot
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase().trim(); // Normaliza a mensagem do usuário

        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

        // 1. Verificar se é Segunda-feira (Dia de Fechamento)
        if (dayOfWeek === 1) { // Se for segunda-feira
            return "😔 Olá! Infelizmente, estamos fechados às segundas-feiras. Nosso horário de funcionamento é de Terça a Domingo, das 18:00h às 23:30h. Te esperamos a partir de amanhã! 😉";
        }

        // 2. Se não for Segunda-feira, verificar as palavras-chave na base de conhecimento
        for (const keyword in chatbotKnowledgeBase) {
            if (userMessage.includes(keyword)) {
                return chatbotKnowledgeBase[keyword];
            }
        }

        // 3. Se nenhuma palavra-chave for encontrada e não for segunda, retornar mensagem genérica
        return "Desculpe, não entendi sua pergunta. Poderia reformular ou perguntar sobre o menu, entrega, horários, etc.?";
    }

    // --- Event Listeners ---

    // Adicionar o evento de clique para abrir o modal do chat
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            chatModal.style.display = 'block';
            // Adiciona a mensagem inicial do bot ao abrir o chat
            // Garante que a mensagem só seja adicionada uma vez por sessão de chat
            if (!chatbox.dataset.initialMessageShown) {
                // Preenche as mensagens "ola" e "oi" na base de conhecimento
                // Apenas quando a função getWeekdayName está disponível
                const currentDayName = getWeekdayName(new Date().getDay());
                chatbotKnowledgeBase["ola"] = `👋 Olá! Feliz ${currentDayName}! Como posso ajudar você hoje? 😊\n\nVocê pode perguntar sobre:\n- 🍔 Nossos **Espetos**\n- 🍛 As **Jantinhas**\n- 🥤 **Bebidas** (Cervejas, Refrigerantes, Sucos)\n- 🍟 **Porções** e **Pastéis**\n- 🍰 **Doces** e **Drinks**\n- ⏰ Nossos **Horários** de funcionamento\n- 🛵 **Entrega**\n- 📞 **Contato**\n\nOu qualquer outra dúvida sobre o cardápio! 😉`;
                chatbotKnowledgeBase["oi"] = chatbotKnowledgeBase["ola"]; // "oi" usa a mesma mensagem que "ola"

                const initialBotMessage = chatbotKnowledgeBase["ola"]; // Usa a resposta "ola" como mensagem inicial
                addMessage(initialBotMessage, 'bot');
                chatbox.dataset.initialMessageShown = 'true'; // Marca que a mensagem já foi mostrada
            }
        });
    }

    // Adicionar o evento de clique para fechar o modal do chat
    if (closeChatModalBtn) {
        closeChatModalBtn.addEventListener('click', () => {
            chatModal.style.display = 'none';
            // Limpa o chatbox ao fechar para que a conversa comece do zero na próxima abertura
            chatbox.innerHTML = '';
            delete chatbox.dataset.initialMessageShown; // Permite que a mensagem inicial apareça novamente
        });
    }

    // Adicionar evento para enviar mensagem ao clicar no botão
    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', () => {
            const userMessage = chatInput.value;
            if (userMessage.trim() === '') return; // Não envia mensagens vazias

            addMessage(userMessage, 'user');
            chatInput.value = ''; // Limpa o input

            // Simula um atraso para a resposta do bot para parecer mais natural
            setTimeout(() => {
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse, 'bot');
            }, 500); // 0.5 segundo de atraso
        });
    }

    // Adicionar evento para enviar mensagem ao pressionar Enter no input
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatBtn.click(); // Dispara o clique do botão de enviar
            }
        });
    }
