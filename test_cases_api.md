✅ GET – LIST USERS
    Objetivo: Validar que la API devuelve correctamente una lista de usuarios.

    Método: GET

    Endpoint: /api/users?page=2

    Datos esperados:

        Código de estado 200.

        El cuerpo contiene un array bajo data.

        Cada usuario tiene id, email, first_name, last_name, y avatar.

✅ GET – SINGLE USER
    Objetivo: Validar que se puede obtener la información de un solo usuario existente.

    Método: GET

    Endpoint: /api/users/2

    Datos esperados:

        Código 200.

        El objeto data contiene información completa del usuario 2.

✅ GET – SINGLE USER NOT FOUND
    Objetivo: Verificar el comportamiento cuando se solicita un usuario inexistente.

    Método: GET

    Endpoint: /api/users/23

    Datos esperados:

      Código 404.

      Respuesta vacía (sin cuerpo).

✅ GET – LIST <RESOURCE>
    Objetivo: Verificar que se puede listar recursos (por ejemplo, colores).

    Método: GET

    Endpoint: /api/unknown

    Datos esperados:

      Código 200.

      El cuerpo contiene un array en data con recursos.

✅ GET – SINGLE <RESOURCE>
    Objetivo: Verificar la obtención de un recurso por ID.

    Método: GET

    Endpoint: /api/unknown/2

    Datos esperados:

      Código 200.

      El objeto data contiene id, name, year, color, pantone_value.

✅ GET – SINGLE <RESOURCE> NOT FOUND
    Objetivo: Validar el comportamiento si un recurso no existe.

    Método: GET

    Endpoint: /api/unknown/23

    Datos esperados:

      Código 404.

      Respuesta vacía.

✅ POST – CREATE
    Objetivo: Validar la creación exitosa de un usuario.

    Método: POST

    Endpoint: /api/users

    Body: { "name": "morpheus", "job": "leader" }

    Datos esperados:

      Código 201.

      Respuesta incluye name, job, id, createdAt.

✅ PUT – UPDATE
    Objetivo: Validar la actualización completa de un usuario.

    Método: PUT

    Endpoint: /api/users/2

    Body: { "name": "morpheus", "job": "zion resident" }

    Datos esperados:

      Código 200.

      Respuesta incluye name, job, updatedAt.

✅ PATCH – UPDATE
    Objetivo: Validar la actualización parcial de un usuario.

    Método: PATCH

    Endpoint: /api/users/2

    Body: { "job": "zion resident" }

    Datos esperados:

      Código 200.

      Respuesta incluye job, updatedAt.

✅ DELETE – DELETE
Objetivo: Verificar que se pueda eliminar un usuario.

Método: DELETE

Endpoint: /api/users/2

Datos esperados:

Código 204.

Sin cuerpo de respuesta.

✅ POST – REGISTER SUCCESSFUL
Objetivo: Validar registro exitoso.

Método: POST

Endpoint: /api/register

Body: { "email": "eve.holt@reqres.in", "password": "pistol" }

Datos esperados:

Código 200.

Respuesta contiene id y token.

✅ POST – REGISTER UNSUCCESSFUL
Objetivo: Validar comportamiento en registro incompleto.

Método: POST

Endpoint: /api/register

Body: { "email": "sydney@fife" }

Datos esperados:

Código 400.

Mensaje: "Missing password".

✅ POST – LOGIN SUCCESSFUL
Objetivo: Verificar que un usuario puede iniciar sesión con credenciales válidas.

Método: POST

Endpoint: /api/login

Body:

json
Copy
Edit
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
Datos esperados:

Código 200.

Respuesta contiene un token.

✅ POST – LOGIN UNSUCCESSFUL
Objetivo: Verificar el comportamiento del login cuando falta información obligatoria.

Método: POST

Endpoint: /api/login

Body:

json
Copy
Edit
{
  "email": "peter@klaven"
}
Datos esperados:

Código 400.

Mensaje de error: "Missing password".

✅ GET – DELAYED RESPONSE
Objetivo: Verificar que la API responde correctamente aunque exista una demora.

Método: GET

Endpoint: /api/users?delay=3

Datos esperados:

Código 200.

Respuesta tarda aproximadamente 3 segundos.

El cuerpo contiene data con lista de usuarios.