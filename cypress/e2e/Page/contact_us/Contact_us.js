class contactUs {
    elements = {
        btnContactUs: () => cy.get('a[href="/contact_us"]'),
        labelTitleGet: () => cy.get('div.contact-form h2.title.text-center'),
        msgTitleGet: 'Get In Touch',

        inputName: () => cy.get('input[data-qa="name"]'),
        inputEmail: () => cy.get('input[data-qa="email"]'),
        inputSubject: () => cy.get('input[data-qa="subject"]'),
        inputMessage: () => cy.get('#message'),

        btnUploadFile: () => cy.get('input[type="file"]'),

        btnSubmit: () => cy.get('input[data-qa="submit-button"]'),

        msgSuccessOk: () => cy.get('div.status.alert.alert-success'),
        msgSuccess: 'Success! Your details have been submitted successfully.',

        btnHomeGo: () => cy.get('a[href="/"] span')
    }

    clickBtnContactUs(){
        this.elements.btnContactUs().click();
    }

    verifyTitleGet(){
        this.elements.labelTitleGet().should('contain', this.elements.msgTitleGet)
    }

    typeInputName(name){
        this.elements.inputName().type(name)
    }

    typeInputEmail(email){
        this.elements.inputEmail().type(email)
    }

    typeInputSubject(subject){
        this.elements.inputSubject().type(subject);
    }

    typeInputMessage(message){
        this.elements.inputMessage().type(message);
    }

    uploadFile(nameFile){
        //Debe recibir el nombre del archivo quedebería estar cargado en el folder "fixtures"
        const filePath = nameFile;
        this.elements.btnUploadFile()
        .attachFile(filePath);

        //Verificar que se cargó el archivo correcto
        this.elements.btnUploadFile().then(($input)=>{
            expect($input[0].files[0].name).to.equal(nameFile)
        });
    }

    clickSubmit(){
        //confirmarmos el alert del navegador que nos pedirá verificación
        cy.on('window:confirm', () => true);
        this.elements.btnSubmit().click();
    }

    verifySuccess(){
        this.elements.msgSuccessOk().should('contain', this.elements.msgSuccess);
    }

    clickHome(){
        this.elements.btnHomeGo().click();
    }
}

module.exports = new contactUs();