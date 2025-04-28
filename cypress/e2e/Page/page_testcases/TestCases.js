class testCases{

    elements ={
        //Selector botón "Test Cases"
        btnTestCases: 'li a[href="/test_cases"]',
        //Selector del titulo de la pagina
        labelTitle: 'div.col-sm-9.col-sm-offset-1 h2.title.text-center b',
        //Texto del titulo de la pagina
        msgTitle: 'Test Cases'
    }

    //Click en el boton "Test Cases"
    clickTestCases(){
        cy.clickGo(this.elements.btnTestCases)
    }

    //Verificar el titulo de la pagina
    verifyLoadPage(){
        cy.asserts(this.elements.labelTitle, this.elements.msgTitle)
    }
}

module.exports = new testCases();