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
  current_window.resize_to(1300, 950)
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
    S1.current_window.resize_to(1200, 940)

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
    P1.current_window.resize_to(1100, 800)

    P1.visit('/registration')
    P1.fill_in('user_name_field', with: 'Professor 1')
    P1.fill_in('user_email_field', with: 'prof1@example.com')
    P1.fill_in('user_password_field', with: '123456')
    P1.click_button('Register new account')
  end

  p2_procedure = Thread.new do
    P2.current_window.resize_to(1000, 700)

    P2.visit('/registration')
    P2.fill_in('user_name_field', with: 'Professor 2')
    P2.fill_in('user_email_field', with: 'prof2@example.com')
    P2.fill_in('user_password_field', with: '123456')
    P2.click_button('Register new account')
  end

  p1_procedure.join
  sleep 0.3
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
    S2.current_window.resize_to(900, 600)

    S2.visit('/registration')
    S2.fill_in('user_name_field', with: 'Student 2')
    S2.fill_in('user_email_field', with: 'student2@example.com')
    S2.fill_in('user_password_field', with: '123456')
    S2.click_button('Register new account')
    sleep(0.5)
    @self_enrolling.users << User.find_by(email: 'student2@example.com')
  end

  s3_procedure = Thread.new do
    S3.current_window.resize_to(800, 500)

    S3.visit('/registration')
    S3.fill_in('user_name_field', with: 'Student 3')
    S3.fill_in('user_email_field', with: 'student3@example.com')
    S3.fill_in('user_password_field', with: '123456')
    S3.click_button('Register new account')
    sleep(0.5)
    @self_enrolling.users << User.find_by(email: 'student3@example.com')
  end

  s2_procedure.join
  sleep 0.3
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
  S1.visit('/login')
  S1.fill_in('login_email_field', with: 'student1@example.com')
  S1.fill_in('login_password_field', with: '123456')
  S1.click_button('Log in')

  S2.visit('/login')
  S2.fill_in('login_email_field', with: 'student2@example.com')
  S2.fill_in('login_password_field', with: '123456')
  S2.click_button('Log in')

  S3.visit('/login')
  S3.fill_in('login_email_field', with: 'student3@example.com')
  S3.fill_in('login_password_field', with: '123456')
  S3.click_button('Log in')

  P1.visit('/login')
  P1.fill_in('login_email_field', with: 'prof1@example.com')
  P1.fill_in('login_password_field', with: '123456')
  P1.click_button('Log in')

  P2.visit('/login')
  P2.fill_in('login_email_field', with: 'prof2@example.com')
  P2.fill_in('login_password_field', with: '123456')
  P2.click_button('Log in')
end

When('S2 and S3 simultaneously register in C1') do
  s2_procedure = Thread.new do
    S2.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'COMP 3004'), section: 'A').id
    S2.click_button("enroll_button_#{offering_id}")
    S2.click_button('Confirm')
  end

  s3_procedure = Thread.new do
    S3.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'COMP 3004'), section: 'A').id
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

    S1.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A').id
    S1.click_button("enroll_button_#{offering_id}")
    S1.click_button('Confirm')
  end

  s2_procedure = Thread.new do
    S2.visit('/terms/1/courses')
    offering_id = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A').id
    S2.click_button("enroll_button_#{offering_id}")
    S2.click_button('Confirm')
  end

  s1_procedure.join
  s2_procedure.join
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
    P2.visit("/courses/#{offering.id}")
    P2.click_button('add_deliverable_button')
    P2.fill_in('deliverable_title_field', with: 'Essay')
    P2.fill_in('deliverable_description_field', with: 'An essay')
    P2.fill_in('deliverable_weight_field', with: '0.5')
    P2.fill_in('deliverable_due_date_field', with: '12-15-23')
    P2.click_button('Create')
  end

  p1_procedure.join
  p2_procedure.join
end

When('S1 drops C2') do
  S1.visit('/courses')
  assert '/courses', S1.current_path # Wait for load
  offering = Offering.find_by(course: Course.find_by(code: 'COMP 4004'), section: 'A')
  S1.find("#unenroll_button_#{offering.id}").click
  S1.click_button('Confirm')
end

When('S2 and S3 simultaneously submit C1 project') do
  s2_procedure = Thread.new do
    offering = Offering.find_by(course: Course.find_by(code: 'COMP 3004'), section: 'A')
    deliverable = offering.deliverables.first
    S2.visit("/courses/#{offering.id}/deliverables/#{deliverable.id}")
    S2.click_button('Add submission')
    S2.fill_in('submission_url_field', with: 'http://example.com')
    S2.click_button('Submit')
  end

  s3_procedure = Thread.new do
    offering = Offering.find_by(course: Course.find_by(code: 'COMP 3004'), section: 'A')
    deliverable = offering.deliverables.first
    S3.visit("/courses/#{offering.id}/deliverables/#{deliverable.id}")
    S3.click_button('Add submission')
    S3.fill_in('submission_url_field', with: 'http://example.com')
    S3.click_button('Submit')
  end

  s2_procedure.join
  s3_procedure.join
end

When('S1 submits C3 while S2 submits C3') do
  s1_procedure = Thread.new do
    offering = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A')
    deliverable = offering.deliverables.first
    S1.visit("/courses/#{offering.id}/deliverables/#{deliverable.id}")
    S1.click_button('Add submission')
    S1.fill_in('submission_url_field', with: 'http://example.com')
    S1.click_button('Submit')
  end

  s2_procedure = Thread.new do
    offering = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A')
    deliverable = offering.deliverables.first
    S2.visit("/courses/#{offering.id}/deliverables/#{deliverable.id}")
    S2.click_button('Add submission')
    S2.fill_in('submission_url_field', with: 'http://example.com')
    S2.click_button('Submit')
  end

  s1_procedure.join
  s2_procedure.join
