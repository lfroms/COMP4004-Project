# frozen_string_literal: true

S1 = Capybara::Session.new(:selenium_chrome)
S2 = Capybara::Session.new(:selenium_chrome)
S3 = Capybara::Session.new(:selenium_chrome)
P1 = Capybara::Session.new(:selenium_chrome)
P2 = Capybara::Session.new(:selenium_chrome)

Given('an administrator user is logged in') do
  email = 'admin@example.com'
  password = '123456'
  @self_enrolling = Group.create(name: 'Self enroll', can_self_enroll: true)
  User.create(name: 'admin', email: email, password: password, admin: true, approved: true)
  visit('/')
  fill_in('login_email_field', with: email)
  fill_in('login_password_field', with: password)
  click_button('login')

  assert_current_path '/courses' # Wait for redirect before proceeding
end

When('the administrator creates the term') do
  visit('/admin/terms')
  click_button('New term')
  fill_in('Start date', with: '09-01-20')
  fill_in('End date', with: '12-15-25')
  fill_in('term_registration_deadline_field', with: '09-01-25')
  fill_in('term_withdrawal_deadline_field', with: '10-01-20')
  fill_in('term_fee_field', with: '1000.00')
  click_button('Create')
end

When('S1 requests creation while the administrator creates C2') do
  s1_procedure = Thread.new do
    S1.current_window.resize_to(500, 500)
    S1.visit('/registration')
    S1.fill_in('user_name_field', with: 'Student 1')
    S1.fill_in('user_email_field', with: 'student1@example.com')
    S1.fill_in('user_password_field', with: '123456')
    S1.click_button('Register new account')
    sleep(0.5)
    @self_enrolling.users << User.find_by(email: 'student1@example.com')
  end

  admin_procedure = Thread.new do
    visit('/admin/courses')
    click_button('New course')
    fill_in('course_code_field', with: 'COMP 4004')
    fill_in('course_name_field', with: 'Software Quality Assurance')
    click_button('Create')

    visit('/admin/offerings')
    click_button('New course offering')
    fill_in('offering_section_field', with: 'A')
    field = find('.ant-input-number-input')
    field.fill_in(with: '100')
    find('#offering_course_select', visible: false).click
    find('.offering_form_course_option', text: 'COMP 4004').click
    find('#offering_term_select', visible: false).click
    find('.offering_form_term_option', text: 'Sep 2020 - Dec 2025').click
    click_button('Create')
  end

  s1_procedure.join
  admin_procedure.join
end

When('P1 and P2 simultaneously request creation') do
  p1_procedure = Thread.new do
    P1.current_window.resize_to(900, 900)
    P1.visit('/registration')
    P1.fill_in('user_name_field', with: 'Professor 1')
    P1.fill_in('user_email_field', with: 'prof1@example.com')
    P1.fill_in('user_password_field', with: '123456')
    P1.click_button('Register new account')
  end

  p2_procedure = Thread.new do
    P2.current_window.resize_to(600, 600)
    P2.visit('/registration')
    P2.fill_in('user_name_field', with: 'Professor 2')
    P2.fill_in('user_email_field', with: 'prof2@example.com')
    P2.fill_in('user_password_field', with: '123456')
    P2.click_button('Register new account')
  end

  p1_procedure.join
  p2_procedure.join
end

