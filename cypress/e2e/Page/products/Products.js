class products {
    elements = {
        btnProducts: 'li a[href="/products"]',
        labelTitle: 'div.features_items h2.title.text-center',
        msgTitle: 'All Products',
        listProducts: 'div.features_items',
        btnViewProduct: (id) => cy.get(`a[href="/product_details/${id}"]`),

        //elementos de detalle del producto
        nameProduct: 'div.product-information h2',
        categoryProduct: 'div.product-information p',
        priceProduct: 'div.product-information span span',
        availabilityProduct: 'div.product-information b:contains("Availability:")',
        conditionProduct: 'div.product-information b:contains("Condition:")',
        brandProduct: 'div.product-information b:contains("Brand:")',

        //Búsqueda de productos
        searchProduct: '#search_product',
        btnSearch: '#submit_search',
        msgSearched: 'Searched Products',

        //hover productos
        hoverProducts: (idProduct) => cy.get(`img[src="/get_product_picture/${idProduct}"]`),

        //categorias de productos para filtrar
        sectionCategorys: 'div.left-sidebar #accordian',
        selectCategory: (category) => cy.get(`a[href="#${category}"]`),
        //div para verificar si las opciones de la categoria ya son visibles
        panelSubcategorys: 'div.panel-body',
        selectSubCategory: (category, subcategory) => cy.get(`#${category} ul li a:contains("${subcategory}")`),
       
        //marcas de productos
        sectionBrands: 'div.brands_products',
        selectBrand: (brand) => cy.get(`a[href="/brand_products/${brand}"]`),
        getProductbyId: 'a.btn.add-to-cart[data-product-id]',

        //reseña de productos
        lblWriteReview: 'li.active a[href="#reviews"]',
        msgReview: 'Write Your Review',
        inputName: '#name',
        inputEmail: '#email',
        inputreview: '#review',
        btnSbmitReview: '#button-review',
        msgAlertSuccess: 'Thank you for your review.',

        //Productos recomendados
        lblRecomendedItems: 'div.recommended_items h2.title.text-center',
        msgRecomended: 'recommended items',
    }

    //para las pruebas de productos se usan comandos personalizados
    clickProducts(){
        cy.clickGo(this.elements.btnProducts);
    }

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

    verifyListProducts(){
        cy.isVisible(this.elements.listProducts);
    }

    //es necesario las comillas de interpolación para interpretación de la variable idproduct
    clickViewProduct(idProduct){
        cy.get(`a[href="/product_details/${idProduct}"]`).click();
    }

    verifyNameProduct(){
        cy.isVisible(this.elements.nameProduct);
    }

    verifyCategoryProduct(){
        cy.isVisible(this.elements.categoryProduct);
    }

    verifyPriceProduct(){
        cy.isVisible(this.elements.priceProduct)
    }

    verifyAvailabilityProd(){
        cy.isVisible(this.elements.availabilityProduct);
    }

    verifyConditionProd(){
        cy.isVisible(this.elements.conditionProduct);
    }

    verifyBrandProduct(){
        cy.isVisible(this.elements.brandProduct);
    }

    verifyDetailProducts(){
        this.verifyNameProduct();
        this.verifyCategoryProduct();
        this.verifyPriceProduct();
        this.verifyAvailabilityProd();
        this.verifyConditionProd();
        this.verifyBrandProduct();
    }

    //bpusqueda de productos
    typeSearchProduct(productSearch){
        cy.writeData(this.elements.searchProduct, productSearch);
    }

    clickSearchProduct(){
        cy.clickGo(this.elements.btnSearch);
    }

    verifySearched(){
        cy.asserts(this.elements.labelTitle, this.elements.msgSearched)
    }

    //Hacer hover sobre un producto
    hoverProduct(idProduct){
        this.elements.hoverProducts(idProduct).trigger('mouseover');
    }

    verifySectionCategorys(){
        cy.isVisible(this.elements.sectionCategorys);
    }

    clickSelectCategory(category){
        this.elements.selectCategory(category).click();
    }

    panelSubcVisible(){
        cy.isVisible(this.elements.panelSubcategorys);
    }

    selectSubct(category, subcategory){
        this.panelSubcVisible();
        this.elements.selectSubCategory(category, subcategory).should('be.visible').click();
    }

    verifyTitleCatg(categoria, subcategory){
        cy.asserts(this.elements.labelTitle, 
            categoria + " - " + subcategory + " Products"
        )
    }

    selectPrctsforCatg(category, subcategory){
        this.clickSelectCategory(category);
        //seleccionamos el tipo de ropa
        this.selectSubct(category, subcategory);
        //verificar el titulo luego de selecciona categoria
        this.verifyTitleCatg(category, subcategory);
    }

    VerifySectionBrands(){
        cy.isVisible(this.elements.sectionBrands);
    }

    clickSelectBrand(brand){
        this.elements.selectBrand(brand).click();
    }

    verifyTitleBrands(brand){
        cy.asserts(this.elements.labelTitle, 'Brand - ' + brand + ' Products');
    }

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

    clickViewProduct(id){
        this.elements.btnViewProduct(id).click();
    }

    verifyWriteReview(){
        cy.asserts(this.elements.lblWriteReview, this.elements.msgReview)
    }

    typeNameReview(name){
        cy.writeData(this.elements.inputName, name);
    }

    typeEmailReview(email){
        cy.writeData(this.elements.inputEmail, email);
    }

    typeReview(review){
        cy.writeData(this.elements.inputreview, review);
    }

    clickSubmitReview(){
        cy.clickGo(this.elements.btnSbmitReview);
    }
    
    verifyAlertReview(){
        cy.assertAlert(this.elements.msgAlertSuccess)
    }

    verifyRecomendedTitle(){
        cy.asserts(this.elements.lblRecomendedItems, this.elements.msgRecomended);
    }
}

module.exports = new products();