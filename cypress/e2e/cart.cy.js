/// <reference types="cypress"/>

import product from './Page/products/Products'
import cart from './Page/cart/Cart';
import pageLogin from './Page/automation_excercise/Login';
import signupPage from './Page/automation_excercise/Register';
import placeOrder from './Page/cart/PlaceOrder';
import homePage from './Page/automation_excercise/HomePage';

describe('Template Cart', () =>{
    //*********************************************************************************************** */
    //indicar el id de los productos que se añadirán al carrito. Será usado de forma general en cada test
    const idProducts = [1, 2, 1, 5, 4, 3];
    //******************************************************* */

    //variaables que almacenan los datos traidos de los archivos JSON
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

        //verificar pagina de inicio
        cy.loadPagehome();

        //ir a productos
        product.clickProducts();

        //Indicar el id de productos que se agregarán al carrito
        //const idProducts = [1, 2, 1];
        //Verificar si terminó o no de añadir los productos al carrito. Enviar el metodo hoverProducts
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickViewCart()
        );      

        //verificar que los elementos son visibles
        // Paso previo: contar cuántas veces se repite cada ID
        const productCounts = cart.countProductsQuantitie(idProducts);
        
        //verificar los elementos para cada producto
        cart.verifyProductsinCart(productCounts);
    });

    it('Test Case 13: Verify Quantity Product in cart', () =>{
        
        var idProduct, quantityProd;

        //verificar pagina de inicio
        cy.loadPagehome();

        //ingresar el id del producto y la cantidad para dar click
        idProduct = 1;
        quantityProd = 4;

        //click en cualquier producto. Pasar el ID de cualquier producto
        product.clickViewProduct(idProduct);

        //verificar que se los detalles del producto esten abiertos
        product.verifyDetailProducts();

        //aumentar cantidad. Ingresar la cantidad a aumentar del producto
        cart.typeQuantity(quantityProd);

        //agregar al carrito
        cart.clickAddCartDetailProd();
        cart.clickViewCart();

        cart.verifyQuantityCart(idProduct, quantityProd);
    });

    it('Test Case 14: Order During', () =>{
        //verificar pagina de inicio
        cy.loadPagehome();

        //añadir los productos al carrito
        //Indicar el id de productos que se agregarán al carrito
        //const idProducts = [1, 2, 1];
        //Verificar si terminó o no de añadir los productos al carrito. Enviar el metodo hoverProducts
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu() //click en el botón cart del menú
        );

        //verificar paguina del carrito
        cart.verifyloadPageCart();

        //proceder al pago
        cart.clickProceedCheckout();

        //registrar el nuevo usuario
        cart.clickLoginRegister();

        //Llenar los datos y crear la cuenta***************************************************
        cy.loadPageRegister(); 
        
        //Datos para iniciar con el registro de nuevo usuario
        pageLogin.createNewUser(datauser.name, datauser.email);
    
        //verificar load de la pagina register
        signupPage.verifyTitlePage();
    
        //llenado de datos
        signupPage.fillDataUser( 
            () => signupPage.clickTitle(), // funcion que indica si es Mr. o Mrs. 
            // e indicar en "titlePerson" en el archivo data_deliveryaddress.json
         datauser.password, datauser.day, datauser.month, datauser.year,
            datauser.first_name, datauser.last_name, datauser.company, datauser.address,
            datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number
        );
    
        //click para crear la cuenta
        signupPage.createAccount();
    
        //verificar el logueo con luneva cuenta
        signupPage.verifyLogged(datauser.name);
        //********************************************************************/

        //ir al carrito para completar la compra
        cart.clickCartinMenu();
        cart.clickProceedCheckout();

        //verificar la dirección
        var fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        var address = dataDlry.address;
        var location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        var country = dataDlry.country;
        var phone = dataDlry.mobile_number;
        cart.verifyAddressDelivery(fullname, address, location, country, phone);
        
        //verificar el pedido
        //verificar que los elementos son visibles
        // Paso previo: contar cuántas veces se repite cada ID
        const productCounts = cart.countProductsQuantitie(idProducts);
        
        //verificar los elementos para cada producto
        cart.verifyProductsinCart(productCounts);

        //añadir comentario y realizar orden
        cart.typeCommentOrder(dataDlry.commentsOrder);
        cart.clickPlaceOrder();

        //LLenado de datos del pago
        placeOrder.fillDataOrder(dataCard.nameCard, dataCard.numberCard, dataCard.cvc,
            dataCard.month, dataCard.year
        );
        
        placeOrder.clickPayOrder();

        //verificar compra realizada con exito
        placeOrder.VerifyOrderPlaced();

        //eliminar la cuenta
        cy.deleteAccount(); //accion personalizada
    });

    it('Test Case 15: Order Before', () =>{
        //verificar pagina de inicio
        cy.loadPagehome();

        //Creamos el usuario
        homePage.clickLoginRegister();

        //Llenar los datos y crear la cuenta***************************************************
        cy.loadPageRegister(); 
        
        //Datos para iniciar con el registro de nuevo usuario
        pageLogin.createNewUser(datauser.name, datauser.email);
    
        //verificar load de la pagina register
        signupPage.verifyTitlePage();
    
        //llenado de datos
        signupPage.fillDataUser( 
            () => signupPage.clickTitle(), // funcion que indica si es Mr. o Mrs. 
            // e indicar en "titlePerson" en el archivo data_deliveryaddress.json
         datauser.password, datauser.day, datauser.month, datauser.year,
            datauser.first_name, datauser.last_name, datauser.company, datauser.address,
            datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number
        );
    
        //click para crear la cuenta
        signupPage.createAccount();
    
        //verificar el logueo con luneva cuenta
        signupPage.verifyLogged(datauser.name);
        //********************************************************************/

        //añadir los productos al carrito
        //Verificar si terminó o no de añadir los productos al carrito. Enviar el metodo hoverProducts
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu() //click en el botón cart del menú
        );

        //verificar paguina del carrito
        cart.verifyloadPageCart();

        //proceder al pago
        cart.clickProceedCheckout();

        //verificar la dirección
        var fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        var address = dataDlry.address;
        var location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        var country = dataDlry.country;
        var phone = dataDlry.mobile_number;
        cart.verifyAddressDelivery(fullname, address, location, country, phone);
        
        //verificar el pedido
        //verificar que los elementos son visibles
        // Paso previo: contar cuántas veces se repite cada ID
        const productCounts = cart.countProductsQuantitie(idProducts);
        
        //verificar los elementos para cada producto
        cart.verifyProductsinCart(productCounts);

        //añadir comentario y realizar orden
        cart.typeCommentOrder(dataDlry.commentsOrder);
        cart.clickPlaceOrder();

        //LLenado de datos del pago
        placeOrder.fillDataOrder(dataCard.nameCard, dataCard.numberCard, dataCard.cvc,
            dataCard.month, dataCard.year
        );
        
        placeOrder.clickPayOrder();

        //verificar compra realizada con exito
        placeOrder.VerifyOrderPlaced();

        //eliminar la cuenta
        cy.deleteAccount(); //accion personalizada
    });

    it('Test Case 16: Order Login', () =>{
        //verificar pagina de inicio
        cy.loadPagehome();

        //Ir a login/signup
        homePage.clickLoginRegister();

        //Iniciar sesión con una  cuenta existente***************************************************
        //verificar que carga la pagina de login
            pageLogin.verifyLabelLogin();
        
            //llenado de datos
            //asegurarse de ingresar datos: email y contraseña, ya registrados (cargados en data_loginuser.json)
            pageLogin.typeEmailLogin(datalogin.email);
            pageLogin.typePasswordLogin(datalogin.password);
            pageLogin.clickLogin();
        
            //verificar el loggueo correcto
            signupPage.verifyLogged(datalogin.name_user);
        //********************************************************************/

        //añadir los productos al carrito
        //Verificar si terminó o no de añadir los productos al carrito. Enviar el metodo hoverProducts
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu() //click en el botón cart del menú
        );

        //verificar paguina del carrito
        cart.verifyloadPageCart();

        //proceder al pago
        cart.clickProceedCheckout();

        //verificar la dirección
        var fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        var address = dataDlry.address;
        var location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        var country = dataDlry.country;
        var phone = dataDlry.mobile_number;
        cart.verifyAddressDelivery(fullname, address, location, country, phone);
        
        //verificar el pedido
        //verificar que los elementos son visibles
        // Paso previo: contar cuántas veces se repite cada ID
        const productCounts = cart.countProductsQuantitie(idProducts);
        
        //verificar los elementos para cada producto
        cart.verifyProductsinCart(productCounts);

        //añadir comentario y realizar orden
        cart.typeCommentOrder(dataDlry.commentsOrder);
        cart.clickPlaceOrder();

        //LLenado de datos del pago
        placeOrder.fillDataOrder(dataCard.nameCard, dataCard.numberCard, dataCard.cvc,
            dataCard.month, dataCard.year
        );
        
        placeOrder.clickPayOrder();

        //verificar compra realizada con exito
        placeOrder.VerifyOrderPlaced();

        //eliminar la cuenta
        cy.deleteAccount(); //accion personalizada
    });
    
    it('Test Case 17: Delete Products Cart', () =>{
        //Ingresar el id del producto a eliminar
        var productDelete = 1;
        //verificar load de homepage
        cy.loadPagehome();

        //añadir los productos al carrito
        //Verificar si terminó o no de añadir los productos al carrito. Enviar el metodo hoverProducts
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu() //click en el botón cart del menú
        );

        //verificar paguina del carrito
        cart.verifyloadPageCart();

        //ELIMINAR EL PRODUCTO
        cart.clickDeleteProduct(productDelete);
        //verificar producto ya no aparece
        cart.productNotVisible(productDelete);
    });

    it('Test Case 22: Add products from Recommended Items', ()=>{
        //Indicar el id del producto que se va a añadir de los productos recomendados
        let idProduct = 1;
        
        cy.scrollDown(2000); //funcion personalizada

        product.verifyRecomendedTitle();

        //indicar el id del producto a añadir
        cart.addProdctRcmnded(idProduct);
        cart.clickViewCart();
        //Verificar el produto en el carrito
        cart.productVisible(idProduct);
        cart.visiblePriceCart(idProduct);
        //indicar la cantidad que debe tener el producto en el carrito
        cart.verifyQuantityCart(idProduct, '1');
    });

    it('Test Case 23: Verify Details in Checkout', ()=>{
        //verificar pagina de inicio
        cy.loadPagehome();

        //registrar el nuevo usuario*********************************
        homePage.clickLoginRegister();
        cy.loadPageRegister(); 
        //iniciar con el registro de nuevo usuario
        pageLogin.createNewUser(datauser.name, datauser.email);
        signupPage.verifyTitlePage();
        //llenado de datos
        signupPage.fillDataUser( 
            () => signupPage.clickTitle(), // funcion que indica si es Mr. o Mrs. 
            // e indicar en "titlePerson" en el archivo data_deliveryaddress.json
         datauser.password, datauser.day, datauser.month, datauser.year,
            datauser.first_name, datauser.last_name, datauser.company, datauser.address,
            datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number
        );
    
        //Crear la cuenta
        signupPage.createAccount();
        //verificar el logueo
        signupPage.verifyLogged(datauser.name);
        //********************************************************************/

        //Añadir los productos al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu() //click en el botón cart del menú
        );
        //verificar paguina del carrito
        cart.verifyloadPageCart();

        //proceder al pago
        cart.clickProceedCheckout();

        //verificar la dirección de entrega
        let fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        let address = dataDlry.address;
        let location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        let country = dataDlry.country;
        let phone = dataDlry.mobile_number;
        //Verificar direccion de entrega
        cart.verifyAddressDelivery(fullname, address, location, country, phone);
        //Verificar dirección de facturación
        cart.verifyAddressBilling(fullname, address, location, country, phone);

        //Eliminar la cuenta
        cy.deleteAccount(); //accion personalizada
    });

    it('Test Case 24: Download invoice after purchaise order', ()=>{
        
        cy.loadPagehome();

        //Agregar productos al carrito
        cart.addProductsAndGoToCart(idProducts, 
            (id) => product.hoverProduct(id),
            () => cart.clickCartinMenu()
        );
        cart.verifyloadPageCart();
        cart.clickProceedCheckout();
        
        //Iniciar sesión
        cart.clickLoginRegister();
        pageLogin.createNewUser(datauser.name, datauser.email);
        signupPage.verifyTitlePage();
    
        //llenado de datos
        signupPage.fillDataUser( 
            () => signupPage.clickTitle(), // Funcion que indica si es Mr. o Mrs.
         datauser.password, datauser.day, datauser.month, datauser.year,
            datauser.first_name, datauser.last_name, datauser.company, datauser.address,
            datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number
        );
        signupPage.createAccount();
        signupPage.verifyLogged(datauser.name);

        cart.clickCartinMenu();
        cart.clickProceedCheckout();

        //verificar la dirección
        var fullname = dataDlry.titlePerson + " " + dataDlry.first_name + " " + dataDlry.last_name;
        var address = dataDlry.address;
        var location = dataDlry.city + " " + dataDlry.state + " " + dataDlry.zipcode;
        var country = dataDlry.country;
        var phone = dataDlry.mobile_number;
        cart.verifyAddressDelivery(fullname, address, location, country, phone);

        //verificar el pedido
        const productCounts = cart.countProductsQuantitie(idProducts);
        cart.verifyProductsinCart(productCounts);

        //añadir comentario y realizar orden
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

        //eliminar la cuenta
        cy.deleteAccount();

    });
})