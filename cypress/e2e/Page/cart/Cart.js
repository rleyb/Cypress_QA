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
        
        inputQuantity: '#quantity',
        addCartDetailProd: 'button.btn.btn-default.cart',
        btnCartinMenu: 'ul.nav.navbar-nav a[href="/view_cart"]',
        proceedCheckout: 'div a.btn.btn-default.check_out',
        linktoLoginReg: 'p.text-center a[href="/login"] u',

        //verificación de la dirección de entrega
        fullName: '#address_delivery li.address_firstname.address_lastname',
        labelAddress: '#address_delivery li.address_address1.address_address2',
        location: '#address_delivery li.address_city.address_state_name.address_postcode',
        labelCountry: '#address_delivery li.address_country_name',
        labelPhone: '#address_delivery li.address_phone',

        commentOrder: '#ordermsg textarea.form-control',
        btnPlaceOrder: 'a[href="/payment"]',

        //Eliminar producto del carrito
        btnDeleteProd: (id) => cy.get(`a[data-product-id="${id}"]`),

        //Productos recomendados
        btnAddItemRcmnded: (id) => cy.get(`#recommended-item-carousel a[data-product-id="${id}"]`),

        //verificar dirección de facturación
        bllngfullName: '#address_invoice li.address_firstname.address_lastname',
        bllnglabelAddress: '#address_invoice li.address_address1.address_address2',
        bllnglocation: '#address_invoice li.address_city.address_state_name.address_postcode',
        bllnglabelCountry: '#address_invoice li.address_country_name',
        bllnglabelPhone: '#address_invoice li.address_phone',

        //descargar factura de pago
        btnDwldInvoice: 'a.btn.btn-default.check_out'
    }

    //Se utilizan comandos personalizados
    clickCart(){
        cy.clickGo(this.elements.btnCart);
    }

    clickAddCart(id){
        this.elements.btnAddCart(id)
        .filter(':visible')
        .realClick(); //realClick es una funcion de la libreria Real Events de cypress
    }

    clickShopingCont(){
        cy.clickGoModals(this.elements.btnShopingCont);
    }

    clickViewCart(){
        cy.clickGoModals(this.elements.viewCart);
    }

    productVisible(id){
        this.elements.productsInCart(id).should('be.visible');
    }

    visiblePriceCart(id){
        this.elements.priceCart(id).should('be.visible');
    }

    //obtener el valor de la cantidad
    getQuantityCart(id){
        return this.elements.quantityCart(id);
    }

    //verificar la cantidad con el numero de veces añadido el producto al carrito
    verifyQuantityCart(id, expectedQty){
        this.getQuantityCart(id).should('have.text', expectedQty)
    }

    //obtener el valor del precio
    getPriceCart(id){
        return this.elements.priceCart(id).invoke('text') //obtiene el texto del elemento 'Rs. ...'
        .then((priceText) =>{
           return parseInt(priceText.replace(/\D/g, '')); //remueve todo lo que no sea digito
        });
    }

    //obtener el valor del precio total
    getPriceTotalCart(id){
        return this.elements.totalProceCart(id).invoke('text')
        .then((totalText) =>{
            return parseInt(totalText.replace(/\D/g, ''));
        });
    }

    //ACCIONES DEL TC 12---------------------------------------------------------------------------
    //Agregar varios productos al carrito
    addProductstoCart(idproducts, hoverProductsCall){
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

    countProductsQuantitie(idproducts){
        const productsCount = {};
        idproducts.forEach(id =>{
            productsCount[id] = (productsCount[id] || 0) + 1;
        });
        return productsCount;
    }

    //verificar los productos en el carrito
    verifyProductsinCart(productsCounts){
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
    //---------------------------------------------------------------------------------------------------

    //verificar si termina o no de añadir productos al carrito
    addProductsAndGoToCart(idProducts, hoverProductCallback, clickforGoCart) {
        const ended = this.addProductstoCart(idProducts, hoverProductCallback);
        if (ended === true) {
            clickforGoCart();
        }
        
        // También puedes retornar ended si quieres verificarlo en el test
        return ended;
    }

    typeQuantity(quantity){
        cy.writeData(this.elements.inputQuantity, quantity);
    }

    clickAddCartDetailProd(){
        cy.clickGo(this.elements.addCartDetailProd);
    }

    clickCartinMenu(){
        cy.clickGo(this.elements.btnCartinMenu);
    }

    //verificar que se cargó la pagina
    verifyloadPageCart(){
        cy.url('include', '/view_cart')
    }

    clickProceedCheckout(){
        cy.clickGo(this.elements.proceedCheckout);
    }

    clickLoginRegister(){
        cy.clickGoModals(this.elements.linktoLoginReg);
    }

    //verificar datos de la direccion de entrega
    verifyDlryName(fullname){
        cy.asserts(this.elements.fullName, fullname);
    }

    verifyDlryAddress(address){
        //se verifica unicamente el dato Address1
        cy.get(this.elements.labelAddress).eq(1).should('contain', address);
    }

    verifyDlrLocation(location) {
        cy.get('#address_delivery li.address_city.address_state_name.address_postcode')
          .invoke('text')
          .then((text) => {
            const cleanedText = text.replace(/\s+/g, ' ').trim(); // Reemplaza saltos y tabs por un solo espacio
            expect(cleanedText).to.contain(location);
        });
      }

    verifyDlryCountry(country){
        cy.asserts(this.elements.labelCountry, country)
    }

    verifyDlryPhone(phone){
        cy.asserts(this.elements.labelPhone, phone)
    }

    verifyAddressDelivery(name, address, location, country, phone){
        this.verifyDlryName(name);
        this.verifyDlryAddress(address);
        this.verifyDlrLocation(location);
        this.verifyDlryCountry(country);
        this.verifyDlryPhone(phone);
    }

    //verificar direccion de facturacion****************************************************************/
    verifyBllngName(fullname){
        cy.asserts(this.elements.bllngfullName, fullname);
    }

    verifyBllngAddress(address){
        //se verifica unicamente el dato Address1
        cy.get(this.elements.bllnglabelAddress).eq(1).should('contain', address);
    }

    verifyBllngLocation(location) {
        cy.get(this.elements.bllnglocation)
          .invoke('text')
          .then((text) => {
            const cleanedText = text.replace(/\s+/g, ' ').trim(); // Reemplaza saltos y tabs por un solo espacio
            expect(cleanedText).to.contain(location);
        });
      }

    verifyBllngCountry(country){
        cy.asserts(this.elements.bllnglabelCountry, country)
    }

    verifyBllngPhone(phone){
        cy.asserts(this.elements.bllnglabelPhone, phone)
    }

    verifyAddressBilling(name, address, location, country, phone){
        this.verifyBllngName(name);
        this.verifyBllngAddress(address);
        this.verifyBllngLocation(location);
        this.verifyBllngCountry(country);
        this.verifyBllngPhone(phone);
    }
    //********************************************************************************************************************* */

    typeCommentOrder(comments){
        cy.writeData(this.elements.commentOrder, comments)
    }

    clickPlaceOrder(){
        cy.clickGo(this.elements.btnPlaceOrder);
    }

    clickDeleteProduct(id){
        this.elements.btnDeleteProd(id).click();
    }

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
    

    productNotVisible(id){
        this.elements.productsInCart(id).should('not.exist');
    }

    productIsVisible(id) {
        return cy.get('body').then(($body) => {
            // Si el selector existe, el producto está visible
            if ($body.find(this.elements.productsInCart(id)).length > 0) {
                return true;
            }
            return false;
        });
    }

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
    
    clickDwloadInvoice(){
        cy.clickGo(this.elements.btnDwldInvoice);
    }
    
}

module.exports = new cart();