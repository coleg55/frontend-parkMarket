import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Switch, Button } from "@mui/material";
import {
  Header,
  Posts,
  ListingPage,
  WelcomeMessage
} from "./components/"
import lightMode from "./themes/light";
import darkMode from "./themes/dark";

function App() {
  const [posts, setPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // useEffect(() => {
  //   // Simulating loading posts
  //   const postsData = [
  //     { id: 1, title: "Post 1" },
  //     { id: 2, title: "Post 2" },
  //     { id: 3, title: "Post 3" },
  //   ];
  //   setPosts(postsData);
  // }, []);


  const theme = isDarkMode ? darkMode : lightMode;


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App" style={{ backgroundColor: theme.palette.background.default }}>
          <Header onThemeToggle={toggleDarkMode} />
          <Switch checked={isDarkMode} onChange={toggleDarkMode} />
          <Button href="/create" variant="contained">Create a post</Button>

          <Routes>
            <Route path="/" element={<Posts posts={posts} />} />
            <Route path="/create" element={<ListingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
