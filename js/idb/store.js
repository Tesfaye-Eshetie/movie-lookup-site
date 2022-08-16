import { database } from './indexedDB';

export class StoreSetup {
  constructor(init = {}) {
    const self = this;
    this.subscribers = [];

    database.then(async (db) => {
      this.db = db;
      // Check if there was a previous state
      const previous = await db.get('searchMovie', 'search');
      if (previous) {
        // If there was, go through each key and value and re-set it
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, val] of Object.entries(previous)) {
          this.set(key, val);
        }
      }
    });

    this.state = new Proxy(init, {
      async set(state, key, value) {
        // eslint-disable-next-line no-param-reassign
        state[key] = value;
        if (key !== 'search') {
          // eslint-disable-next-line no-param-reassign
          state.search = value;
        }
        // Check to see if the database exists, and if it does, put the current state into it. This will add it to our IndexedBD
        if (self.db) {
          await self.db.put('searchMovie', state, 'search');
        }
        self.subscribers.forEach((subscriber) => subscriber(state));
        return true;
      },
    });
  }

  subscribe(cb) {
    if (typeof cb !== 'function') {
      throw new Error('You must subscribe with a function');
    }
    this.subscribers.push(cb);
    cb(this.state);
  }

  set(key, value) {
    this.state[key] = value;
  }

  get(key) {
    return this.state[key];
  }
}
// Export an initialized store for easy use across the project
export const store = new StoreSetup({ search: '' });
