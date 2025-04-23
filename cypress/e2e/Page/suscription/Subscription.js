class suscription{
    elements = {
        labelSubscription: 'div.single-widget h2',
        msgSubscription: 'Subscription',
        inputSubs: '#susbscribe_email',
        btnSubs: '#subscribe',
        msgSuccess: 'You have been successfully subscribed!'
    }

    //para estas pruebas se usan comandos personalizados
    verifyTitleSubs(){
        cy.asserts(this.elements.labelSubscription, this.elements.msgSubscription);
    }

    typeEmailSubs(email){
        cy.writeData(this.elements.inputSubs, email);
    }

    clickSubscribe(){
        cy.clickGo(this.elements.btnSubs);
    }

    verifyAlertSuccess(){
        cy.contains(this.elements.msgSuccess).should('be.visible');
    }
}

module.exports = new suscription();