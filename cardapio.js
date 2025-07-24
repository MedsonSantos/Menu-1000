// cardapio.js

// Dados dos produtos
//--------------------------------------PRATOS-------------------------------------//
const products = [
    {
        id: 'pp-1',
        category: 'PRATOS',
        name: 'Jantinha Completa',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, vinagrete e 1 espeto a escolha',
        price: 22.00,
        imageUrl: 'https://i.imgur.com/7dMcMKA.png'
    },
    {
        id: 'pp-2',
        category: 'PRATOS',
        name: 'Jantinha Nota 1000',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, estrogonofe de frango, batata palha, vinagrete e 1 espeto a escolha',
        price: 25.00,
        imageUrl: 'https://i.imgur.com/a/6LCXLYF.png'
    },
    {
        id: 'pp-3',
        category: 'PRATOS',
        name: 'Jantinha sem Espeto',
        description: 'Arroz branco, feijão tropeiro ou de caldo, mandioca, vinagrete sem espeto',
        price: 19.00,
        imageUrl: 'https://i.imgur.com/6hoWcyi.png'
    },
    {
        id: 'pp-4',
        category: 'PRATOS',
        name: 'Jantinha de Estrogonofe',
        description: 'Estrogonofe de frango, batata palha e Arroz branco',
        price: 22.00,
        imageUrl: 'https://i.imgur.com/dPmhBpk.png'
    },
    {
        id: 'pp-5',
        category: 'PRATOS',
        name: 'Jantinha Kids',
        description: '(somente consumo no local) um pouco de arroz, um pouco de estrogonofe e batata palha',
        price: 22.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },

    //--------------------------------------ESPETOS-------------------------------------//
    {
        id: 'esp-1',
        category: 'ESPETOS',
        name: 'Frango com Bacon',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/LFRKjj0.png'
    },
    {
        id: 'esp-2',
        category: 'ESPETOS',
        name: 'Frango sem Bacon',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/pt0WHsW.png'
    },
    {
        id: 'esp-3',
        category: 'ESPETOS',
        name: 'Contra Filé',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/YFvNxNd.png'
    },
    {
        id: 'esp-4',
        category: 'ESPETOS',
        name: 'Picanha Montada',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-5',
        category: 'ESPETOS',
        name: 'Asinha',
        description: 'Tulipa',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-6',
        category: 'ESPETOS',
        name: 'Cupim',
        description: 'Grill',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-7',
        category: 'ESPETOS',
        name: 'Coração',
        description: '',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/RaVZjrn.png'
    },
    {
        id: 'esp-8',
        category: 'ESPETOS',
        name: 'Coxinha da Asa',
        description: 'Drumette',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/Cb17Q5F.png'
    },
    {
        id: 'esp-9',
        category: 'ESPETOS',
        name: 'Linguiça Caipira',
        description: 'Linguiça Suína da fazenda sem pimenta',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-10',
        category: 'ESPETOS',
        name: 'Linguiça Caipira Apimentada',
        description: 'Linguiça Suína com um toque de pimenta',
        price: 11.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-11',
        category: 'ESPETOS',
        name: 'Cafta',
        description: 'Carne bovina recheada com queijo',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/j8KuBRF.png'
    },
    {
        id: 'esp-12',
        category: 'ESPETOS',
        name: 'Cafta 1000',
        description: 'Carne bovina envolta em bacon, recheada com queijo',
        price: 14.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-13',
        category: 'ESPETOS',
        name: 'Provolone',
        description: 'Queijo provolone bola defumado no espeto',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    {
        id: 'esp-14',
        category: 'ESPETOS',
        name: 'Coalho',
        description: 'Queijo Coalho no espeto',
        price: 12.00,
        imageUrl: 'https://i.imgur.com/ExemploFrango.jpg'
    },
    
    //--------------------------------------CALDOS-------------------------------------//
    {
        id: 'cald-1',
        category: 'CALDOS',
        name: 'Caldo de Feijão',
        description: '500ml',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoFeijao.jpg'
    },
    {
        id: 'cald-2',
        category: 'CALDOS',
        name: 'Caldo de Frango',
        description: '500ml',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoVerde.jpg'
    },
    {
        id: 'cald-3',
        category: 'CALDOS',
        name: 'Caldo de Costela',
        description: '500ml, com pedaços de costela e mandioca',
        price: 18.00,
        imageUrl: 'https://i.imgur.com/ExemploCaldoVerde.jpg'
    },

    //--------------------------------------GUARNIÇÕES-------------------------------------//

    {
        id: 'guar-1',
        category: 'GUARNIÇÕES',
        name: 'Arroz Branco',
        description: 'Arroz soltinho e fresquinho.',
        price: 8.00,
        imageUrl: 'https://i.imgur.com/ExemploArroz.jpg'
    },
    {
        id: 'guar-2',
        category: 'GUARNIÇÕES',
        name: 'Mandioca',
        description: 'Mandioca cozida no ponto certo, macia por dentro.',
        price: 7.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'guar-3',
        category: 'GUARNIÇÕES',
        name: 'Vinagrete',
        description: 'Tomates selecionados fresquinho.',
        price: 7.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'guar-4',
        category: 'GUARNIÇÕES',
        name: 'Feijão Tropeiro (P)',
        description: 'Porção de feijão tropeiro pequena, mas grande no sabor!',
        price: 10.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'guar-5',
        category: 'GUARNIÇÕES',
        name: 'Feijão Tropeiro (G)',
        description: 'Porção de feijão tropeiro grande, para quem quer dividir!',
        price: 15.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },

    //--------------------------------------LANCHES-------------------------------------//

    {
        id: 'lan-1',
        category: 'LANCHES',
        name: 'Pastel Frango com Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'lan-2',
        category: 'LANCHES',
        name: 'Pastel Presunto e Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'lan-3',
        category: 'LANCHES',
        name: 'Pastel Carne com Queijo',
        description: '',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/ExemploMandioca.jpg'
    },
    {
        id: 'lan-4',
        category: 'LANCHES',
        name: 'Creme de Cupuaçu',
        description: 'Copo de 500ml',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/kFgB7bd.png'
    },
    {
        id: 'lan-5',
        category: 'LANCHES',
        name: 'Creme de Maracujá',
        description: 'Copo de 500ml',
        price: 13.00,
        imageUrl: 'https://i.imgur.com/wrEZygt.png'
    },
    {
        id: 'lan-6',
        category: 'LANCHES',
        name: 'Creme de Morango',
        description: 'Copo de 500ml',
        price: 13.00,
        imageUrl: ''
    },
    {
        id: 'lan-7',
        category: 'LANCHES',
        name: 'Creme de Tamarindo',
        description: 'Copo de 500ml',
        price: 13.00,
        imageUrl: ''
    },

    //--------------------------------------CERVEJAS-------------------------------------//
    {
        id: 'cev-1',
        category: 'CERVEJAS',
        name: 'Amstel Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploSkol.jpg'
    },
    {
        id: 'cev-2',
        category: 'CERVEJAS',
        name: 'Brahma Duplo Malte Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },
    {
        id: 'cev-3',
        category: 'CERVEJAS',
        name: 'Antartica Lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },
    {
        id: 'cev-4',
        category: 'CERVEJAS',
        name: 'Império lata',
        description: '350ml',
        price: 6.00,
        imageUrl: 'https://i.imgur.com/ExemploBrahma.jpg'
    },

    {
        id: 'cev-6',
        category: 'CERVEJAS',
        name: 'Budweiser Long Neck',
        description: 'Long Neck 330ml',
        price: 9.50,
        imageUrl: 'URL_DA_IMAGEM_BUDWEISER_LN' // Substitua pela URL real
    },
    {
        id: 'cev-7',
        category: 'CERVEJAS',
        name: 'Heineken Long Neck',
        description: 'Long Neck 330ml',
        price: 10.00,
        imageUrl: 'URL_DA_IMAGEM_HEINEKEN_LN' // Substitua pela URL real
    },
    {
        id: 'cev-8',
        category: 'CERVEJAS',
        name: 'Heineken 600ml',
        description: 'Garrafa 600ml',
        price: 14.00,
        imageUrl: 'URL_DA_IMAGEM_HEINEKEN_600' // Substitua pela URL real
    },
    {
        id: 'cev-9',
        category: 'CERVEJAS',
        name: 'Antartica 600ml',
        description: 'Garrafa 600ml',
        price: 11.00,
        imageUrl: 'URL_DA_IMAGEM_ANTARTICA_600' // Substitua pela URL real
    },
    {
        id: 'cev-10',
        category: 'CERVEJAS',
        name: 'Amstel 600ml',
        description: 'Garrafa 600ml',
        price: 11.00,
        imageUrl: 'URL_DA_IMAGEM_AMSTEL_600' // Substitua pela URL real
    },

    // -------------------------------------------REFRIGERANTES ------------------------------------------//
    {
        id: 'ref-1',
        category: 'BEBIDAS',
        name: 'Coca Cola Lata',
        description: 'Lata 350ml',
        price: 6.00,
        imageUrl: 'URL_DA_IMAGEM_COCA_LATA' // Substitua pela URL real
    },
    {
        id: 'ref-2',
        category: 'BEBIDAS',
        name: 'Coca Cola Lata Zero',
        description: 'Lata 350ml',
        price: 6.50,
        imageUrl: 'URL_DA_IMAGEM_COCA_ZERO_LATA' // Substitua pela URL real
    },
    {
        id: 'ref-3',
        category: 'BEBIDAS',
        name: 'Fanta Lata',
        description: 'Lata 350ml',
        price: 6.00,
        imageUrl: 'URL_DA_IMAGEM_FANTA_LATA' // Substitua pela URL real
    },
    {
        id: 'ref-4',
        category: 'BEBIDAS',
        name: 'Guaraná Antártica Lata',
        description: 'Lata 350ml',
        price: 6.00,
        imageUrl: 'URL_DA_IMAGEM_GUARANA_LATA' // Substitua pela URL real
    },
    {
        id: 'ref-5',
        category: 'BEBIDAS',
        name: 'Sprite ou Soda Lata',
        description: 'Lata 350ml',
        price: 6.00,
        imageUrl: 'URL_DA_IMAGEM_SPRITE_SODA_LATA' // Substitua pela URL real
    },
    {
        id: 'ref-6',
        category: 'BEBIDAS',
        name: 'Coca Cola 600ml',
        description: 'Garrafa 600ml',
        price: 7.50,
        imageUrl: 'URL_DA_IMAGEM_COCA_600' // Substitua pela URL real
    },
    {
        id: 'ref-7',
        category: 'BEBIDAS',
        name: 'Fanta 600ml',
        description: 'Garrafa 600ml',
        price: 7.50,
        imageUrl: 'URL_DA_IMAGEM_FANTA_600' // Substitua pela URL real
    },
    {
        id: 'ref-8',
        category: 'BEBIDAS',
        name: 'Guaraná Antártica 600ml',
        description: 'Garrafa 600ml',
        price: 7.50,
        imageUrl: 'URL_DA_IMAGEM_GUARANA_600' // Substitua pela URL real
    },
    {
        id: 'ref-9',
        category: 'BEBIDAS',
        name: 'Coca Cola 1L',
        description: 'Garrafa 1 Litro',
        price: 11.00,
        imageUrl: 'URL_DA_IMAGEM_COCA_1L' // Substitua pela URL real
    },
    {
        id: 'ref-10',
        category: 'BEBIDAS',
        name: 'Fanta 1L',
        description: 'Garrafa 1 Litro',
        price: 11.00,
        imageUrl: 'URL_DA_IMAGEM_FANTA_1L' // Substitua pela URL real
    },
    {
        id: 'ref-11',
        category: 'BEBIDAS',
        name: 'Guaraná Antártica 1L',
        description: 'Garrafa 1 Litro',
        price: 11.00,
        imageUrl: 'URL_DA_IMAGEM_GUARANA_1L' // Substitua pela URL real
    },
    {
        id: 'ref-12',
        category: 'BEBIDAS',
        name: 'Coca Cola 2L',
        description: 'Garrafa 2 Litros',
        price: 14.00,
        imageUrl: 'URL_DA_IMAGEM_COCA_2L' // Substitua pela URL real
    },
    {
        id: 'ref-13',
        category: 'BEBIDAS',
        name: 'Coca Cola 2L Zero',
        description: 'Garrafa 2 Litros',
        price: 14.50,
        imageUrl: 'URL_DA_IMAGEM_COCA_ZERO_2L' // Substitua pela URL real
    },
    {
        id: 'ref-14',
        category: 'BEBIDAS',
        name: 'Fanta 2L',
        description: 'Garrafa 2 Litros',
        price: 12.00,
        imageUrl: 'URL_DA_IMAGEM_FANTA_2L' // Substitua pela URL real
    },
    {
        id: 'ref-15',
        category: 'BEBIDAS',
        name: 'Guaraná Antártica 2L',
        description: 'Garrafa 2 Litros',
        price: 13.00,
        imageUrl: 'URL_DA_IMAGEM_GUARANA_2L' // Substitua pela URL real
    },
    {
        id: 'ref-16',
        category: 'BEBIDAS',
        name: 'Mineiro 2L',
        description: 'Garrafa 2 Litros',
        price: 11.00,
        imageUrl: 'URL_DA_IMAGEM_MINEIRO_2L' // Substitua pela URL real
    },

    // -------------------------------SUCOS E DIVERSOS----------------------------------------------//
    {
        id: 'sud-1',
        category: 'BEBIDAS',
        name: 'Láfruit 1L Sabores',
        description: '1 Litro',
        price: 11.00,
        imageUrl: 'URL_DA_IMAGEM_LAFRUIT_1L' // Substitua pela URL real
    },
    {
        id: 'sud-2',
        category: 'BEBIDAS',
        name: 'Suco 200ml Sabores',
        description: '200ml',
        price: 4.00,
        imageUrl: 'URL_DA_IMAGEM_SUCO_200ML' // Substitua pela URL real
    },
    {
        id: 'sud-3',
        category: 'BEBIDAS',
        name: 'Suco de Laranja 500ml',
        description: '500ml',
        price: 12.00,
        imageUrl: 'URL_DA_IMAGEM_SUCO_LARANJA_500ML' // Substitua pela URL real
    },
    {
        id: 'sud-4',
        category: 'BEBIDAS',
        name: 'Suco de Laranja 1L',
        description: '1 Litro',
        price: 22.00,
        imageUrl: 'URL_DA_IMAGEM_SUCO_LARANJA_1L' // Substitua pela URL real
    },
    {
        id: 'sud-5',
        category: 'BEBIDAS',
        name: 'Suco Polpa Sabores 1L',
        description: '1 Litro',
        price: 20.00,
        imageUrl: 'URL_DA_IMAGEM_SUCO_POLPA_1L' // Substitua pela URL real
    },
    {
        id: 'sud-6',
        category: 'BEBIDAS', // Crie uma nova categoria se houver mais bebidas diversas
        name: 'Água Sem Gás 500ml',
        description: '500ml',
        price: 3.00,
        imageUrl: 'URL_DA_IMAGEM_AGUA_SEM_GAS' // Substitua pela URL real
    },
    {
        id: 'sud-7',
        category: 'BEBIDAS',
        name: 'Água Com Gás 500ml',
        description: '500ml',
        price: 4.00,
        imageUrl: 'URL_DA_IMAGEM_AGUA_COM_GAS' // Substitua pela URL real
    },
    {
        id: 'sud-8',
        category: 'BEBIDAS',
        name: 'H2O Limoneto 500ml',
        description: '500ml',
        price: 7.00,
        imageUrl: 'URL_DA_IMAGEM_H2O_LIMONETO' // Substitua pela URL real
    },
    {
        id: 'sud-9',
        category: 'BEBIDAS',
        name: 'Energético Lata 473ml',
        description: 'Lata 473ml (Monster/Crystal Energy)',
        price: 13.00,
        imageUrl: 'URL_DA_IMAGEM_ENERGETICO' // Substitua pela URL real
    },
    {
        id: 'por-1',
        category: 'PORÇÕES',
        name: 'Filé de Tilápia Empanado 500g',
        description: 'Filé de peixe empanado, porção de 500g',
        price: 49.99,
        imageUrl: 'https://i.imgur.com/VNoKQMD.png',
    },
     {
        id: 'por-2',
        category: 'PORÇÕES',
        name: 'Frango a Passarinho 1Kg',
        description: 'Porção de frango a passarinho 1kg, serve até 2 pessoas',
        price: 34.99,
        imageUrl: 'https://i.imgur.com/4bKC7b3.png',
    },
    {
        id: 'por-3',
        category: 'PORÇÕES',
        name: 'Batata Simples 500g',
        description: 'Porção de batata frita simples, 500g',
        price: 26.99,
        imageUrl: 'https://i.imgur.com/zJpJ2gq.png/zJpJ2gq.png',
    },
     {
        id: 'por-4',
        category: 'PORÇÕES',
        name: 'Batata 1000 500g',
        description: 'Porção de batata frita com cheddar e bacon, 500g',
        price: 33.99,
        imageUrl: 'https://i.imgur.com/8Bqcm96.png',
    },
     {
        id: 'por-5',
        category: 'PORÇÕES',
        name: 'Costelinha 1000',
        description: 'Porção de Costelinha Suína grande, acompanha mandioca',
        price: 22.00,
        imageUrl: 'https://i.imgur.com/GvqqqWD.png',
    },
];
    

// Definição de categorias com suas imagens e URLs Lottie
const categoriesData = [
    {
        name: 'PRATOS',
        imageUrl: 'https://thumbs2.imgbox.com/a5/41/fTXQM9Hn_t.gif',
        lottieJsonUrl: 'iconsJSON/cookingsafe.json',
        type: 'category'
    },
    {
        name: 'ESPETOS',
        imageUrl: 'https://thumbs2.imgbox.com/a5/41/fTXQM9Hn_t.gif',
        lottieJsonUrl: 'iconsJSON/espetos.json',
        type: 'category'
    },
    {
        name: 'CERVEJAS',
        imageUrl: 'https://i.imgur.com/BannerCervejas.jpg',
        lottieJsonUrl: 'iconsJSON/cerveja.json',
        type: 'category'
    },
    {
        name: 'CALDOS',
        imageUrl: 'https://i.imgur.com/BannerCaldos.jpg',
        lottieJsonUrl: 'iconsJSON/caldos.json',
        type: 'category'
    },
    {
        name: 'GUARNIÇÕES',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/guarnicao.json',
        type: 'category'
    },
    {
        name: 'BEBIDAS',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/bebidas familia.json',
        type: 'category'
    },
    {
        name: 'PORÇÕES',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/porcoes.json',
        type: 'category'
    },
    {
        name: 'LANCHES',
        imageUrl: 'https://i.imgur.com/BannerGuarnicoes.jpg',
        lottieJsonUrl: 'iconsJSON/lanches.json',
        type: 'category'
    },
    {
        name: 'WHATSAPP',
        imageUrl: 'https://i.imgur.com/ExemploWhatsapp.png',
        lottieJsonUrl: 'iconsJSON/whatsapp.json',
        type: 'link',
        url: 'https://wa.me/5562992020331'
    },
    {
        name: 'INSTAGRAM',
        imageUrl: 'https://i.imgur.com/ExemploInstagram.png',
        lottieJsonUrl: 'iconsJSON/instagram.json',
        type: 'link',
        url: 'https://www.instagram.com/jantinhanota1000/'
    },
    {
        name: 'MAPA',
        imageUrl: 'https://i.imgur.com/ExemploMaps.png',
        lottieJsonUrl: 'iconsJSON/localizacao.json',
        type: 'link',
        url: 'https://maps.app.goo.gl/zoV6bZ6LjkFXQHsu8'
    },
    {
        name: 'FOTOS',
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