# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

30.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    username = Faker::Internet.username

    User.create(first_name: first_name, last_name: last_name, username: username, password: "password", admin: 0)
end

admin1 = User.create(first_name: "Kat", last_name: "Roll", username: "admin", password: "admin", admin: 1)

quiz1 = Quiz.create(name: "Intro Quiz")

q1 = Question.create(
    question: "Where is SPCTC?", 
    choices: ["Ireland", "Howrah", "Thakurpukur", "Behala", "Tollygunge"], 
    answer: 2,
    quiz_id: quiz1.id
)

q2 = Question.create(
    question: "Whose project is SPCTC?", 
    choices: ["Save the Children", "USAID", "West Bengal government", "Mother Theresa", "Bengali Christian Network"],
    answer: 4,
    quiz_id: quiz1.id
)

q3 = Question.create(
    question: "Which Subject is NOT taught at SPCTC?",
    choices: ["French", "MS Office", "C++", "HTML", "Spoken English"],
    answer: 0,
    quiz_id: quiz1.id
)

q4 = Question.create(
    question: "What year did SPCTC open?",
    choices: ["1998", "2010", "2017", "2019", "2021"],
    answer: 3,
    quiz_id: quiz1.id
)

q5 = Question.create(
    question: "What is our contact email address",
    choices: ["callme@centre.com", "info@Kolkatarocks.com", "St@Pauls.com", "hello@emailme.com", "spctc63@gmail.com"],
    answer: 4,
    quiz_id: quiz1.id
)

q6 = Question.create(
    question: "The Computer Lab is fully air-conditioned.",
    choices: ["True", "False"],
    answer: 0,
    quiz_id: quiz1.id
)

puts "done seeding"

