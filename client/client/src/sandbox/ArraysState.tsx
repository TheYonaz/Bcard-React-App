import React, { useState, ChangeEvent, MouseEvent, FormEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
interface Task {
  createdAt: Date | string;
  author: string;
  subtitle: string;
  title: string;
}
type Event = FormEvent<HTMLFormElement>;
const ArrayState = () => {
  const INITIAL_POST = { createdAt: "", author: "", subtitle: "", title: "" };
  const [isLogged, setIsLogged] = useState(false);
  const [post, setPost] = useState(INITIAL_POST);
  const [posts, setPosts] = useState<[] | Task[]>([]);
  console.log(isLogged);
  const { subtitle, title, author, createdAt } = post;

  const handleTitleChange = (key: string) => {
    return (event: ChangeEvent<HTMLInputElement>): void => {
      setPost((prev) => ({ ...prev, [key]: event.target.value }));
    };
  };
  const createNewPost = (event: Event) => {
    event.preventDefault();
    setPosts((prev) => [...prev, { ...post, createdAt: new Date() }]);
    setPost(INITIAL_POST);
  };
  return (
    <Box>
      <button onClick={() => setIsLogged((prev) => !prev)} >
        {isLogged ? "Log Out" : "Log In"}
      </button>
      <div></div>
      {isLogged ? (
        <>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <p>{author}</p>
          <form onSubmit={createNewPost}>
            <input onChange={handleTitleChange("title")} value={post.title} />
            <input
              onChange={handleTitleChange("subtitle")}
              value={post.subtitle}
            />
            <input onChange={handleTitleChange("author")} value={post.author} />
            <button type="submit" disabled={!subtitle || !title || !author}>Create Post</button>
          </form>
          {posts.length > 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>no.</TableCell>
                    <TableCell>title</TableCell>
                    <TableCell>subtitle</TableCell>
                    <TableCell>author</TableCell>
                    <TableCell>created at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.subtitle}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        {post.createdAt.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      ) : (
        <>
          <div></div>
          <h1>OOPS... you should log in first</h1>
        </>
      )}
    </Box>
  );
};

export default ArrayState;
