/// <reference types="cypress"/>

import products from "./Page/products/Products";
import cart from "./Page/cart/Cart";
import pageLogin from "./Page/automation_excercise/Login";
import homePage from "./Page/automation_excercise/HomePage";
import signupPage from "./Page/automation_excercise/Register"

describe('Template Products', () =>{

    var dataCategorys, datalogin, dataReview;
    beforeEach('passes', () =>{
        //limpiar cache antes de ejecutar cada test
        cy.visit('/');

        //conexion a datos de la categoria de productos
        cy.fixture('././data_categoryproducts')
        .then((datos) =>{
            dataCategorys = datos;
        });
        //datos del login
        cy.fixture('././data_loginuser')
        .then((datos) =>{
            datalogin = datos;
        });
        cy.fixture('././data_writereview')
        .then((datos) =>{
            dataReview = datos;
        })
    });

    it('Test Case 8: Products', ()=>{

        //verificar load de la pagina
        cy.loadPagehome(); //comando personalizado

        //Acciones en la pagina products
        products.clickProducts();
        products.verifyLoadProducts();
        products.verifyListProducts();
        //indicar el id del producto para dar en "view product"
        products.clickViewProduct(1);

        //verificar los detalles del producto
        products.verifyDetailProducts();
    })

    it('Test Case 9: Search Products', ()=>{
        //INGRESAR EL TEXTO DE BUSQUEDA EN EL DATO searchProduct EN EL ARCHIVO data_categoryproducts.json
        //verificar load de la pagina
        cy.loadPagehome(); //comando personalizado
        //Acciones en la pagina products
        products.clickProducts();
        products.verifyLoadProducts();

        //Búsqueda de productos. Ingresar el producto a buscar
        products.searchProducts(dataCategorys.searchProduct);
    })

    it('Test Case 18: View Products Category', ()=>{

        //verificar carga de homepage
        cy.loadPagehome();

        //verificar que las categorias estan visibles
        products.verifySectionCategorys();

        //SELECCIIONAR  PRODUCTOS POR CATEGORIA
        //Ajustar las categorias en el archivo data_categoryproducts.json
        products.selectPrctsforCatg(dataCategorys.category, dataCategorys.subcategory);

        //cambiar a la categoria Men y seleccionar una categoria
        products.selectPrctsforCatg(dataCategorys.changeCatg, dataCategorys.changeSubctg);
    });

    it('Test Case 19: Products for Brands', () =>{
        //Verificar load de homepag
        cy.loadPagehome();

        //ir a productos
        products.clickProducts();

        //verificar las marcas
        products.VerifySectionBrands();
        //Buscar productos por marca
        products.selectProductsforBrand(dataCategorys.brand);

        //ingresar otra marca
        products.selectProductsforBrand(dataCategorys.changeBrand);

    });

    /**
     * NOTA IMPORTANTE:
     * Este test requiere que el usuario con email ${datalogin.email} NO tenga productos agregados al carrito.
     * De lo contrario, el conteo de productos puede fallar. 
     * Se recomienda usar un usuario nuevo o limpiar el carrito antes de ejecutar esta prueba.
     */
    it('Test Case 20: Search Products & Verify Cart After Login', () =>{
        //INGRESAR EL TEXTO DE BUSQUEDA EN EL DATO searchProduct EN EL ARCHIVO data_categoryproducts.json
       
        cy.loadPagehome();

        products.clickProducts();

        //Verificar la pagina all products
        products.verifyLoadProducts();

        //Realizar la busqueda de un producto.
        products.searchProducts(dataCategorys.searchProduct);

        //****************AGREGAR LOS PRODUCTOS DE LA BUSQUEDA AL CARRITO****************************** */
        products.getSearchResultProductIds().then((productsID) => {
            //como los arrays vienen duplciados por duplicidad de elementos en la pagina Automation Excersice, 
            // hacemos una limpieza para obtener el array limpio (sin duplicados)
            const uniqueIds = Cypress._.uniq(productsID); // <<< aquí limpiamos duplicados

           // Aquí ya tienes los IDs listos para usar
            cart.addProductsAndGoToCart(uniqueIds,
                (id) => products.hoverProduct(id),
                () => cart.clickCartinMenu()
            );
        
            const productCounts = cart.countProductsQuantitie(uniqueIds);
            cart.verifyProductsinCart(productCounts);

            homePage.clickLoginRegister();
            pageLogin.verifyLabelLogin();
            pageLogin.typeEmailLogin(datalogin.email);
            pageLogin.typePasswordLogin(datalogin.password);
            pageLogin.clickLogin();
            signupPage.verifyLogged(datalogin.name_user);

            //verificar nuevamente los productos
            cart.clickCartinMenu();
            //productCounts = cart.countProductsQuantitie(arrayProducts);
            cart.verifyProductsinCart(productCounts);
        })
    });

    //EN DESARROLLO*******************************************************/
    it.skip('Test Case 20: Search Products & Verify Cart After Login v1.1', () => {
        //HACER QUE SE VACIEN LOS PRODUCTOS DEL CARRITO SI YA ESTAN PARA VOLVER A AÑADIRLOS Y QUE LA VERIFICACION FINAL DE LOS
        //PRODUCTOS NO FALLE
        cy.loadPagehome();
        products.clickProducts();
        products.verifyLoadProducts();
        products.searchProducts(dataCategorys.searchProduct);
        products.verifyListProducts();
    
        products.getSearchResultProductIds().then((productsID) => {
            const uniqueIds = Cypress._.uniq(productsID);
    
            cart.addProductsAndGoToCart(
                uniqueIds,
                (id) => products.hoverProduct(id),
                () => cart.clickCartinMenu()
            );
    
            const productCounts = cart.countProductsQuantitie(uniqueIds);
            cart.verifyProductsinCart(productCounts);
    
            //Login
            homePage.clickLoginRegister();
            pageLogin.verifyLabelLogin();
            pageLogin.typeEmailLogin(datalogin.email);
            pageLogin.typePasswordLogin(datalogin.password);
            pageLogin.clickLogin();
            signupPage.verifyLogged(datalogin.name_user);
    
            // 🧹 Eliminar si quedaron productos viejos de otra sesión
            cart.clickCartinMenu();
            cart.removeProductsFromCart(uniqueIds);

            //buscar los productos
            products.clickProducts();
            products.searchProducts(dataCategorys.searchProduct);

            cart.addProductsAndGoToCart(
                uniqueIds,
                (id) => products.hoverProduct(id),
                () => cart.clickCartinMenu()
            );
    
            // ✅ Verificar productos finales en carrito
            cart.verifyProductsinCart(productCounts);
        });
    });    
    
    it('Test Case 21: Add Review of Product', () =>{
        cy.loadPagehome();
        products.clickProducts();
        products.verifyLoadProducts();

        //seleccionar un producto
        products.verifyListProducts();
        //Indicar id del producto en data_writereview.json
        products.clickViewProduct(dataReview.idProduct);
        products.verifyWriteReview();

        //llenar reseña
        products.typeNameReview(dataReview.name);
        products.typeEmailReview(dataReview.email);
        products.typeReview(dataReview.review);
        products.clickSubmitReview();
        products.verifyAlertReview();
        
    });

})