class contactUs {
    elements = {
        //Selector del botón "Contact Us"
        btnContactUs: () => cy.get('a[href="/contact_us"]'),
        //Selector del titulo de la pagina "Contact Us"
        labelTitleGet: () => cy.get('div.contact-form h2.title.text-center'),
        //Texto del titulo de la pagina "Contact Us"
        msgTitleGet: 'Get In Touch',

        //Selector del campo "name"
        inputName: () => cy.get('input[data-qa="name"]'),
        //Selector del campo "email"
        inputEmail: () => cy.get('input[data-qa="email"]'),
        //Selector del campo "subject"
        inputSubject: () => cy.get('input[data-qa="subject"]'),
        //Selector del campo "Message"
        inputMessage: () => cy.get('#message'),
        //selector del campo "Seleccionar archivo"
        btnUploadFile: () => cy.get('input[type="file"]'),
        //Selector del botón "Submit"
        btnSubmit: () => cy.get('input[data-qa="submit-button"]'),
        //Selector de alerta de exito
        msgSuccessOk: () => cy.get('div.status.alert.alert-success'),
        //Texto de alerta de exito
        msgSuccess: 'Success! Your details have been submitted successfully.',
        //Selector del botón "Home" en la pagina "Contact Us"
        btnHomeGo: () => cy.get('a[href="/"] span')
    }

    //Click en el botón "Contact Us"
    clickBtnContactUs(){
        this.elements.btnContactUs().click();
    }

    //Verificar el titulo de la pagina
    verifyTitleGet(){
        this.elements.labelTitleGet().should('contain', this.elements.msgTitleGet)
    }

    //Escribir el nombre
    typeInputName(name){
        this.elements.inputName().type(name)
    }

    //Escribir el email
    typeInputEmail(email){
        this.elements.inputEmail().type(email)
    }

    //Escribir el Subject
    typeInputSubject(subject){
        this.elements.inputSubject().type(subject);
    }

    //Escribir el "Message"
    typeInputMessage(message){
        this.elements.inputMessage().type(message);
    }

    //Cargar el archivo
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

    //Click en el botón submit
    clickSubmit(){
        //confirmarmos el alert del navegador que nos pedirá verificación
        cy.on('window:confirm', () => true);
        this.elements.btnSubmit().click();
    }

    sendMessageContactUs(name, email, subject, message, name_file){
        this.typeInputName(name);
        this.typeInputEmail(email);
        this.typeInputSubject(subject);
        this.typeInputMessage(message);
        this.uploadFile(name_file);
        this.clickSubmit();
    }

    //Verificar alerta de exito
    verifySuccess(){
        this.elements.msgSuccessOk().should('contain', this.elements.msgSuccess);
    }

    // Click en el boton home de "Contact Us"
    clickHome(){
        this.elements.btnHomeGo().click();
    }
}

module.exports = new contactUs();