/// <reference types="cypress"/>

import subscription from "./Page/suscription/Subscription";
import cart from "./Page/cart/Cart";

describe('Template Subscription', () =>{

    var data;

    beforeEach('passes', ()=>{
        cy.visit('/');
        
        //conexion al json de datos
        cy.fixture('././data_subscription')
        .then((datos)=>{
            data = datos;
        })
    })

    it('Test Case 10: Subscription', () =>{
        //verificar load del home
        cy.loadPagehome();

        //sroll al pie de pagina. Indicar la duración del scroll en el archivo data_subscription.json
        cy.scrollDown(data.duration);

        //suscribirse
        subscription.verifyTitleSubs();
        //ingresar el email para suscribirse en el archivo data_subscription.json
        subscription.typeEmailSubs(data.emailSubs);
        subscription.clickSubscribe();
        subscription.verifyAlertSuccess();
    })

    it('Test Case 11: Subscription in cart', () =>{
        //verificar load del home
        cy.loadPagehome();

        
        //click en el carrito en el menu de opciones
        cart.clickCart();

        //sroll al pie de pagina. Indicar la duración del scroll en el archivo data_subscription.json
        cy.scrollDown(2000);

        //suscribirse
        subscription.verifyTitleSubs();
        //ingresar el email para suscribirse en el archivo data_subscription.json
        subscription.typeEmailSubs(data.emailCart);
        subscription.clickSubscribe();
        subscription.verifyAlertSuccess();
    })
})