//HACER LAS ACCIONES DEL LOGIN INTEGRANDO LOS COMANDOS PERSONALIZADOS

class pageLogin{
    elements = {
        //selectores usados para crear acciones que usen comandos personalizados
        //titulo de login
        labelLogin: 'div.login-form h2',
        //texto del titulo de titulo de login
        msgLogin: 'Login to your account',
        //campo de email para login
        emailLogin: '[data-qa="login-email"]',
        //campo de password para login
        passwordLogin: 'input[data-qa="login-password"]',
        //botón para inciar sesión
        btnLogin: '[data-qa="login-button"]',
        //Mensaje de error al hacer login incorrecto
        errorMsg: 'form[action="/login"] p[style="color: red;"]',
        //Texto de mensaje de error al hacer login incorrecto
        msgError: 'Your email or password is incorrect!',
        //Botón de cerrar sesión o logout
        btnLogout: 'a[href="/logout"]',
        //Mensaje de error cuando se registra con un email existente o ya regisstrado
        errorMsgRegister: 'form[action="/signup"] p[style="color: red;"]',
        //Texto del mensaje de error de registro con email existente
        msgErrorRegister: 'Email Address already exist!',

        //Elementos para el registro de un nuevo usuario en pagina de login
        //titulo de iniciar un nuevo registro en la pagina del login
        labelRegister: () => cy.get('.signup-form h2'),
        //texto de mensaje de titulo para inciar nuevo registro de usuario
        msgLabelRegister: 'New User Signup!',
        //Campo para digitar nombre para nuevo registro
        nameRegister: '[data-qa="signup-name"]',
        //Campo para digitar el email para un nuevo registro
        emailRegister: () => cy.get('[data-qa="signup-email"]'),
        //Botón para confirmar la creación de nuevo registro
        btnRegister: () => cy.get('[data-qa="signup-button"]')

    }

    //escribir el email para login
    typeEmailLogin(email){
        this.elements.emailLogin().type(email);
    }

    //Escrbir el password para login
    typePasswordLogin(password){
        this.elements.passwordLogin().type(password);
    }

    //Click en el botón login
    clickBtnLogin(){
        this.elements.btnLogin().click()
    }

    //Verificar el titulo para empezar el nuevo registro
    verifyLabelRegister(){
        this.elements.labelRegister().should('contain', this.elements.msgLabelRegister)
    }

    //Escribir el nombre del nuevo usuario para registrar
    typeNameRegister(name){
        //comando personalizado: writedata
        cy.writeData(this.elements.nameRegister, name) //ejemplo de integracinón de un comando
    }

    //Escribir el email del nuevo usuario para registrar
    typeEmailRegister(email){
        this.elements.emailRegister().type(email);
    }

    //Click para continuar con el registro del nuevo usuario
    clickBtnRegister(){
        this.elements.btnRegister().click()
    }

    //Verificar el titulo para loguin
    verifyLabelLogin(){
        cy.asserts(this.elements.labelLogin, this.elements.msgLogin)
    }

    //Escribir email para login
    typeEmailLogin(email){
        cy.writeData(this.elements.emailLogin, email) //ejemplo de integracinón de un comando
    }

    //Escribir password para login
    typePasswordLogin(password){
        cy.writeData(this.elements.passwordLogin, password) //ejemplo de integracinón de un comando
    }

    //Click para Login
    clickLogin(){
        cy.clickGo(this.elements.btnLogin)
    }

    //Verificar mensaje de error al hacer login incorrecto
    verifyMessageError(){
        cy.asserts(this.elements.errorMsg, this.elements.msgError)
    }

    //Click para cerrar sesión
    clickLogout(){
        cy.clickGo(this.elements.btnLogout)
    }

    //Verificar mensaje de error para registro con email existente
    verifyMsgErrorRegister(){
        cy.asserts(this.elements.errorMsgRegister, this.elements.msgErrorRegister)
    }

    //LLenar datos para crear una cuenta
    createNewUser(name, email){
        this.typeNameRegister(name);
        this.typeEmailRegister(email);
        this.clickBtnRegister();
    }

    //Iniciar Sesión con una cuenta
    loginUser(email, password){
        this.typeEmailLogin(email);
        this.typePasswordLogin(password);
        this.clickLogin();
    }
}

module.exports = new pageLogin();