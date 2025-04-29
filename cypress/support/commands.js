import signupPage from '../e2e/Page/automation_excercise/Register'
import homePage from '../e2e/Page/automation_excercise/HomePage'
import pageLogin from '../e2e/Page/automation_excercise/Login'

//Comando para escribir en un campo
Cypress.Commands.add('writeData', (selector, dato) => {
    cy.get(selector).clear().type(dato)
})

//Comando para dar click a un elemento
Cypress.Commands.add('clickGo', (selector) => {
    cy.get(selector).click();
})

//Comando para dar click en elementos de un modal
Cypress.Commands.add('clickGoModals', (selector) => {
    cy.get(selector)
    .filter(':visible')
    .realClick();
})

//Comando para hacer aserciones
Cypress.Commands.add('asserts', (selector, message) =>{
    cy.get(selector).should('contain', message)
})

//Comando para verificar si un elemento es visible
Cypress.Commands.add('isVisible', (selector) =>{
    cy.get(selector).should('be.visible')
})

//Comando para eliminar una cuenta
Cypress.Commands.add('deleteAccount', ()=>{
    signupPage.clickDelete();
    signupPage.verifyDeleted();
    signupPage.clickContinue();
})

//Comando para verificar carga de la pagina del login
Cypress.Commands.add('loadPageLogin', ()=>{
    //verificar carga correcta la pagina home
    homePage.verifyLoadPage();
    //click en el boton login
    homePage.clickLoginRegister();
    //verificar que carga la pagina de login
    pageLogin.verifyLabelLogin();
})

//Comando para verificar carga de la pagina del login para registrar usuario
Cypress.Commands.add('loadPageRegister', ()=>{
    //verificar carga correcta la pagina home
    homePage.verifyLoadPage();
    //click en el boton login
    homePage.clickLoginRegister();
    //verificar que carga la pagina de login para registrar
    pageLogin.verifyLabelRegister();
})

//Comando para verificar carga de la pagina principal
Cypress.Commands.add('loadPagehome', ()=>{
    //verificar carga correcta la pagina home
    homePage.verifyLoadPage();
})

//Comando para verificar una alerta
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