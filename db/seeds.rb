# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Question.select(:id).all.length == 0
  questions = [
    {
      content: '第1問目ですー',
      answer_number: 1
    },
    {
      content: '第2問目ですー',
      answer_number: 1
    },
    {
      content: '第3問目ですー',
      answer_number: 1
    },
    {
      content: '第4問目ですー',
      answer_number: 1
    },
    {
      content: '第5問目ですー',
      answer_number: 1
    }
  ]

  questions.each do |q|
    Question.create(
      content: q[:content],
      answer_number: q[:answer_number]
    )
  end
end

if Answer.select(:id).all.length == 0
  answers = [
    {
      question_id: 1,
      content: '答え1-1'
    },
    {
      question_id: 1,
      content: '答え1-2'
    },
    {
      question_id: 1,
      content: '答え1-3'
    },
    {
      question_id: 1,
      content: '答え1-4'
    },
    {
      question_id: 1,
      content: '答え1-1'
    },
    {
      question_id: 2,
      content: '答え2-1'
    },
    {
      question_id: 2,
      content: '答え2-2'
    },
    {
      question_id: 2,
      content: '答え2-3'
    },
    {
      question_id: 2,
      content: '答え2-4'
    },
    {
      question_id: 3,
      content: '答え3-1'
    },
    {
      question_id: 3,
      content: '答え3-2'
    },
    {
      question_id: 3,
      content: '答え3-3'
    },
    {
      question_id: 3,
      content: '答え3-4'
    },
    {
      question_id: 4,
      content: '答え4-1'
    },
    {
      question_id: 4,
      content: '答え4-2'
    },
    {
      question_id: 4,
      content: '答え4-3'
    },
    {
      question_id: 4,
      content: '答え4-4'
    },
    {
      question_id: 5,
      content: '答え5-1'
    },
    {
      question_id: 5,
      content: '答え5-2'
    },
    {
      question_id: 5,
      content: '答え5-3'
    },
    {
      question_id: 5,
      content: '答え5-4'
    }
  ]

  answers.each do |q|
    Answer.create(
      question_id: q[:question_id],
      content: q[:content]
    )
  end
end
if User.select(:id).all.length == 0
  User.create(
    name: 'テストタロウ'
  )
end
