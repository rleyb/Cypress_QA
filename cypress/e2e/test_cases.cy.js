/// <reference types="cypress"/>

import testCases from "./Page/page_testcases/TestCases";

describe('Template Test Cases page', () =>{

    beforeEach('passes', () =>{
        cy.visit('/');
    })

    it('Test Case 7: Contact Us', ()=>{
        //verificar load de la pagina
        cy.loadPagehome(); //comando personalizado

        //ir a la pagina de test cases
        testCases.clickTestCases();

        //verificar carga correcta de la pagina
        testCases.verifyLoadPage();
    })
})