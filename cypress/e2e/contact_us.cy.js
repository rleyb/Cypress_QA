/// <reference types="cypress"/>

import contactUs from "./Page/contact_us/Contact_us";

/* NOTA IMPORTANTE
    *Contiene el caso de prueba 6
    *Asegurarse que el archivo a enviar esta agregado en la carpeta "fixtures".
*/
describe('Template Contact Us', () =>{
    //Variable para guardar los datos del mensaje "Contact Us"
    var data;

    beforeEach('passes', () =>{
        cy.visit('/');

        //Conectar a los datos del mensaje contact us
        cy.fixture('././data_contactus')
        .then((dato) =>{
            data = dato
        });
    })

    it('Test Case 6: Contact Us', ()=>{
        //Verificar load page "Home"
        cy.loadPagehome(); //Command personalizado

        //click en contact us en el menú
        contactUs.clickBtnContactUs();
        contactUs.verifyTitleGet();

        //Enviar un mensaje de contacto
        contactUs.sendMessageContactUs(data.name, data.email, data.subject, data.message, data.name_file);
        //verificar envío correcto
        contactUs.verifySuccess();
        //Regresar al Home
        contactUs.clickHome();
    })
})