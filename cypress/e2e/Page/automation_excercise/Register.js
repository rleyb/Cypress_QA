class signupPage{
    elements={
        titlePage: () => cy.get('div.login-form h2.title.text-center'),
        msgTitlePage: 'Enter Account Information',
        radioTitle: () => cy.get('#id_gender1'),
        radioTitle2: () => cy.get('#id_gender2'),
        inputPassword: () => cy.get('#password'),
        cbDays: () => cy.get('#days'),
        cbMonths: () => cy.get('#months'),
        cbYears: () => cy.get('#years'),
        boxNewsletter: () => cy.get('#newsletter'),
        boxOffers: () => cy.get('#optin'),
        inputFirtName: () => cy.get('#first_name'),
        inputLastName: () => cy.get('#last_name'),
        inputCompany: () => cy.get('#company'),
        inputAddress: () => cy.get('#address1'),
        cbCountry: () => cy.get('#country'),
        inputState: () => cy.get('#state'),
        inputCity: () => cy.get('#city'),
        inputZipcode: () => cy.get('#zipcode'),
        inputMobile: () => cy.get('#mobile_number'),
        btnCreate: () => cy.get('button[data-qa="create-account"]'),

        //elementos para verificacion de la creacion de cuenta
        labelCreated: () => cy.get('h2[data-qa="account-created"]'),
        msgCreated:'Account Created!',
        btnContinue: () => cy.get('a[data-qa="continue-button"]'),
        labelLogged: () => cy.contains('li', 'Logged in as'),

        //eliminacion de la cuenta
        btnDelete: () => cy.get('a[href="/delete_account"]'),
        labelDeleted: () => cy.get('h2[data-qa="account-deleted"]'),
        msgDeleted: 'Account Deleted!'
    }

    verifyTitlePage(){
        this.elements.titlePage().should('contain', this.elements.msgTitlePage)
    }

    clickTitle(){
        this.elements.radioTitle().click();
    }

    clickTitleMrs(){
        this.elements.radioTitle2().click();
    }

    typePassword(password){
        this.elements.inputPassword().type(password);
    }

    selectDay(value){
        this.elements.cbDays().select(value)
    }
    selectMonths(value){
        this.elements.cbMonths().select(value)
    }
    selectYears(value){
        this.elements.cbYears().select(value)
    }

    clickNewsletter(){
        this.elements.boxNewsletter().click();
    }

    clickOffers(){
        this.elements.boxOffers().click();
    }

    typeFirstName(firstName){
        this.elements.inputFirtName().type(firstName);
    }

    typelastName(lastName){
        this.elements.inputLastName().type(lastName);
    }

    typeCompany(company){
        this.elements.inputCompany().type(company);
    }

    typeAddress(address){
        this.elements.inputAddress().type(address);
    }

    selectCountry(value){
        this.elements.cbCountry().select(value)
    }

    typeState(state){
        this.elements.inputState().type(state);
    }

    typeCity(city){
        this.elements.inputCity().type(city);
    }

    typeZipcode(zipcode){
        this.elements.inputZipcode().type(zipcode);
    }

    typeMobile(mobile){
        this.elements.inputMobile().type(mobile);
    }

    clickCreate(){
        this.elements.btnCreate().click();
    }

    verifyCreation(){
        this.elements.labelCreated().should('contain', this.elements.msgCreated)
    }

    clickContinue(){
        this.elements.btnContinue().click();
    }

    verifyLogged(name){
        this.elements.labelLogged()
        .find('b')
        .should('have.text',name)
    }

    clickDelete(){
        this.elements.btnDelete().click();
    }

    verifyDeleted(){
        this.elements.labelDeleted().should('contain', this.elements.msgDeleted)
    }

    ///usar el mismo click del continua creado anteriormente
    fillDataUser(functionradioTitle, password, day, month, year, first_name, last_name,
        company, address, country, state, city, zipcode, mobile_number
    ){
        //llama la funcion si es title Mr. o Mrs.
        functionradioTitle();
        this.typePassword(password);
        this.selectDay(day);
        this.selectMonths(month);
        this.selectYears(year);
        this.clickNewsletter();
        this.clickOffers();
        this.typeFirstName(first_name);
        this.typelastName(last_name);
        this.typeCompany(company)
        this.typeAddress(address);
        this.selectCountry(country);
        this.typeState(state);
        this.typeCity(city);
        this.typeZipcode(zipcode);
        this.typeMobile(mobile_number);
    }

    createAccount(){
        this.clickCreate();
        //verificar creacion de la cuenta
        this.verifyCreation();
        this.clickContinue();
    }
}

module.exports = new signupPage()