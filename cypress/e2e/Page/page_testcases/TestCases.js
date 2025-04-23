class testCases{
    elements ={
        btnTestCases: 'li a[href="/test_cases"]',
        labelTitle: 'div.col-sm-9.col-sm-offset-1 h2.title.text-center b',
        msgTitle: 'Test Cases'
    }

    //Para esta prueba se usan los comandos de click y aserciones existentes en commands.js
    clickTestCases(){
        cy.clickGo(this.elements.btnTestCases)
    }

    verifyLoadPage(){
        cy.asserts(this.elements.labelTitle, this.elements.msgTitle)
    }
}

module.exports = new testCases();