/// <reference types="cypress"/>

import subscription from "./Page/suscription/Subscription";
import cart from "./Page/cart/Cart";

/* NOTA IMPORTANTE
    *Contiene los casos de prueba 10 y 11
    *Modifique de subscripción en el archivo data_subscription.json
*/
describe('Template Subscription', () =>{
    //variable para guardar los datos de la subscripción
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
        cy.loadPagehome(); //Command personalizado
        cy.scrollDown(data.duration); //Command personalizado

        subscription.verifyTitleSubs();
        subscription.sendSubscription(data.emailSubs);
        subscription.verifyAlertSuccess();
    })

    it('Test Case 11: Subscription in cart', () =>{
        //verificar load del home
        cy.loadPagehome(); //Command personalizado
        //Ir al carrito
        cart.clickCart();
        cy.scrollDown(data.duration);

        //suscribirse
        subscription.verifyTitleSubs();
        subscription.sendSubscription(data.emailCart);
        subscription.verifyAlertSuccess();
    })
})