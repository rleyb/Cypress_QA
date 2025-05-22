/// <reference types="cypress"/>

describe('Template REQRES', ()=>{

    it('Test Case: Post Create User', () =>{
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            headers:{
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "name": "morpheus",
                "job": "leader"
            }
        }).then(response =>{
            expect(response.status).to.eq(201);
            cy.log(JSON.stringify(response.body, null, 2)); //Revisar la respuesta que devuelve
            //Validar las propiedades
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('job');
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('createdAt');
        });
    });

    it('Test Case: Get List Users', ()=>{
        cy.request('GET', 'https://reqres.in/api/users?page=2')
        .then(response=>{
            //Validar codigo de respuesta
            expect(response.status).to.eq(200);
            //Validar que devielve un array
            expect(response.body.data).to.be.an('array').that.is.not.empty;

            //Validar propiedades
            response.body.data.forEach(user => {
                expect(user).to.have.property('id');
                expect(user).to.have.property('email');
                expect(user).to.have.property('first_name');
                expect(user).to.have.property('last_name');
                expect(user).to.have.property('avatar');
            });
        });
    });

    it('Test Case:Get Single User', () =>{
        const id = 2;
        cy.request('GET', `https://reqres.in/api/users/${id}`)
        .then(response =>{
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('object').that.is.not.empty;
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data).to.have.property('first_name');
            expect(response.body.data).to.have.property('last_name');
            expect(response.body.data).to.have.property('avatar');
        });
    });

    it('Test Case: Get Single User Not Found', () =>{
        const id = 23;
        cy.request({
            method: 'GET', 
            url: `https://reqres.in/api/users/${id}`,
            headers:{
                'x-api-key': 'reqres-free-v1'
            },
            failOnStatusCode: false
        }).then(response =>{
            expect(response.status).to.equal(404);
            expect(response.body).to.deep.equal({});
        });
    });

    it('Test Case: Update User Put', () =>{
        const id = 2;
        cy.request({
            method: 'PUT',
            url: `https://reqres.in/api/users/${id}`,
            headers:{
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "name": "morpheus",
                "job": "zion resident"
            }
        }).then(response =>{
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body, null, 2)); //Revisar la respuesta que devuelve
            //Validar las propiedades
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('job');
            expect(response.body).to.have.property('updatedAt');
        });
    });

    it.only('Test Case: Update User PATCH', () =>{
        const id = 2;
        cy.request({
            method: 'PATCH',
            url: `https://reqres.in/api/users/${id}`,
            headers:{
                'x-api-key': 'reqres-free-v1'
            },
            body:{
                "job": "zion resident path 1"
            }
        }).then(response =>{
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body, null, 2)); //Revisar la respuesta que devuelve
            //Validar las propiedades
            expect(response.body).to.have.property('job');
            expect(response.body).to.have.property('updatedAt');
        });
    });
})