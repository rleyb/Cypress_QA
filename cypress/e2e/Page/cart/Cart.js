class cart{

    elements = {
        // Botón para ir al carrito desde el menú
        btnCart: 'li a[href="/view_cart"]',
        // Botón para añadir producto al carrito según ID
        btnAddCart: (id) => cy.get(`a[data-product-id="${id}"]`),
        // Botón para continuar comprando en el modal
        btnShopingCont: 'button.btn.btn-success.close-modal.btn-block',
        // Botón para ir al carrito desde el modal
        viewCart: 'a[href="/view_cart"] u',

        // Verifica que el producto esté en el carrito
        productsInCart: (id) => cy.get(`#product-${id}`),
        // Selector del precio unitario del producto
        priceCart: (id) => cy.get(`#product-${id} td.cart_price p`),
        // Selector de la cantidad mostrada en el carrito
        quantityCart: (id) => cy.get(`#product-${id} td.cart_quantity button.disabled`),
        // Selector del precio total (unitario x cantidad)
        totalProceCart: (id) => cy.get(`#product-${id} td.cart_total p`),
        
        //Selector del campo cantidad en product detail
        inputQuantity: '#quantity',
        //Selector del botón "Add to Cart" en product detail
        addCartDetailProd: 'button.btn.btn-default.cart',
        //Selector del botón "Cart" en el menú
        btnCartinMenu: 'ul.nav.navbar-nav a[href="/view_cart"]',
        //Selector del botón "Proceded to Checkout" en el carrito 
        proceedCheckout: 'div a.btn.btn-default.check_out',
        //Selector del botón "Register/login" en el modal checkout del carrito
        linktoLoginReg: 'p.text-center a[href="/login"] u',

        //Selector del nombre de la dirección de entrega
        fullName: '#address_delivery li.address_firstname.address_lastname',
        //Selector del "address" de la dirección de entrega (solo se usa el address 1 en la automatización)
        labelAddress: '#address_delivery li.address_address1.address_address2',
        //Selector de la ubicación de la dirección de entrega
        location: '#address_delivery li.address_city.address_state_name.address_postcode',
        //Selector del país de la dirección de entrega
        labelCountry: '#address_delivery li.address_country_name',
        //Selector del numero de telefono de la dirección de entrega
        labelPhone: '#address_delivery li.address_phone',

        //Selector del campo de comentario para realizar un pedido
        commentOrder: '#ordermsg textarea.form-control',
        //Selector del botón de "Payment"
        btnPlaceOrder: 'a[href="/payment"]',
        //Selector del botón para eliminar un producto del carrito
        btnDeleteProd: (id) => cy.get(`a[data-product-id="${id}"]`),

        //Selector del botón agregar al carrito del la sección "Recomended Items"
        btnAddItemRcmnded: (id) => cy.get(`#recommended-item-carousel a[data-product-id="${id}"]`),

        //Selector del nombre de la dirección de facturación
        bllngfullName: '#address_invoice li.address_firstname.address_lastname',
        //Selector del "address" de la dirección de facturación (solo se usa el address 1 en la automatización)
        bllnglabelAddress: '#address_invoice li.address_address1.address_address2',
        //Selector de la ubicación de la dirección de facturación
        bllnglocation: '#address_invoice li.address_city.address_state_name.address_postcode',
        //Selector del país de la dirección de facturación
        bllnglabelCountry: '#address_invoice li.address_country_name',
        //Selector del numero de telefono de la dirección de facturación
        bllnglabelPhone: '#address_invoice li.address_phone',

        //Selector del botón para descargar factura "Download invoice"
        btnDwldInvoice: 'a.btn.btn-default.check_out'
    }

    //Click en el botón "Cart" en el menú
    clickCart(){
        cy.clickGo(this.elements.btnCart);
    }

    //Click en el botón "Add to Cart" del hover de un producto (modal)
    clickAddCart(id){
        this.elements.btnAddCart(id)
        .filter(':visible')
        .realClick(); //realClick:  Funcion de Real Events - cypress
    }

    //Click en el botón continuar comprando del modal
    clickShopingCont(){
        cy.clickGoModals(this.elements.btnShopingCont);
    }

    //Click en el botón "view cart" del modal
    clickViewCart(){
        cy.clickGoModals(this.elements.viewCart);
    }

    //Verificar si un producto es visible en el carrito
    productVisible(id){
        this.elements.productsInCart(id).should('be.visible');
    }

    //Verificar que el precio es visible en el carrito
    visiblePriceCart(id){
        this.elements.priceCart(id).should('be.visible');
    }

    //Obtener la cantidad de un producto en el carrito
    getQuantityCart(id){
        return this.elements.quantityCart(id);
    }

    //Verificar la cantidad de un producto en el carrito
    verifyQuantityCart(id, expectedQty){ //expectedQty: cantidad esperada
        this.getQuantityCart(id).should('have.text', expectedQty)
    }

    //Obtener el precio de un producto en el carrito
    getPriceCart(id){
        return this.elements.priceCart(id).invoke('text') //obtiene el texto del elemento 'Rs. ...'
        .then((priceText) =>{
           return parseInt(priceText.replace(/\D/g, '')); //remueve todo lo que no sea digito
        });
    }

    //Obtener el precio total de un producto en el carrito
    getPriceTotalCart(id){
        return this.elements.totalProceCart(id).invoke('text') //obtiene el texto del elemento 'Rs. ...'
        .then((totalText) =>{
            return parseInt(totalText.replace(/\D/g, '')); //remueve todo lo que no sea digito
        });
    }

    //Agregar varios productos al carrito
    addProductstoCart(idproducts, hoverProductsCall){ //idproducts: array de id de productos
        var ended;
        //se recorrre el array con los ids
        idproducts.forEach((id, index) => {
            hoverProductsCall(id); 
            this.clickAddCart(id)

            //verifica si hay o no mas ids para seguir comprando
            if (index === idproducts.length - 1) {
                //this.clickViewCart();
                ended = true;
            } else {
                this.clickShopingCont();
                ended = false
            }
        });
        return ended;
    }

    //Contar cuantos productos han sido agregados y cuantas veces se ha agregado
    countProductsQuantitie(idproducts){
        const productsCount = {};
        idproducts.forEach(id =>{
            productsCount[id] = (productsCount[id] || 0) + 1;
        });
        return productsCount;
    }

    //Verificar los productos agregados en el carrito
    verifyProductsinCart(productsCounts){ //productsCounts: array con cantidad de veces y productos agregados
        for (const id of Object.keys(productsCounts)) {
            const expectedQty = productsCounts[id];

            //verificar que el producto aparece
            this.productVisible(id);
            this.visiblePriceCart(id);
            //se verifica la cantidad
            this.verifyQuantityCart(id, expectedQty);

            //verificar los precios
            this.getPriceCart(id).then((unitPrice) => {
                this.getPriceTotalCart(id).then((totalPrice) => {
                    const expectedTotal = unitPrice * expectedQty;
                    expect(totalPrice).to.eq(expectedTotal);
                });
            });
        }
    }

    //verificar si termina o no de añadir productos para ir al carrito
    addProductsAndGoToCart(idProducts, hoverProductCallback, clickforGoCart) {
        const ended = this.addProductstoCart(idProducts, hoverProductCallback);
        if (ended === true) {
            clickforGoCart();
        }
        // También puedes retornar ended si quieres verificarlo en el test
        return ended;
    }

    //Escribir la cantidad de un producto
    typeQuantity(quantity){
        cy.writeData(this.elements.inputQuantity, quantity);
    }

    //Click en el botón "Add to Cart" de detalles del producto
    clickAddCartDetailProd(){
        cy.clickGo(this.elements.addCartDetailProd);
    }

    //Click en el botón "Cart" en el menú
    clickCartinMenu(){
        cy.clickGo(this.elements.btnCartinMenu);
    }

    //Verificar que cargó la pagina del carrito
    verifyloadPageCart(){
        cy.url('include', '/view_cart')
    }

    //Click en el botón prodecer con el pago
    clickProceedCheckout(){
        cy.clickGo(this.elements.proceedCheckout);
    }

    //Click en el botón login / registrar del modal
    clickLoginRegister(){
        cy.clickGoModals(this.elements.linktoLoginReg);
    }

    //Verificar el nombre de en la dirreción de entrega
    verifyDlryName(fullname){
        cy.asserts(this.elements.fullName, fullname);
    }

    //Verificar "address" de la dirección de entrega (solo se usa el address 1)
    verifyDlryAddress(address){
        cy.get(this.elements.labelAddress).eq(1).should('contain', address);
    }

    //Verificar la ubicación de la dirección de entrega
    verifyDlrLocation(location) {
        cy.get('#address_delivery li.address_city.address_state_name.address_postcode')
          .invoke('text')
          .then((text) => {
            const cleanedText = text.replace(/\s+/g, ' ').trim(); // Reemplaza saltos y tabs por un solo espacio
            expect(cleanedText).to.contain(location);
        });
    }

    //Verificar el pais de la dirección de entrega
    verifyDlryCountry(country){
        cy.asserts(this.elements.labelCountry, country)
    }

    //Verificar el numero de telefono de la dirección de entrega
    verifyDlryPhone(phone){
        cy.asserts(this.elements.labelPhone, phone)
    }

    //Verificar todos los datos de la dirección de entrega
    verifyAddressDelivery(name, address, location, country, phone){
        this.verifyDlryName(name);
        this.verifyDlryAddress(address);
        this.verifyDlrLocation(location);
        this.verifyDlryCountry(country);
        this.verifyDlryPhone(phone);
    }

    //verificar el nombre en la dirección de facturación
    verifyBllngName(fullname){
        cy.asserts(this.elements.bllngfullName, fullname);
    }

    //Verificar el "Address" de los datos de facturación
    verifyBllngAddress(address){
        //se verifica unicamente el dato Address1
        cy.get(this.elements.bllnglabelAddress).eq(1).should('contain', address);
    }

    //Verificar la ubicación de la dirección de facturación
    verifyBllngLocation(location) {
        cy.get(this.elements.bllnglocation)
          .invoke('text')
          .then((text) => {
            const cleanedText = text.replace(/\s+/g, ' ').trim(); // Reemplaza saltos y tabs por un solo espacio
            expect(cleanedText).to.contain(location);
        });
    }

    //Verificar el pais de la dirección de facturación
    verifyBllngCountry(country){
        cy.asserts(this.elements.bllnglabelCountry, country)
    }

    //Verificar el numero de telefono de la dirección de facturación
    verifyBllngPhone(phone){
        cy.asserts(this.elements.bllnglabelPhone, phone)
    }

    //Verificar todos los datos de la dirección de facturación
    verifyAddressBilling(name, address, location, country, phone){
        this.verifyBllngName(name);
        this.verifyBllngAddress(address);
        this.verifyBllngLocation(location);
        this.verifyBllngCountry(country);
        this.verifyBllngPhone(phone);
    }

    //Escribir comentario en un pedido
    typeCommentOrder(comments){
        cy.writeData(this.elements.commentOrder, comments)
    }

    //click en el botón para realizar un pedido
    clickPlaceOrder(){
        cy.clickGo(this.elements.btnPlaceOrder);
    }

    //Click en el botón para eliminar un producto de una carrito
    clickDeleteProduct(id){
        this.elements.btnDeleteProd(id).click();
    }

    //Eliminar varios productos del carrito
    removeProductsFromCart(productsID) {
        const uniqueIds = Cypress._.uniq(productsID);
    
        cy.wrap(uniqueIds).each((id) => {
            cy.get('body').then(($body) => {
                if ($body.find(this.elements.productsInCart(id)).length > 0) {
                    this.clickDeleteProduct(id);
                }
            });
        });
    }
    

    //Verificar que un producto no es visible en el carrito
    productNotVisible(id){
        this.elements.productsInCart(id).should('not.exist');
    }

    //Verificar que un producto es visible en el carrito, validando por el selector del producto
    productIsVisible(id) {
        return cy.get('body').then(($body) => {
            // Si el selector existe, el producto está visible
            if ($body.find(this.elements.productsInCart(id)).length > 0) {
                return true;
            }
            return false;
        });
    }

    //Agregar un producto desde la sección de productos recomendados
    addProdctRcmnded(id) {
        const tryClickAddButton = (attempt = 0, maxAttempts = 3) => {
            // Intentamos encontrar y hacer click si está visible
            this.elements.btnAddItemRcmnded(id).then($el => {
                if ($el.is(':visible')) {
                    cy.wrap($el).click();
                } else if (attempt < maxAttempts) {
                    // Hacemos click en la flecha del carrusel y reintentamos
                    cy.get('.right.recommended-item-control').click();
                    cy.wait(500); // pequeño tiempo de espera para que el carrusel se actualice
                    tryClickAddButton(attempt + 1, maxAttempts);
                } else {
                    throw new Error(`No se encontró el producto recomendado con id ${id} después de ${maxAttempts} intentos.`);
                }
            });
        };
    
        tryClickAddButton();
    }
    
    //Click en el botón para descargar una factura
    clickDwloadInvoice(){
        cy.clickGo(this.elements.btnDwldInvoice);
    }
    
}

module.exports = new cart();