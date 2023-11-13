import { PostProps } from "pages/home";
import { useState } from "react";
import PostBox from "./PostBox";
import Loader from "components/loader/Loader";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);

  return <></>
}
