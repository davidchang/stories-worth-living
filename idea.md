Stories, v1
-----------
- Each Story is a separate entity, lets you tell that story over different periods
- Story categories: School, Career, Relationships, Family, Ideology, Spirituality, Exercise, or Custom categories
- One category should be open-ended philosophy or ideology questions (what has been your experience with death? who is the one person you can't get out of your mind? what will you do once you reach your goals?)
- Could add pictures or Tweets or wall posts... social stuff like that.
- Should be able to mark posts as Tweet-sized (140), Abstract (500), Essay (1000), Epic (2500)

Social Aspect
-------------
- Should eventually enter into an anonymous mode - just a username/password (don't even support Forget Password?)
- We need to maintain a social experience, whether anonymous or not
- Ability to "Follow" people
- Ability to set posts as public or private, defaulting to private

Revisions, v2
-------------
- Story = Theme. You shouldn't have to add themes - you should just have all themes
- There's value in a "Question of the Day" because then you could potentially get snapshots of opinion
- /stories should have a list of themes, each theme has the "question of the day" with a Tweet sized answer

Revisions, v3
-------------
- You should be able to answer a question in "private" mode, then send a message to someone to answer that question as well and to be able to see both responses
- Maybe we shouldn't distinguish between different categories - just have those categories in the background... in that case, we're losing much of the appeal of sequentially telling your story
- Should there be a cap on the number of questions you can answer? Like 5 a day?
- This is basically a private social network built around asking personal questions.
- The idea is to cultivate transparency online...
- still need to figure out the kinks with how anonymity will work though

questions : [{
  numAnswers : int,
  text : String,
  category : String
}]

themes : [{
  name : String
}]

users : [{
  metadata : {
    followers : int
  },
  answers : [{
    questionId : String (generated from Firebase),
    text : String (optional),
    date : Date,
    private : Boolean
  }],
  messages : {
    sent : [{
      from : userId,
      to : userId,
      messages : String
    }],

    received : [{
      from : userId,
      to : userId,
      messages : String
    }]
  },
  following : {
    userId
  }
}
}]
