class suscription{
    elements = {
        //Selector del titulo de la sección suscripción
        labelSubscription: 'div.single-widget h2',
        //Texto del titulo de la sección suscripcion
        msgSubscription: 'Subscription',
        //Selector del campo email de suscripcion
        inputSubs: '#susbscribe_email',
        //Selector del botón de enviar suscripcion
        btnSubs: '#subscribe',
        //Texto de la alerta de envío exitoso
        msgSuccess: 'You have been successfully subscribed!'
    }

    //Verificar el titulo de la sección susscripcion
    verifyTitleSubs(){
        cy.asserts(this.elements.labelSubscription, this.elements.msgSubscription);
    }

    //Escribir el email
    typeEmailSubs(email){
        cy.writeData(this.elements.inputSubs, email);
    }

    //Click en el botón de enviar suscipción
    clickSubscribe(){
        cy.clickGo(this.elements.btnSubs);
    }

    //Acción de enviar una suscripción
    sendSubscription(email){
        this.typeEmailSubs(email);
        this.clickSubscribe();
    }

    //Verificar que la alerta de exito es visible
    verifyAlertSuccess(){
        cy.contains(this.elements.msgSuccess).should('be.visible');
    }
}

module.exports = new suscription();