class homePage{

    elements={
        logoPage: () => cy.get('img[src="/static/images/home/logo.png"]'),
        btnLoginRegister: () => cy.get('ul.nav.navbar-nav li a[href="/login"]'),
        btnHome: () => cy.get('li a[href="/"]'),

        //Scroll de la pagina
        btnScrollUP: () => cy.get('#scrollUp i'),
        textSitePractice: 'div.carousel-inner h2',
        msgTextSitePrtice: 'Full-Fledged practice website for Automation Engineers'
    }

    clickHome(){
        this.elements.btnHome().click();
    }

    verifyLoadPage(){
        this.elements.logoPage().should('be.visible')
    }

    clickLoginRegister(){
        this.elements.btnLoginRegister().click()
    }

    clickScrollUP(){
        this.elements.btnScrollUP().realClick();
    }

    verifyTextSite(){
        cy.get(this.elements.textSitePractice)
        .should('be.visible')
        .should('contain', this.elements.msgTextSitePrtice);
    }
}

module.exports = new homePage();