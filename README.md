# chat_messages_project-

Obietivo de la evaluacion:
Demostrar conocimientos de Expressesy Typescript
Tener un buen manejo de Mongoose y poder conectar el programa a una base de datos de MongoDB
Implementar un buen diseño,que abstraiga correctamente la implementacion de la logica del sistema y no sea propenso a fallas
Realizar testing unitarios en Jest
Introduccion
Una empresa que realiza envios de paquetes a domicilio desea crear su propio sistema de mensajeria para poder conversar con sus clientes sin tener que estar
limitada a las opciones existentes,como WhatsApp,Telegram o Messenger
Le solicitan desarrollar una API de mensajeria muy basica, que permita enviar y recibir mensajes de texto y de ubicacion (dado que hoy en día a nadie le gusta ponerse a
escribir su ubicacion).
Esta empresa ademas de los envios ocasionales,tambien realiza envios a domicilio ilimitados para clientes VIP con un costo mensual (en lugar de cobrar por envío). Un
cliente puede ser Regular o VIP.

Se deben crear los siguientes endpoints para poder acceder a los objetos de la BD:
CRUDChat
-POST/chats
-GET/chats
-PUT/chats/{chatld>
-DELETE/chats/{chatld>
CRUDMessage
-POST/messages/{chatld>
-GET/messages/fchatld}
Nota: El cliente esta dentro del Chat y se modifica junto con el PUT de Chat. Elcuerpo de la request de cada endpoint en los casos que corresponds, queda a libertad de
implementacion.

-UnitTesting
Se pide realizar testing en Jest unicamente para las funcionalidades de crear y modificar chat.
