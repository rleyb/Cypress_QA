/// <reference types = "cypress"/>

import subscription from "./Page/suscription/Subscription";
import homePage from "./Page/automation_excercise/HomePage";

describe('Template Slide Page', ()=>{
    beforeEach('passes', ()=>{
        cy.visit('/');
    });

    it('Verify Scroll Using "Arrow" Button and Scroll Down Funcionality', ()=>{
        cy.loadPagehome();
        cy.scrollDown(2000);
        subscription.verifyTitleSubs();
        homePage.clickScrollUP();
        homePage.verifyTextSite();
    })

    it('Verify Scroll whitout "Arrow" Button and Scroll Down Funcionality', ()=>{
        cy.loadPagehome();
        cy.scrollDown(2000);

        subscription.verifyTitleSubs();
        cy.scrollUp(2000);
        homePage.verifyTextSite();
    })
})