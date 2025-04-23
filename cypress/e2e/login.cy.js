/// <reference types="cypress" />

import pageLogin from './Page/automation_excercise/Login'
import homePage from './Page/automation_excercise/HomePage'
import signupPage from './Page/automation_excercise/Register'

//Se recomienda crear un usuario para los test cases del 2 - 5 para las pruebas y,
//colocar los datos  en el archivo data_loginuser.json, según se requiera para cada caso.
describe('template Login', () => {
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
  })

  //Ajustar los datos del nuevo usuario en data_newuser.json
    //se recomienda comentar la linea 71 en caso de ejecutar todos los test cases al mismo tiempo
  it('test case 1: Enter data Register', () =>{

    //verificar llenado de datos
    cy.loadPageRegister() //funcion personalizada

    //Datos para iniciar con el registro de nuevo usuario
    pageLogin.typeNameRegister(datauser.name);
    pageLogin.typeEmailRegister(datauser.email);
    pageLogin.clickBtnRegister();

    //verificar y cargar datos para registrar usuario
    signupPage.verifyTitlePage();

    //llenado de datos
    signupPage.clickTitle();
    signupPage.typePassword(datauser.password)
    signupPage.selectDay(datauser.day);
    signupPage.selectMonths(datauser.month);
    signupPage.selectYears(datauser.year);
    signupPage.clickNewsletter();
    signupPage.clickOffers();
    signupPage.typeFirstName(datauser.first_name);
    signupPage.typelastName(datauser.last_name);
    signupPage.typeCompany(datauser.company)
    signupPage.typeAddress(datauser.address);
    signupPage.selectCountry(datauser.country);
    signupPage.typeState(datauser.state);
    signupPage.typeCity(datauser.city);
    signupPage.typeZipcode(datauser.zipcode);
    signupPage.typeMobile(datauser.mobile_number);

    //click para crear la cuenta
    signupPage.clickCreate();
    signupPage.verifyCreation();
    signupPage.clickContinue();

    //verificar el logueo
    signupPage.verifyLogged(datauser.name);
    
    //eliminacion de la cuenta
    cy.deleteAccount(); //comando personalizado con las acciones para eliminar una cuenta
  })

  //caso de prueba que invoca funciones que usan comandos personalizados
  //se recomienda comentar la linea 97 en caso de ejecutar todos los test cases al mismo tiempo
  it('test case 2: Login correct', () =>{

    //verificar carga correcta la pagina home
    homePage.verifyLoadPage();

    //click en el boton login
    homePage.clickLoginRegister();

    //verificar que carga la pagina de login
    pageLogin.verifyLabelLogin();

    //llenado de datos
    //asegurarse de ingresar datos: email y contraseña, ya registrados (cargados en data_loginuser.json)
    pageLogin.typeEmailLogin(datalogin.email);
    pageLogin.typePasswordLogin(datalogin.password);
    pageLogin.clickLogin();

    //verificar el loggueo correcto
    signupPage.verifyLogged(datalogin.name_user);

    //eliminacion de la cuenta
    cy.deleteAccount(); //comando personalizado con las acciones para eliminar una cuenta
  })

  //caso de prueba que invoca funciones que usan comandos personalizados
  it('test case 3: Login incorrect', () =>{

    //verificar load de pagina para loguearse
    cy.loadPageLogin();

    //llenado de datos
    //asegurarse de ingresar datos: email o contraseña incorrectos, 
    // segun los datos del usuario en data_loginuser.json 
    pageLogin.typeEmailLogin(datalogin.email);
    pageLogin.typePasswordLogin(datalogin.passwordIncorrect);
    pageLogin.clickLogin();

    //verificar que aparece el mensaje de error
    pageLogin.verifyMessageError();
  })

    //caso de prueba que invoca funciones que usan comandos personalizados
  it('test case 4: Logout User', () =>{

    //verificar load de pagina para loguearse
    cy.loadPageLogin();

    //llenado de datos
    //asegurarse de ingresar datos: email y contraseña ya registrados, cargados en el data_loginuser.json
    pageLogin.typeEmailLogin(datalogin.email);
    pageLogin.typePasswordLogin(datalogin.password);
    pageLogin.clickLogin();

    //verificar el loggueo correcto
    //validar el nombre de usuario y ajustar en data_loginuser.json
    signupPage.verifyLogged(datalogin.name_user);

    //hacemos logout al user
    pageLogin.clickLogout();

    //verificamos que regresó al home
    homePage.verifyLoadPage();
  })

  //caso de prueba que invoca funciones que usan comandos personalizados
  it('test case 5: Register email existing', () =>{

    //verificar llenado de datos
    cy.loadPageRegister()

    //Datos para iniciar con el registro de nuevo usuario
    //Cargar datos del usuario ya existente, registrados en data_loginuser.json
    pageLogin.typeNameRegister(datalogin.name_user);
    pageLogin.typeEmailRegister(datalogin.email);
    pageLogin.clickBtnRegister();

    //verificar mensaje de error
    pageLogin.verifyMsgErrorRegister();
   
  })

})