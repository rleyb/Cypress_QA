//HACER LAS ACCIONES DEL LOGIN INTEGRANDO LOS COMANDOS PERSONALIZADOS

class pageLogin{
    elements = {
        //selectores usados para crear acciones que usen comandos personalizados
        labelLogin: 'div.login-form h2',
        msgLogin: 'Login to your account',
        emailLogin: '[data-qa="login-email"]',
        passwordLogin: 'input[data-qa="login-password"]',
        btnLogin: '[data-qa="login-button"]',
        errorMsg: 'form[action="/login"] p[style="color: red;"]',
        msgError: 'Your email or password is incorrect!',
        btnLogout: 'a[href="/logout"]',
        errorMsgRegister: 'form[action="/signup"] p[style="color: red;"]',
        msgErrorRegister: 'Email Address already exist!',

        //elementos para el registro de un nuevo usuario en pagina de login
        labelRegister: () => cy.get('.signup-form h2'),
        msgLabelRegister: 'New User Signup!',

        nameRegister: '[data-qa="signup-name"]', //selector del input nombre
        emailRegister: () => cy.get('[data-qa="signup-email"]'),
        btnRegister: () => cy.get('[data-qa="signup-button"]')

    }

    //acciones para el login
    typeEmailLogin(email){
        this.elements.emailLogin().type(email);
    }

    typePasswordLogin(password){
        this.elements.passwordLogin().type(password);
    }

    clickBtnLogin(){
        this.elements.btnLogin().click()
    }

    //acciones de pagina de inicio para registrar un usuario
    verifyLabelRegister(){
        this.elements.labelRegister().should('contain', this.elements.msgLabelRegister)
    }

    typeNameRegister(name){
        //comando personalizado: writedata
        cy.writeData(this.elements.nameRegister, name) //ejemplo de integracinón de un comando
    }

    typeEmailRegister(email){
        this.elements.emailRegister().type(email);
    }

    clickBtnRegister(){
        this.elements.btnRegister().click()
    }

    //Acciones creadas con comandos personalizados------------------------------------------
    //comando personalizado: writedata, clickGo, asserts
    verifyLabelLogin(){
        cy.asserts(this.elements.labelLogin, this.elements.msgLogin)
    }

    typeEmailLogin(email){
        cy.writeData(this.elements.emailLogin, email) //ejemplo de integracinón de un comando
    }

    typePasswordLogin(password){
        cy.writeData(this.elements.passwordLogin, password) //ejemplo de integracinón de un comando
    }

    clickLogin(){
        cy.clickGo(this.elements.btnLogin)
    }

    verifyMessageError(){
        cy.asserts(this.elements.errorMsg, this.elements.msgError)
    }

    clickLogout(){
        cy.clickGo(this.elements.btnLogout)
    }

    verifyMsgErrorRegister(){
        cy.asserts(this.elements.errorMsgRegister, this.elements.msgErrorRegister)
    }
    //--------------------------------------------------------------------------------------

    createNewUser(name, email){
        this.typeNameRegister(name);
        this.typeEmailRegister(email);
        this.clickBtnRegister();
    }
}

module.exports = new pageLogin();