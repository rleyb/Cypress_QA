class homePage{

    elements={
        //logo de la pagina
        logoPage: () => cy.get('img[src="/static/images/home/logo.png"]'),
        //boton de login/registro
        btnLoginRegister: () => cy.get('ul.nav.navbar-nav li a[href="/login"]'),
        //boton de home
        btnHome: () => cy.get('li a[href="/"]'),

        //Boton de Scroll de la pagina
        btnScrollUP: () => cy.get('#scrollUp i'),
        //carrusel principal en home
        textSitePractice: 'div.carousel-inner h2',
        //texto de carrusel principal
        msgTextSitePrtice: 'Full-Fledged practice website for Automation Engineers'
    }

    //click en el boton home
    clickHome(){
        this.elements.btnHome().click();
    }

    //verificar la carga de la pagina principal
    verifyLoadPage(){
        this.elements.logoPage().should('be.visible')
    }

    //click en el boton login/registro
    clickLoginRegister(){
        this.elements.btnLoginRegister().click()
    }

    //click en el botón flotante de scroll de la pagina
    clickScrollUP(){
        this.elements.btnScrollUP().realClick();
    }

    //verificar la visibilidad del texto principal del carrusel
    verifyTextSite(){
        cy.get(this.elements.textSitePractice)
        .should('be.visible')
        .should('contain', this.elements.msgTextSitePrtice);
    }
}

module.exports = new homePage();