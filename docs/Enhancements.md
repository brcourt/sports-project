# Enhancements

Obviously this is just a demo. The following is a list of things that I would have implemented if I had enough time or desire.

### Better State Management in React

I opted to use Tanstack Query to take the place of a state management solution. While its not truly managing state, the way it caches queries made it suitable for that purpose in this demo, which killed two birds with one stone. Naturally, I would build a much more robust state managements system

### DynamoDB Pull-Through Cache

The nature of this analytics solution means massive read throughput. Using something like DDB-DAX or some other third-party/custom caching solution to sit in between the compute layer and the database should dramatically improve response time and scalability.

### Proper UI tables

I opted not to get fancy with a nice Tables library. There are a few reasons for that, but the biggest issue was value/effort. I can demo a nice fancy table with filtering/sorting/selection/etc... but without having the data structure finalized, there really is not point in going that extra mile. Let it suffice that yes, obviously a fancier table library would looks nicer in this demo, but by going this route, it saved me an hour or two of tinkering and chasing perfection.

### More extensive API

I didn't really have the time to design a comprehensive schema for a single-table design for this demo. The first and probably most important next step for this solution would be to really plan out and design a good single-table data structure. ElectoDB helps with this, however I really wanted to just get some API endpoints up so I could pull the data in the app. It would be nice to have API calls that can aggregate Games and Player and Teams all at once and provide unified output.

### Replace AmplifyUI with custom solution

I used Amplify to build the Auth UI only because it was simple and fast to hook up with Cognito. Normally, I wouldn't ever do this (never for a real customer). We should scrap this and implement a proper authentication flow in the UI.

### Proper testing

I definitely ran out of time to write some proper tests, but really how much would that really be worth for a single day project that I will never use again. Rest assured, I can write tests...

### AI features

Lol but seriously thats probably something that would need to be added at some point.
