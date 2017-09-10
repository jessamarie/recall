# feature list

## MVP
- User can choose a topic from a predefined list of hardcoded data
- Sentences are prepared by choosing random word(s) from each sentence
- Logic to exclude a set of words such prepositions, adjectives, etc.

## Bronze
- Topics are seeded into API through hardcoded data
- User can copy-paste sentences instead of using predefined topics

## Silver
- A user can sign-up to the website (passport)
- Users get to save sentence sets to their profile
- User can delete owned sets
- Owned topics are available to all users until deleted by the owner

## Gold
- A natural language parser [prolog?][1] will strategically choose the words to be removed from the sentences.
- Either the logic to exclude words no longer needs to be in the static assets, or the parser is used FROM the static assets.

## references

[my language processor from college][1]

[1]:https://github.com/jessamarie/programming-languages/blob/master/pa3/grammar.pl