When('administrator creates C1 and C3') do
  visit('/admin/courses')

  click_button('New course')
  fill_in('course_code_field', with: 'COMP 3004')
  fill_in('course_name_field', with: 'Object Oriented Software Engineering')
  click_button('Create')

  visit('/admin/offerings')
  click_button('New course offering')
  fill_in('offering_section_field', with: 'A')
  field = find('.ant-input-number-input')
  field.fill_in(with: '100')
  find('#offering_course_select', visible: false).click
  find('.offering_form_course_option', text: 'COMP 3004').click
  find('#offering_term_select', visible: false).click
  find('.offering_form_term_option', text: 'Sep 2020 - Dec 2025').click
  click_button('Create')

  visit('/admin/courses')
  click_button('New course')
  fill_in('course_code_field', with: 'MUSI 1002')
  fill_in('course_name_field', with: 'Issues in Popular Music')
  click_button('Create')

  visit('/admin/offerings')
  click_button('New course offering')
  fill_in('offering_section_field', with: 'A')
  field = find('.ant-input-number-input')
  field.fill_in(with: '100')
  find('#offering_course_select', visible: false).click
  find('.offering_form_course_option', text: 'MUSI 1002').click
  find('#offering_term_select', visible: false).click
  find('.offering_form_term_option', text: 'Sep 2020 - Dec 2025').click
  click_button('Create')
end

When('S2 and S3 simultaneously request creation') do
  s2_procedure = Thread.new do
    S2.current_window.resize_to(300, 500)
    S2.visit('/registration')
    S2.fill_in('user_name_field', with: 'Student 2')
    S2.fill_in('user_email_field', with: 'student2@example.com')
    S2.fill_in('user_password_field', with: '123456')
    S2.click_button('Register new account')
    sleep(0.5)
    @self_enrolling.users << User.find_by(email: 'student2@example.com')
  end

  s3_procedure = Thread.new do
    S3.current_window.resize_to(800, 800)
    S3.visit('/registration')
    S3.fill_in('user_name_field', with: 'Student 3')
    S3.fill_in('user_email_field', with: 'student3@example.com')
    S3.fill_in('user_password_field', with: '123456')
    S3.click_button('Register new account')
    sleep(0.5)
    @self_enrolling.users << User.find_by(email: 'student3@example.com')
  end

  s2_procedure.join
  s3_procedure.join
end

When('administrator assigns C1 to P1, C3 to P2, C2 to P1') do
  course = Course.find_by(code: 'COMP 3004')
  offering_id = Offering.find_by(course: course, section: 'A').id
  visit("admin/offerings/#{offering_id}")
  click_button('Assign professor')
  find('#assign_professor_select', visible: false).click
  find('.assign_professor_option', text: 'Professor 1').click
  click_button('Assign')

  course = Course.find_by(code: 'MUSI 1002')
  offering_id = Offering.find_by(course: course, section: 'A').id
  visit("admin/offerings/#{offering_id}")
  click_button('Assign professor')
  find('#assign_professor_select', visible: false).click
  find('.assign_professor_option', text: 'Professor 2').click
  click_button('Assign')

  course = Course.find_by(code: 'COMP 4004')
  offering_id = Offering.find_by(course: course, section: 'A').id
  visit("admin/offerings/#{offering_id}")
  click_button('Assign professor')
  find('#assign_professor_select', visible: false).click
  find('.assign_professor_option', text: 'Professor 1').click
  click_button('Assign')
end

When('the administrator approves all users') do
  visit('admin/users')

  User.where.not(email: 'admin@example.com').each do |user|
    find("#approve_user_id_#{user.id}").click
    click_button('Confirm')
    sleep 0.5
  end
end

When('all users log in') do
  s1_procedure = Thread.new do
    S1.visit('/login')
    S1.fill_in('login_email_field', with: 'student1@example.com')
    S1.fill_in('login_password_field', with: '123456')
    S1.click_button('Log in')
  end

  s2_procedure = Thread.new do
    S2.visit('/login')
    S2.fill_in('login_email_field', with: 'student2@example.com')
    S2.fill_in('login_password_field', with: '123456')
    S2.click_button('Log in')
  end

  s3_procedure = Thread.new do
    S3.visit('/login')
    S3.fill_in('login_email_field', with: 'student3@example.com')
    S3.fill_in('login_password_field', with: '123456')
    S3.click_button('Log in')
  end

  p1_procedure = Thread.new do
    P1.visit('/login')
    P1.fill_in('login_email_field', with: 'student2@example.com')
    P1.fill_in('login_password_field', with: '123456')
    P1.click_button('Log in')
  end

  p2_procedure = Thread.new do
    P2.visit('/login')
    P2.fill_in('login_email_field', with: 'student3@example.com')
    P2.fill_in('login_password_field', with: '123456')
    P2.click_button('Log in')
  end

  s1_procedure.join
  s2_procedure.join
  s3_procedure.join
  p1_procedure.join
  p2_procedure.join
