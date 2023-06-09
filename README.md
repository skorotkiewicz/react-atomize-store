# react-atomize-store

> A lightweight state management library that simplifies state handling in your applications. Easily manage and update your app's state with minimal code. With built-in support for IndexedDB, it provides a seamless way to persist your state, making it perfect for storing login tokens or other sensitive information securely. Enjoy the convenience of automatic storage and retrieval, ensuring your data is always available when needed.

## Install

```
yarn add react-atomize-store
or
npm i react-atomize-store
```

## Usage

```jsx
// App.tsx
import React from "react";
import { useStore } from "react-atomize-store";

const App = () => {
  useStore(
    {
      count: 0,
      username: "adam",
      feeds: [],
      keypair: {},
    },
    true, // Enable Redux DevTools Extension
    ["keypair"] // atoms to store in IndexedDB
  );

  return <div>App</div>;
};

export default App;
```

Use it everywhere in your React app, just like the simple useState hook.

```jsx
// Dashboard.tsx
import React from "react";
import { useAtom } from "react-atomize-store";

const Dashboard = () => {
  const [feeds, setFeeds] = useAtom("feeds");
  const [count, setCount] = useAtom("count");

  // Adding a new item to the 'feeds' array
  setFeeds((prev) => [...prev, feed]);

  // Overwriting the 'feeds' array with an empty array
  setFeeds([]);

  // Removing an element from the 'feeds' array
  setFeeds((prev) => prev.filter((item) => item.id !== feedId));

  setCount((prev) => prev + 1);

  console.log(feeds, count);

  return <div>Dashboard</div>;
};

export default Dashboard;
```