end

When('P1 submits marks for deliverable in C1') do
  offering = Offering.find_by(course: Course.find_by(code: 'COMP 3004'), section: 'A')
  deliverable = offering.deliverables.first
  P1.visit("/courses/#{offering.id}/deliverables/#{deliverable.id}")
  P1.click_button("add-grade-button-#{User.find_by(email: 'student2@example.com').id}")
  P1.fill_in('grade_value_field', with: '0.5')
  P1.fill_in('grade_comment_field', with: 'Great')
  P1.click_button('Create')
end

When('P2 submits marks for deliverable in C3') do
  offering = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A')
  deliverable = offering.deliverables.first
  P2.visit("/courses/#{offering.id}/deliverables/#{deliverable.id}")
  P2.click_button("add-grade-button-#{User.find_by(email: 'student1@example.com').id}")
  P2.fill_in('grade_value_field', with: '0.5')
  P2.fill_in('grade_comment_field', with: 'Great')
  P2.click_button('Create')
end

When('P1 and P2 simultaneously submit final grades for C1 and C3') do
  p1_procedure = Thread.new do
    offering_id = Offering.find_by(course: Course.find_by(code: 'COMP 3004'), section: 'A').id
    P1.visit("/courses/#{offering_id}/participants")
    P1.click_button("add-final-grade-#{User.find_by(email: 'student2@example.com').id}")
    P1.find('#final_grade_select', visible: false).click
    P1.find('.final_grade_select_A', text: 'A').click
    P1.click_button('Assign')
  end

  p2_procedure = Thread.new do
    offering_id = Offering.find_by(course: Course.find_by(code: 'MUSI 1002'), section: 'A').id
    P2.visit("/courses/#{offering_id}/participants")
    P2.click_button("add-final-grade-#{User.find_by(email: 'student2@example.com').id}")
    P2.find('#final_grade_select', visible: false).click
    P2.find('.final_grade_select_A', text: 'A').click
    P2.click_button('Assign')
  end

  p1_procedure.join
  p2_procedure.join
end

When('all users log out') do
  S1.find('#global_log_out').click
  S2.find('#global_log_out').click
  S3.find('#global_log_out').click
  P1.find('#global_log_out').click
  P2.find('#global_log_out').click
end

Given('there is a course with a seat limit of {int}') do |capacity|
  today = Time.zone.today
  term = Term.create!(
    start_date: today + 14,
    end_date: today + 130,
    registration_deadline: today + 30,
    withdrawal_deadline: today + 50,
    per_credit_fee: 1000,
  )

  course = Course.create!(name: 'Test', code: 'COMP 4004')
  Offering.create!(term: term, course: course, section: 'A', capacity: capacity)
end

Given('there are three users') do
  self_enrolling = Group.create(name: 'Self enroll', can_self_enroll: true)
  user1 = User.create(name: 'Student 1', email: 'student1@example.com', password: '123456', approved: true)
  user2 = User.create(name: 'Student 2', email: 'student2@example.com', password: '123456', approved: true)
  user3 = User.create(name: 'Student 3', email: 'student3@example.com', password: '123456', approved: true)

  self_enrolling.users << user1
  self_enrolling.users << user2
  self_enrolling.users << user3
end

When('all three users log in') do
  S1.driver.quit
  S2.driver.quit
  S3.driver.quit
  P1.driver.quit
  P2.driver.quit

  S1.current_window.resize_to(1200, 940)
  S1.visit('/login')
  S1.fill_in('login_email_field', with: 'student1@example.com')
  S1.fill_in('login_password_field', with: '123456')
  S1.click_button('Log in')

  S2.current_window.resize_to(1000, 750)
  S2.visit('/login')
  S2.fill_in('login_email_field', with: 'student2@example.com')
  S2.fill_in('login_password_field', with: '123456')
  S2.click_button('Log in')

  S3.current_window.resize_to(800, 550)
  S3.visit('/login')
  S3.fill_in('login_email_field', with: 'student3@example.com')
  S3.fill_in('login_password_field', with: '123456')
  S3.click_button('Log in')
end

When('S1 registers in the course') do
  S1.visit('/terms/1/courses')
  S1.click_button("enroll_button_#{Offering.first.id}")
  S1.click_button('Confirm')
end

When('S2 and S3 simultaneously register in the course') do
  s2_procedure = Thread.new do
    S2.visit('/terms/1/courses')
    S2.click_button("enroll_button_#{Offering.first.id}")
    S2.click_button('Confirm')
  end

  s3_procedure = Thread.new do
    S3.visit('/terms/1/courses')
    S3.click_button("enroll_button_#{Offering.first.id}")
    S3.click_button('Confirm')
  end

  s2_procedure.join
  s3_procedure.join
end

When('S2 registers in the course') do
  S2.visit('/terms/1/courses')
  S2.click_button("enroll_button_#{Offering.first.id}")
  S2.click_button('Confirm')
end

When('S2 drops the course while S3 registers in the course') do
  s2_procedure = Thread.new do
    S2.visit('/courses')
    S2.find("#unenroll_button_#{Offering.first.id}").click
    S2.click_button('Confirm')
  end

  s3_procedure = Thread.new do
    S3.visit('/terms/1/courses')
    S3.click_button("enroll_button_#{Offering.first.id}")
    S3.click_button('Confirm')
  end

  s2_procedure.join
  s3_procedure.join
end
