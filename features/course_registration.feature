Feature: Course Registration
  As a student
  I want to register in courses
  So that I can earn credit

  Scenario: A student successfully registers in a course with no prerequisites
    Given that I am logged in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And there exists a term "Sep 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for term "Sep 2020 - Dec 2020"
    When I click the enroll button
    And I click the "Confirm" button
    Then I receive a message saying "already enrolled"

  Scenario: A course is already full
    Given that I am logged in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And there exists a term "Sep 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" capacity 1
    And a student is already enrolled in course offering with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for term "Sep 2020 - Dec 2020"
    Then I receive a message saying "full"

  Scenario: Student is already enrolled in course
    Given that I am logged in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And there exists a term "Sep 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" is already enrolled in course with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for term "Sep 2020 - Dec 2020"
    Then I receive a message saying "already enrolled"

  Scenario: A student successfully registers in a course with prerequisites
    Given that I am logged in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And that student with email "student@email.com" has not completed course with code "COMP3004"
    And I am viewing the list of offered courses for term "Sep 2020 - Dec 2020"
    When I select course offering for course with code "COMP4004" with section "A"
    And course with code "COMP4004" has prerequisite "COMP3004"
    And I select the option to register
    Then I receive an error message saying "You do not have the prerequisites for course COMP4004"
    And student with email "student@email.com" is not enrolled in course offering for course with code "COMP4004" with section "A"

