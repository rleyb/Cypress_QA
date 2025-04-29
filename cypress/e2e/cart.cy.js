/// <reference types="cypress"/>

import product from './Page/products/Products'
import cart from './Page/cart/Cart';
import pageLogin from './Page/automation_excercise/Login';
import signupPage from './Page/automation_excercise/Register';
import placeOrder from './Page/cart/PlaceOrder';
import homePage from './Page/automation_excercise/HomePage';

/* NOTA IMPORTANTE
    * Contiene los test cases del 12 - 17 y 22 - 24
    * indicar en el array "idProducts" que productos se van a añadir al carrito, se usará en cada test el mismo array
*/
describe('Template Cart', () =>{

    //Indicar el id de los productos que se añadirán al carrito
    const idProducts = [1, 2, 1, 5, 4, 3];
    //Variables que almacenan los datos para cada test
    var datauser, dataDlry, dataCard, datalogin;

    beforeEach('passes', () =>{
        cy.visit('/');

        //conexion al json con los datos del nuevo usuario
        cy.fixture('././data_newuser')
        .then((datos) => (
        datauser = datos
        ));

        //conexion al json con los datos del nuevo usuario
        cy.fixture('././data_deliveryaddress')
        .then((datos) => (
            dataDlry = datos
        ));
        
        //conexion al json con los datos del nuevo usuario
        cy.fixture('././data_card')
        .then((datos) => (
            dataCard = datos
        ));

        //conexion al json con los datos del login de un usuario
        cy.fixture('././data_loginuser')
        .then((datos) => (
        datalogin = datos
        ));
    });

    it('Test Case 12: Add product to Cart', () =>{

        cy.loadPagehome(); //Command personalizado

        //ir a productos
        product.clickProducts();
        //Agregar productos e ir al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickViewCart()
        );      
        //Verificar los productos en el carrito
        const productCounts = cart.countProductsQuantitie(idProducts);
        cart.verifyProductsinCart(productCounts);
    });

    it('Test Case 13: Verify Quantity Product in cart', () =>{
        
        //Indicar id de producto y cantidad a aumentar
        let idProduct = 1, quantityProd = 4;

        cy.loadPagehome(); //Command personalizado 

        product.clickViewProduct(idProduct);
        product.verifyDetailProducts();
        //Aumentar cantidad
        cart.typeQuantity(quantityProd);

        //Agregar al carrito desde detalles del producto
        cart.clickAddCartDetailProd();
        cart.clickViewCart();
        //Verificar la cantidad aumentada en el carrito
        cart.verifyQuantityCart(idProduct, quantityProd);
    });

    it('Test Case 14: Order During', () =>{
        
        cy.loadPagehome(); //Command personalizado

        //Agregar productos al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu()
        );

        //verificar paguina del carrito
        cart.verifyloadPageCart();
        cart.clickProceedCheckout();

        //Registrar el nuevo usuario
        cart.clickLoginRegister();
        //Verificar pagina de registro
        cy.loadPageRegister(); 
        //Iniciar nuevo registro
        pageLogin.createNewUser(datauser.name, datauser.email);
        signupPage.verifyTitlePage();
    
        //LLenar datos
        signupPage.fillDataUser( 
            () => signupPage.clickTitle(), // Funcion que indica valor de Title Mr. o Mrs.
            datauser.password, datauser.day, datauser.month, datauser.year,
            datauser.first_name, datauser.last_name, datauser.company, datauser.address,
            datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number
        );
        signupPage.createAccount();
        //Verificar el login
        signupPage.verifyLogged(datauser.name);

        //Completar compra
        cart.clickCartinMenu();
        cart.clickProceedCheckout();

        //Verificar la dirección de entrega
        var fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        var address = dataDlry.address;
        var location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        var country = dataDlry.country;
        var phone = dataDlry.mobile_number;
        cart.verifyAddressDelivery(fullname, address, location, country, phone);
        
        //verificar productos en el carrito
        const productCounts = cart.countProductsQuantitie(idProducts);
        cart.verifyProductsinCart(productCounts);

        //Commentar pedido
        cart.typeCommentOrder(dataDlry.commentsOrder);
        cart.clickPlaceOrder();

        //Completar pago
        placeOrder.fillDataOrder(dataCard.nameCard, dataCard.numberCard, dataCard.cvc,
            dataCard.month, dataCard.year
        );
        placeOrder.clickPayOrder();
        placeOrder.VerifyOrderPlaced();

        cy.deleteAccount(); //Command personalizado.
    });

    it('Test Case 15: Order Before', () =>{
        
        cy.loadPagehome(); //Command personalizado

        //Crear usuario
        homePage.clickLoginRegister();
        cy.loadPageRegister(); 
        
        //Iniciar nuevo registro
        pageLogin.createNewUser(datauser.name, datauser.email);
        signupPage.verifyTitlePage();
    
        //llenado de datos
        signupPage.fillDataUser( 
            () => signupPage.clickTitle(), // Funcion que indica el valor de Title, Mr. o Mrs.
            datauser.password, datauser.day, datauser.month, datauser.year,
            datauser.first_name, datauser.last_name, datauser.company, datauser.address,
            datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number
        );
        signupPage.createAccount();
        //verificar el logueo
        signupPage.verifyLogged(datauser.name);

        //añadir los productos al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu()
        );

        //verificar carrito y completar pago
        cart.verifyloadPageCart();
        cart.clickProceedCheckout();

        //verificar la dirección de entrega
        var fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        var address = dataDlry.address;
        var location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        var country = dataDlry.country;
        var phone = dataDlry.mobile_number;
        cart.verifyAddressDelivery(fullname, address, location, country, phone);
        
        //verificar productos en el carrito
        const productCounts = cart.countProductsQuantitie(idProducts);
        cart.verifyProductsinCart(productCounts);

        //Comentar pedido
        cart.typeCommentOrder(dataDlry.commentsOrder);
        cart.clickPlaceOrder();
        //Completar pago
        placeOrder.fillDataOrder(dataCard.nameCard, dataCard.numberCard, dataCard.cvc,
            dataCard.month, dataCard.year
        );
        placeOrder.clickPayOrder();
        placeOrder.VerifyOrderPlaced();

        cy.deleteAccount(); //Command personalizado
    });

    it('Test Case 16: Order Login', () =>{

        cy.loadPagehome(); //Command personalizado

        //Iniciar sesión
        homePage.clickLoginRegister();
        pageLogin.verifyLabelLogin();
    
        //llenado de datos
        pageLogin.loginUser(datalogin.email,datalogin.password);
        //verificar el loggueo
        signupPage.verifyLogged(datalogin.name_user);

        //Añadir los productos al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu() 
        );

        //Verificar carrito y proceder al pago
        cart.verifyloadPageCart();

        cart.clickProceedCheckout();

        //verificar la dirección de entrega
        var fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        var address = dataDlry.address;
        var location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        var country = dataDlry.country;
        var phone = dataDlry.mobile_number;
        cart.verifyAddressDelivery(fullname, address, location, country, phone);
        
        //Verificar productos en el carrito
        const productCounts = cart.countProductsQuantitie(idProducts);
        cart.verifyProductsinCart(productCounts);

        //Comentar pedido
        cart.typeCommentOrder(dataDlry.commentsOrder);
        cart.clickPlaceOrder();

        //Completar pago
        placeOrder.fillDataOrder(dataCard.nameCard, dataCard.numberCard, dataCard.cvc,
            dataCard.month, dataCard.year
        );
        placeOrder.clickPayOrder();
        placeOrder.VerifyOrderPlaced();

        cy.deleteAccount(); //Command personalizado
    });
    
    it('Test Case 17: Delete Products Cart', () =>{

        //Ingresar el id del producto a eliminar
        let productDelete = 1;
        
        cy.loadPagehome();//Command personalizado

        //añadir los productos al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu()
        );

        cart.verifyloadPageCart();

        //ELIMINAR EL PRODUCTO
        cart.clickDeleteProduct(productDelete);
        cart.productNotVisible(productDelete);
    });

    it('Test Case 22: Add products from Recommended Items', ()=>{

        //Indicar el id del producto que se va a añadir de los productos recomendados
        let idProduct = 1;
        
        cy.scrollDown(2000); //Command personalizado

        product.verifyRecomendedTitle();

        cart.addProdctRcmnded(idProduct);
        cart.clickViewCart();

        //Verificar producto en el carrito
        cart.productVisible(idProduct);
        cart.visiblePriceCart(idProduct);
        //Verificar la cantidad esperada
        cart.verifyQuantityCart(idProduct, '1');
    });

    it('Test Case 23: Verify Details in Checkout', ()=>{
        
        cy.loadPagehome(); //Command personalizado

        //Registrar nuevo usuario
        homePage.clickLoginRegister();

        cy.loadPageRegister();
        pageLogin.createNewUser(datauser.name, datauser.email);
        signupPage.verifyTitlePage();

        //llenado de datos
        signupPage.fillDataUser( 
            () => signupPage.clickTitle(), //Funcion que indica Valor de Title, Mr. o Mrs.
            datauser.password, datauser.day, datauser.month, datauser.year,
            datauser.first_name, datauser.last_name, datauser.company, datauser.address,
            datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number
        );
        signupPage.createAccount();
        //verificar el logueo
        signupPage.verifyLogged(datauser.name);

        //Añadir los productos al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu()
        );

        //Verificar carrito y completar pago
        cart.verifyloadPageCart();
        cart.clickProceedCheckout();

        //Datos de la dirección
        let fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        let address = dataDlry.address;
        let location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        let country = dataDlry.country;
        let phone = dataDlry.mobile_number;
        //Verificar direccion de entrega
        cart.verifyAddressDelivery(fullname, address, location, country, phone);
        //Verificar dirección de facturación
        cart.verifyAddressBilling(fullname, address, location, country, phone);

        cy.deleteAccount(); //Command personalizado
    });

    it('Test Case 24: Download invoice after purchaise order', ()=>{
        
        cy.loadPagehome(); //command personalizado

        //Agregar productos al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu()
        );
        cart.verifyloadPageCart();
        cart.clickProceedCheckout();
        
        //Registrar nuevo usuario
        cart.clickLoginRegister();
        pageLogin.createNewUser(datauser.name, datauser.email);
        signupPage.verifyTitlePage();
    
        //llenado de datos
        signupPage.fillDataUser( 
            () => signupPage.clickTitle(), // Funcion que indica valor de Title, Mr. o Mrs.
            datauser.password, datauser.day, datauser.month, datauser.year,
            datauser.first_name, datauser.last_name, datauser.company, datauser.address,
            datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number
        );
        signupPage.createAccount();
        signupPage.verifyLogged(datauser.name);

        //Verificar carrito y completar pago
        cart.clickCartinMenu();
        cart.clickProceedCheckout();

        //verificar la dirección de entrega
        var fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        var address = dataDlry.address;
        var location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        var country = dataDlry.country;
        var phone = dataDlry.mobile_number;
        cart.verifyAddressDelivery(fullname, address, location, country, phone);

        //verificar el pedido
        const productCounts = cart.countProductsQuantitie(idProducts);
        cart.verifyProductsinCart(productCounts);

        //Comentar perdido
        cart.typeCommentOrder(dataDlry.commentsOrder);
        cart.clickPlaceOrder();

        //LLenado de datos del pago
        placeOrder.fillDataOrder(dataCard.nameCard, dataCard.numberCard, dataCard.cvc,
            dataCard.month, dataCard.year
        );
        placeOrder.clickPayOrder();
        placeOrder.verifyTitleSuccess();
        placeOrder.verifyMsgSuccess();

        //Obtener factura
        cart.clickDwloadInvoice();
        placeOrder.clickContinue();

        cy.deleteAccount(); //Command personalizado

    });
})