end

When('S2 and S3 simultaneously register in C1') do
  s2_procedure = Thread.new do
    S2.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'COMP 4004'), section: 'A').id
    S2.click_button("enroll_button_#{offering_id}")
    S2.click_button('Confirm')
  end

  s3_procedure = Thread.new do
    S3.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'COMP 4004'), section: 'A').id
    S3.click_button("enroll_button_#{offering_id}")
    S3.click_button('Confirm')
  end

  s2_procedure.join
  s3_procedure.join
end

When('S1 registers in C2, S1 registers in C3, S2 registers in C3') do
  s1_procedure = Thread.new do
    S1.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'COMP 4004'), section: 'A').id
    S1.click_button("enroll_button_#{offering_id}")
    S1.click_button('Confirm')
  end

  s2_procedure = Thread.new do
    S2.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A').id
    S2.click_button("enroll_button_#{offering_id}")
    S2.click_button('Confirm')
  end

  s3_procedure = Thread.new do
    S3.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A').id
    S3.click_button("enroll_button_#{offering_id}")
    S3.click_button('Confirm')
  end

  s1_procedure.join
  s2_procedure.join
  s3_procedure.join
end

When('P1 creates deliverable for C1, P2 creates deliverable for C3') do
  p1_procedure = Thread.new do
    offering = Offering.find_by(course: Course.find_by(code: 'COMP 3004'), section: 'A')
    P1.visit("/courses/#{offering.id}")
    P1.click_button('add_deliverable_button')
    P1.fill_in('deliverable_title_field', with: 'Project')
    P1.fill_in('deliverable_description_field', with: 'A project')
    P1.fill_in('deliverable_weight_field', with: '0.5')
    P1.fill_in('deliverable_due_date_field', with: '12-15-23')
    P1.click_button('Create')
  end

  p2_procedure = Thread.new do
    offering = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A')
    P1.visit("/courses/#{offering.id}")
    P1.click_button('add_deliverable_button')
    P1.fill_in('deliverable_title_field', with: 'Essay')
    P1.fill_in('deliverable_description_field', with: 'An essay')
    P1.fill_in('deliverable_weight_field', with: '0.5')
    P1.fill_in('deliverable_due_date_field', with: '12-15-23')
    P1.click_button('Create')
  end

  p1_procedure.join
  p2_procedure.join
end

When('S1 drops C2') do
  S1.visit('/courses')
end

When('S2 and S3 simultaneously submit C1 project') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('S1 submits C3 while S2 submits C3') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('P1 submits marks for deliverable in C1') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('P2 submits marks for deliverable in C3') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('P1 and P2 simultaneously submit final grades for C1 and C3') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('all users log out') do
  pending # Write code here that turns the phrase above into concrete actions
end

Given('there is a course with a seat limit of {int}') do |_int|
  # Given('there is a course with a seat limit of {float}') do |float|
  pending # Write code here that turns the phrase above into concrete actions
end

Given('there are {int} users') do |_int|
  # Given('there are {float} users') do |float|
  pending # Write code here that turns the phrase above into concrete actions
end

When('all {int} users log in') do |_int|
  # When('all {float} users log in') do |float|
  pending # Write code here that turns the phrase above into concrete actions
end

When('S1 registers in the course') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('S2 and S3 simultaneously register in the course') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('S2 registers in the course') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('S2 drops the course while S3 registers in the course') do
  pending # Write code here that turns the phrase above into concrete actions
end
