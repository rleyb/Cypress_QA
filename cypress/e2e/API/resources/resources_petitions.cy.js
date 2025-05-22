/// <reference types="cypress"/>

describe('Template REQRES', ()=>{

    it('Test Case: Get List Resource', () =>{
        cy.request({
            //Dado que la api brinda un header como metodo de autorización para acceder a los datos de la api, se añade a la peticion
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            method: 'GET',
            url: 'https://reqres.in/api/unknown'
        }).then(response =>{
            expect(response.status).to.eq(200);
            //cy.log(JSON.stringify(response.body.data, null, 2))
            expect(response.body.data).to.be.an('array').that.is.not.empty;
            response.body.data.forEach(resource => {
                expect(resource).to.have.property('id');
                expect(resource).to.have.property('name');
                expect(resource).to.have.property('year');
                expect(resource).to.have.property('color');
                expect(resource).to.have.property('pantone_value');
            });
        });
    });

    it('Test Case: Get Single Resource', () =>{
        const id = 2;
        cy.request('GET', `https://reqres.in/api/unknown/${id}`)
        .then(response =>{
            expect(response.status).to.equal(200);
            expect(response.body.data).to.be.an('object').that.not.is.empty;
            //para ver la respuesta muestro en pantalla lo que me esta devolviendo
            cy.log(JSON.stringify(response.body.data, null, 2))
            //Validar los atributos
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('name');
            expect(response.body.data).to.have.property('year');
            expect(response.body.data).to.have.property('color');
            expect(response.body.data).to.have.property('pantone_value');
        });
    });

    it.only('Test Case: Get Single Resource Not Found', () =>{
        const id = 23;
        cy.request({
            method: 'GET', 
            url: `https://reqres.in/api/unknown/${id}`,
            failOnStatusCode: false,
            headers:{
                'x-api-key': 'reqres-free-v1'
            }
        })
        .then(response =>{
            expect(response.status).to.equal(404);
            expect(response.body).to.deep.equal({});
        });
    });
})