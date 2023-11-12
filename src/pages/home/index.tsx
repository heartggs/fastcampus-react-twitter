import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

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
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "test@test.com",
    content: "테스트입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "2",
    email: "test2@test.com",
    content: "테스트입니다.",
    createdAt: "2023-08-31",
    uid: "1231232",
  },
  {
    id: "3",
    email: "test3@test.com",
    content: "테스트입니다.",
    createdAt: "2023-09-01",
    uid: "1231233",
  },
  {
    id: "4",
    email: "test4@test.com",
    content: "테스트입니다.4",
    createdAt: "2023-08-30",
    uid: "1231234",
  },
  {
    id: "5",
    email: "test5@test.com",
    content: "테스트입니다.5",
    createdAt: "2023-08-10",
    uid: "1231235",
  },
  {
    id: "6",
    email: "test@test.com",
    content: "테스트입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "7",
    email: "test7@test.com",
    content: "테스트입니다.7",
    createdAt: "2023-08-30",
    uid: "1231237",
  },
  {
    id: "8",
    email: "test8@test.com",
    content: "테스트입니다.8",
    createdAt: "2023-08-30",
    uid: "1231238",
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />
      {/* tweet post */}
      <div className="post">
        {posts?.map((post) => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
