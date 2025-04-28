class signupPage{
    
    elements={
        //Selector de Titulo de la pagina par nuevo registro
        titlePage: () => cy.get('div.login-form h2.title.text-center'),
        //Texto de titulo para nuevo registro
        msgTitlePage: 'Enter Account Information',
        //Selector de campo title Mr.
        radioTitle: () => cy.get('#id_gender1'),
        //Selector de campo title Mrs.
        radioTitle2: () => cy.get('#id_gender2'),
        //Selector de campo password de nuevo usuario
        inputPassword: () => cy.get('#password'),
        //Selector de combo box "Day"
        cbDays: () => cy.get('#days'),
        //Selector de combo box "Month"
        cbMonths: () => cy.get('#months'),
        //Selector de combo box "Year"
        cbYears: () => cy.get('#years'),
        //Selector de casilla "Sign up for our newsletter!"
        boxNewsletter: () => cy.get('#newsletter'),
        //Selector de casilla "Receive special offers from our partners!"
        boxOffers: () => cy.get('#optin'),
        //Selector de campo "First name" del nuevo usuario
        inputFirtName: () => cy.get('#first_name'),
        //Selector de campo "Last name" del nuevo usuario
        inputLastName: () => cy.get('#last_name'),
        //Selector de campo "Company" del nuevo usuario
        inputCompany: () => cy.get('#company'),
        //Selector de campo "Address" del nuevo usuario (no se usa Adress en la automatización)
        inputAddress: () => cy.get('#address1'),
        //Selector del combo box "Country" del nuevo usuario
        cbCountry: () => cy.get('#country'),
        //Selector del campo "State" del nuevo usuario
        inputState: () => cy.get('#state'),
        //Selector del campo "City" del nuevo usuario
        inputCity: () => cy.get('#city'),
        //Selector del campo "zipcode" del nuevo usuario
        inputZipcode: () => cy.get('#zipcode'),
        //Selector del campo "Mobile number" del nuevo usuario
        inputMobile: () => cy.get('#mobile_number'),
        //Selector del botón "Creat account"
        btnCreate: () => cy.get('button[data-qa="create-account"]'),

        //Selector del titulo "Account created"
        labelCreated: () => cy.get('h2[data-qa="account-created"]'),
        //Texto del titulo de cuenta creada
        msgCreated:'Account Created!',
        //Selector del botón "continue"
        btnContinue: () => cy.get('a[data-qa="continue-button"]'),
        //Selector del texto de usuario logueado "Loggued in as username"
        labelLogged: () => cy.contains('li', 'Logged in as'),

        //Selector del boton de eliminar cuenta
        btnDelete: () => cy.get('a[href="/delete_account"]'),
        //Selector del titulo "Account deleted"
        labelDeleted: () => cy.get('h2[data-qa="account-deleted"]'),
        //Texto del titulo de cuenta eliminada
        msgDeleted: 'Account Deleted!'
    }

    //Verificar titulo de la pagina de registro
    verifyTitlePage(){
        this.elements.titlePage().should('contain', this.elements.msgTitlePage)
    }

    //Click para seleccionar Mr.
    clickTitle(){
        this.elements.radioTitle().click();
    }

    //Click para seleccionar Mrs.
    clickTitleMrs(){
        this.elements.radioTitle2().click();
    }

    //Escribir el password
    typePassword(password){
        this.elements.inputPassword().type(password);
    }

    //Seleccionar el dia
    selectDay(value){
        this.elements.cbDays().select(value)
    }

    //Seleccionar el mes
    selectMonths(value){
        this.elements.cbMonths().select(value)
    }

    //Seleccionar el año
    selectYears(value){
        this.elements.cbYears().select(value)
    }

    //Marcar la casilla "Sign up for our newsletter!"
    clickNewsletter(){
        this.elements.boxNewsletter().click();
    }

    //Marcar la casilla "Receive special offers from our partners!"
    clickOffers(){
        this.elements.boxOffers().click();
    }

    //Escribir el "First name"
    typeFirstName(firstName){
        this.elements.inputFirtName().type(firstName);
    }

    //Escribir el "Last name"
    typelastName(lastName){
        this.elements.inputLastName().type(lastName);
    }

    //Escribir la compañia
    typeCompany(company){
        this.elements.inputCompany().type(company);
    }

    //Escribir la dirección
    typeAddress(address){
        this.elements.inputAddress().type(address);
    }

    //Seleccionar el pais
    selectCountry(value){
        this.elements.cbCountry().select(value)
    }

    //Escribir el "State"
    typeState(state){
        this.elements.inputState().type(state);
    }

    //Escribir la ciudad
    typeCity(city){
        this.elements.inputCity().type(city);
    }

    //Escribir el "Zipcode"
    typeZipcode(zipcode){
        this.elements.inputZipcode().type(zipcode);
    }

    //Escribir el numero de telefono
    typeMobile(mobile){
        this.elements.inputMobile().type(mobile);
    }

    //Click para crear la cuenta
    clickCreate(){
        this.elements.btnCreate().click();
    }

    //Verificar la creacion de la cuenta
    verifyCreation(){
        this.elements.labelCreated().should('contain', this.elements.msgCreated)
    }

    //Click para continuar
    clickContinue(){
        this.elements.btnContinue().click();
    }

    //Verificar el logueo de la cuenta
    verifyLogged(name){
        this.elements.labelLogged()
        .find('b')
        .should('have.text',name)
    }

    //Click para eliminar la cuenta
    clickDelete(){
        this.elements.btnDelete().click();
    }

    //Verificar la eliminación de la cuenta
    verifyDeleted(){
        this.elements.labelDeleted().should('contain', this.elements.msgDeleted)
    }

    //Acción para lLenar los del nuevo usuario
    fillDataUser(functionradioTitle, password, day, month, year, first_name, last_name,
        company, address, country, state, city, zipcode, mobile_number
    ){
        //Funcion que seleccion el campo Title
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

    //Acción para crear y verificar la cuenta
    createAccount(){
        this.clickCreate();
        this.verifyCreation();
        this.clickContinue();
    }
}

module.exports = new signupPage()