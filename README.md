# <p align="center"> Vem Ser Tech Course - Group Final Project of Module 2 - Car Rental </p>

<p align="center">
<img src="images/VemSerTech.jpg"  alt="VemSerTech" height="200px align="left" />
<img src="images/car_rental.jpg"  alt="car rental" height="200px align="right"/>
</p>

## Vem Ser Tech

Vem Ser Tech was a course offered by a partnership between the companies Ada Tech and iFood. Each student was offered one subject among 4 possibilities: Front-End, Back-End, DevOps and Data. I chose the Back-End technology track, which aimed to study the JavaScript language divided into 6 modules:

Module 1: Programming Language

Module 2: Object Oriented Programming

Module 3: Database

Module 4: Node.js with Express (intermediate level)

Module 5: Node.js with Express (advanced level)

Module 6: Automated Testing

The course lasted 324 hours with synchronous classes every Monday, Wednesday and Friday, from 7pm to 10pm, between October 6, 2023 and March 15, 2024. You can find more information about this course here: <a href="https://ada.tech/sou-aluno/programas/ifood-vem-ser-tech">Vem Ser Tech</a>

## Purpose 

At the end of the second module, each student was asked to carry out an individual project and a group project. This project refers to the group one. The objective of this project was to build a system to manage a car rental. The following text bellow contains all the project requirements that were written by the module teacher. To build this project it was used typescript language and to model it was used the unified modeling language (UML). 

## Requirements

Your team was hired to develop a system for a car rental company, the rental company will only have 1 store, so the system must be unique for that store, without worrying about having several stores registered. That said, the client brought some business rules, they are:

- No vehicle can be registered with the same license plate as another vehicle already registered in the system.
- For the customer to rent a vehicle, they only need to provide their **name**, **cpf** and **type of license**.
- When renting a vehicle, if the customer's license type is **A**, he can only rent a motorbike, and if it is **B**, he can only rent a car.
- To return the vehicle, you will only need to receive the customer's **cpf**.
- It should not be allowed to delete a vehicle that is being rented.
- A customer can only rent 1 vehicle at a time, so to rent another, they must not be renting any other vehicle at the time.
- When renting a vehicle, you must make a calculation that will be the **daily value _ days to be rented _ plus the type of vehicle**, cars will have an increase of **10%**, while motorcycles of **5 %**.

#### System

The client system must be developed using node/typescript and the data must be saved in a json file. The system will have the following menu of features:

1. Register vehicle
2. Rent a vehicle
3. Return vehicle
4. List available vehicles
5. List rental vehicles
6. Leave
