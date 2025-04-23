/// <reference types="cypress"/>

import contactUs from "./Page/contact_us/Contact_us";

describe('Template Contact Us', () =>{

    var data;

    beforeEach('passes', () =>{
        cy.visit('/');

        //conexion a la data
        cy.fixture('././data_contactus')
        .then((dato) =>{
            data = dato
        })
    })

    it('Test Case 6: Contact Us', ()=>{
        //verificar load de la pagina
        cy.loadPagehome(); //comando personalizado

        //click en contact us en el menú
        contactUs.clickBtnContactUs();
        contactUs.verifyTitleGet();

        //Llenado de datos
        contactUs.typeInputName(data.name);
        contactUs.typeInputEmail(data.email);
        contactUs.typeInputSubject(data.subject);
        contactUs.typeInputMessage(data.message);

        //cargar el archivo. Indicar el nombre del archivo que se desea subir 
        // en data_contactus.json. Asegurarse que el archivo esta agregado en la carpeta "fixtures".
        contactUs.uploadFile(data.name_file);

        //Confirmar el envió de datos
        contactUs.clickSubmit();

        //verificar envío correcto
        contactUs.verifySuccess();

        //regresar a home desde el botón home en la pagina ContactUs
        contactUs.clickHome();
    })
})