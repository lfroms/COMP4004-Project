Feature: Course Registration
  As a student
  I want to register in courses
  So that I can earn credit

  Scenario: A student successfully registers in a course with no prerequisites
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for the current term
    When I click the enroll button
    And I click the "Confirm" button
    Then I receive a message saying "Enrolled"

  Scenario: A student successfully registers in a course with prerequisites
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 3004"
    And there exists a course with code "COMP 4004"
    And course with code "COMP 4004" has prerequisite "COMP 3004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" has passed course with code "COMP 3004"
    And I am viewing the list of offered courses for the current term
    When I click the enroll button
    And I click the "Confirm" button
    Then I receive a message saying "Enrolled"

  Scenario: A student attempts to register in a course with not-taken prerequisites
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 3004"
    And there exists a course with code "COMP 4004"
    And course with code "COMP 4004" has prerequisite "COMP 3004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for the current term
    When I click the enroll button
    And I click the "Confirm" button
    Then I receive a message saying "You do not have the required prerequisites."

  Scenario: A student attempts to register in a course with failed prerequisites
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 3004"
    And there exists a course with code "COMP 4004"
    And course with code "COMP 4004" has prerequisite "COMP 3004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" has failed course with code "COMP 3004"
    And I am viewing the list of offered courses for the current term
    When I click the enroll button
    And I click the "Confirm" button
    Then I receive a message saying "You do not have the required prerequisites."

Scenario: Registration deadline has passed
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has registration deadline earlier than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" capacity 1
    And I am viewing the list of offered courses for the current term
    Then there are no enroll buttons

  Scenario: A course is already full
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" capacity 1
    And a student is already enrolled in course offering with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for the current term
    Then I receive a message saying "Full"

  Scenario: Student is already enrolled in course
    Given I successfully log in as a student with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And student with email "student@email.com" is already enrolled in course with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for the current term
    Then I receive a message saying "Enrolled"



