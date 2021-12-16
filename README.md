# CS 741 Project

Semester long project for CS 741: Software Engineering Principles

## Stack

- Front end: Angular
- Back end/API: NestJS
- Database: MongoDB Atlas

## Objective

To develop a software system for a non-profit organization that is used to do the book keeping for their participants.

## Problem Description

A non-profit organization needs to keep a record of the participants in relates to various events and programs. The participants include the donor, the volunteer and the others. The following are the requirements and assumptions for this problem:

- The non-profit organization operates in the way of event driven through out the year.
- There are four types of users for this system –Administrator, Donor, Volunteerand Other. First three types of user must have an account to login into the system.
- The others can view the various events and programs hosted in this organization, and can choose to create an account to become a donor or volunteer.
- An administrator can create and maintain (modify and/or delete) the accounts for everybody in the system including other administrators. All administrators will have equal privileges.
- The administer will be able to do some simple data analysis and reports. (Example: the total amount of a donor’s contribution to the organization in year 2020)
- The donor will be able to make restricted donation to a certain event/program or unrestricted donation. The donor can also simple attend an event without make any contribution.
- The volunteer can register to help an event at certain time slot or help program activities.
- An event can be associated with zero, one or more programs.

## Navigating the Project

Root directory contains two directories, client and server. Each house their respective code.

### Client

The client directory is an Angular project consisting of components, services and models.

- Components: views and interactive pieces of the application
- Services: provide state management and handle requests to the server
- Models: represent objects in the application

### Server

The server directory is a NestJS project consisting of multiple endpoint folders.

Each endpoint folder contains a controller, a service, a repository, one or more schemas, one or more dtos and a module.

- Controller: handle hits to certain endpoints
- Services: supports controllers functionality needs
- Repositories: interact with the database
- Schemas: represent objects able to be stored in the database
- DTOs: Data transfer objects, used to represent objects that are sent in requests
- Module: ties all the above files together for an easy export
