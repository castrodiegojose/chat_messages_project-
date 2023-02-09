import app from '../app'
import { ChatModel } from "../model/chat.model";
import server from "../index";
import request from "supertest";

describe('GET /Chats', () => {
    test("should respond with a 200 status code", async () =>{
        const response = await request(app).get("/api/chats").send();
        expect(response.statusCode).toBe(200);
    });
});

describe("POST /Chats", () =>{  
        describe('Given all the information', () =>{
        test("Should respond 200 code with an Object", async () =>{
            const response = await request(app)
            .post("/api/chats")
            .send(
                {
                    firstName:"Pedro",
                    lastName:"Castillo",
                    creditCard: "4489566688"
                }
                );
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
                
        test("Should respond 200 code with an Object", async () =>{
            const response = await request(app)
            .post("/api/chats")
            .send(
                {
                    firstName:"Juan",
                    lastName:"Morales",
                    phoneNumber: "4489566688"
                }
            );
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });
    })
    
    describe('When some or all of the information is missing', () =>{
        test("Should respond 400 code with an Object", async () =>{
            const response = await request(app)
            .post("/api/chats")
            .send(
                {
                    firstName:"Pedro",
                    lastName:"Castillo",
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
        });
    })
        
    describe('When there is already a chat room created by the user.', () =>{
        test("Should respond 404 code with an Object", async () =>{
            const response = await request(app)
            .post("/api/chats")
            .send(
                {
                    firstName:"Pedro",
                    lastName:"Castillo",
                    creditCard: "4489566688"
                }
            );
            expect(response.statusCode).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });
    })
});
        
describe("PUT /Chats/{ChatId}", () =>{
    describe('Updating all the information', () =>{
        test("Should respond 200 code with an Object", async () =>{
            const customer = await ChatModel.find({
                "customer.firstName": "Pedro",
                "customer.lastName": "Castillo"
            })
            const id = (customer[0].chatId) as string;
            const response = await request(app)
            .put(`/api/chats/${id}`)
            .send(
                {
                    firstName:"Pedro",
                    lastName:"Castillo",
                    phoneNumber:"56-89566-688"
                }
            );
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        })
    })

    describe('When some or all of the information is missing', () =>{
        test("Should respond 404 code with an Object", async () =>{
            const customer = await ChatModel.find({
                "customer.firstName": "Pedro",
                "customer.lastName": "Castillo"
            })
            const id = (customer[0].chatId) as string;
            const response = await request(app)
            .put(`/api/chats/${id}`)
            .send({
                firstName:"Pedro",
                phoneNumber:"56-89566-688"
            });
            expect(response.statusCode).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        })
    })
    

    describe('Wrong Chat Id', () =>{
        test("Should respond 404 code with an Object", async () =>{
            const someWrongId = "4455555999";
            const response = await request(app)
            .put(`/api/chats/${someWrongId}`)
            .send(
                {
                    firstName:"Pedro",
                    lastName:"Castillo",
                    phoneNumber:"56-89566-688"
                }
            );
            expect(response.statusCode).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        })
    })

    
});

afterAll(async() => {
    server.close();
    await ChatModel.findOneAndDelete({
        "customer.firstName": "Pedro", 
        "customer.lastName" : "Castillo"});

    await ChatModel.findOneAndDelete({
        "customer.firstName": "Juan", 
        "customer.lastName" : "Morales"});
});
