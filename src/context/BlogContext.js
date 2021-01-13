import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload.id);

    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });

    case "get_blogpost":
      return action.payload;

    default:
      return state;
  }
};

const getBlogPost = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogpost");
    dispatch({ type: "get_blogpost", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    const response = await jsonServer.post("/blogpost", { title, content });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogpost/${id}`);
    dispatch({ type: "delete_blogpost", payload: { id } });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogpost/${id}`, { title, content });
    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
  []
);
