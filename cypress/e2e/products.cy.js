/// <reference types="cypress"/>

import products from "./Page/products/Products";
import cart from "./Page/cart/Cart";
import pageLogin from "./Page/automation_excercise/Login";
import homePage from "./Page/automation_excercise/HomePage";
import signupPage from "./Page/automation_excercise/Register"

/* NOTA IMPORTANTE
    *Contiene los casos de prueba 8,9, 18 al 21
    *Usa los archivos data_categoryproducts.json, data_loginuser y data_writereview para reseñas login y categoria de productos
    *Para el test case 8 indicar en variable "idDetailProd" de data_categoryproducts.json indicar el id del producto para ver detalles
    *Para el Test Case 9 indicar en data_categoryproducts.json indicar el texto para la busqueda en el dato searchProduct
    *Para los Tests 18 y 19 indicar en data_categoryproducts.json las categorias y marcas.
    *Para el Test 20 Verificar que el usuario a usar no tenga los productos agregados al carrito.
    *Para el Test 21 indicar en data_writereview.json los datos para la reseña de un producto
*/
describe('Template Products', () =>{

    //Variables para almacenar datos para los tests
    var dataCategorys, datalogin, dataReview;

    beforeEach('passes', () =>{
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
        //Datos de la reseña de producto
        cy.fixture('././data_writereview')
        .then((datos) =>{
            dataReview = datos;
        })
    });

    it('Test Case 8: Details Products', ()=>{
        cy.loadPagehome(); //Command personalizado

        products.clickProducts();
        products.verifyLoadProducts();
        products.verifyListProducts();
        products.clickViewProduct(dataCategorys.idDetailProd);
        products.verifyDetailProducts();
    })

    it('Test Case 9: Search Products', ()=>{

        cy.loadPagehome(); //Command personalizado

        products.clickProducts();
        products.verifyLoadProducts();
        // searchProduct dato que contiene el texto de la busqueda
        products.searchProducts(dataCategorys.searchProduct);
    })

    it('Test Case 18: View Products Category', ()=>{

        cy.loadPagehome(); //Command personalizado

        products.verifySectionCategorys();
        products.selectPrctsforCatg(dataCategorys.category, dataCategorys.subcategory);
        //Cambiar de categoria
        products.selectPrctsforCatg(dataCategorys.changeCatg, dataCategorys.changeSubctg);
    });

    it('Test Case 19: Products for Brands', () =>{

        cy.loadPagehome(); //Command personalizado

        //ir a productos
        products.clickProducts();
        products.VerifySectionBrands();
        products.selectProductsforBrand(dataCategorys.brand);
        //Cambiar a otra marca
        products.selectProductsforBrand(dataCategorys.changeBrand);

    });

    /**
     * NOTA IMPORTANTE:
     * Este test requiere que el usuario con email ${datalogin.email} NO tenga productos agregados al carrito.
     * De lo contrario, el conteo de productos puede fallar. 
     * Se recomienda usar un usuario nuevo o limpiar el carrito antes de ejecutar esta prueba.
     */
    it('Test Case 20: Search Products & Verify Cart After Login', () =>{

        cy.loadPagehome(); //Command personalizado

        //Ir a productos
        products.clickProducts();
        products.verifyLoadProducts();
        //Verificar o cambiar texto de busqueda
        products.searchProducts(dataCategorys.searchProduct);

        //AGREGAR LOS PRODUCTOS DE LA BUSQUEDA AL CARRITO
        products.getSearchResultProductIds().then((productsID) => {
            //A causa de duplicidad de elementos en la pagina Automation Excersice, 
            // se limpia el array para obtener un array limpio (sin duplicados)
            const uniqueIds = Cypress._.uniq(productsID); // <<< aquí limpiamos duplicados

           //Agregar los prductos según el array
            cart.addProductsAndGoToCart(uniqueIds,
                (id) => products.hoverProduct(id),
                () => cart.clickCartinMenu()
            );
        
            //Verificar los productos agregados
            const productCounts = cart.countProductsQuantitie(uniqueIds);
            cart.verifyProductsinCart(productCounts);

            //Iniciar sesión
            homePage.clickLoginRegister();
            pageLogin.verifyLabelLogin();
            pageLogin.loginUser(datalogin.email, datalogin.password);
            signupPage.verifyLogged(datalogin.name_user);

            //verificar nuevamente los productos
            cart.clickCartinMenu();
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

        cy.loadPagehome(); //Command personalizado

        //Ir a productos
        products.clickProducts();
        products.verifyLoadProducts();

        products.verifyListProducts();
        products.clickViewProduct(dataReview.idProduct);
        products.verifyWriteReview();
        //llenar reseña
        products.sendReviewProduct(dataReview.name, dataReview.email, dataReview.review);
        
    });

})