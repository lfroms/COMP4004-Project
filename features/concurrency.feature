Feature: Concurrency
  As a user
  I want to be able to use the system at the same time as other users
  So that multiple users can use the system simultaneously

  Scenario: Use case dependencies
    Given an administrator user is logged in
    When the administrator creates the term
    And S1 requests creation while the administrator creates C2
    And P1 and P2 simultaneously request creation
    And administrator creates C1 and C3
    And S2 and S3 simultaneously request creation
    And administrator assigns C1 to P1, C3 to P2, C2 to P1
    And the administrator approves all users
    And all users log in
    And S2 and S3 simultaneously register in C1
    And S1 registers in C2, S1 registers in C3, S2 registers in C3
    And P1 creates deliverable for C1, P2 creates deliverable for C3
    And S1 drops C2
    And S2 and S3 simultaneously submit C1 project
    And S1 submits C3 while S2 submits C3
    And P1 submits marks for deliverable in C1
    And P2 submits marks for deliverable in C3
    And P1 and P2 simultaneously submit final grades for C1 and C3
    And all users log out

  Scenario: Resource contention 1
    Given there is a course with a seat limit of 2
    And there are 3 users
    When all 3 users log in
    And S1 registers in the course
    And S2 and S3 simultaneously register in the course

  Scenario: Resource contention 2
    Given there is a course with a seat limit of 2
    And there are 3 users
    When all 3 users log in
    And S2 registers in the course
    And S2 drops the course while S3 registers in the course
