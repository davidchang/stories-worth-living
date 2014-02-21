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
  category : String,
  enforcedFrequency : int (1 = 1 day, 30 = 30 days)
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
    isPrivate : Boolean
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

2/12 progress
-------------
- Implemented admin interface to add questions, themes
- Ability for a user to answer questions (right now, they can only answer each question once)
- Db service for handling connections to Firebase. Pretty nifty, if I do say so myself
- Ability to view /me and to view /users/:id? where :id? currently needs to be the Facebook ID


Next Milestones:
- Ability to Follow users (done 2/15)
- Make interface nicer, as it's just kind of a dump of data right now (done 2/15)
- Specify a time interval for questions (done 2/15)

Considerations:
- Switch to Firebase social Auth? especially since you've yet to really use Facebook photos or anything uniquely (done 2/20)


2/15 progress
-------------
- Used Garamond font from Google API, cleaned up some styles on /me and /answer
- Added interval for questions in Firebase and /questions, enforced in answer.js
- Imported angular-contenteditable for /answer (looks much nicer)
- Following capability, show who you're following on /me and the user's followers on /user/:id?

Next Milestones:
- Build concept of questions with hidden answers (done 2/18)
- notification asking you to exchange answer (done 2/18)
- notification asking you to answer question (rudimentarily done 2/18)

2/18 progress
-------------
- Implemented hidden answers if marked private, showing if you are marked as a friend
- Sending notifications to exchange an answer or to send a friend request
- Not too pretty interface where you can select a question to ask the user and send them a notification

Next Milestones:
- Build notification center
- Implement a Zen mode (done 2/20)

Considerations:
- Need to fix login bug that redirects back to /answer (addressed by switch to Firebase auth 2/20)
- Look into just using Firebase hosting

2/20 progress
-------------
- Zen Mode
- Bootstrap navbar
- Using Firebase for auth

Next Milestones:
- Firebase hosting/security rules
- Need to fix bug where you're waiting to see if you're an authenticated user