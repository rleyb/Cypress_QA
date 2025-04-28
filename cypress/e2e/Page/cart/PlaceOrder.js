class placeOrder {

    elements = {
        //Selector del campo "Name card"
        inputNameCard: 'input[data-qa="name-on-card"]',
        //Selector del campo de numero de tarjeta
        inputNumberCard: 'input[data-qa="card-number"]',
        //Selector del campo cvc de la tarjeta
        inputCVC: 'input[data-qa="cvc"]',
        //Selector del campo mes de la tarjeta
        inputMMExpiration: 'input[data-qa="expiry-month"]',
        //selector del campo año de expiracion de la tarjeta
        inputYYExpiration: 'input[data-qa="expiry-year"]',
        //Selector del botón para confirmar pedido
        btnPayOrder: '#submit',

        //verificación de exito de compra
        titleSuccess: 'h2[data-qa="order-placed"] b',
        msgTitle: 'Order Placed!',
        labelMsgSuccess: 'div.col-sm-9.col-sm-offset-1 p',
        msgSuccess: 'Congratulations! Your order has been confirmed!',
        btnContinue: 'a[data-qa="continue-button"]'
    }

    typeNameCard(nameCard){
        cy.writeData(this.elements.inputNameCard, nameCard);
    }

    typeNumberCard(numberCard){
        cy.writeData(this.elements.inputNumberCard, numberCard);
    }

    typeInputCVC(cvc){
        cy.writeData(this.elements.inputCVC, cvc);
    }

    typeMMExpiration(month){
        cy.writeData(this.elements.inputMMExpiration, month);
    }

    typeYYExpiration(year){
        cy.writeData(this.elements.inputYYExpiration, year);
    }

    clickPayOrder(){
        cy.clickGo(this.elements.btnPayOrder);
    }

    fillDataOrder(nameCard, numberCard, cvc, month, year){
        this.typeNameCard(nameCard);
        this.typeNumberCard(numberCard);
        this.typeInputCVC(cvc);
        this.typeMMExpiration(month);
        this.typeYYExpiration(year);
    }

    verifyTitleSuccess(){
        cy.asserts(this.elements.titleSuccess, this.elements.msgTitle);
    }

    verifyMsgSuccess(){
        cy.asserts(this.elements.labelMsgSuccess, this.elements.msgSuccess);
    }

    clickContinue(){
        cy.clickGo(this.elements.btnContinue);
    }

    VerifyOrderPlaced(){
        this.verifyTitleSuccess();
        this.verifyMsgSuccess();
        this.clickContinue();
    }
}

module.exports = new placeOrder();