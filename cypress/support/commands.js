import signupPage from '../e2e/Page/automation_excercise/Register'
import homePage from '../e2e/Page/automation_excercise/HomePage'
import pageLogin from '../e2e/Page/automation_excercise/Login'

Cypress.Commands.add('writeData', (selector, dato) => {
    cy.get(selector).clear().type(dato)
})

Cypress.Commands.add('clickGo', (selector) => {
    cy.get(selector).click();
})

Cypress.Commands.add('clickGoModals', (selector) => {
    cy.get(selector)
    .filter(':visible')
    .realClick();
})

Cypress.Commands.add('asserts', (selector, message) =>{
    cy.get(selector).should('contain', message)
})

Cypress.Commands.add('isVisible', (selector) =>{
    cy.get(selector).should('be.visible')
})

//funcion para eliminar una cuenta
Cypress.Commands.add('deleteAccount', ()=>{
    signupPage.clickDelete();
    signupPage.verifyDeleted();
    signupPage.clickContinue();
})

//funcion para verificar el load de la pagina para loguear
Cypress.Commands.add('loadPageLogin', ()=>{
    //verificar carga correcta la pagina home
    homePage.verifyLoadPage();
    //click en el boton login
    homePage.clickLoginRegister();
    //verificar que carga la pagina de login
    pageLogin.verifyLabelLogin();
})

//funcion para verificar el load de la pagina para registrar un nuevo usuario
Cypress.Commands.add('loadPageRegister', ()=>{
    //verificar carga correcta la pagina home
    homePage.verifyLoadPage();
    //click en el boton login
    homePage.clickLoginRegister();
    //verificar que carga la pagina de login para registrar
    pageLogin.verifyLabelRegister();
})

//funcion para verificar el load de la pagina home
Cypress.Commands.add('loadPagehome', ()=>{
    //verificar carga correcta la pagina home
    homePage.verifyLoadPage();
})

//Verificar una alerta simple
Cypress.Commands.add('assertAlert', (message) =>{
    cy.contains(message).should('be.visible');
})

//Hacer scroll hasta el final de la pagina
Cypress.Commands.add('scrollDown', (time)=>{
    cy.scrollTo('bottom', {duration: time})
})
//Hacer scroll hasta el inicio de la pagina
Cypress.Commands.add('scrollUp', (time)=>{
    cy.scrollTo('top', {duration: time})
})