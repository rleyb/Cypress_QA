/// <reference types="cypress" />

import pageLogin from './Page/automation_excercise/Login'
import homePage from './Page/automation_excercise/HomePage'
import signupPage from './Page/automation_excercise/Register'

/*NOTA IMPORTANTE 
  *Contiene los casos de prueba del 1 al 5.
  *Usar los archivos data_newuser.json y data_loginuser para nuevo registro y login respectivamente.
*/
describe('template Login/Signup', () => {
  //Variables para almacenar los datos del login y registro
  var datauser;
  var datalogin;

  beforeEach('passes', () => {
    cy.visit('/');

    //conexion al json con los datos del nuevo usuario
    cy.fixture('././data_newuser')
    .then((datos) => (
      datauser = datos
    ))

    //conexion al json con los datos del login de un usuario
    cy.fixture('././data_loginuser')
    .then((datos) => (
      datalogin = datos
    ))
  });

  it('test case 1: Enter data Register', () =>{

    //Verificar load page home
    cy.loadPageRegister() //Command personalizado

    //Iniciar con el registro del nuevo usuario
    pageLogin.createNewUser(datauser.name, datauser.email);

    //verificar y cargar datos para registrar usuario
    signupPage.verifyTitlePage();

    //llenado de datos
    signupPage.fillDataUser(() => signupPage.clickTitle(), datauser.password, datauser.day, datauser.month, datauser.year, datauser.first_name, 
      datauser.last_name, datauser.company, datauser.address, datauser.country, datauser.state, datauser.city, datauser.zipcode, datauser.mobile_number);

    signupPage.createAccount();

    //verificar el logueo
    signupPage.verifyLogged(datauser.name);
    
    //Eliminar cuenta
    cy.deleteAccount(); ////Command personalizado
  });

  it('test case 2: Login correct', () =>{

    //Verificar load page home
    homePage.verifyLoadPage();

    homePage.clickLoginRegister();
    //Verificar load page Login
    pageLogin.verifyLabelLogin();

    //Iniciar sesión
    pageLogin.loginUser(datalogin.email, datalogin.password);
    //verificar el login
    signupPage.verifyLogged(datalogin.name_user);

    //Eliminar cuenta
    cy.deleteAccount(); //Command personalizado
  });

  it.only('test case 3: Login incorrect', () =>{

    //Verificar load page login
    cy.loadPageLogin();

    //Iniciar sesión
    pageLogin.loginUser(datalogin.email, datalogin.passwordIncorrect);
    //Verificar error
    pageLogin.verifyMessageError();
  });

  it('test case 4: Logout User', () =>{

    //verificar load de pagina para loguearse
    cy.loadPageLogin();

    //Iniciar sesión
    pageLogin.loginUser(datalogin.email, datalogin.password);
    //verificar Login
    signupPage.verifyLogged(datalogin.name_user);

    //Cerrar sesión
    pageLogin.clickLogout();
    //Verificar load page Home
    homePage.verifyLoadPage();
  });

  it.only('test case 5: Register email existing', () =>{

    //Verificar load "new register"
    cy.loadPageRegister()

    //Crear una cuenta
    pageLogin.createNewUser(datalogin.name_user, datalogin.email);
    //verificar mensaje de error
    pageLogin.verifyMsgErrorRegister();
  });

})