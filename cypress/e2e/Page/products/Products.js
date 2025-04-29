class products {

    elements = {
        //Selector del botón para ir a la página de productos
        btnProducts: 'li a[href="/products"]',
        //Selector Título principal de la página de productos
        labelTitle: 'div.features_items h2.title.text-center',
        //Texto Título principal de la página de productos
        msgTitle: 'All Products',
        //Selector de lista de todos los productos
        listProducts: 'div.features_items',
        //Selector del botón para ver el detalle de un producto específico
        btnViewProduct: (id) => cy.get(`a[href="/product_details/${id}"]`),

        //elementos de detalle del producto
        //Selector del nombre del productos
        nameProduct: 'div.product-information h2',
        //Selector de la categoria del producto 
        categoryProduct: 'div.product-information p',
        //Selector del precio del producto
        priceProduct: 'div.product-information span span',
        //selector de la disponibilidad del producto
        availabilityProduct: 'div.product-information b:contains("Availability:")',
        //Selector de la condición del producto
        conditionProduct: 'div.product-information b:contains("Condition:")',
        //Selector de la marca del producto
        brandProduct: 'div.product-information b:contains("Brand:")',

        //Búsqueda de productos
        //Selector de la barra de busqueda
        searchProduct: '#search_product',
        //Selector del botón buscar
        btnSearch: '#submit_search',
        //Titulo de productos buscados de la pagina
        msgSearched: 'Searched Products',

        //hover productos
        //Imagen de producto para hacer hover
        hoverProducts: (idProduct) => cy.get(`img[src="/get_product_picture/${idProduct}"]`),

        //categorias de productos para filtrar
        //Selector sección lateral de categorías
        sectionCategorys: 'div.left-sidebar #accordian',
        //Selector de la categoría general (como "Women")
        selectCategory: (category) => cy.get(`a[href="#${category}"]`),
        //Selector del Panel visible con subcategorías
        panelSubcategorys: 'div.panel-body',
        //Selector de subcategoría específica (como "Dress")
        selectSubCategory: (category, subcategory) => cy.get(`#${category} ul li a:contains("${subcategory}")`),
       
        //marcas de productos
        //Selector de la sección de marcas
        sectionBrands: 'div.brands_products',
        //Selector de enlace a los productos por marca
        selectBrand: (brand) => cy.get(`a[href="/brand_products/${brand}"]`),
        //Selector de id de productos buscados
        getProductbyId: 'a.btn.add-to-cart[data-product-id]',

        //reseña de productos
        //Selector del titulo pestaña para escribir reseña
        lblWriteReview: 'li.active a[href="#reviews"]',
        //Texto titulo pestaña para escribir reseña
        msgReview: 'Write Your Review',
        //Selector del Input para nombre
        inputName: '#name',
        //Selector Input para email
        inputEmail: '#email',
        //Selector Input para texto de reseña
        inputreview: '#review',
        //Selector Botón para enviar reseña
        btnSbmitReview: '#button-review',
        //Alerta/mensaje de éxito
        msgAlertSuccess: 'Thank you for your review.',

        //Productos recomendados
        //Selector Título de sección recomendados
        lblRecomendedItems: 'div.recommended_items h2.title.text-center',
        //Texto esperado del título
        msgRecomended: 'recommended items',
    }

    //Navegación a la página de productos
    clickProducts(){
        cy.clickGo(this.elements.btnProducts);
    }

    //Verifica que el título general de la página se haya cargado
    verifyLoadProducts(){
        cy.asserts(this.elements.labelTitle, this.elements.msgTitle);
    }

    //Realizar una busqueda de productos desde la barra de busqueda
    searchProducts(nameProduc){
        this.typeSearchProduct(nameProduc);
        this.clickSearchProduct();
        this.verifySearched();
        this.verifyListProducts();
    }

    //Verifica que se liste al menos un producto
    verifyListProducts(){
        cy.isVisible(this.elements.listProducts);
    }

    //Clic para ver detalle de un producto específico por ID
    clickViewProduct(idProduct){
        this.elements.btnViewProduct(idProduct).click();
    }

    //Verificar que el nombre del producto es visible
    verifyNameProduct(){
        cy.isVisible(this.elements.nameProduct);
    }

    //Verificar que la categoria del producto es visible
    verifyCategoryProduct(){
        cy.isVisible(this.elements.categoryProduct);
    }

    //Verificar que el precio del producto es visible
    verifyPriceProduct(){
        cy.isVisible(this.elements.priceProduct)
    }

    //Verificar que la disponibilidad del producto es visible
    verifyAvailabilityProd(){
        cy.isVisible(this.elements.availabilityProduct);
    }

    //Verificar que la condicion del producto es visible
    verifyConditionProd(){
        cy.isVisible(this.elements.conditionProduct);
    }

    //Verificar que la marca del producto es visible
    verifyBrandProduct(){
        cy.isVisible(this.elements.brandProduct);
    }

    //Verificar los detalles del producto
    verifyDetailProducts(){
        this.verifyNameProduct();
        this.verifyCategoryProduct();
        this.verifyPriceProduct();
        this.verifyAvailabilityProd();
        this.verifyConditionProd();
        this.verifyBrandProduct();
    }

    //Escribe un producto en el campo de búsqueda
    typeSearchProduct(productSearch){
        cy.writeData(this.elements.searchProduct, productSearch);
    }

    //Clic en el botón de buscar productos
    clickSearchProduct(){
        cy.clickGo(this.elements.btnSearch);
    }

    // Verifica que aparezca el título "Searched Products"
    verifySearched(){
        cy.asserts(this.elements.labelTitle, this.elements.msgSearched)
    }

    //Hacer hover sobre un producto
    hoverProduct(idProduct){
        this.elements.hoverProducts(idProduct).trigger('mouseover');
    }

    //Verifica sección lateral de categorías
    verifySectionCategorys(){
        cy.isVisible(this.elements.sectionCategorys);
    }

    //Clic en categoría principal (ej. "Women")
    clickSelectCategory(category){
        this.elements.selectCategory(category).click();
    }

    //Verifica que el panel de subcategorías esté visible
    panelSubcVisible(){
        cy.isVisible(this.elements.panelSubcategorys);
    }

    //Selecciona una subcategoría (ej. "Dress")
    selectSubct(category, subcategory){
        this.panelSubcVisible();
        this.elements.selectSubCategory(category, subcategory).should('be.visible').click();
    }

    // Verifica título de la página al seleccionar subcategoría
    verifyTitleCatg(categoria, subcategory){
        cy.asserts(this.elements.labelTitle, 
            categoria + " - " + subcategory + " Products"
        )
    }

    //Flujo completo para seleccionar una categoría y verificar productos
    selectPrctsforCatg(category, subcategory){
        this.clickSelectCategory(category);
        //seleccionamos el tipo de ropa
        this.selectSubct(category, subcategory);
        //verificar el titulo luego de selecciona categoria
        this.verifyTitleCatg(category, subcategory);
    }

    //Verifica sección de marcas en el costado izquierdo
    VerifySectionBrands(){
        cy.isVisible(this.elements.sectionBrands);
    }

    //Clic en marca específica
    clickSelectBrand(brand){
        this.elements.selectBrand(brand).click();
    }

    //Verifica título de la sección de marca
    verifyTitleBrands(brand){
        cy.asserts(this.elements.labelTitle, 'Brand - ' + brand + ' Products');
    }

    //Flujo completo para seleccionar marca y verificar productos
    selectProductsforBrand(brand){
        this.clickSelectBrand(brand);
        //verificar el titulo
        this.verifyTitleBrands(brand);
        //verificar que aparezcan los productos
        this.verifyListProducts();
    }

    //obtener el id de cada producto encontrado al realizar una busqueda
    getSearchResultProductIds() {
        return cy.get(this.elements.getProductbyId).then($els => {
            //obtener el id de cada producto
            return Cypress._.map($els, el => el.getAttribute('data-product-id'));
        });
    }

    /*
    clickViewProduct(id){
        this.elements.btnViewProduct(id).click();
    }*/

    //Verifica la sección para escribir reseñas
    verifyWriteReview(){
        cy.asserts(this.elements.lblWriteReview, this.elements.msgReview)
    }

    //Escribe nombre en reseña
    typeNameReview(name){
        cy.writeData(this.elements.inputName, name);
    }

    // Escribe email en reseña
    typeEmailReview(email){
        cy.writeData(this.elements.inputEmail, email);
    }

    //Escribe mensaje de reseña
    typeReview(review){
        cy.writeData(this.elements.inputreview, review);
    }

    //Clic para enviar la reseña
    clickSubmitReview(){
        cy.clickGo(this.elements.btnSbmitReview);
    }
    
    //Verifica que aparezca el mensaje de éxito al enviar reseña
    verifyAlertReview(){
        cy.assertAlert(this.elements.msgAlertSuccess)
    }

    //Enviar una reseña de producto
    sendReviewProduct(name, email, review){
        this.typeNameReview(name);
        this.typeEmailReview(email);
        this.typeReview(review);
        this.clickSubmitReview();
        this.verifyAlertReview();
    }

    //Verifica que exista sección de productos recomendados
    verifyRecomendedTitle(){
        cy.asserts(this.elements.lblRecomendedItems, this.elements.msgRecomended);
    }
}

module.exports = new products();