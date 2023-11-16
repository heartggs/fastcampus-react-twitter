import { useCallback, useContext, useEffect, useId, useState } from "react";
import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  where,
} from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { db } from "firebaseApp";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileURl?: string;
  likes?: string[];
  likeCounts?: number;
  comments?: any;
  hashTags?: string[];
  imageUrl: string;
}

interface UserProps {
  id: string;
}

type tabType = "all" | "follow";

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [followingPosts, setFollwingPosts] = useState<PostProps[]>([]);
  const [follwingIds, setFollwingIds] = useState<string[]>([""]);
  const [activeTab, setActiveTab] = useState<tabType>("all");
  const { user } = useContext(AuthContext);

  //실시간 동기화로 user의 팔로잉 id배열 가져오기
  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, "following", user?.uid);
      onSnapshot(ref, (doc) => {
        setFollwingIds([""]);
        doc
          ?.data()
          ?.user?.map((user: UserProps) =>
            setFollwingIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      let postRef = collection(db, "posts");
      let postsQuery = query(postRef, orderBy("createdAt", "desc"));
      let followingQuery = query(
        postRef,
        where("uid", "in", follwingIds),
        orderBy("createdAt", "desc")
      );

      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });

      onSnapshot(followingQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setFollwingPosts(dataObj as PostProps[]);
      });
    }
  }, [follwingIds, user]);

  useEffect(() => {
    if (user?.uid) getFollowingIds();
  }, [getFollowingIds, user?.uid]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div
            className={`home__tab && ${
              activeTab === "all" && "home__tab--active"
            }`}
            onClick={() => {
              setActiveTab("all");
            }}
          >
            All
          </div>
          <div
            className={`home__tab && ${
              activeTab === "follow" && "home__tab--active"
            }`}
            onClick={() => {
              setActiveTab("follow");
            }}
          >
            following
          </div>
        </div>
      </div>
      <PostForm />
      {activeTab === "all" && (
        <div className="post">
          {posts?.length > 0 ? (
            posts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">게시글이 없습니다.</div>
            </div>
          )}
        </div>
      )}
      {activeTab === "follow" && (
        <div className="post">
          {followingPosts?.length > 0 ? (
            followingPosts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">게시글이 없습니다.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
