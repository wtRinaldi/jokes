# Quasar App (jokes)

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
# or
npm run dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
# jokes

# Frontend Coding Exercise - Joke App

## 1. Project Overview
 App fetches jokes from the [Official Joke API](https://github.com/15Dkatz/official_joke_api/) and displays them in a clear, organized UI. Users can sort, paginate, and optionally search/filter jokes. 

- **Table view** with sorting, searching, pagination, filtering, and non-persistent favoriting.  
- **Random joke view** showing one random joke at a time  
- **List view** with filtering by joke type  

## 2. Tech Stack
- **Languages & Frameworks:** HTML, CSS, TypeScript, Vue 3, TS  
- **State Management:** Pinia  
- **Other Libraries:** Quasar  
- **Why:** Quasar was selected to quickly prototype
- **Others considered:** Tailwind. I prefer using tailwind but elected to exclude it based on project instructions to use CSS.

## 3. Features Implemented
### Minimum Requirements
- Fetch and render jokes from the API
- Sorting controls via Quasar table
- Pagination via Quasar table
- Basic loading and error states
    - loading state used on quasar table

### Optional Enhancements
- Search/filtering
- Favoriting jokes
- Responsive layout
- Lightweight linting/formatting

## 4. Design Decisions & Thought Process
- **API Consumption:** Fetched all jokes on store initialization
    - Jokes:
        - All jokes fetch via joke total 'https://official-joke-api.appspot.com/jokes/random/451'
        - Given small number of jokes
            - we're able to fetch all jokes at once. Ideally, `/jokes` would return all jokes w/o requiring the number of jokes.  Currently, 451 is a hardcoded value.  Assumes number of jokes does not change
        - Given a joke DB that would grow with out limit over time (user added jokes maybe) or a very large DB of jokes
            - apis changes would require refactor to allow for backend filtering, sorting, and pagination
    - Types:
        - Joke types were fetched via 'https://official-joke-api.appspot.com/types' and used in type filtering
    - Jokes & Types are prefetched on mounted of App.vue and fetched concurrently 
- **State Management:** Used Pinia for global state to handle jokes, favorites, actions to handle api request.
    - Favorite property was appended to Joke object to create a non-persistent value of favorited jokes.
    - isolating api calls in store actions keeps components cleaner and more closely follows SRP (single responsibility principle)
- **Component Structure:**
    - App.vue -> MainLayout.vue -> router view -> nested routes (pages) -> components
    - Lists view demostrates proper encapsulation of component by function
        - encapsulated JokeListItem.vue & JokeTypeFilter.vue
- **API Handling:** Implemented error handling and loading states to improve UX.
    - simple notifications are presented to user on failure to fetch jokes / joke types
- **Sorting & Filtering:** Used computed properties for performance and reactive updates.
    - Table view
        - Quasar table handles sorting and pagination with config options
        - text filtering uses common pattern of providing table with computed `filteredRows`
            - uses `.filter` to iterate over rows and `.includes` to values matching the query string
        - type filtering uses computed property utilizing `.filter` to find matching types
    - List view
        - type filtering uses computed property utilizing `.filter` to find matching types
- **Responsiveness:** 
    - Quasar table set to card view on smaller devices and breaks to table on larger devices
    - Random & List are simple layouts and work well on mobile

## 5. Challenges & Solutions
- content is simple so creating interesting UIs can be a challenge

